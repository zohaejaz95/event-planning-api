import React, { Component } from "react";
import { Select, Card, Button, Icon, message, List } from "antd";
import { getGuests, deleteGuest } from "./customerFunction";
import { getEvents } from "./customerFunction";
class GuestList extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            event_id: "",
            guests: [],
            stat: "active"
        };
        this.events = this.events.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteG = this.deleteG.bind(this);
        this.getG = this.getG.bind(this);
    }
    deleteG(id) {
        deleteGuest(id).then(res => {
            if (res) {
                message.success("Guest Deleted!");
                this.setState({
                    guest: []
                });
                this.getG(this.state.event_id);
            } else {
                message.error("Unable to Delete!");
            }
        });
    }
    getG(value) {
        getGuests(value).then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const list = JSON.parse(lists);
                this.setState({
                    guests: list,
                    event_id: value
                });
                console.log(this.state.guests.length);
            }
        });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            event_id: value
        });
        this.getG(value);
    }
    events(status) {
        getEvents(status).then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    events: elist
                });
            }
        });
        console.log(this.state.events);
    }
    componentDidMount() {
        this.events("active");
    }
    render() {
        const Option = Select.Option;

        function handleBlur() {
            console.log("blur");
        }

        function handleFocus() {
            console.log("focus");
            getEvents("active").then(res => {
                if (res) {
                    console.log(res.data);
                    const lists = JSON.stringify(res.data);
                    const elist = JSON.parse(lists);
                    this.setState({
                        events: elist
                    });
                }
                console.log(res);
            });
        }
        return (
            <div style={{ minHeight: 440 }}>
                <h4>Guest List</h4>
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
                    {/* <List
                        size="small"
                        bordered
                        dataSource={this.state.events}
                        renderItem={item => (
                            <List.Item>
                                <Option value={item.event_id} key={i}>
                                    {item.event_name}
                                </Option>
                            </List.Item>
                        )}
                    /> */}
                    {this.state.events.map((serve, i) => (
                        <Option value={serve.event_id} key={i}>
                            {serve.event_name}
                        </Option>
                    ))}
                </Select>

                <br />
                <br />
                {this.state.guests.map((guest, i) => (
                    <div key={i}>
                        <Card hoverable bordered={false}>
                            <table class="table table-striped ">
                                <thead class="thead-inverse">
                                    <tr>
                                        <th>Name</th>
                                        <th>
                                            {guest.first_name +
                                                " " +
                                                guest.last_name}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Email</th>
                                        <td>{guest.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Contact</th>
                                        <td>{guest.contact}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>
                                            {guest.address +
                                                ", " +
                                                guest.city +
                                                ", " +
                                                guest.province}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <Button
                                style={{ float: "right" }}
                                type="danger"
                                onClick={() => this.deleteG(guest.guest_id)}
                            >
                                <Icon type="minus" />
                                Cancel Invitation
                            </Button>
                        </Card>
                        <br />
                    </div>
                ))}
                <div style={{ height: 100 }} />
            </div>
        );
    }
}

export default GuestList;
