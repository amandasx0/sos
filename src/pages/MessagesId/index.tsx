"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Layout from "@/src/components/Layout";
import api from "@/src/services/api";

type Message = {
  id: number;
  mensagem: string;
  tipo: "voluntario" | "afetado";
  criado_em: string;
  usuario_nome: string;
};

const MessagesIdPage = () => {
  const params = useParams();
  const pedidoId = params?.pedidoId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/orders/${pedidoId}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!pedidoId) return;

    const delay = setTimeout(() => {
      fetchMessages();
    }, 500);

    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      await api.post(`/orders/${pedidoId}/messages`, {
        mensagem: text,
      });

      setText("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout content={true}>
      <Link
        href={"/mensagens"}
        className="text-sm text-background-primary font-bold hover:text-background-primary/70"
      >
        Voltar
      </Link>
      <div className="flex justify-center mt-4">
        <div className="lg:w-1/2 flex flex-col rounded-3xl h-145 bg-gray-100">
          <div className="bg-white border-b px-4 py-3 font-semibold shadow-sm rounded-t-3xl">
            Chat do pedido #{pedidoId}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isMe = msg.tipo === "voluntario";

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow
                        ${
                          isMe
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none"
                        }
                        `}
                  >
                    <p>{msg.mensagem}</p>

                    <span className="text-[10px] opacity-70 mt-1 block text-right">
                      {msg.criado_em}
                    </span>
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </div>

          <div className="bg-white border-t p-3 flex gap-2 items-center rounded-b-3xl">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesIdPage;
