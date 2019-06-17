import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import "./css/index.css";
import "antd/dist/antd.css";
//import logo from './logo.svg';
//import "../app.css";

//file imports
import Header from "./components/header";
import Home from "./components/home";
import NGO from "./components/ngo";
import Contact from "./components/contactUs";
//import Services from "./components/services";
import Category from "./components/category";
import Order from "./components/order";

import Admin from "./components/admin";
import NGORegister from "./components/ngoRegister";
import VendorSignup from "./components/vendorRegister";
import Vendor from "./components/vendor";
import Customer from "./components/customer";
//import CustProfile from "./components/customer/profile";
import Footer from "./components/footer";
import NGOSidebar from "./components/ngoSidebar";

export default class App extends Component {
    render() {
        const { browserHistory } = createBrowserHistory();
        return (
            <Router history={browserHistory}>
                <div className="App">
                    <Header />
                    <Route exact path="/" component={Home} />
                    <Switch>
                        <Route exact path="/ngos" component={NGO} />
                        <Route exact path="/contact-us" component={Contact} />
                        <Route
                            history={browserHistory}
                            exact
                            path="/admin"
                            component={Admin}
                        />
                        <Route exact path="/services" component={Category} />
                        <Route
                            exact
                            path="/services/category"
                            component={Order}
                        />

                        <Route
                            exact
                            path="/vendor-register"
                            component={VendorSignup}
                        />
                        <Route
                            history={browserHistory}
                            exact
                            path="/vendor"
                            component={Vendor}
                        />

                        <Route exact path="/ngo" component={NGOSidebar} />

                        <Route
                            history={browserHistory}
                            exact
                            path="/customer"
                            component={Customer}
                        />
                    </Switch>
                    <Route
                        exact
                        path="/ngos/register"
                        component={NGORegister}
                    />
                    <Footer />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
//                        <Route exact path="/services" component={Services} />
