import { Link } from 'react-router-dom';
import "./navbar.css"

function NavBar() {

    return(
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <Link to="/" class="nav-link">
                        <li class="navbar-brand nav-item">
                            <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
                            GameOn
                        </li>
                    </Link>
                    <Link to="/login" class="nav-link">
                        <li class="navbar-brand nav-item">
                            Login
                        </li>
                    </Link>
                    <Link to="/registration" class="nav-link">
                        <li class="navbar-brand nav-item">
                            SignUp
                        </li>
                    </Link>
                </ul>
            </div>
           
        </nav>
        // {/* // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <ul navbar-nav mr-auto>
        //         <Link className="nav-link" to="/">
        //             <li>Home</li>
        //         </Link>
        //         <Link className="nav-link" to="/login">
        //             <li>Login</li>
        //         </Link>
        //         <Link className="nav-link" to="/registration">
        //             <li>SignUp</li>
        //         </Link>
        //     </ul>
        // </nav>         */}
    );
}

export default NavBar;