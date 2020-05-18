import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Home from "./screens/home/Home"
import Profile from "./screens/Profile/Profile"
import Details from "./screens/details/Details"
import Checkout from "./screens/checkout/Checkout"

class Controller extends Component {

    constructor()
    {
        super();
        this.baseUrl = "http://localhost:8080/api/";
    }

    render(){
        return(
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    <Route exact path='/profile'  render={(props)=> <Profile{...props} baseUrl={this.baseUrl}   /> }/>
                    <Route path='/restaurant/:id' render={(props) => <Details {...props} baseUrl={this.baseUrl} /> } />
                    <Route
                        path="/checkout"
                        render={props =>
                            sessionStorage.getItem("customer-cart") === null ? (
                                <Redirect to="/" />
                            ) : (
                                <Route
                                    path="/checkout"
                                    render={props => (
                                        <Checkout
                                            {...props}
                                            component={Checkout}
                                            baseUrl={this.baseUrl}
                                        />
                                    )}
                                />
                            )
                        }
                    />
                </div>
            </Router>


        )
    }
}

export default Controller;
