import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
} from "./googleSheetsService.js";

const sheetName = "2024 form";
const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";
export const GET: RequestHandler = async ({ url }) => {
  try {
    const auth = await getAuthToken();
    const r1 = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: sheetName + "!B1:B400",
      auth,
    });
    const emails = r1.data?.values?.map((m, index) => [
      m[0]?.toLowerCase(),
      index,
    ]);

    const matches = emails?.filter(
      (f) => f[0] === url.searchParams.get("email")?.toLowerCase()
    );
    if (matches?.length > 1) {
      return new Response(
        JSON.stringify({
          error: "Multiple registrations for this email. Contact Jindra.",
        })
      );
    }
    if (matches?.length) {
      const line = matches[0][1] + 1;
      const r2 = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: `${sheetName}!A${line}:Z${line}`,
        auth,
      });

      const r3 = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: `přehled!H1:H31`, // no1-28 a pak 2 party
        auth,
      });

      const r4 = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: `Program party!B1:K2`,
        auth,
      });

      console.log(url.searchParams.get("email"));
      return new Response(
        JSON.stringify({
          data: r2.data.values,
          places: r3.data.values,
          party: r4.data.values,
        })
      );
    }

    return new Response({ message: "No data" });
  } catch (e) {
    console.log(e.message, e.stack);
    return new Response(JSON.stringify({ error: e?.message, stack: e?.stack }));
  }
};
