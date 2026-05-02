"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Logo from "../../../public/logo.png";
import IconCinza from "../../../public/entradaCinza.png";
import IconAzul from "../../../public/entradaAzul.png";
import Layout from "../Layout";
import { useAuth } from "@/src/hook/auth";

const Header = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setOpenUser(false);

    if (openUser) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [openUser]);

  const isActive = (path: string) => pathname === path;

  const baseStylesButtonNav =
    "px-4 py-2 rounded-3xl text-text-primary font-medium text-sm hover:bg-text-primary/10 transition cursor-pointer";

  const handleRedirect = (route: string) => {
    setOpenMenu(false);
    router.push(route);
  };

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");
  };

  return (
    <div className="bg-white border-b border-gray-200 fixed w-full z-40">
      <Layout flex={true}>
        <Link href="/">
          <Image src={Logo} alt="Logo" width={180} />
        </Link>

        <div className="hidden lg:flex xl:w-2/3 justify-between">
          <nav className="flex w-md justify-between">
            <button
              onClick={() => router.push("/")}
              className={`${baseStylesButtonNav} ${
                isActive("/")
                  ? "bg-background-hover text-background-primary font-bold"
                  : ""
              }`}
            >
              Mapa
            </button>
            <button
              onClick={() => router.push("/pedidos")}
              className={`${baseStylesButtonNav} ${
                isActive("/pedidos")
                  ? "bg-background-hover text-background-primary"
                  : ""
              }`}
            >
              Pedidos
            </button>

            <button
              onClick={() => router.push("/voluntarios")}
              className={`${baseStylesButtonNav} ${
                isActive("/voluntarios")
                  ? "bg-background-hover text-background-primary"
                  : ""
              }`}
            >
              Voluntários
            </button>

            <button
              onClick={() => router.push("/abrigos")}
              className={`${baseStylesButtonNav} ${
                isActive("/abrigos")
                  ? "bg-background-hover text-background-primary"
                  : ""
              }`}
            >
              Abrigos
            </button>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenUser(!openUser);
                  }}
                  className="rounded-full p-2 bg-gray-200 border border-text-primary cursor-pointer text-text-primary hover:bg-gray-300 transition"
                >
                  {getInitials(user.name)}
                </button>

                {openUser && (
                  <div className="absolute top-20 bg-white w-52 p-4 flex flex-col items-start gap-4 rounded-b-2xl shadow-lg border border-gray-200 animate-slideDown">
                 
                      <Link
                        href={"/atendimentos"}
                        className="text-text-primary text-sm cursor-pointer hover:text-background-primary"
                      >
                        Minhas solicitações
                      </Link>
              

                     <Link
                        href={"/atendimentos"}
                        className="text-text-primary text-sm cursor-pointer hover:text-background-primary"
                      >
                        Atendimentos
                      </Link>
                    <Link
                      href={"/mensagens"}
                      className="text-text-primary text-sm cursor-pointer hover:text-background-primary"
                    >
                      Mensagens
                    </Link>
                    <div className="h-px w-full bg-gray-200"></div>
                    <button
                      onClick={logout}
                      className="text-background-primary text-sm font-bold cursor-pointer"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => router.push("/entrar")}
                className="group flex items-center gap-2 border border-gray-300 cursor-pointer px-5 py-2 rounded-lg text-text-secondary font-medium hover:text-background-primary hover:border-background-primary hover:bg-background-hover transition"
              >
                <span className="block group-hover:hidden">
                  <Image src={IconCinza} alt="icon" width={14} />
                </span>
                <span className="hidden group-hover:block">
                  <Image src={IconAzul} alt="icon" width={14} />
                </span>
                Entrar
              </button>
            )}

            <button
              onClick={() => router.push("/novo-pedido")}
              className="px-5 py-2 rounded-lg cursor-pointer font-medium bg-[linear-gradient(135deg,#eb1e1e_0%,#f44e25_100%)] text-white shadow-xl/20 hover:scale-102"
            >
              PEDIR AJUDA
            </button>
          </div>
        </div>

        <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden">
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Layout>

      {openMenu && (
        <div
          className={`lg:hidden fixed top-18 left-0 w-full bg-white z-40 px-6 py-4 space-y-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-b-2xl
          ${
            openMenu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }
        `}
        >
          <button
            onClick={() => handleRedirect("/")}
            className="block w-full text-left text-text-primary text-sm"
          >
            Mapa
          </button>
          <button
            onClick={() => handleRedirect("/pedidos")}
            className="block w-full text-left text-text-primary text-sm"
          >
            Pedidos
          </button>

          <button
            onClick={() => handleRedirect("/voluntarios")}
            className="block w-full text-left text-text-primary text-sm"
          >
            Voluntários
          </button>

          <button
            onClick={() => handleRedirect("/abrigos")}
            className="block w-full text-left text-text-primary text-sm"
          >
            Abrigos
          </button>

          <div className="h-px w-full bg-gray-200"></div>
          <div>
            {user ? (
              <div className="flex flex-col items-start gap-3">
                <p className="text-sm text-text-primary">Olá, <span className="text-background-primary font-bold">{user.name}</span></p>
              
                  <button
                   onClick={() => handleRedirect("/atendimentos")}
                    className="text-text-primary text-sm"
                  >
                    Minhas solicitações
                  </button>
             

                <button
                   onClick={() => handleRedirect("/atendimentos")}
                    className="text-text-primary text-sm"
                  >
                    Atendimentos
                  </button>

                <button
                  onClick={() => handleRedirect("/mensagens")}
                  className="text-text-primary text-sm"
                >
                  Mensagens
                </button>

                <button
                  onClick={() => {
                      logout()
                      setOpenMenu(false)
                  }}
                  className="text-background-primary text-sm font-bold"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleRedirect("/entrar")}
                className="w-full border border-gray-300 py-2 rounded-lg"
              >
                Entrar
              </button>
            )}

            <button
              onClick={() => handleRedirect("/novo-pedido")}
              className="w-full mt-3 py-2 rounded-lg text-white bg-[linear-gradient(135deg,#eb1e1e_0%,#f44e25_100%)] "
            >
              PEDIR AJUDA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
