import Logo from "@/logo/index";
import Link from "next/link";
import Logout from "../logout";

export default function Header() {
  return (
    <header className="h-20  w-full">
      <nav
        className="flex justify-between px-10 items-center h-full 
      max-sm:px-2
      "
      >
        <Link href={"/dashboard"}>
          <Logo />
        </Link>
        <div
          className="flex gap-6 items-center 
        max-sm:gap-3
        "
        >
          <Link href={"/dashboard/category"}>Categoria</Link>
          <Link href={"/dashboard/product"}>Produto</Link>
          <Logout />
        </div>
      </nav>
    </header>
  );
}
