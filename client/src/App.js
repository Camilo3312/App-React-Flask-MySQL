import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Cookies from 'universal-cookie';

import { About } from './components/About';
import { Users } from './components/Users';
import { Navbar } from "./components/Navbar";
import { Products } from './components/Home';
import { Login } from './components/login';

function App() {
    const cookies = new Cookies();

    const [stateUser, setStateUser] = useState(false);

    const validateEstate = () =>{ 
        const state = cookies.get('user');
        if(state != null) {
            setStateUser(true);
        }
    }

    useEffect(() => {
        validateEstate();
    })
     
    return (
        <Router>
            <Navbar />
            <div className="container p-3">
                { stateUser ?
                    <Switch>
                        <Route path="/products" component={Products} />     
                    </Switch>
                    :
                    <Switch>                 
                        <Route path="/about" component={About} />
                        <Route path="/crud" component={Users} />
                        <Route path="/" component={Login} />                                                                 
                </Switch>
                }
            </div>
        </Router>
    );
}

export default App;