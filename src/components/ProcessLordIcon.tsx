
import { LordIcon, type LordIconProps } from "@lordicon/react";

export default function ProcessLordIcon({ icon, active }: { icon: object; active: boolean }) {
  return (
    <LordIcon
      icon={icon as NonNullable<LordIconProps["icon"]>}
      {...(active ? { trigger: "loop(600)" } : { trigger: "hover" })}
      currentColor
      className="process-lord-icon"
      aria-hidden="true"
    />
  );
}
