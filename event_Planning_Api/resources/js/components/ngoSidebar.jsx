import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import NGOProfile from "./ngo/ngoProfile";
import NGOEventForm from "./ngo/ngoEventForm";
import Sponsors from "./ngo/sponsors";
import ViewEventNGO from "./ngo/viewEventNgo";
import Messages from "./messages";
import { ngoProfile } from "./ngo/ngoFunctions";

class NGOSidebar extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            eventForm: false,
            viewEvent: false,
            messages: false,
            sponsor: false,
            profile: true,
            ngo: []
        };
        this.toggle = this.toggle.bind(this);
    }
    componentWillMount() {
        ngoProfile().then(res => {
            if (res) {
                this.setState({
                    ngo: res.data[0]
                });
                //console.log(res.data);
            }
        });
    }
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    ngoEventform() {
        this.setState({
            profile: false,
            viewEvent: false,
            messages: false,
            sponsor: false,
            eventForm: true
        });
    }
    ngoprofiles() {
        this.setState({
            viewEvent: false,
            eventForm: false,
            messages: false,
            sponsor: false,
            profile: true
        });
    }
    myEvents() {
        this.setState({
            eventForm: false,
            profile: false,
            messages: false,
            sponsor: false,
            viewEvent: true
        });
    }
    message() {
        this.setState({
            viewEvent: false,
            profile: false,
            eventForm: false,
            sponsor: false,
            messages: true
        });
    }
    sponsors() {
        this.setState({
            viewEvent: false,
            profile: false,
            eventForm: false,
            messages: false,
            sponsor: true
        });
    }
    render() {
        const { Header, Sider, Content } = Layout;
        const SubMenu = Menu.SubMenu;
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
                            <Menu.Item
                                key="1"
                                onClick={this.ngoprofiles.bind(this)}
                            >
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
                                <Menu.Item
                                    key="2"
                                    onClick={this.myEvents.bind(this)}
                                >
                                    View Events
                                </Menu.Item>
                                <Menu.Item
                                    key="3"
                                    onClick={this.ngoEventform.bind(this)}
                                >
                                    New Event
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item
                                key="4"
                                onClick={this.sponsors.bind(this)}
                            >
                                <Icon type="gift" />
                                <span>Sponsors</span>
                            </Menu.Item>
                            <Menu.Item
                                key="5"
                                onClick={this.message.bind(this)}
                            >
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
                                padding: 24,
                                background: "#fff",
                                minHeight: 280
                            }}
                        >
                            {this.state.eventForm ? (
                                <NGOEventForm />
                            ) : this.state.viewEvent ? (
                                <ViewEventNGO />
                            ) : this.state.sponsor ? (
                                <Sponsors />
                            ) : this.state.profile ? (
                                <NGOProfile />
                            ) : this.state.messages ? (
                                <Messages sender="ngo" receiver="vendor" />
                            ) : (
                                <NGOProfile />
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default NGOSidebar;
