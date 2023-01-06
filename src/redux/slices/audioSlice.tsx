import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAudio } from "../../interfaces/interfaces";

const initialState: IAudio = {
  id: undefined,
  album: {
    id: undefined,
    name: undefined
  },
  artist_name: undefined,
  isLoading: false,
  isPlaying: false,
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
      state.artist_name = action.payload.artist_name,
      state.name = action.payload.name,
      state.order = action.payload.order
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload
    },
  }
});

export const {
  setCurrentSong,
  setIsLoading,
  setIsPlaying,
} = audioSlice.actions;