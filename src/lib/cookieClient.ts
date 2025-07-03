import { getCookie } from "cookies-next";

export function getCookiesClient() {
  const token = getCookie("devPizzaToken");
  return token || null;
}
