// src/share-folder.js
import { google } from "googleapis";

const serviceAccount = {
  client_email: "invoice-uploader@solid-brand.iam.gserviceaccount.com",
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

const folderId = "1ppA5f29OWKwnO9Q0atQQJtMViF3IyUpq"; 
async function shareFolder() {
  try {
    await drive.permissions.create({
      fileId: folderId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: "invoice-uploader@solid-brand.iam.gserviceaccount.com",
      },
    });
    console.log("✅ Folder shared via API!");
  } catch (err) {
    console.error("❌ Gagal share folder:", err);
  }
}

shareFolder();
