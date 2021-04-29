import React, { FC, useState } from "react";

const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((counter) => (counter += 1));
  };

  return (
    <div>
      <span>{count}</span>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
};

export default Counter;
