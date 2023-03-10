interface ErrorOnFetch {
  success?: boolean;
  reason?: string
}

export interface IArtist extends ErrorOnFetch {
  id: string;
  name: string;
  picture: string;
}

export interface IAlbum extends ErrorOnFetch {
  id: string;
  album_name: string;
  artist: {
    id: string;
    name: string;
  };
  isActive: boolean;
  isMix: boolean;
  song_list: string[];
  thumbnail: string;
};

export interface ISong extends ErrorOnFetch {
  id?: string;
  album: {
    id?: string;
    name?: string;
  };
  artist_name?: string;
  name?: string;
  order: number;
};

export interface IAudio extends ISong {
  isPlaying: boolean;
  isLoading: boolean;
};