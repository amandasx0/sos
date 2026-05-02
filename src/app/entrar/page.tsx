"use client";
import { Suspense } from "react";
import LoginPag from "../../pages/Login";

export default function Login() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginPag />
    </Suspense>
  );
}
