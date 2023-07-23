export interface Track {
  name: string
  artist: string
  link?: string
}

export interface Playlist {
  name: string
  tracks: Track[]
}

export interface PlaylistService {
  getToken(): Promise<string | null>
  searchPlaylist(query: string): Promise<Playlist | null>
  searchTracks(url: string): Promise<Track[] | null>
}
