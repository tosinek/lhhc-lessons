import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  console.log("running server side route:", {
    href: event.url?.href,
    sp: event.url?.searchParams,
    rdSize: registrationData?.length,
  });
  dataRefresh(); // tady bych necekal (await) protoze to brzdi a pro vetsinu lidi budou fresh data
  const response = await resolve(event);
  return response;
};

setInterval(() => {
  console.log("GS: size:", registrationData?.length);
}, 1000 * 60 * 2);

import {
  getAuthToken,
  getSpreadSheetValues,
} from "./routes/googleSheetsService.js";

let lastUpdate = 0;
let registrationData = [];
export let courseData = [];
export let partyData = [];
export const ownData = (email: string) => {
  const matchIndex = registrationData.findIndex((f) => f[1] === email);
  if (matchIndex === -1) return { error: "No registration found" };
  return { data: registrationData[matchIndex].slice(4) };
};
export let registrationDataLength = 0;

const transposeArrays = (arr) => {
  return arr[0].map((col, i) => arr.map((row) => row[i]));
};

const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";
export const dataRefresh = async (bypassTimer: boolean = false) => {
  if (!bypassTimer && Date.now() - lastUpdate < 60 * 1000) {
    // console.log(
    //   "GS: data already refreshed",
    //   (Date.now() - lastUpdate) / 1000,
    //   "s ago"
    // );
    return;
  }
  lastUpdate = Date.now();

  try {
    const startTimestamp = Date.now();
    const auth = await getAuthToken();
    const dataEmails = await getSpreadSheetValues({
      spreadsheetId,
      sheetName: "2024 form!A1:Z400",
      auth,
    });
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

    partyData = transposeArrays(partySheet.data?.values);
    registrationData = dataEmails.data?.values;
    courseData = courseSheet.data?.values;

    console.log(
      "GS: data refreshed in",
      (Date.now() - startTimestamp) / 1000,
      "s"
    );

    return { success: true, data: { registrations: registrationData?.length } };
  } catch (e) {
    console.log("GS: catch block!!");
    console.log(e.message, e.stack);
    return new Response(JSON.stringify({ error: e?.message, stack: e?.stack }));
  }
};
