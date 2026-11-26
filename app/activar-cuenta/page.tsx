import Link from "next/link";
import { ActivationForm } from "@/app/components/auth/activation-form";
import { AuthBrand } from "@/app/components/auth/auth-brand";

export default function ActivationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF4EC] px-6 py-10 md:p-10">
      <div className="w-full max-w-[440px]">
        <AuthBrand variant="activation" />
        <h1 className="mb-2 font-heading text-[32px] leading-[1.15] font-semibold">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55] text-muted">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar
          la cuenta.
        </p>

        <div className="mb-[22px] flex items-center gap-[14px] rounded-2xl border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px]">
          <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#A9D9E8] font-heading text-[19px] font-semibold text-[#1F7A93]">
            M
          </div>
          <div>
            <div className="text-[13px] text-muted">Te invitaron a seguir a</div>
            <div className="font-heading text-[17px] font-semibold">
              Mateo · Sala Soles
            </div>
          </div>
        </div>

        <ActivationForm />
        <p className="mt-[22px] text-center text-[14.5px] text-muted">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="rounded-sm font-extrabold text-[#C5503A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
