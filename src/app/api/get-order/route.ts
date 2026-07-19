// src/app/api/get-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wa = (searchParams.get("wa") || "").replace(/\D/g, "");

    if (!wa) {
      return NextResponse.json(
        { success: false, error: "Missing wa" },
        { status: 400 }
      );
    }

    const SHEET_ID = process.env.SHEET_ID!;
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!;

    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "transaksi!A:M",
    });

    const rows = result.data.values || [];

    if (rows.length <= 1) {
      return NextResponse.json(
        { success: false, error: "No orders found" },
        { status: 404 }
      );
    }

    // Cari order terakhir berdasarkan nomor WA
    for (let i = rows.length - 1; i >= 1; i--) {
      const row = rows[i];

      const rowWA = String(row[2] || "").replace(/\D/g, "");

      if (rowWA === wa) {
        return NextResponse.json({
          success: true,
          orderId: row[0] || "",
          orderDate: row[1] || "",
          buyerPhone: row[2] || "",
          customer: row[3] || "",
          product: row[4] || "",
          quantity: row[5] || "",
          total: row[6] || "",
          bank: row[7] || "",
          address: row[8] || "",
          status: row[9] || "",
          shippingStatus: row[10] || "",
          resi: row[11] || "",
          pdfUrl: row[12] || "",
        });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Order not found",
      },
      {
        status: 404,
      }
    );
  } catch (err: any) {
    console.error("GET ORDER ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}