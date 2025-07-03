"use client";
import { FiLogOut } from "react-icons/fi";
import Cookies from "js-cookie";

export default function Logout() {
  function Logout() {
    Cookies.remove("devPizzaToken"); // remove cookie
    return (window.location.href = "/"); // redirecionar para login
  }
  return (
    <FiLogOut
      size={25}
      className="
      cursor-pointer text-red-400
      transition ease-in-out duration-500 hover:scale-110 hover:text-red-500"
      onClick={Logout}
    />
  );
}
