"use client";
import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export default function DefinirContaPage() {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [show, setShow] = useState({ pwd: false, confirm: false });
  const [success, setSuccess] = useState(false);

  const rules = [
    { text: "Com letras e números", ok: /[a-zA-Z]/.test(form.password) && /[0-9]/.test(form.password) },
    { text: "Com letras maiúsculas (A-Z)", ok: /[A-Z]/.test(form.password) },
    { text: "Com o mínimo de 8 caracteres", ok: form.password.length >= 8 },
    { text: "Deve conter MAIÚSC, MINÚSC, números (1,2,3) e especial (!@#)", ok: /[!@#$%^&*]/.test(form.password) },
    { text: "Ambas as senhas devem ser iguais", ok: form.password === form.confirm && form.password.length > 0 },
  ];

  return (
    <>
      <div className="space-y-8">
        <div>
          <span className="text-3xl font-black text-[var(--primary)] tracking-tight">aguia</span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-[var(--text-1)]">Seja bem-vindo à Aguia</h1>
          <p className="text-sm text-[var(--text-2)] mt-1">
            Falta pouco para acessar a plataforma. Defina seu nome de usuário e senha.
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSuccess(true); }}>
          <Input
            label="Nome de usuário"
            id="username"
            placeholder="italorodrygo"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <div className="relative">
            <Input
              label="Nova senha"
              id="password"
              type={show.pwd ? "text" : "password"}
              placeholder="Nova senha"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="button" onClick={() => setShow((s) => ({ ...s, pwd: !s.pwd }))}
              className="absolute right-3 top-8 text-[var(--text-3)]">
              {show.pwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="relative">
            <Input
              label="Confirmar nova senha"
              id="confirm"
              type={show.confirm ? "text" : "password"}
              placeholder="Confirmar nova senha"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            <button type="button" onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
              className="absolute right-3 top-8 text-[var(--text-3)]">
              {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <ul className="space-y-1">
            {rules.map((r) => (
              <li key={r.text} className={`flex items-center gap-2 text-xs ${r.ok ? "text-[var(--primary)]" : "text-[var(--text-3)]"}`}>
                <Check size={12} className={r.ok ? "opacity-100" : "opacity-30"} />
                {r.text}
              </li>
            ))}
          </ul>

          <Button type="submit" className="w-full" size="lg">Confirmar</Button>
        </form>
      </div>

      <Modal open={success} onClose={() => setSuccess(false)} size="sm">
        <div className="text-center space-y-4 py-4">
          <div className="w-14 h-14 rounded-full bg-[var(--primary-muted)] flex items-center justify-center mx-auto">
            <Check size={28} className="text-[var(--primary)]" />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-1)]">Cadastro efetuado com sucesso!</h2>
          <p className="text-sm text-[var(--text-2)]">
            Bem-vindo à Aguia! Foi enviado ao seu e-mail a confirmação de sua inscrição com seu nome de usuário.
          </p>
          <Button className="w-full" onClick={() => setSuccess(false)}>Finalizar</Button>
        </div>
      </Modal>
    </>
  );
}
