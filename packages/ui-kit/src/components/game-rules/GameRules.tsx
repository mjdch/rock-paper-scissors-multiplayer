import React from 'react';

import roomDecision from '../../assets/game-rules/round-decisions.png';
import roomDecisionComplete from '../../assets/game-rules/round-decisions-complete.png';
import gameStart from '../../assets/game-rules/game-start.png';
import round1 from '../../assets/game-rules/round1.png';
import round2 from '../../assets/game-rules/round2.png';
import round3 from '../../assets/game-rules/round3.png';

import './GameRules.css';

export const GameRules = () => {
	return (
		<div className="game-rules">
			<h1></h1>
			<h2>Change username</h2>
			<p>
				You can change your username in header while you are on homepage, you
				can't change username once you are in the game room. On first visit you
				username will be random generated.
			</p>
			<h2>Creating room</h2>
			<p>
				To create room click on "Create Room" button under room list. You have
				two options to select while creating room:
				<li>
					Private room - select if you don't want your game room to be listed on
					the homepage
				</li>
				<li>
					Round limit - select how many rounds of game will be in your room.
					Each round is one decision to be selected by user.
				</li>
			</p>
			<h2>Joining room</h2>
			<li>
				You can join public room from game room list, by clicking on "Join"
				button
			</li>
			<li>
				Private room can be joined only when you know ID of room i.e shared by
				game master. To access private room visit:{' '}
				<a href={`${window.location.host}?roomId=ROOM_ID`}>
					{window.location.host}?roomId=ROOM_ID
				</a>
			</li>
			<h2>Game rules</h2>
			<h3>Decisions</h3>
			<p>
				Each game consists of number of rounds selected while creating by
				default 5. For example we will use that value.
			</p>
			<div>
				<p>
					At joining to room user need to select its decision for each round:
				</p>
				<img loading="lazy" src={roomDecision} />
				<p>
					Once you select all decision you need to wait for all players to make
					decisions
				</p>
				<img loading="lazy" src={roomDecisionComplete} />
			</div>
			<h3>Game Start</h3>
			<p>If every player make their decision, game master 👑 can start game</p>
			<img loading="lazy" src={gameStart} />
			<h3>Results</h3>
			<p>
				Each round is treated independently. Each player decision is calculated
				versus each of other players decision. Player with highest wins in round
				is marked as round winner, which gives 1 point in overall score.
				Example:
			</p>
			<img loading="lazy" src={round1} />
			<p>
				We have two winners for round 1. User1 and user2 as well beats user2
				decision, so both have highest points in round 1 and both receive points
				in overall score.
			</p>
			<br />
			<img loading="lazy" src={round2} />
			<p>
				We have no winners in round 2, so none of players receive points to
				overall score.
			</p>
			<br />
			<img loading="lazy" src={round3} />
			<p>
				All players receive point in round 3 so each of them is marked as winner
				of round 3, and add one point to overall score.
			</p>
			<h3>Winner(s)</h3>
			<p>Player or players with highest overall score win whole game.</p>
		</div>
	);
};
