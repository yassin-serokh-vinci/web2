import Footer from "../Footer";
import Header from "../Header";
import "./App.css"
import NavBar from "../NavBar";
import { Outlet } from "react-router-dom";



const logoHeader = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=200";
const imgFooter = "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=200";

const App = () => {
  return (
    <div style={{ padding: 16 }}>
      <Header  logo={logoHeader}>
        <h2>iMovies</h2>
        <NavBar />
      </Header>

      <main style={{ paddingTop: 12 }}>  
        <Outlet />
      </main>

      <hr />
      <Footer image={imgFooter}>
        <p>© 2025 - Web2</p>
      </Footer>
    </div>
  )
}

export default App;