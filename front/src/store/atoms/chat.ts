import { atom } from "jotai";
import { Message, ChatDetails, ChatType } from "@/types/chat";

export const messagesAtom = atom<Message[]>([]);
export const chosenChatDetailsAtom = atom<ChatDetails | null>(null);
export const chatTypeAtom = atom<ChatType>(ChatType.DIRECT);
