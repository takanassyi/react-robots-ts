import React from 'react';
import '../index.css';
import { RobotMove } from 'components/Robots';

interface ControlProps {
  onClick: Function;
}

const Control = (props: ControlProps) => {
  return (
    <React.Fragment>
      <label>
        <h4>Move:</h4>
      </label>
      <div>
        <button
          type="submit"
          onClick={(e) => props.onClick(RobotMove.UpperLeft)}
        >
          y
        </button>
        <button type="submit" onClick={(e) => props.onClick(RobotMove.Up)}>
          k
        </button>
        <button
          type="submit"
          onClick={(e) => props.onClick(RobotMove.UpperRight)}
        >
          u
        </button>
      </div>
      <div>
        <button type="submit" onClick={(e) => props.onClick(RobotMove.Left)}>
          h
        </button>
        <button type="submit" onClick={(e) => props.onClick(RobotMove.Wait)}>
          w
        </button>
        <button type="submit" onClick={(e) => props.onClick(RobotMove.Right)}>
          l
        </button>
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => props.onClick(RobotMove.LowerLeft)}
        >
          b
        </button>
        <button type="submit" onClick={(e) => props.onClick(RobotMove.Down)}>
          j
        </button>
        <button
          type="submit"
          onClick={(e) => props.onClick(RobotMove.LowerRight)}
        >
          n
        </button>
      </div>
      <div>
        <button
          type="submit"
          onClick={(e) => props.onClick(RobotMove.Teleport)}
        >
          t
        </button>
      </div>
    </React.Fragment>
  );
};

export default Control;
