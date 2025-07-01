"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserProps {
  id: string;
  name: string;
  email: string;
  created_at: string;
  update_at: string;
}

export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("devPizza Token");

      if (!token) {
        return router.push("/login");
      }

      try {
        const response = await axios.get("http://localhost:3333/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [router]);

  return user;
}
