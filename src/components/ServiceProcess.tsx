
import { ClientOnly } from "@/components/ClientOnly";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import discover from "@/assets/process/discover.json";
import plan from "@/assets/process/plan.json";
import build from "@/assets/process/build.json";
import scale from "@/assets/process/scale.json";

const AnimatedIcon = lazy(() => import("./ProcessLordIcon"));
const steps = [
  { icon: Compass_placeholder_removed: true } as never,
];
