import { appendFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const storagePath =
  process.env.NOTIFY_STORAGE_PATH ??
  join(process.cwd(), "storage", "notify-signups.ndjson");

type NotifyPayload = {
  email?: unknown;
  source?: unknown;
};

export async function POST(request: Request) {
  let payload: NotifyPayload;

  try {
    payload = (await request.json()) as NotifyPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const source = typeof payload.source === "string" ? payload.source.trim() : "site";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Veuillez renseigner une adresse email valide." },
      { status: 400 }
    );
  }

  const entry = {
    email,
    source,
    createdAt: new Date().toISOString(),
  };

  try {
    await mkdir(dirname(storagePath), { recursive: true });
    await appendFile(storagePath, `${JSON.stringify(entry)}\n`, "utf8");

    return NextResponse.json({
      ok: true,
      message:
        "Merci. Votre demande a bien été enregistrée. Vous serez informé des prochaines dates.",
    });
  } catch (error) {
    console.error("Failed to persist notify signup", error);

    return NextResponse.json(
      { error: "Impossible d'enregistrer votre demande pour le moment." },
      { status: 500 }
    );
  }
}
