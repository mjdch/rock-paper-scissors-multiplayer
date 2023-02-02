export type Decision = 'PAPER' | 'SCISSORS' | 'ROCK';

export type GameUsersRoundResult = {
	userId: string;
	username: string;
	decision: Decision;
	roundPoints: number;
	winner: boolean;
}[];

export type Winners = {
	userId: string;
	username: string;
	points: number;
}[];

export type GameResults = {
	rounds: GameUsersRoundResult[];
	userPoints: Record<string, { points: number; username: string }>;
	winners: Winners;
};

export type PlayersListInfo = Array<{
	username: string;
	ready: boolean;
	isAdmin: boolean;
}>;

export type GameRoomJoinOptions = {
	username: string;
};
