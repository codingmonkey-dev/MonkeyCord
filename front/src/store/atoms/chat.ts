import { atom } from "jotai";
import { ChatDetails, Message, ChatType } from "@/types/chat";

export const chosenChatDetailsAtom = atom<ChatDetails | null>(null);
export const chatTypeAtom = atom<ChatType | null>(null);
export const messagesAtom = atom<Message[]>([]);
