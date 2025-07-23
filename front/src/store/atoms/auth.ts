import { atom } from "jotai";
import { User } from "@/types/auth";

export const userAtom = atom<User | null>(null);

export const isAuthenticatedAtom = atom((get) => {
  const user = get(userAtom);
  return !!user;
});
