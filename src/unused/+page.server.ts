import type { PageLoad } from "../routes/[email]/$types";
export const load: PageLoad = async ({ params }) => {
  // try {
  //   const auth = await getAuthToken();
  //   const r1 = await getSpreadSheetValues({
  //     spreadsheetId,
  //     sheetName: "Odpovědi formuláře 1!B1:B400",
  //     auth,
  //   });
  //   const emails = r1.data?.values?.map((m, index) => [m[0], index]);
  //   const matches = emails?.filter((f) => f[0] === params.email);
  //   if (matches?.length) {
  //     const line = matches[0][1] + 1;
  //     const r2 = await getSpreadSheetValues({
  //       spreadsheetId,
  //       sheetName: `Odpovědi formuláře 1!A${line}:Z${line}`,
  //       auth,
  //     });
  //     console.log(
  //       "🚀 ~ file: +page.server.ts ~ line 32 ~ load: ~ r2",
  //       r2.data.values
  //     );
  //     return {
  //       courses: r2.data.values,
  //     };
  //   }
  // } catch (error) {
  //   console.log(error.message, error.stack);
  // }
};

import {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
} from "../routes/googleSheetsService.js";

const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";
// const sheetName = "Emaily!B1:B5";

async function testGetSpreadSheet() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
      spreadsheetId,
      auth,
    });
    console.log(
      "output for getSpreadSheet"
      // JSON.stringify(response.data, null, 2)
    );
  } catch (error) {
    console.log(error.message, error.stack);
  }
}

// async function testGetSpreadSheetValues() {
//   try {
//     const auth = await getAuthToken();
//     const response = await getSpreadSheetValues({
//       spreadsheetId,
//       sheetName,
//       auth,
//     });
//     console.log(
//       "output for getSpreadSheetValues",
//       JSON.stringify(response.data, null, 2)
//     );
//   } catch (error) {
//     console.log(error.message, error.stack);
//   }
// }

// testGetSpreadSheet();
// testGetSpreadSheetValues();
