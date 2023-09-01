import { useState } from "react";

export const TestButton = () => {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count +1);
  }

  return (
    <button onClick={handleClick}>Contagem: {count}</button>
  );
}