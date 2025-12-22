
interface FooterProps {
    image: string;
    children: React.ReactNode;
}

const Footer = (props: FooterProps) =>{
    return (
        <footer className="app-footer">
            <div className="app-footer__content">{props.children}</div>
            <img className="app-footer__logo" src={props.image} alt="Logo" />
        </footer>
    );
};

export default Footer;