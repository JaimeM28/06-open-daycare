"use client";

import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";
import { AuthField } from "./auth-field";

export function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mb-[18px]">
        <AuthField
          id="login-email"
          label="EMAIL"
          type="email"
          defaultValue="caro@opendaycare.com"
          required
        />
      </div>
      <div className="mb-2.5">
        <AuthField
          id="login-password"
          label="CONTRASEÑA"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      <div className="mb-5 text-right">
        <button type="button" disabled className="cursor-default text-[13.5px] font-bold text-[#C5503A]">
          ¿Olvidaste tu contraseña?
        </button>
      </div>
      <button
        type="submit"
        className="w-full cursor-pointer rounded-[15px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-[15px] text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
