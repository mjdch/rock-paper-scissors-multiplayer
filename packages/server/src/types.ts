export type Decision = 'paper' | 'scissors' | 'rock';

type RoundResult = {
	index: number;
	winner: boolean;
	decision: Decision;
	roundPoints: number;
};
type UserResults = {
	id: string;
	username: string;
	rounds: RoundResult[];
};

export type GameResults = UserResults[];

export type ReadyPlayerInfo = Array<{
	username: string;
	ready: boolean;
}>;

export type GameRoomOptions = {
	username: string;
};
