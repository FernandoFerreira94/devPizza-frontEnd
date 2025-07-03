import { cookies } from "next/headers";

export async function getCookiesServer() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("devPizzaToken")?.value;
  return token || null;
}
