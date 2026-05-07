export interface ChessComGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  white: { username: string; rating: number; result?: string; uuid?: string };
  black: { username: string; rating: number; result?: string; uuid?: string };
}

export class ChessComAPI {
  private baseUrl = 'https://api.chess.com/pub';

  async fetchUserGames(username: string): Promise<ChessComGame[]> {
    try {
      const response = await fetch(`${this.baseUrl}/player/${username}/games/archives`);
      if (!response.ok) throw new Error('Failed to fetch archives');

      const { archives } = await response.json();
      if (!archives || archives.length === 0) return [];

      // Fetch latest month's games
      const latestArchive = archives[archives.length - 1];
      const gamesResponse = await fetch(latestArchive);
      if (!gamesResponse.ok) throw new Error('Failed to fetch games');

      const { games } = await gamesResponse.json();
      return games.map((game: any) => ({
        url: game.url,
        pgn: game.pgn || '',
        time_control: game.time_class || 'rapid',
        end_time: game.end_time || Date.now() / 1000,
        white: {
          username: game.white?.username || 'Unknown',
          rating: game.white?.rating || 1200,
          result: game.white?.result
        },
        black: {
          username: game.black?.username || 'Unknown',
          rating: game.black?.rating || 1200,
          result: game.black?.result
        }
      }));
    } catch (error) {
      console.error('Chess.com API error:', error);
      return [];
    }
  }

  async fetchPlayerProfile(username: string) {
    try {
      const response = await fetch(`${this.baseUrl}/player/${username}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  }

  async fetchPlayerStats(username: string) {
    try {
      const response = await fetch(`${this.baseUrl}/player/${username}/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return null;
    }
  }
}