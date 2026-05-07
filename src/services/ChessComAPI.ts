import axios from 'axios';

export interface Game {
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  pgn: string;
  time_control: string;
  end_time: number;
}

export class ChessComAPI {
  private readonly BASE_URL = 'https://api.chess.com/pub';

  async fetchUserGames(username: string): Promise<Game[]> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/player/${username}/games`
      );
      return response.data.games || [];
    } catch (error) {
      console.error('Failed to fetch games:', error);
      throw error;
    }
  }

  async fetchUserStats(username: string) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/player/${username}/stats`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      throw error;
    }
  }

  async fetchPlayerProfile(username: string) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/player/${username}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      throw error;
    }
  }
}
