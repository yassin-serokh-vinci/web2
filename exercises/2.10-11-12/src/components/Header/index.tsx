import "./Header.css";

interface HeaderProps {
    logo: string;
    children: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    return (
        <header className="app-header">
            <div className="app-header_content">{props.children}</div>
            <img className="app-header_logo" src={props.logo} alt="Logo" />
        </header>
    )
};

export default Header;