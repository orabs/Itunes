// @flow
export type ContainerState = {
  status: 'init' | 'loading' | 'noContent' | 'error' | '',
  data?: Object
};

export type SearchOption = 'All' | 'Movie' | 'Music';

export type HeaderState = {
  media: SearchOption,
  query: string
};


export type SearchResult = {
  trackId: number,
  trackPrice?: number,
  collectionPrice?: number,
  price?: number,
  trackViewUrl?: string,
  collectionViewUrl?: string,
  artworkUrl100: string,
  trackName?: string,
  collectionName?: string,
  kind: string,
  longDescription?: string,
  description?: string
};
