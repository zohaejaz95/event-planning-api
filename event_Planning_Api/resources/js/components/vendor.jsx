import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import VendorProfile from "./vendor/vendorProfile";
import Services from "./vendor/services";
import AddService from "./vendor/addService";
import Packages from "./vendor/packages";
import AddPackage from "./vendor/addPackages";
import Orders from "./vendor/orders";
import NGOEvents from "./vendor/ngoEvents";
import Sponsorships from "./vendor/sponsorships";
import Messages from "./messages";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class Vendor extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            profile: true,
            services: false,
            newService: false,
            packages: false,
            newPackage: false,
            order: false,
            events: false,
            sponsor: false,
            messages: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    profiles() {
        this.setState({
            newService: false,
            services: false,
            profile: true,
            packages: false,
            newPackage: false,
            order: false,
            events: false,
            sponsor: false,
            messages: false
        });
    }
    viewServices() {
        this.setState({
            newService: false,
            services: true,
            profile: false,
            packages: false,
            newPackage: false,
            order: false,
            events: false,
            sponsor: false,
            messages: false
        });
    }

    viewPackages() {
        this.setState({
            newService: false,
            services: false,
            profile: false,
            packages: true,
            newPackage: false,
            order: false,
            events: false,
            sponsor: false,
            messages: false
        });
    }

    newServices() {
        this.setState({
            services: false,
            newService: true,
            profile: false,
            packages: false,
            newPackage: false,
            order: false,
            events: false,
            sponsor: false,
            messages: false
        });
    }
    newPackages() {
        this.setState({
            services: false,
            newService: false,
            profile: false,
            packages: false,
            newPackage: true,
            order: false,
            events: false,
            sponsor: false,
            messages: false
        });
    }

    ordered() {
        this.setState({
            services: false,
            newService: false,
            profile: false,
            packages: false,
            newPackage: false,
            order: true,
            events: false,
            sponsor: false,
            messages: false
        });
    }

    ngoEvents() {
        this.setState({
            services: false,
            newService: false,
            profile: false,
            packages: false,
            newPackage: false,
            order: false,
            events: true,
            sponsor: false,
            messages: false
        });
    }
    sponsorships() {
        this.setState({
            services: false,
            newService: false,
            profile: false,
            packages: false,
            newPackage: false,
            order: false,
            events: false,
            sponsor: true,
            messages: false
        });
    }
    message() {
        this.setState({
            services: false,
            newService: false,
            profile: false,
            packages: false,
            newPackage: false,
            order: false,
            events: false,
            sponsor: false,
            messages: true
        });
    }

    render() {
        return (
            <div className="text-to-left">
                <br />
                <br />
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        style={{ background: "#fff" }}
                    >
                        <div className="logo">Dashboard</div>
                        <Menu mode="inline" defaultSelectedKeys={["1"]}>
                            <Menu.Item
                                key="1"
                                onClick={this.profiles.bind(this)}
                            >
                                <Icon type="user" />
                                <span>Profile</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="shopping" />
                                        <span>Services</span>
                                    </span>
                                }
                            >
                                <Menu.Item
                                    key="2"
                                    onClick={this.viewServices.bind(this)}
                                >
                                    View Services
                                </Menu.Item>
                                <Menu.Item
                                    key="3"
                                    onClick={this.newServices.bind(this)}
                                >
                                    New Service
                                </Menu.Item>
                                <Menu.Item
                                    key="4"
                                    onClick={this.viewPackages.bind(this)}
                                >
                                    View Packages
                                </Menu.Item>
                                <Menu.Item
                                    key="5"
                                    onClick={this.newPackages.bind(this)}
                                >
                                    New Package
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                key="6"
                                onClick={this.ordered.bind(this)}
                            >
                                <Icon type="shopping-cart" />
                                <span>Order</span>
                            </Menu.Item>

                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="fund" />
                                        <span>Sponsorship</span>
                                    </span>
                                }
                            >
                                <Menu.Item
                                    key="7"
                                    onClick={this.ngoEvents.bind(this)}
                                >
                                    NGOs Events
                                </Menu.Item>
                                <Menu.Item
                                    key="8"
                                    onClick={this.sponsorships.bind(this)}
                                >
                                    Sponsorships
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                key="9"
                                onClick={this.message.bind(this)}
                            >
                                <Icon type="message" />
                                <span> Messages </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: "#fff", padding: 0 }}>
                            <Icon
                                className="trigger"
                                type={
                                    this.state.collapsed
                                        ? "menu-unfold"
                                        : "menu-fold"
                                }
                                onClick={this.toggle}
                            />
                        </Header>
                        <Content
                            style={{
                                margin: "24px 16px",
                                padding: 24,
                                background: "#fff",
                                minHeight: 280
                            }}
                        >
                            {this.state.services ? (
                                <Services />
                            ) : this.state.profile ? (
                                <VendorProfile />
                            ) : this.state.newService ? (
                                <AddService />
                            ) : this.state.packages ? (
                                <Packages />
                            ) : this.state.newPackage ? (
                                <AddPackage />
                            ) : this.state.order ? (
                                <Orders />
                            ) : this.state.events ? (
                                <NGOEvents />
                            ) : this.state.sponsor ? (
                                <Sponsorships />
                            ) : this.state.messages ? (
                                <Messages />
                            ) : (
                                <VendorProfile />
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Vendor;
