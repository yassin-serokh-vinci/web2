
import './App.css'
import ClickCounter from '../ClickCounter'

const title = "Click Counter";
const message = "You are a master in the art of clicking !";
const messageOverFlow = "Please click on me now !"
function App() {
  return (
    <>
      <ClickCounter title={title} messageAfter10={message} messageOverFlow={messageOverFlow}
      />
    </>
  );
};

export default App
