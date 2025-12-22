import { useState } from "react";

interface ClickCounterProps {
  title: string;
  messageAfter10: string;
}

const ClickCounter = ({title, messageAfter10}: ClickCounterProps) => {
    const [count, setCount] = useState(0);

    return (
        <div className="card">
          <h2>{title}</h2>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          
          {count >=10 && <p>{messageAfter10}</p>}
        </div>
    )
}

export default ClickCounter;