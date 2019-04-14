import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
//import { Link } from "react-router-dom";

import Customization from "./cardCustomization/customization";
import ViewEventCust from "./customer/viewEventCust";
import Profile from "./customer/profile";
import CustEventForm from "./customer/custEventForm";
import Messages from "./messages";
import TodoList from "./customer/todoList";
import GuestList from "./customer/addGuestList";
import Contacts from "./customer/contacts";

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
class Customer extends Component {
    constructor() {
        super();
        this.state = {
            collapsed: false,
            customize: false,
            viewEvent: false,
            eventForm: false,
            profile: true,
            messages: false,
            list: false,
            newGuest: false,
            contact: false
        };
        this.toggle = this.toggle.bind(this);
        this.cardCustomize = this.cardCustomize.bind(this);
        this.myEvents = this.myEvents.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.profiles = this.profiles.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    cardCustomize() {
        this.setState({
            eventForm: false,
            viewEvent: false,
            profile: false,
            customize: true,
            messages: false,
            list: false,
            newGuest: false,
            contact: false
        });
    }
    myEvents() {
        this.setState({
            customize: false,
            eventForm: false,
            profile: false,
            viewEvent: true,
            messages: false,
            list: false,
            newGuest: false,
            contact: false
        });
    }
    newEvent() {
        this.setState({
            customize: false,
            viewEvent: false,
            profile: false,
            eventForm: true,
            messages: false,
            list: false,
            newGuest: false,
            contact: false
        });
    }
    profiles() {
        this.setState({
            customize: false,
            viewEvent: false,
            eventForm: false,
            profile: true,
            messages: false,
            list: false,
            newGuest: false,
            contact: false
        });
    }
    message() {
        this.setState({
            customize: false,
            viewEvent: false,
            eventForm: false,
            profile: false,
            messages: true,
            list: false,
            newGuest: false,
            contact: false
        });
    }
    todoList() {
        this.setState({
            customize: false,
            viewEvent: false,
            eventForm: false,
            profile: false,
            messages: false,
            list: true,
            newGuest: false,
            contact: false
        });
    }
    addGuest() {
        this.setState({
            customize: false,
            viewEvent: false,
            eventForm: false,
            profile: false,
            messages: false,
            list: false,
            newGuest: true,
            contact: false
        });
    }
    contacts() {
        this.setState({
            customize: false,
            viewEvent: false,
            eventForm: false,
            profile: false,
            messages: false,
            list: false,
            newGuest: false,
            contact: true
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
                                    onClick={this.newEvent.bind(this)}
                                >
                                    New Event
                                </Menu.Item>
                                <Menu.Item
                                    key="4"
                                    onClick={this.todoList.bind(this)}
                                >
                                    To-Do List
                                </Menu.Item>
                            </SubMenu>

                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="contacts" />
                                        <span>Event Guests</span>
                                    </span>
                                }
                            >
                                <Menu.Item
                                    key="5"
                                    onClick={this.contacts.bind(this)}
                                >
                                    Contacts
                                </Menu.Item>
                                <Menu.Item
                                    key="6"
                                    onClick={this.addGuest.bind(this)}
                                >
                                    Guest List
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item
                                key="7"
                                onClick={this.cardCustomize.bind(this)}
                            >
                                <Icon type="idcard" />
                                <span>Card Customization</span>
                            </Menu.Item>
                            <Menu.Item
                                key="8"
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
                                margin: "24px 16px",
                                padding: 24,
                                background: "#fff",
                                minHeight: 280
                            }}
                        >
                            {this.state.customize ? (
                                <Customization />
                            ) : this.state.viewEvent ? (
                                <ViewEventCust />
                            ) : this.state.eventForm ? (
                                <CustEventForm />
                            ) : this.state.profile ? (
                                <Profile />
                            ) : this.state.list ? (
                                <TodoList />
                            ) : this.state.newGuest ? (
                                <GuestList />
                            ) : this.state.contact ? (
                                <Contacts />
                            ) : this.state.messages ? (
                                <Messages />
                            ) : (
                                <Profile />
                            )}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Customer;
