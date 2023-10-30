// from https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f
// credentials inspired by https://github.com/googleapis/google-api-nodejs-client/issues/2986
import { google } from "googleapis";
const sheets = google.sheets("v4");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GCLOUD_CREDENTIALS),
    scopes: SCOPES,
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadSheet({ spreadsheetId, auth }) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

export { getAuthToken, getSpreadSheet, getSpreadSheetValues };
