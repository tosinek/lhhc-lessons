import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
} from "./googleSheetsService.js";

const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";
export const GET: RequestHandler = async ({ url }) => {
  try {
    const auth = await getAuthToken();
    const r1 = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: "Odpovědi formuláře 1!B1:B400",
      auth,
    });
    const emails = r1.data?.values?.map((m, index) => [m[0], index]);
    const matches = emails?.filter(
      (f) => f[0] === url.searchParams.get("email")
    );
    if (matches?.length) {
      const line = matches[0][1] + 1;
      const r2 = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: `Odpovědi formuláře 1!A${line}:Z${line}`,
        auth,
      });
      console.log(
        "🚀 ~ file: +page.server.ts ~ line 32 ~ load: ~ r2",
        r2.data.values
      );
      // return new Response(String(random));
      return new Response(JSON.stringify(r2.data.values));
    }
  } catch (error) {
    return new Response("error");
    // console.log(error.message, error.stack);
  }
};
