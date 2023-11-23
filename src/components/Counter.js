import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../redux/reducers/counter";

export default function Counter() {
  const count = useSelector((state) => state.counter.forms);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(incrementByAmount(2))}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}
