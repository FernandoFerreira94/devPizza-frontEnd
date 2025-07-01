"use client";
import { CiPizza } from "react-icons/ci";

interface LogoProps {
  textSize?: string;
  iconsSize?: number;
}

export default function Logo({
  textSize = "text-2xl",
  iconsSize = 40,
}: LogoProps) {
  return (
    <div className={`${textSize}`}>
      <span className="text-white font-bold">Dev</span>
      <span className="text-red-600">Pizza</span>
      <CiPizza size={iconsSize} color="white" className="inline mb-2" />
    </div>
  );
}
