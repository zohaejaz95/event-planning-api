import React, { Component } from "react";
import { Select, Card, Button, Icon, message } from "antd";
import {
    getEvents,
    getContacts,
    addGuest,
    deleteContact
} from "./customerFunction";
class Contacts extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            contacts: [],
            event_id: "",
            status: "",
            contact_list_id: ""
        };
        this.events = this.events.bind(this);
        this.contact = this.contact.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.invitation = this.invitation.bind(this);
        this.deleteC = this.deleteC.bind(this);
    }
    invitation(contact_id) {
        var list = {
            contact_list_id: contact_id,
            event_id: this.state.event_id,
            status: "invited"
        };
        addGuest(list).then(res => {
            if (res) {
                message.success("Guest Invited!");
            } else {
                message.error("Unable to invite!");
            }
        });
    }
    deleteC(contact_id) {
        console.log(contact_id);
        deleteContact(contact_id).then(res => {
            if (res) {
                message.success("Contact Deleted!");
                this.setState({
                    contacts: []
                });
                this.contact();
            } else {
                message.error("Unable to delete!");
            }
        });
    }
    events() {
        getEvents().then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const list = JSON.parse(lists);
                this.setState({
                    events: list
                });
                console.log(this.state.events.length);
            }
        });
    }
    contact() {
        getContacts().then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const list = JSON.parse(lists);
                this.setState({
                    contacts: list
                });
                console.log(this.state.contacts.length);
            }
        });
    }
    componentDidMount() {
        this.events();
        this.contact();
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            event_id: value
        });
    }
    render() {
        const Option = Select.Option;

        function handleBlur() {
            console.log("blur");
        }

        function handleFocus() {
            console.log("focus");
        }
        return (
            <div>
                <h4>Contact List</h4>
                <hr />
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an event to invite"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.state.events.map((serve, i) => (
                        <Option value={serve.event_id} key={i}>
                            {serve.event_name}
                        </Option>
                    ))}
                </Select>

                <br />
                <br />
                {this.state.contacts.map((con, i) => (
                    <div key={i}>
                        <Card hoverable bordered={false}>
                            <h6>{con.first_name + " " + con.last_name}</h6>
                            <p>Email: {con.email}</p>
                            <a
                                href={
                                    "mailto:" + con.email + "?Subject=Invitaion"
                                }
                            >
                                <Button onClick={() => this.invitation(con.id)}>
                                    <Icon type="plus" />
                                    Invite
                                </Button>
                            </a>
                            <Button
                                type="danger"
                                onClick={() => this.deleteC(con.id)}
                            >
                                <Icon type="delete" />
                                Delete
                            </Button>
                        </Card>
                        <br />
                    </div>
                ))}
            </div>
        );
    }
}

export default Contacts;
