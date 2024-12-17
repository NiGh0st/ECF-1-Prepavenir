import {Link} from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-logo">
                <img src="/logo.svg" alt="Logo"/>
            </div>
            <div className="footer-links">
                <Link to="/">Contact</Link>
                <Link to="/">Conditions générales</Link>
                <Link to="/">Mentions légales</Link>
            </div>
        </footer>
    );
};

export default Footer;