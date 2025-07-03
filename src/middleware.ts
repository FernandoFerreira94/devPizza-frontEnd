// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "./service/api";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Define rotas públicas
  const publicPaths = ["/", "/signup"];

  // Ignora rotas públicas e arquivos internos
  if (pathname.startsWith("/_next") || publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Pega o token corretamente
  const token = req.cookies.get("devPizzaToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // validando token
  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// funcção para validar o token
async function validateToken(token: string) {
  if (!token) return false;

  try {
    await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
