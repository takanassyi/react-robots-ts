import React from "react";

type InfoProps = {
  level: number;
  score: number;
  status: string;
};

const Info = (props: InfoProps) => {
  return (
    <React.Fragment>
      <label>
        <h4>Legend:</h4>
      </label>
      <div>
        <label>+ : robot</label>
      </div>
      <div>
        <label>* : junk heap</label>
      </div>
      <div>
        <label>@ : you</label>
      </div>
      <label>
        <h4>Level & Score:</h4>
      </label>
      <div>
        <label>level : {props.level}</label>
      </div>
      <div>
        <label>score : {props.score}</label>
      </div>
      <label>
        <h4>Status:</h4>
      </label>
      {props.status === "Game Over..." ? (
        <div className="note">
          <label>{props.status}</label>
        </div>
      ) : (
        <div>
          <label>{props.status}</label>
        </div>
      )}
    </React.Fragment>
  );
};

export default Info;
