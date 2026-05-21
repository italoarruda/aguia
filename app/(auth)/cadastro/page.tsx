"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cpfMask } from "@/lib/utils";

export default function CadastroPage() {
  const [form, setForm] = useState({ name: "", email: "", cpf: "" });

  return (
    <div className="space-y-8">
      <div>
        <span className="text-3xl font-black text-[var(--primary)] tracking-tight">aguia</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)]">Criar conta</h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Insira seus dados para criar sua conta</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Nome completo"
          id="name"
          placeholder="Nome completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="E-mail"
          id="email"
          type="email"
          placeholder="usuario@exemplo.com.br"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="CPF"
          id="cpf"
          placeholder="000.000.000-00"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: cpfMask(e.target.value) })}
          maxLength={14}
        />

        <Button type="submit" className="w-full" size="lg">
          Continuar
        </Button>
      </form>

      <p className="text-sm text-center text-[var(--text-2)]">
        Já tenho conta.{" "}
        <Link href="/login" className="text-[var(--primary)] font-semibold hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  );
}
