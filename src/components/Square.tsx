import { ISquare } from 'components/interfaces';

interface SquareProps {
  value: ISquare;
}
const Square = (props: SquareProps) => {
  return <button className="square">{props.value}</button>;
};

export default Square;
