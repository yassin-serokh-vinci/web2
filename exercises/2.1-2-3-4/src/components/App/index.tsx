import "./App.css";
import PageTitle from "../PageTitle";
import Cinema from "../Cinema";
import Footer from "../Footer";
import Header from "../Header";

const pageTitle = "Informations sur les films dans les cinémas";

const cinema1Name = "UGC DeBrouckère";

const moviesCinema1 = [
  {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  },
  {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
  },
  {
    title: "INCEPTION",
    director: "Christopher Nolan",
  },
  {
    title: "PARASITE",
    director: "Bong Joon-ho",
  },
];

const cinema2Name = "UGC Toison d'Or";

const moviesCinema2 = [
  {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  },
  {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  },
  {
    title: "TENET",
    director: "Christopher Nolan",
  },
  {
    title: "THE IRISHMAN",
    director: "Martin Scorsese",
  },
];

const logoHeader = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=200";
const imgFooter = "https://images.unsplash.com/photo-1517602302552-471fe67acf66?w=200";

const App = () => {
  return (
    <div>
      <Header  logo={logoHeader}>
        <h2>Cinematek VY</h2>
      </Header>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies={moviesCinema1} />

      <Cinema name={cinema2Name} movies={moviesCinema2} />

      <Footer image={imgFooter}>
        <p>© 2025 - Web2</p>
      </Footer>
    </div>
  );
};

export default App;
