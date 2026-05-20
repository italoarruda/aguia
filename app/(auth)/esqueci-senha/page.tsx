"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EsqueciSenhaPage() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <span className="text-3xl font-black text-[var(--primary)] tracking-tight">guruja</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)]">Recuperar senha</h1>
        <p className="text-sm text-[var(--text-2)] mt-2 leading-relaxed">
          Digite seu nome de usuário OU e-mail e enviaremos um e-mail com instruções para você redefinir sua senha.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          id="credential"
          placeholder="Digite seu nome de usuário ou e-mail"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="secondary" type="button" className="flex-1">Voltar</Button>
          </Link>
          <Button type="submit" className="flex-1">Recuperar senha</Button>
        </div>
      </form>
    </div>
  );
}
