import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/work/matchwise")({
  beforeLoad: () => {
    throw redirect({ to: "/work/onzscore", statusCode: 301 });
  },
});
