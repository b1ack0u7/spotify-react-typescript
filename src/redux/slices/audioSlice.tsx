import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAudio } from "../../interfaces/interfaces";

const initialState: IAudio = {
  id: undefined,
  album: {
    id: undefined,
    name: undefined
  },
  audio_file: undefined,
  artist_name: undefined,
  name: undefined,
  order: 0
};

export const audioSlice = createSlice({
  name: 'audioInstance',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<IAudio>) => {
      state.id = action.payload.id,
      state.album = action.payload.album,
      state.audio_file = action.payload.audio_file,
      state.artist_name = action.payload.artist_name,
      state.name = action.payload.name,
      state.order = action.payload.order
    },
  }
});

export const {
  setCurrentSong,
} = audioSlice.actions;