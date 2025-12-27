import PageTitle from "../PageTitle";
import Cinema from "../Cinema";

const pageTitle = "Informations sur les films dans les cinémas";

const cinema1Name = "UGC De Brouckère";

const moviesCinema1 = [
  {
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
    duration: 126,
    description:
    "A high-energy sports anime movie focusing on the intense volleyball rivalry between Karasuno High and their fierce competitors.",
  },
  {
    title: "GOODBYE JULIA",
    director: "Mohamed Kordofani",
    duration: 105,
    description:
    "A poignant drama that explores themes of love, loss, and the complex dynamics of human relationships in a deeply emotional narrative.",
  },
  {
    title: "INCEPTION",
    director: "Christopher Nolan",
    duration: 86,
    description:
    "A mind-bending sci-fi thriller where a skilled thief, who enters people's dreams to steal secrets, is given a chance to have his criminal record erased if he can implant an idea into a target's subconscious.",
  },
  {
    title: "PARASITE",
    director: "Bong Joon-ho",
    duration: 145,
    description:
    "An Oscar-winning dark comedy thriller that examines class disparities through the story of two families — one wealthy, the other destitute — and their increasingly complicated relationship.",
  },
];

const cinema2Name = "UGC Toison d'Or";

const moviesCinema2 = [
  {
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
    duration: 128,
    description:
    "A suspenseful thriller that follows a group of people who are under constant surveillance, leading them to uncover dark secrets about their observers and themselves.",
  },
  {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
    duration: 114,
    description:
    "The latest installment in the action-packed Bad Boys franchise, featuring detectives Mike Lowrey and Marcus Burnett as they take on their most dangerous case yet.",
  },
  {
    title: "TENET",
    director: "Christopher Nolan",
    duration: 120,
    description:
    "A complex and visually stunning sci-fi action film where a protagonist embarks on a time-bending mission to prevent World War III, navigating through a world of temporal inversion.",
  },
  {
    title: "THE IRISHMAN",
    director: "Martin Scorsese",
    duration: 95,
    description:
    "An epic crime drama that chronicles the life of Frank Sheeran, a mob hitman, as he reflects on his involvement with the Bufalino crime family and the mysterious disappearance of his friend, Jimmy Hoffa.",
  },
];

const CinemaPage = () => {
    return (
        <>
        <PageTitle title={pageTitle} />
        <br />
        <Cinema name={cinema1Name} moviesCinema={moviesCinema1} />

        <br />

        <Cinema name={cinema2Name} moviesCinema={moviesCinema2} />
        </>
    );
};

export default CinemaPage;