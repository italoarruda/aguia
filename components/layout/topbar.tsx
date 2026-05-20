"use client";
import { Bell, Sun, Moon, Link } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Timer } from "./timer";
import { useTheme } from "./theme-provider";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  userName?: string;
  userAvatar?: string | null;
}

export function Topbar({ userName = "Italo", userAvatar }: TopbarProps) {
  const { theme, toggle } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-4 border-b border-[var(--border)] bg-[var(--surface)] z-20">
      <Timer />

      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="p-1.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)] transition-colors"
          title={theme === "dark" ? "Modo claro" : "Modo escuro"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Link / share */}
        <button className="p-1.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)] transition-colors">
          <Link size={16} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((p) => !p)}
            className="p-1.5 rounded-lg text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface-2)] transition-colors"
          >
            <Bell size={16} />
          </button>
          {notifOpen && (
            <div className={cn(
              "absolute right-0 top-9 w-72 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xl p-4 z-50"
            )}>
              <p className="text-sm text-[var(--text-2)] text-center py-2">
                Não possui nenhuma notificação.
              </p>
            </div>
          )}
        </div>

        {/* Avatar */}
        <Avatar src={userAvatar} name={userName} size="sm" ring />
      </div>
    </header>
  );
}
