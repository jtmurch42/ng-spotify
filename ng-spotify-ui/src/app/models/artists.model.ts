export interface Artists {
  artists: ArtistData;
}

export interface ArtistData {
  href: string;
  items: ArtistItems[];
  limit: number;
  next: number;
  offset: number;
  previous: number;
  total: number;
}

interface ArtistItems {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ArtistImages[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface ArtistImages {
  height: number;
  url: string;
  width: number;
}
