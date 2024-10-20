import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, params }) => {
  // todo redirect when ?email= is not present
  console.log("running server side route - incorrect!!!:", url.pathname);
  console.log({ url, params });
  return new Response("invalid routing");
};
