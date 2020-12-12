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
  robotList: RobotInfo[];
};

const Game = (props: GameProps) => {
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [robotList, setRobotList] = useState<RobotInfo[]>(
    init_robots(props.robotList, level)
  );
  //playerが動いたときに描画させるためのupdate/setUpdate
  const [update, setUpdata] = useState<boolean>(false);

  // status
  let status = "Game is ongoing";
  if (check_gameover(robotList)) {
    status = "Game Over...";
  }

  //Game Clear
  let bonus = calc_bonus(level);
  if (is_wipeout(robotList)) {
    // initialize board for next level
    setLevel(level + 1);
    setScore(count_total_dead_enemy(robotList, level + 1) * 10 + bonus);
    setRobotList(init_robots(robotList, level + 1));
    bonus = calc_bonus(level + 1);
  }

  const submit = (move: RobotMove) => {
    // Game Overのときは入力を受け付けない
    if (status === "Game Over...") return;

    // ロボットの動きで他のコンポーネントを強制的に描画させる
    // robotList,setRobotListの持たせ方に問題？
    setUpdata(update ? false : true);
    setRobotList(move_robots(robotList, move));
    setScore(count_total_dead_enemy(robotList, level) * 10 + bonus);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board robotList={robotList} width={width} height={height} />
      </div>
      <div className="game-info">
        <Control onClick={submit} />
        <Info level={level} score={score} status={status} />
      </div>
    </div>
  );
};

export default Game;
