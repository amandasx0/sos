"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserData = {
  name: string;
  email: string;
  tipo: string;
};

type AuthContextType = {
  token: string | null;
  user: UserData | null;
  login: (token: string, user: UserData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });

  const [user, setUser] = useState<UserData | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleExpired = () => {
      setShowModal((prev) => (prev ? prev : true));
    };

    window.addEventListener("auth-expired", handleExpired);

    return () => {
      window.removeEventListener("auth-expired", handleExpired);
    };
  }, []);

  function login(newToken: string, userData: UserData) {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  }

  function logout(redirectToLogin = false) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setShowModal(false);

    if (redirectToLogin) {
      router.push("/entrar");
    } else {
      router.push("/");
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-2">Sessão expirada</h2>

            <p className="text-sm text-gray-500 mb-4">
              Faça login novamente para continuar.
            </p>

            <button
              onClick={() => logout(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition cursor-pointer"
            >
              Ir para login
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
