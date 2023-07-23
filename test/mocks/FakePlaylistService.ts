import {
  Playlist,
  PlaylistService,
  Track,
} from '1-domain/services/PlaylistService'

export const PLAYLIST_RESULT = {
  name: 'IPARTY',
  tracks: [
    {
      name: 'Lua de Cristal',
      artist: 'Xuxa',
      link: 'https: //open.spotify.com/artist/21451j1KhjAiaYKflxBjr1',
    },
    {
      name: 'Vogue',
      artist: 'Madonna',
      link: 'https: //open.spotify.com/artist/21451j1Khj123YKflxBjr1',
    },
  ],
}

export class FakePlaylistService implements PlaylistService {
  constructor(private playlist: Playlist | null = null) {}
  searchTracks(url: string): Promise<Track[] | null> {
    throw Promise.resolve([])
  }

  getToken(): Promise<string | null> {
    return Promise.resolve('fake-token')
  }

  searchPlaylist(query: string): Promise<Playlist | null> {
    return Promise.resolve(this.playlist)
  }
}
