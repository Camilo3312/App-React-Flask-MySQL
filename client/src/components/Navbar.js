import React from "react";
import {Link} from "react-router-dom"
import Cookies from "universal-cookie";

export const Navbar = () => {
    let cookies = new Cookies();
    let userSatate = cookies.get('user');

    const Logout = () => {
        cookies.remove('user');
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                Crud
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">
                            About
                        </Link>
                        
                    </li>
                    <Link className="nav-link" to="/products">
                            Products
                    </Link>

                    {
                        userSatate ? 
                        <button onClick={Logout} className="btn btn-danger">Logout</button>
                        :
                        <p></p>
                    }
            
                </ul>
            </div>
        </div>
    </nav>
    )
}