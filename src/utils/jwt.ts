const JWT_REFRESH_AT = 'jwt-refresh-at';
const JWT_EXPIRES_AT = 'jwt-expires-at';
const JWT_ACCESS_TOKEN = 'jwt-access-token';
const JWT_REFRESH_TOKEN = 'jwt-refresh-token';


export const sessionClear = (): void => sessionStorage.clear();

export function getRefreshAt(): number {
  const refreshAt = sessionStorage.getItem(JWT_REFRESH_AT);
  return refreshAt ? Number(refreshAt) : 0;
}

export function setRefreshAt(refreshAt?: number): void {
  if (refreshAt) {
    sessionStorage.setItem(JWT_REFRESH_AT, String(refreshAt));
  } else {
    sessionStorage.removeItem(JWT_REFRESH_AT);
  }
}

export function getExpiresAt(): number {
  const expiresAt = sessionStorage.getItem(JWT_EXPIRES_AT);
  return expiresAt ? Number(expiresAt) : 0;
}

export function setExpiresAt(expiresIn?: number): void {
  if (expiresIn) {
    sessionStorage.setItem(JWT_EXPIRES_AT, String(new Date().getTime() + expiresIn * 1000));
  } else {
    sessionStorage.removeItem(JWT_EXPIRES_AT);
  }
}

export function getAccessToken(): string | null {
  return sessionStorage.getItem(JWT_ACCESS_TOKEN);
}

export function setAccessToken(accessToken?: string): void {
  if (accessToken) {
    sessionStorage.setItem(JWT_ACCESS_TOKEN, accessToken);
  } else {
    sessionStorage.removeItem(JWT_ACCESS_TOKEN);
  }
}

export function getRefreshToken(): string | null {
  return sessionStorage.getItem(JWT_REFRESH_TOKEN);
}

export function setRefreshToken(refreshToken?: string): void {
  if (refreshToken) {
    sessionStorage.setItem(JWT_REFRESH_TOKEN, refreshToken);
  } else {
    sessionStorage.removeItem(JWT_REFRESH_TOKEN);
  }
}
