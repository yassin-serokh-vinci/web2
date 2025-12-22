import "./UserCard.css";

interface UserCardProps {
    name: string;
    age: number;
    isOnline: boolean;
}

const UserCard = (props: UserCardProps) => {
    return (
        <div className="user-card">
            <h2 className="user-card_name">{props.name}</h2>
            <p>Age: {props.age}</p>

            <p className={props.isOnline ? "online" : "offline"}>
            {props.isOnline ? "En ligne" : "Hors ligne"}
            </p>
        </div>
    )
}

export default UserCard;