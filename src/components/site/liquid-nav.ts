import { Container } from "@/vendor/liquid-glass/container.js";

/** One upstream shader surface, with React-safe lifetime and bounded snapshots. */
class NavigationGlass extends Container {
  private host: HTMLElement;
  private disposed = false;
  private program: WebGLProgram | null = null;
  private snapshot: HTMLCanvasElement | null = null;
  private captureVersion = 0;
  private captureTimer = 0;
  private drawTimer = 0;
  private frame = 0;
  private observer: ResizeObserver;
  private languageObserver: MutationObserver;

  // Upstream auto-captures in its constructor. React owns that lifecycle here.
  init() {}

  constructor(host: HTMLElement) {
    super({ type: "rounded", borderRadius: 40, tintOpacity: 0.12 });
    this.host = host;
    this.createElement();
    this.element.classList.add("liquid-nav-surface");
    this.element.setAttribute("aria-hidden", "true");
    this.canvas.setAttribute("aria-hidden", "true");
    this.canvas.tabIndex = -1;
    this.canvas.style.boxShadow = "none";
    this.canvas.style.zIndex = "0";
    host.append(this.element);
    this.gl = this.canvas.getContext("webgl", {
      preserveDrawingBuffer: true,
      powerPreference: "low-power",
    });
    host.dataset.glassState = this.gl ? "loading" : "fallback";
    this.observer = new ResizeObserver(this.measure);
    this.languageObserver = new MutationObserver(this.queueCapture);
    if (!this.gl) {
      this.element.remove();
      return;
    }
    this.canvas.addEventListener("webglcontextlost", this.contextLost);
    this.observer.observe(host);
    this.languageObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    window.addEventListener("scroll", this.queueRender, { passive: true });
    window.addEventListener("resize", this.queueCapture, { passive: true });
    document.addEventListener("visibilitychange", this.queueRender);
    this.measure();
    void this.capture();
  }

  private contextLost = (event: Event) => {
    event.preventDefault();
    if (!this.disposed) this.host.dataset.glassState = "fallback";
  };

  private measure = () => {
    if (this.disposed || this.host.getBoundingClientRect().height > 128) return;
    this.borderRadius = parseFloat(getComputedStyle(this.host).borderTopLeftRadius) || 40;
    this.element.style.borderRadius = `${this.borderRadius}px`;
    this.updateSizeFromDOM();
    this.queueRender();
  };

  private queueCapture = () => {
    if (this.disposed) return;
    window.clearTimeout(this.captureTimer);
    this.captureTimer = window.setTimeout(() => {
      this.measure();
      void this.capture();
    }, 350);
  };

  private async capture() {
    if (this.disposed || !this.gl) return;
    const version = ++this.captureVersion;
    const locale = document.documentElement.lang;
    const pathname = location.pathname;
    try {
      const { default: html2canvas } = await import("html2canvas");
      if (this.disposed) return;
      await document.fonts.load('500 16px "ZahTech Hero Sans"');
      const limit = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE) as number;
      const snapshot = await html2canvas(document.body, {
        scale: 1,
        width: Math.min(innerWidth, limit),
        height: Math.min(document.documentElement.scrollHeight, limit),
        windowWidth: innerWidth,
        windowHeight: innerHeight,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#0a0a0a",
        logging: false,
        useCORS: false,
        ignoreElements: (element) =>
          element === this.host ||
          element.tagName === "CANVAS" ||
          element.classList.contains("fixed"),
        onclone: (doc) => {
          const style = doc.createElement("style");
          style.textContent =
            "*{animation:none!important;transition:none!important}[data-motion-state],[data-motion-state] [style],[data-hero-reveal]{opacity:1!important;transform:none!important}.brand-sculpture__poster{opacity:1!important}";
          doc.head.append(style);
          doc.querySelectorAll("img").forEach((image) => {
            image.loading = "eager";
          });
        },
      });
      if (this.disposed || version !== this.captureVersion) {
        snapshot.width = 0;
        snapshot.height = 0;
        return;
      }
      if (this.snapshot) {
        this.snapshot.width = 0;
        this.snapshot.height = 0;
      }
      this.snapshot = snapshot;
      if (!this.webglInitialized) {
        this.setupShader(snapshot);
        this.webglInitialized = Boolean(this.program);
      } else {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_refs.texture ?? null);
        this.gl.texImage2D(
          this.gl.TEXTURE_2D,
          0,
          this.gl.RGBA,
          this.gl.RGBA,
          this.gl.UNSIGNED_BYTE,
          snapshot,
        );
        this.gl.uniform2f(this.gl_refs.textureSizeLoc ?? null, snapshot.width, snapshot.height);
      }
      this.host.dataset.glassState = this.webglInitialized ? "ready" : "fallback";
      this.host.dataset.glassWidth = String(snapshot.width);
      this.host.dataset.glassLocale = locale;
      this.host.dataset.glassPath = pathname;
      this.queueRender();
    } catch (error) {
      if (!this.disposed) {
        this.host.dataset.glassState = "fallback";
        console.warn("Liquid Glass capture unavailable:", error);
      }
    }
  }

  createProgram(gl: WebGLRenderingContext, vertex: string, fragment: string) {
    this.program = super.createProgram(gl, vertex, fragment);
    return this.program;
  }

  startRenderLoop() {
    // Use the upstream shader; avoid its unremovable anonymous scroll listener.
    this.render = () => {
      const gl = this.gl_refs.gl;
      if (
        !gl ||
        gl.isContextLost() ||
        !this.snapshot ||
        this.disposed ||
        document.hidden ||
        this.host.getBoundingClientRect().height > 128
      )
        return;
      const position = this.getPosition();
      if (position.y + scrollY > this.snapshot.height) {
        this.host.dataset.glassState = "fallback";
        return;
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(this.gl_refs.scrollYLoc ?? null, scrollY);
      gl.uniform2f(this.gl_refs.containerPositionLoc ?? null, position.x, position.y);
      gl.uniform1f(this.gl_refs.borderRadiusLoc ?? null, this.borderRadius);
      gl.uniform1f(this.gl_refs.edgeIntensityLoc ?? null, 0.006);
      gl.uniform1f(this.gl_refs.rimIntensityLoc ?? null, 0.025);
      gl.uniform1f(this.gl_refs.cornerBoostLoc ?? null, 0.008);
      gl.uniform1f(this.gl_refs.rippleEffectLoc ?? null, 0);
      gl.uniform1f(this.gl_refs.blurRadiusLoc ?? null, 3);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      this.host.dataset.glassState = "ready";
    };
    this.queueRender();
  }

  private queueRender = () => {
    if (this.disposed || this.drawTimer || this.frame) return;
    this.drawTimer = window.setTimeout(() => {
      this.drawTimer = 0;
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        this.render?.();
      });
    }, 32);
  };

  dispose() {
    this.disposed = true;
    this.captureVersion++;
    window.clearTimeout(this.captureTimer);
    window.clearTimeout(this.drawTimer);
    cancelAnimationFrame(this.frame);
    this.observer.disconnect();
    this.languageObserver.disconnect();
    window.removeEventListener("scroll", this.queueRender);
    window.removeEventListener("resize", this.queueCapture);
    document.removeEventListener("visibilitychange", this.queueRender);
    this.canvas.removeEventListener("webglcontextlost", this.contextLost);
    if (this.snapshot) {
      this.snapshot.width = 0;
      this.snapshot.height = 0;
    }
    const gl = this.gl;
    if (gl) {
      if (this.gl_refs.texture) gl.deleteTexture(this.gl_refs.texture);
      if (this.gl_refs.positionBuffer) gl.deleteBuffer(this.gl_refs.positionBuffer);
      if (this.gl_refs.texcoordBuffer) gl.deleteBuffer(this.gl_refs.texcoordBuffer);
      if (this.program) gl.deleteProgram(this.program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    this.gl_refs = {};
    Container.instances = Container.instances.filter((instance) => instance !== this);
    this.element.remove();
    this.host.dataset.glassState = "fallback";
  }
}

export function mountLiquidNavigation(host: HTMLElement) {
  const surface = new NavigationGlass(host);
  return () => surface.dispose();
}
