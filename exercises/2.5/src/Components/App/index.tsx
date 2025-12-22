
import './App.css'
import ClickCounter from '../ClickCounter'

const title = "Click Counter";
const message = "You are a master in the art of clicking !";
function App() {
  return (
    <>
      <ClickCounter title={title} messageAfter10={message}
      />
    </>
  );
};

export default App
