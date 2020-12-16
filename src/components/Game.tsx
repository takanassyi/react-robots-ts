import React, { useState } from "react";
import Control from "components/Control";
import Board from "components/Board";
import Info from "components/Info";
import {
  width,
  height,
  RobotInfo,
  RobotMove,
  init_robots,
  move_robots,
  is_wipeout,
  check_gameover,
  count_total_dead_enemy,
  calc_bonus,
} from "components/Robots";

export type GameProps = {
  level: number;
  score: number;
  robotList: RobotInfo[];
};

const Game: React.FC<GameProps> = (props: GameProps) => {
  const [state, setState] = useState<GameProps>(props);

  // status
  let status = "Game is ongoing";
  if (check_gameover(state.robotList)) {
    status = "Game Over...";
  }
  let bonus = calc_bonus(state.level);
  //Game Clear
  if (is_wipeout(state.robotList)) {
    setState({
      ...state,
      level: state.level + 1,
      score:
        count_total_dead_enemy(state.robotList, state.level + 1) * 10 + bonus,
      robotList: init_robots(state.robotList, state.level + 1),
    });
  }
  const submit = (move: RobotMove) => {
    // Game Overのときは入力を受け付けない
    if (status === "Game Over...") return;

    setState({
      ...state,
      robotList: move_robots(state.robotList, move),
      score: count_total_dead_enemy(state.robotList, state.level) * 10 + bonus,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board robotList={state.robotList} width={width} height={height} />
      </div>
      <div className="game-info">
        <Control onClick={submit} />
        <Info level={state.level} score={state.score} status={status} />
      </div>
    </div>
  );
};

export default Game;
