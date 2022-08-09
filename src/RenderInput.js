import React from "react";

const RenderInput = ({ outputConsole }) => {
    const [input, setInput] = React.useState("");

    const updateValue = (e) => {
        setInput(e.target.value);
    };

    const outputValue = () => {
        if (input) {
            outputConsole(input);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Enter" value={input} onChange={updateValue} />
            <button onClick={outputValue}>Consoleに出力</button>
        </div>
    );
};

export default RenderInput;
