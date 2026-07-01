export const saveAuth = (token: string, user: unknown) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));

  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
};

export const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");

  document.cookie = "auth_token=; path=/; max-age=0; SameSite=Lax";
};

export const getToken = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("auth_token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const user = localStorage.getItem("auth_user");

    if (!user) return null;

    return JSON.parse(user);
  } catch {
    localStorage.removeItem("auth_user");
    return null;
  }
};
