import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class NGOSidebar extends Component {
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
                        <div className="logo" />
                        <Menu mode="inline" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span>Profile</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="star" />
                                        <span>Events</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="2">View Events</Menu.Item>
                                <Menu.Item key="3">New Event</Menu.Item>
                                <Menu.Item key="4">To-Do List</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="2">
                                <Icon type="gift" />
                                <span>Sponsors</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type="message" />
                                <span>Messages</span>
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
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default NGOSidebar;
