// src/app/api/private_access_tokens/route.ts
import { NextRequest } from "next/server";

const INTERNAL_ACCESS_TOKEN = process.env.INTERNAL_ACCESS_TOKEN || "dev-test";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const auth = req.headers.get("Authorization");

  if (!id) {
    return Response.json({ error: "missing_id" }, { status: 400 });
  }

  if (!auth || auth !== `Bearer ${INTERNAL_ACCESS_TOKEN}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  return Response.json({
    ok: true,
    id,
    token: `private_token_for_${id}`,
  });
}

