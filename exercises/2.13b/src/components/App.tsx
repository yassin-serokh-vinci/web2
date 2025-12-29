import { useState } from 'react'
import './App.css'
import RandomDog from './RandomDog'

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <RandomDog key={`${refresh}1`}/> 
      <RandomDog key={`${refresh}2`}/>
      <RandomDog key={`${refresh}3`}/>

      <button 
        onClick={() =>setRefresh(!refresh)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
        }}
      >
        Refresh Dogs
      </button>
    </>
  );
};

export default App
