import { FeedIcon } from "@/app/components/feed/feed-icons";

type AuthBrandProps = {
  variant: "login" | "activation";
};

export function AuthBrand({ variant }: AuthBrandProps) {
  if (variant === "activation") {
    return (
      <div className="mb-[22px] flex size-[58px] items-center justify-center rounded-[18px] bg-[linear-gradient(155deg,#F8C3A8,#F2937A)] text-white shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)]">
        <FeedIcon name="sun" size={30} strokeWidth={2.2} />
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-[13px] text-white">
      <div className="flex size-[46px] shrink-0 items-center justify-center rounded-[14px] bg-white/22">
        <FeedIcon name="sun" size={26} strokeWidth={2.2} />
      </div>
      <span className="font-heading text-[21px] font-semibold tracking-[0.5px]">
        OpenDayCare
      </span>
    </div>
  );
}
