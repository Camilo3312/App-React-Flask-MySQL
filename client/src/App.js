import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { About } from './components/About';
import { Users } from './components/Users';
import { Navbar } from "./components/Navbar";
import { Products } from './components/Home';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container p-3">
                <Switch>
                    <Route path="/products" component={Products} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Users} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;