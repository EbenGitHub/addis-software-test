import { createSongDto } from "./create-song.dto";

export type updateSongDto = createSongDto & {
    id: string;
};