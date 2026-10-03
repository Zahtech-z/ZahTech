import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { HomeFooter } from "@/components/site/HomeFooter";
import { SkipLink } from "@/components/site/SkipLink";

export const Route = createFileRoute("/work")({ component: WorkLayout });

function WorkLayout() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-background pt-28 text-foreground sm:pt-36"
      >
        <Outlet />
      </main>
      <HomeFooter />
    </>
  );
}
