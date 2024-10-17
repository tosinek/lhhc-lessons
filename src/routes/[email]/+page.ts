import { emailStore } from "../store";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  // on every page load, set client store to remember the email
  // if none (not going via a link), it will ask for one on the page "/"
  emailStore.set(params.email);

  return {
    email: params.email,
  };
};
