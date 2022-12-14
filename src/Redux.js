import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCount, increment, decrement, incrementByAmount } from "./features/customCounter/customCounterSlice";

const Redux = () => {
    const dispatch = useDispatch();
    const count = useSelector(selectCount);
    const [number, setNumber] = React.useState(0);

    return (
        <div>
            <h3>Redux Integration Test</h3>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <span data-testid="count-value">{count}</span>
                <button onClick={() => dispatch(decrement())}>-</button>
                <button onClick={() => dispatch(incrementByAmount(number | 0))}>incrementByAmount</button>
                <input type="text" placeholder="Enter" value={number} onChange={(e) => setNumber(e.target.value)} />
            </div>
        </div>
    );
};

export default Redux;
