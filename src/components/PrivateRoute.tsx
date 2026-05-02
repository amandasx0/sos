"use client";

import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useRouter } from "next/navigation";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext deve ser usado dentro do Provider");
  }
  
  const { token } = context;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) return null;

  return <>{children}</>;
}
