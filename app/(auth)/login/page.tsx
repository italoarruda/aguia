"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  return (
    <div className="space-y-8">
      <div>
        <span className="text-3xl font-black text-[var(--primary)] tracking-tight">guruja</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[var(--text-1)]">Entrar</h1>
        <p className="text-sm text-[var(--text-2)] mt-1">Acesse sua plataforma de estudos</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Usuário"
          id="username"
          placeholder="Seu nome de usuário"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          autoComplete="username"
        />

        <div className="relative">
          <Input
            label="Senha"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-8 text-[var(--text-3)] hover:text-[var(--text-2)]"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="text-right">
          <Link href="/esqueci-senha" className="text-xs text-[var(--primary)] hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Entrar
        </Button>
      </form>

      <p className="text-sm text-center text-[var(--text-2)]">
        Não tenho conta.{" "}
        <Link href="/cadastro" className="text-[var(--primary)] font-semibold hover:underline">
          Cadastrar
        </Link>
      </p>
    </div>
  );
}
