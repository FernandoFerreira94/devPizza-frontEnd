"use client";

import Logo from "@/components/logo";
import useUser from "../../hooks/usePrivateRoute";

export default function Dashboard() {
  const user = useUser();

  if (!user) {
    return (
      <main className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Logo textSize="text-4xl" iconsSize={60} />
          <div className="custom-loader"></div>
        </div>
      </main>
    );
  }
  return <h1>Heelo</h1>;
}
