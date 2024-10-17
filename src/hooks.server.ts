import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  dataRefresh();
  const response = await resolve(event);
  return response;
};

import {
  getAuthToken,
  getSpreadSheetValues,
} from "./routes/googleSheetsService.js";

let registrationData = [];
export let courseData = [];
export let partyData = [];
export const ownData = (email: string) => {
  const matchIndex = registrationData.findIndex((f) => f[1] === email);
  if (matchIndex === -1) return { error: "No registration found" };
  return { data: registrationData[matchIndex].slice(4) };
};

const sheetName = "2024 form";
const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";
const dataRefresh = async () => {
  try {
    const startTimestamp = Date.now();
    const auth = await getAuthToken();
    const dataEmails = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: sheetName + "!A1:Z400",
      auth,
    });
    // const emails = dataEmails.data?.values?.map((m, index) => [
    //   m[0]?.toLowerCase(),
    //   index,
    // ]);

    const courseSheet = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: `2024 přehled!B2:J28`, // nr. 1-25 a pak 2 party
      // sloupce 1-8:  name, leader, follows, total, diff, room, room nick, leader info, follow info
      auth,
    });

    const partySheet = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: `Program party!A2:E20`,
      auth,
    });

    const transposeArrays = (arr) => {
      return arr[0].map((col, i) => arr.map((row) => row[i]));
    };

    partyData = transposeArrays(partySheet.data?.values);
    registrationData = dataEmails.data?.values;
    courseData = courseSheet.data?.values;

    console.log("data refreshed in", Date.now() - startTimestamp, "ms");
  } catch (e) {
    console.log(e.message, e.stack);
    return new Response(JSON.stringify({ error: e?.message, stack: e?.stack }));
  }
};

dataRefresh();
