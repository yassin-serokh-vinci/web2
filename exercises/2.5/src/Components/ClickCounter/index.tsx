import { useState } from "react";

interface ClickCounterProps {
  title: string;
  messageAfter10: string;
  messageOverFlow: string;
}

const ClickCounter = ({title, messageAfter10, messageOverFlow}: ClickCounterProps) => {
    const [count, setCount] = useState(0);
    const [onMouseClick, setOnMouseClick] = useState(false);

    const handleClick = () => {setCount((count) => count + 1)}

    const handleMouseEnter = () => {setOnMouseClick((onMouseClick) => !onMouseClick)}

    return (
        <div className="card">
          <h2>{title}</h2>
          {onMouseClick ? <p>{messageOverFlow}</p> : " "}
          <button onClick= {handleClick} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseEnter}
          >  
           count is {count}</button>
          {count >=10 && <p>{messageAfter10}</p>}
        </div>
    )
}

export default ClickCounter;