// ロボットのタイプ（プレイヤー、敵、スクラップ）
export enum RobotType {
  Player,
  Enemy,
  Scrap,
}

// ロボットが動く方向
export enum RobotMove {
  Teleport,
  Wait,
  Left,
  Right,
  Down,
  Up,
  LowerLeft,
  LowerRight,
  UpperLeft,
  UpperRight,
  Unknown,
}

// 1体のロボットに関する情報 (座標とロボとのタイプ)
export type RobotInfo = {
  x: number;
  y: number;
  type: RobotType;
};

// ボードのサイズ
export const width = 40;
export const height = 20;

// 初期配置でプレイヤーと敵が重ならないようにチェック
function check_position(robotList: RobotInfo[], x: number, y: number): boolean {
  for (let i = 0; i < robotList.length; i++) {
    if (x === robotList[i].x && y === robotList[i].y) {
      return false;
    }
  }

  return true;
}

// プレイヤーの動きをチェック
function check_movement(
  robotList: RobotInfo[],
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  // フィールド外に出ないかチェック
  if (x < 0 || y < 0 || x >= width || y >= height) return false;

  // 移動先にスクラップがあるかチェック
  for (let i = 1; i < robotList.length; i++) {
    if (
      robotList[i].x === x &&
      robotList[i].y === y &&
      robotList[i].type === RobotType.Scrap
    ) {
      return false;
    }
  }
  return true;
}

// 初期配置
export function init_robots(
  robotList: RobotInfo[],
  level: number
): RobotInfo[] {
  robotList = []; // 必ず初期化!!

  // 0番目は Player
  let x = Math.floor(Math.random() * width);
  let y = Math.floor(Math.random() * height);
  robotList.push({ x: x, y: y, type: RobotType.Player });

  // 1番目から (numOfRobots-1)番目はEnemy
  let count = 0;
  const numOfEnemy = level * 10;
  while (count < numOfEnemy) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    if (!check_position(robotList, x, y)) {
      // 敵の初期位置と同じ場所にロボットを置かない
      continue;
    }
    robotList.push({ x: x, y: y, type: RobotType.Enemy });
    count++;
  }
  return robotList;
}

// プレイヤーを動かす
function move_player(robotList: RobotInfo[], move: RobotMove): boolean {
  let x = robotList[0].x;
  let y = robotList[0].y;
  switch (move) {
    case RobotMove.Teleport:
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
      } while (!check_movement(robotList, x, y, width, height));
      break;
    case RobotMove.Down:
      y++;
      break;
    case RobotMove.Left:
      x--;
      break;
    case RobotMove.LowerLeft:
      x--;
      y++;
      break;
    case RobotMove.LowerRight:
      x++;
      y++;
      break;
    case RobotMove.Right:
      x++;
      break;
    case RobotMove.Up:
      y--;
      break;
    case RobotMove.UpperLeft:
      y--;
      x--;
      break;
    case RobotMove.UpperRight:
      x++;
      y--;
      break;
    case RobotMove.Wait:
    default:
      break;
  }

  if (!check_movement(robotList, x, y, width, height)) return false;

  robotList[0].x = x;
  robotList[0].y = y;

  return true;
}

// プレイヤーの位置に向かうように敵を一マス動かす
function move_enemies(robotList: RobotInfo[]): void {
  for (const item of robotList) {
    if (item.type === RobotType.Player || item.type === RobotType.Scrap) {
      continue;
    }
    if (robotList[0].x === item.x && robotList[0].y > item.y) {
      item.y++;
    } else if (robotList[0].x === item.x && robotList[0].y < item.y) {
      item.y--;
    } else if (robotList[0].x > item.x && robotList[0].y === item.y) {
      item.x++;
    } else if (robotList[0].x < item.x && robotList[0].y === item.y) {
      item.x--;
    } else if (robotList[0].x < item.x && robotList[0].y < item.y) {
      item.x--;
      item.y--;
    } else if (robotList[0].x < item.x && robotList[0].y > item.y) {
      item.x--;
      item.y++;
    } else if (robotList[0].x > item.x && robotList[0].y < item.y) {
      item.x++;
      item.y--;
    } else if (robotList[0].x > item.x && robotList[0].y > item.y) {
      item.x++;
      item.y++;
    }
  }

  // 敵同士が衝突したらスクラップにする
  const length = robotList.length;
  for (let i = 1; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      if (
        robotList[i].x === robotList[j].x &&
        robotList[i].y === robotList[j].y
      ) {
        robotList[i].type = RobotType.Scrap;
        robotList[j].type = RobotType.Scrap;
      }
    }
  }
}

// プレイヤーと敵が衝突したらゲームオーバー
export function check_gameover(robotList: RobotInfo[]): boolean {
  for (let i = 1; i < robotList.length; i++) {
    if (
      robotList[0].x === robotList[i].x &&
      robotList[0].y === robotList[i].y
    ) {
      return true;
    }
  }
  return false;
}

// 敵が全滅
export function is_wipeout(robotList: RobotInfo[]): boolean {
  for (let i = 1; i < robotList.length; i++) {
    if (robotList[i].type === RobotType.Enemy) {
      return false;
    }
  }
  return true;
}

// 倒した敵の数
export function count_dead_enemy(robotList: RobotInfo[]): number {
  let count = 0;
  for (let i = 1; i < robotList.length; i++) {
    if (robotList[i].type === RobotType.Scrap) {
      count++;
    }
  }
  return count;
}

// 累計で倒した敵の数
export function count_total_dead_enemy(
  robotList: RobotInfo[],
  level: number
): number {
  let total = 0;
  for (let l = level - 1; l > 0; l--) {
    total += l * 10;
  }
  return total + count_dead_enemy(robotList);
}

// プレイヤーの動きに基づいて敵を動かす
export function move_robots(
  robotList: RobotInfo[],
  move: RobotMove
): RobotInfo[] {
  if (move_player(robotList, move)) {
    move_enemies(robotList);
  }
  return robotList;
}

// ボーナス点の計算 クリアしたレベル×100
export function calc_bonus(level: number): number {
  // ボーナス点を加味したスコア
  let bonus = 0;
  for (let l = 0; l < level; l++) {
    bonus += l * 100;
  }
  return bonus;
}
