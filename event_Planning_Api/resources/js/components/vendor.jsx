import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import VendorProfile from "./vendor/vendorProfile";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class Vendor extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
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
                            <Menu.Item key="1">
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
                                <Menu.Item key="2">View Services</Menu.Item>
                                <Menu.Item key="3">New Service</Menu.Item>
                                <Menu.Item key="4">View Packages</Menu.Item>
                                <Menu.Item key="5">New Package</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6">
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
                                <Menu.Item key="7">View NGOs Events</Menu.Item>
                                <Menu.Item key="8">View Sponsorships</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9">
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
                            <VendorProfile />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Vendor;
