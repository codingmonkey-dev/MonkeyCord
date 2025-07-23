import { atom } from "jotai";
import { ActiveRoom, RoomDetails } from "@/types/room";

export const isUserInRoomAtom = atom<boolean>(false);
export const isUserRoomCreatorAtom = atom<boolean>(false);
export const roomDetailsAtom = atom<RoomDetails | null>(null);
export const activeRoomsAtom = atom<ActiveRoom[]>([]);
export const localStreamAtom = atom<MediaStream | null>(null);
export const remoteStreamsAtom = atom<MediaStream[]>([]);
export const audioOnlyAtom = atom<boolean>(false);
export const screenSharingStreamAtom = atom<MediaStream | null>(null);
export const isScreenSharingActiveAtom = atom<boolean>(false);
