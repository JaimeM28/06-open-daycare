import { AuthBrand } from "@/app/components/auth/auth-brand";
import { LoginForm } from "@/app/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr] bg-[#FBF4EC] md:grid-cols-[1.05fr_1fr] md:grid-rows-1">
      <section className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#F6A98E_0%,#F2937A_45%,#EC7E62_100%)] px-6 py-6 text-white md:px-[60px] md:py-14">
        <div aria-hidden="true" className="absolute -top-[140px] -right-[120px] size-[420px] rounded-full bg-white/12" />
        <div aria-hidden="true" className="absolute -bottom-[110px] -left-20 size-[300px] rounded-full bg-white/10" />
        <AuthBrand variant="login" />
        <div className="relative hidden md:block">
          <h1 className="mb-[18px] font-heading text-[42px] leading-[1.12] font-semibold">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="max-w-[430px] text-[17px] leading-[1.6] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>
        <div className="relative hidden text-[14px] text-white/90 md:block">
          🌿 Guardería Sala Soles
        </div>
      </section>

      <section aria-labelledby="login-heading" className="flex items-center justify-center px-6 py-10 md:p-10">
        <div className="w-full max-w-[392px]">
          <h2 id="login-heading" className="mb-1.5 font-heading text-[30px] font-semibold">
            Iniciar sesión
          </h2>
          <p className="mb-7 text-[15px] text-muted">
            Ingresá para ver el día de hoy.
          </p>
          <LoginForm />
          <p className="mt-6 text-center text-[14.5px] text-muted">
            ¿Te invitó la guardería?{" "}
            <span className="font-extrabold text-[#C5503A]">Activá tu cuenta</span>
          </p>
        </div>
      </section>
    </main>
  );
}
