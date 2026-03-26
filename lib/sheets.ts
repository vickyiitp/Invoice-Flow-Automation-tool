import { google } from "googleapis";

export async function getSheetData(spreadsheetId: string, range: string) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values;
}
