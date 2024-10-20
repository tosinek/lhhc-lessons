import { courseData, dataRefresh } from "../../hooks.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  return {
    courses: courseData?.length,
  };
};

import type { Actions } from "./$types";

export const actions = {
  default: async (event) => {
    console.log("running server side route:", event);
    try {
      const x = await dataRefresh(true);
      return x;
    } catch (e) {
      return new Response(e.message);
    }
  },
} satisfies Actions;
