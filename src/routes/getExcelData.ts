import { getAuthToken, getSpreadSheetValues } from "./googleSheetsService.js";

const spreadsheetId = "1Hd_edu1c_6J_KkMzW3hrQpLKKVqPWKO-LMo6H9C8RgY";

const transposeArrays = (arr) => {
  return arr[0].map((col, i) => arr.map((row) => row[i]));
};

export const ownData = (email: string, registrationData) => {
  const matchIndex = registrationData.findIndex((f) => f[1] === email);
  if (matchIndex === -1) return { error: "No registration found" };
  return { data: registrationData[matchIndex].slice(4) };
};

export const getData = async () => {
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

    const partyData = transposeArrays(partySheet.data?.values);
    const registrationData = dataEmails.data?.values;
    const courseData = courseSheet.data?.values;

    console.log(
      "GS: data fetched in",
      (Date.now() - startTimestamp) / 1000,
      "s"
    );

    return { registrationData, courseData, partyData };
  } catch (e) {
    console.log("GS: catch block!!");
    console.log(e.message, e.stack);
    return new Response(JSON.stringify({ error: e?.message, stack: e?.stack }));
  }
};
