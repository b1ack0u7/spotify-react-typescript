interface ErrorOnFetch {
  success: boolean;
  reason?: string
}

export interface IAlbum extends ErrorOnFetch {
  id: string;
  album_name: string;
  artist: string;
  song_list: string[];
  thumbnail: string;
};

export interface ISong extends ErrorOnFetch {
  album: [
    id: string,
    name: string
  ];
  artist: string;
  name: string;
  order: number;
};