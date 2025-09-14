"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface AdminAuthResult {
  isAdmin: boolean;
  isModerator: boolean;
  isLoading: boolean;
  user: any;
}

export function useAdminAuth(): AdminAuthResult {
  const { data: session, status } = useSession();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!session?.user?.id) {
        setIsAdmin(false);
        setIsModerator(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/admin/check-role");
        const data = await response.json();
        setIsAdmin(data.isAdmin);
        setIsModerator(data.isModerator);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
        setIsModerator(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      checkAdminStatus();
    } else if (status === "unauthenticated") {
      setIsAdmin(false);
      setIsModerator(false);
      setIsLoading(false);
    }
  }, [session, status]);

  return {
    isAdmin,
    isModerator,
    isLoading: status === "loading" || isLoading,
    user: session?.user,
  };
}
