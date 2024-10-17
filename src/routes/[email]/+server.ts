import type { RequestHandler } from "../$types";
import { getAuthToken, getSpreadSheetValues } from "../googleSheetsService.js";

const sheetName = "2024 form";
const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";
export const GET: RequestHandler = async ({ url }) => {
  try {
    console.log("running server side route - incorrect!!!:", url.pathname);

    const auth = await getAuthToken();
    const dataEmails = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: sheetName + "!B1:B400",
      auth,
    });
    const emails = dataEmails.data?.values?.map((m, index) => [
      m[0]?.toLowerCase(),
      index,
    ]);

    const urlEmail = url.pathname.slice(1)?.toLowerCase();
    const matches = emails?.filter((f) => f[0] === urlEmail);
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
        sheetName: `2024 přehled!B2:I28`, // nr. 1-25 a pak 2 party
        auth,
      });
      console.log("🚀 ~ constGET:RequestHandler= ~ r3:", r3.data.values);

      const r4 = await getSpreadSheetValues({
        spreadsheetId,
        sheetName: `Program party!A2:E20`,
        auth,
      });
      console.log("🚀 ~ constGET:RequestHandler= ~ r4:", r4.data.values);

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
