import './App.css'
import UserCard from '../UserCard'

const users = [
  {
    name: "Yassin",
    age:19,
    isOnline: true,
  },
  {
    name:"Walid",
    age: 24,
    isOnline: false,
  },
  {
    name: "Amine",
    age: 26,
    isOnline: false,
  }
] 


const App = () => {
  return (
    <div>
      {users.map((user)=> (
        <UserCard name={user.name} age={user.age} isOnline={user.isOnline} />
      ))}
    </div>
  )
}

export default App
