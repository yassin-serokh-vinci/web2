import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={{ display: "flex", gap: 12 }}>
            <Link to="/">Home</Link>
            <Link to= "/cinema">Cinémas</Link>
            <Link to="/movies">Films</Link>
        </nav>
    )
}

export default NavBar;