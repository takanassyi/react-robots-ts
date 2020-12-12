import React from "react";
import Square from "components/Square";
import { ISquare } from "components/interfaces";
import { RobotInfo, RobotType } from "components/Robots";

interface BoardProps {
  width: number;
  height: number;
  robotList: RobotInfo[];
}

function put_robot(robotList: RobotInfo[], x: number, y: number): ISquare {
  // forEach/find の中でreturnは使ってはいけない?
  // https://www.hanachiru-blog.com/entry/2019/10/31/154305

  let val: ISquare = null;
  robotList.find((element) => {
    if (element.x === x && element.y === y) {
      switch (element.type) {
        case RobotType.Player:
          val = "@";
          break;
        case RobotType.Enemy:
          val = "+";
          break;
        case RobotType.Scrap:
          val = "*";
          break;
        default:
          val = null;
      }
    }
  });

  return val;
}

const Board = (props: BoardProps) => {
  return (
    <div>
      {[...Array(props.height)].map((_, i) => {
        return (
          <div className="board-row" key={i}>
            {[...Array(props.width)].map((_, j) => {
              return (
                <Square value={put_robot(props.robotList, j, i)} key={j} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
