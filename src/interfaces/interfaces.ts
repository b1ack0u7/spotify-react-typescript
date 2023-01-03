interface ErrorOnFetch {
  success?: boolean;
  reason?: string
}

export interface IArtist extends ErrorOnFetch {
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
  audio_file?: string;
};