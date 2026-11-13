import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";
import "@/components/site/brand-motion.css";
import "@/components/site/home-accessibility.css";
import "@/components/work/work-page.css";

export const Route = createFileRoute("/work")({ component: WorkLayout });

function WorkLayout() {
  const editorial = useRouterState({
    select: (state) => state.location.pathname.replace(/\/$/, "") === "/work",
  });
  return (
    <>
      <SkipLink />
      <Nav floating={editorial} />
      <main
        id="main-content"
        tabIndex={-1}
        className={
          editorial ? "work-page" : "min-h-screen bg-background pt-28 text-foreground sm:pt-36"
        }
      >
        <Outlet />
      </main>
      <HomeFooter dark={editorial} />
    </>
  );
}
