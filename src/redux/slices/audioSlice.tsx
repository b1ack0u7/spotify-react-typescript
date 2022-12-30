import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAudio } from "../../interfaces/interfaces";

const initialState: IAudio = {
  id: '',
  album: {
    id: '',
    name: ''
  },
  audio_file: null,
  artist_name: '',
  name: '',
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
      console.log("🚀 ~ file: audioSlice.tsx:34 ~ action", action)

      // state.audio_file.play();
    },
    stopCurrentSong: (state) => {
      state.audio_file.stop();
    }
  }
});

export const {
  setCurrentSong,
  stopCurrentSong,
} = audioSlice.actions;