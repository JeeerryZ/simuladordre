import { AvatarContext } from "@/contexts/avatarContext";
import { useContext } from "react";

export default function useAvatar() {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return ctx;
}
