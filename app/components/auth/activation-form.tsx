"use client";

import { useRouter } from "next/navigation";
import type { SubmitEvent } from "react";
import { AuthField } from "./auth-field";

export function ActivationForm() {
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
          id="activation-code"
          label="CÓDIGO DE INVITACIÓN"
          type="text"
          defaultValue="7K4P9"
          className="font-heading text-[18px] font-bold tracking-[3px]"
          required
        />
      </div>
      <div className="mb-[18px]">
        <AuthField
          id="activation-email"
          label="EMAIL"
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          required
        />
      </div>
      <div className="mb-[18px]">
        <AuthField
          id="activation-password"
          label="CREAR CONTRASEÑA"
          type="password"
          className="border-[#F2A78E]"
          required
        />
      </div>

      <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#FBF1D6] px-4 py-[14px]">
        <span className="relative mt-px flex size-6 shrink-0 items-center justify-center">
          <input
            id="photo-consent"
            type="checkbox"
            defaultChecked
            className="peer absolute inset-0 size-full cursor-pointer appearance-none rounded-lg border-[1.5px] border-[#8A7234] bg-white checked:border-[#5FB97E] checked:bg-[#5FB97E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none relative hidden peer-checked:block">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="text-[14px] leading-[1.45] text-[#8A7234]">
          Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la
          app.
        </span>
      </label>

      <button
        type="submit"
        className="w-full cursor-pointer rounded-[15px] bg-[linear-gradient(180deg,#F4977E,#EE8164)] p-[15px] text-[16px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Activar mi cuenta
      </button>
    </form>
  );
}
