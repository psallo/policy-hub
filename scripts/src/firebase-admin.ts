import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export function initFirebase() {
  if (getApps().length > 0) return getFirestore();

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!json) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON 환경변수가 없습니다.");

  const serviceAccount = JSON.parse(json);
  initializeApp({ credential: cert(serviceAccount) });
  return getFirestore();
}

export async function isDuplicate(
  db: FirebaseFirestore.Firestore,
  sourceUrl: string
): Promise<boolean> {
  const snap = await db
    .collection("posts")
    .where("sourceUrl", "==", sourceUrl)
    .limit(1)
    .get();
  return !snap.empty;
}
