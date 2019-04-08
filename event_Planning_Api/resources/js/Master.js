import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
        return (
            <Router>
                <div className="App">
                    <Header />
                    <Route exact path="/" component={Home} />
                    <div>
                        <Route exact path="/ngos" component={NGO} />
                        <Route exact path="/contact-us" component={Contact} />
                        <Route exact path="/admin" component={Admin} />

                        <Route
                            exact
                            path="/vendor/register"
                            component={VendorSignup}
                        />
                        <Route exact path="/vendor" component={Vendor} />

                        <Route
                            exact
                            path="/ngos/register"
                            component={NGORegister}
                        />
                        <Route exact path="/ngo" component={NGOSidebar} />

                        <Route exact path="/customer" component={Customer} />
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
