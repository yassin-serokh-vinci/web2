
interface HeaderProps {
    logo: string;
    children: React.ReactNode;
}

const Header = (props: HeaderProps) => {
    return (
        <header className="app-header">
            <div className="app-header__content">{props.children}</div>
            <img className="app-header__logo" src={props.logo} alt="Logo" />
        </header>
    )
};

export default Header;