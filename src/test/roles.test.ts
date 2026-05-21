import { describe, it, expect } from "vitest";

// ─── Role types & validation ──────────────────────────────────────────────────

type UserRole = "aluno" | "professor" | "admin";

const VALID_ROLES: UserRole[] = ["aluno", "professor", "admin"];

function validateRole(role: unknown): role is UserRole {
  return typeof role === "string" && VALID_ROLES.includes(role as UserRole);
}

function hasAdminAccess(role: UserRole): boolean {
  return role === "admin";
}

function hasProfessorAccess(role: UserRole): boolean {
  return role === "professor" || role === "admin";
}

function hasStudentAccess(role: UserRole): boolean {
  return VALID_ROLES.includes(role);
}

// ─── Tests: validateRole ──────────────────────────────────────────────────────

describe("validateRole", () => {
  it("'aluno' é um papel válido", () => {
    expect(validateRole("aluno")).toBe(true);
  });

  it("'professor' é um papel válido", () => {
    expect(validateRole("professor")).toBe(true);
  });

  it("'admin' é um papel válido", () => {
    expect(validateRole("admin")).toBe(true);
  });

  it("'superuser' não é um papel válido", () => {
    expect(validateRole("superuser")).toBe(false);
  });

  it("string vazia não é válida", () => {
    expect(validateRole("")).toBe(false);
  });

  it("null não é válido", () => {
    expect(validateRole(null)).toBe(false);
  });

  it("undefined não é válido", () => {
    expect(validateRole(undefined)).toBe(false);
  });

  it("número não é válido", () => {
    expect(validateRole(1)).toBe(false);
  });

  it("'ADMIN' em maiúsculas não é válido (case-sensitive)", () => {
    expect(validateRole("ADMIN")).toBe(false);
  });
});

// ─── Tests: access control ────────────────────────────────────────────────────

describe("hasAdminAccess", () => {
  it("admin tem acesso de admin", () => {
    expect(hasAdminAccess("admin")).toBe(true);
  });

  it("professor não tem acesso de admin", () => {
    expect(hasAdminAccess("professor")).toBe(false);
  });

  it("aluno não tem acesso de admin", () => {
    expect(hasAdminAccess("aluno")).toBe(false);
  });
});

describe("hasProfessorAccess", () => {
  it("professor tem acesso de professor", () => {
    expect(hasProfessorAccess("professor")).toBe(true);
  });

  it("admin também tem acesso de professor", () => {
    expect(hasProfessorAccess("admin")).toBe(true);
  });

  it("aluno não tem acesso de professor", () => {
    expect(hasProfessorAccess("aluno")).toBe(false);
  });
});

describe("hasStudentAccess", () => {
  it("todos os papéis têm acesso de aluno", () => {
    expect(hasStudentAccess("aluno")).toBe(true);
    expect(hasStudentAccess("professor")).toBe(true);
    expect(hasStudentAccess("admin")).toBe(true);
  });
});
