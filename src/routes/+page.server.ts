import { goto } from "$app/navigation";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email");
    goto("/" + email);
  },
} satisfies Actions;
