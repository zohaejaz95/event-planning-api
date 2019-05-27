import React, { Component } from "react";
import { Select, Card, Button, Icon, message } from "antd";
import { getEvents, getGuests, deleteGuest } from "./customerFunction";
class GuestList extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            event_id: "",
            guests: []
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
    events() {
        getEvents("active").then(res => {
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
    componentDidMount() {
        this.events();
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
                    {this.state.events.map((serve, i) => (
                        <Option value={serve.event_id} key={i}>
                            {serve.event_name}
                        </Option>
                    ))}
                </Select>

                <br />
                {this.state.guests.map((guest, i) => (
                    <div key={i}>
                        <Card hoverable bordered={false}>
                            <h5>{guest.guest_id}</h5>
                            <p>Details</p>
                            <Button
                                type="danger"
                                onClick={() => this.deleteG(guest.guest_id)}
                            >
                                <Icon type="minus" />
                                Uninvite
                            </Button>
                        </Card>
                        <br />
                    </div>
                ))}
            </div>
        );
    }
}

export default GuestList;
