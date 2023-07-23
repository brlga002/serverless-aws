import axios from 'axios'
import { injectable } from 'inversify'

import {
  Playlist,
  PlaylistService,
  Track,
} from '1-domain/services/PlaylistService'

interface TracksResponse {
  items: {
    track: {
      name: string
      artists: {
        name: string
        external_urls: {
          spotify: string
        }
      }[]
    }
  }[]
}

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

@injectable()
export class SpotifyPlaylistService implements PlaylistService {
  private token: string | null = null

  async getToken(): Promise<string | null> {
    if (this.token) return this.token

    const credentials = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    const encodedCredentials = Buffer.from(credentials).toString('base64')

    const url = 'https://accounts.spotify.com/api/token'
    const data = 'grant_type=client_credentials'

    const response = await axios.post<TokenResponse>(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
    })

    this.token = response.data.access_token
    return this.token
  }

  async searchPlaylist(query: string): Promise<Playlist | null> {
    const token = await this.getToken()

    const url = 'https://api.spotify.com/v1/search'
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { q: query, type: 'playlist', limit: 1 },
    })

    if (!response.data) return null

    if (response.data?.playlists?.items?.length > 0) {
      const playlist = response.data.playlists.items[0]

      const tracks = await this.searchTracks(playlist.tracks.href)

      if (!tracks) return null

      return {
        name: playlist.name,
        tracks,
      }
    }

    return null
  }

  async searchTracks(url: string): Promise<Track[] | null> {
    const token = await this.getToken()

    const response = await axios.get<TracksResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { limit: 5 },
    })

    if (!response.data) return null

    const tracks = response.data.items.map((item) => {
      const name = item.track.name
      const artist = item.track.artists[0].name
      const link = item.track.artists[0].external_urls.spotify

      return {
        name,
        artist,
        link,
      }
    })

    return tracks
  }
}
