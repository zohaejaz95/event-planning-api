import React, { Component } from "react";
import { Menu, Icon, Button } from "antd";
import { Link } from "react-router-dom";
//import { Button } from "reactstrap";
import Login from "./login";
import CustomerRegister from "./customerRegister";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Header extends Component {
    constructor() {
        super();
        this.state = {
            current: "mail"
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log("click ", e);
        this.setState({
            current: e.key
        });
    }
    render() {
        return (
            <div className="fixed-element">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ background: "#fff" }}
                >
                    <Menu.Item key="home">
                        <a href="/">
                            <Icon type="home" />
                            Home
                        </a>
                    </Menu.Item>
                    <Menu.Item key="ngo">
                        <a href="/ngos">
                            <Icon type="team" />
                            NGOs
                        </a>
                    </Menu.Item>

                    <SubMenu
                        title={
                            <span className="submenu-title-wrapper">
                                <Icon type="shopping-cart" />
                                Vendors
                            </span>
                        }
                    >
                        <MenuItemGroup>
                            <Menu.Item key="setting:1">
                                <a href="/">Photography</a>
                            </Menu.Item>
                            <Menu.Item key="setting:2">
                                <a href="/">Videography</a>
                            </Menu.Item>
                            <Menu.Item key="setting:3">
                                <a href="/">Makeup Artist</a>
                            </Menu.Item>
                            <Menu.Item key="setting:4">
                                <a href="/">Decorators</a>
                            </Menu.Item>
                            <Menu.Item key="setting:5">
                                <a href="/">Designers</a>
                            </Menu.Item>
                            <Menu.Item key="setting:6">
                                <a href="/">Venues</a>
                            </Menu.Item>
                            <Menu.Item key="setting:7">
                                <a href="/">Invitations and Cards</a>
                            </Menu.Item>
                            <Menu.Item key="setting:8">
                                <a href="/">Food and Catering Services</a>
                            </Menu.Item>
                            <Menu.Item key="setting:9">
                                <a href="/">Music and Entertainment</a>
                            </Menu.Item>
                            <Menu.Item key="setting:10">
                                <a href="/">Car Rental Services</a>
                            </Menu.Item>
                            <Menu.Item key="setting:11">
                                <a href="/">Event Planners</a>
                            </Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup>
                            <Menu.Item>
                                Are you a Vendor?
                                <Link to="/vendor/register">
                                    <Button type="primary" className="m-2">
                                        Register Now
                                    </Button>
                                </Link>
                            </Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>

                    <Menu.Item key="contact">
                        <a href="/contact-us">
                            <Icon type="mail" />
                            Contact Us
                        </a>
                    </Menu.Item>

                    <Menu.Item key="loginForm" className="text-to-right">
                        <Login />
                    </Menu.Item>

                    <Menu.Item key="register" className="text-to-right">
                        <CustomerRegister />
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header;
