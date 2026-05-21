import { describe, it, expect } from "vitest";

// ─── Email validation ─────────────────────────────────────────────────────────

function validateEmail(email: unknown): boolean {
  if (typeof email !== "string" || email.trim().length === 0) return false;
  // RFC 5322 simplified pattern
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// ─── CPF validation ───────────────────────────────────────────────────────────

function validateCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(digits[10]);
}

function formatCPF(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

// ─── Tests: email ─────────────────────────────────────────────────────────────

describe("validateEmail", () => {
  it("email válido é aceito", () => {
    expect(validateEmail("aluno@escola.edu.br")).toBe(true);
  });

  it("email com subdomínio é válido", () => {
    expect(validateEmail("prof@mail.escola.gov.br")).toBe(true);
  });

  it("email sem @ é inválido", () => {
    expect(validateEmail("semArroba.com")).toBe(false);
  });

  it("email sem domínio é inválido", () => {
    expect(validateEmail("usuario@")).toBe(false);
  });

  it("email sem extensão é inválido", () => {
    expect(validateEmail("usuario@dominio")).toBe(false);
  });

  it("string vazia é inválida", () => {
    expect(validateEmail("")).toBe(false);
  });

  it("null é inválido", () => {
    expect(validateEmail(null)).toBe(false);
  });

  it("undefined é inválido", () => {
    expect(validateEmail(undefined)).toBe(false);
  });

  it("espaços no meio são inválidos", () => {
    expect(validateEmail("user name@domain.com")).toBe(false);
  });
});

// ─── Tests: CPF ───────────────────────────────────────────────────────────────

describe("validateCPF", () => {
  it("CPF válido com pontuação é aceito", () => {
    expect(validateCPF("529.982.247-25")).toBe(true);
  });

  it("CPF válido sem pontuação é aceito", () => {
    expect(validateCPF("52998224725")).toBe(true);
  });

  it("CPF com dígitos repetidos é rejeitado", () => {
    expect(validateCPF("111.111.111-11")).toBe(false);
  });

  it("CPF zeros repetidos é rejeitado", () => {
    expect(validateCPF("000.000.000-00")).toBe(false);
  });

  it("CPF com dígito verificador incorreto é rejeitado", () => {
    expect(validateCPF("529.982.247-26")).toBe(false);
  });

  it("CPF incompleto é rejeitado", () => {
    expect(validateCPF("123.456.789")).toBe(false);
  });

  it("string vazia é rejeitada", () => {
    expect(validateCPF("")).toBe(false);
  });
});

// ─── Tests: formatCPF ─────────────────────────────────────────────────────────

describe("formatCPF", () => {
  it("11 dígitos são formatados como xxx.xxx.xxx-xx", () => {
    expect(formatCPF("52998224725")).toBe("529.982.247-25");
  });

  it("CPF já formatado é mantido", () => {
    expect(formatCPF("529.982.247-25")).toBe("529.982.247-25");
  });

  it("3 dígitos retornam sem separador", () => {
    expect(formatCPF("123")).toBe("123");
  });

  it("6 dígitos retornam com um ponto", () => {
    expect(formatCPF("123456")).toBe("123.456");
  });

  it("dígitos extras são truncados", () => {
    expect(formatCPF("529982247259999")).toBe("529.982.247-25");
  });
});
