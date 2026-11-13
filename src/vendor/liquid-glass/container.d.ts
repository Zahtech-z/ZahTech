export type GlassReferences = {
  gl?: WebGLRenderingContext;
  texture?: WebGLTexture;
  positionBuffer?: WebGLBuffer;
  texcoordBuffer?: WebGLBuffer;
  resolutionLoc?: WebGLUniformLocation | null;
  textureSizeLoc?: WebGLUniformLocation | null;
  scrollYLoc?: WebGLUniformLocation | null;
  borderRadiusLoc?: WebGLUniformLocation | null;
  containerPositionLoc?: WebGLUniformLocation | null;
  blurRadiusLoc?: WebGLUniformLocation | null;
  edgeIntensityLoc?: WebGLUniformLocation | null;
  rimIntensityLoc?: WebGLUniformLocation | null;
  cornerBoostLoc?: WebGLUniformLocation | null;
  rippleEffectLoc?: WebGLUniformLocation | null;
};
export class Container {
  static instances: Container[];
  constructor(options?: { type?: string; borderRadius?: number; tintOpacity?: number });
  element: HTMLDivElement;
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext | null;
  gl_refs: GlassReferences;
  borderRadius: number;
  width: number;
  height: number;
  webglInitialized: boolean;
  init(): void;
  createElement(): void;
  setupCanvas(): void;
  updateSizeFromDOM(): void;
  setupShader(image: HTMLCanvasElement): void;
  createProgram(gl: WebGLRenderingContext, vertex: string, fragment: string): WebGLProgram | null;
  getPosition(): { x: number; y: number };
  startRenderLoop(): void;
  render?: () => void;
}
