const SESSION_KEY = "admin_session";
const API_URL_KEY = "admin_api_url";
const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  rol: string;
  telefono?: string | null;
}

interface AdminSession {
  token: string;
  user: AdminUser;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export function getApiUrl(): string {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  try {
    return localStorage.getItem(API_URL_KEY) || DEFAULT_API_URL;
  } catch {
    return DEFAULT_API_URL;
  }
}

export function setApiUrl(url: string) {
  try {
    localStorage.setItem(API_URL_KEY, url.trim() || DEFAULT_API_URL);
  } catch {
    // localStorage no disponible, ignorar
  }
}

export function getSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: AdminSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    // localStorage no disponible, ignorar
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // localStorage no disponible, ignorar
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const session = getSession();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(session ? { Authorization: `Bearer ${session.token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  let res: Response;
  try {
    res = await fetch(`${getApiUrl()}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(
      `No se pudo conectar con el servidor (${getApiUrl()}). Verifica que el backend esté encendido.`,
      0
    );
  }

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    if (res.status === 401) clearSession();
    throw new ApiError(data?.message || `Error inesperado del servidor (${res.status}).`, res.status, data?.errors);
  }

  return data as T;
}

export async function adminLogin(email: string, password: string): Promise<AdminUser> {
  const data = await request<{ user: AdminUser; token: string }>("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (data.user.rol !== "admin") {
    throw new ApiError("Esta cuenta no tiene permisos de administrador.", 403);
  }

  saveSession({ token: data.token, user: data.user });
  return data.user;
}

export async function adminLogout(): Promise<void> {
  try {
    await request("/logout", { method: "POST" });
  } catch {
    // si el backend no responde, igual cerramos sesión localmente
  } finally {
    clearSession();
  }
}

export async function verifyAdminSession(): Promise<AdminUser> {
  const data = await request<AdminUser>("/user");
  if (data.rol !== "admin") {
    clearSession();
    throw new ApiError("Esta cuenta no tiene permisos de administrador.", 403);
  }
  return data;
}

export const adminFetch = request;
