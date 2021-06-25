import { Link } from 'react-router-dom';
function NavBar() {

    return(
        <nav>
            <ul>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/login">
                    <li>Login</li>
                </Link>
                <Link to="/registration">
                    <li>SignUp</li>
                </Link>
            </ul>
        </nav>        
    );
}

export default NavBar;