import React, { Component } from "react";
import EventOrders from "./eventOrders";
import {
    List,
    Avatar,
    Button,
    Icon,
    Card,
    Checkbox,
    Progress,
    Tooltip,
    Switch,
    Modal,
    Row,
    Col,
    message
} from "antd";
import avatar from "../../images/avatar.jpg";
import { getEvents, updateEventStatus, deleteEvent } from "./customerFunction";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
class ViewEventCust extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            detail: false,
            events: [],
            sel: [],
            type: "",
            e_id: [],
            services: [
                { id: 56, name: "Johar Shaadi Hall" },
                { id: 11, name: "Junoon Band" }
            ],
            filter: true
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.initEvents = this.initEvents.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.deleteEvents = this.deleteEvents.bind(this);
    }
    showConfirm() {
        var stat = "";
        if (this.state.sel.status == "active") {
            stat = "inactive";
        } else {
            stat = "active";
        }
        this.updateStatus(stat);
    }

    onCheck(value) {
        console.log(`checked = ${value}`);
        this.setState({
            e_id: value
        });
    }

    deleteEvents() {
        var value = this.state.e_id;
        var val = [];
        for (var i = 0; i < value.length; i++) {
            val = value[i];
            console.log(val);
            deleteEvent(val.event_id).then(res => {
                if (res) {
                    console.log(res.data);
                    message.success("Event deleted!");
                    this.initEvents(val.status);
                } else {
                    message.error("Unable to delete event");
                }
            });
        }
    }
    changeStatus() {
        var value = this.state.e_id;
        var stat = "",
            val = [];
        for (var i = 0; i < value.length; i++) {
            val = value[i];
            if (val.status == "active") {
                stat = "inactive";
            } else {
                stat = "active";
            }
            updateEventStatus(val.event_id, stat).then(res => {
                if (res) {
                    console.log(res.data);
                    message.success("Event status changed!");
                    this.initEvents(stat);
                } else {
                    message.error("Unable to change status");
                }
            });
        }
    }
    updateStatus(stat) {
        console.log(this.state.sel.event_id);
        updateEventStatus(this.state.sel.event_id, stat).then(res => {
            if (res) {
                console.log(res.data);
                message.success("Event status changed!");
            } else {
                message.error("Unable to change status");
            }
        });
    }
    onChange(checked) {
        console.log(`switch to ${checked}`);
        this.setState({
            filter: !this.state.filter,
            events: []
        });
        var stat = "";
        if (!this.state.filter) {
            this.setState({
                type: "active"
            });
            stat = "active";
        } else {
            this.setState({
                type: "inactive"
            });
            stat = "inactive";
        }
        this.initEvents(stat);
    }
    initEvents(status) {
        getEvents(status).then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    events: elist
                });
                console.log(this.state.events);
            }
        });
    }
    componentDidMount() {
        this.initEvents("active");
    }
    toggleList() {
        this.setState({
            list: true,
            detail: false
        });
    }
    toggleDetail(item) {
        this.setState({
            list: false,
            detail: true,
            sel: item
        });
    }

    render() {
        const custEventList = (
            <div>
                {"Inactive "}
                <Switch defaultChecked onChange={this.onChange} />
                {" Active"}
                <h4>Events</h4>
                <Button type="primary" onClick={this.changeStatus}>
                    Change Status
                </Button>
                <Button type="primary" onClick={this.deleteEvents}>
                    Delete
                </Button>
                <hr />
                <Checkbox.Group
                    style={{ width: "100%" }}
                    onChange={this.onCheck}
                >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.events}
                        renderItem={item => (
                            <div>
                                <List.Item>
                                    <Checkbox value={item} />
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatar} />}
                                        title={<p>{item.event_name}</p>}
                                        description={item.category}
                                    />

                                    <Button
                                        type="primary"
                                        onClick={() => this.toggleDetail(item)}
                                    >
                                        View Details
                                    </Button>
                                </List.Item>
                            </div>
                        )}
                    />
                </Checkbox.Group>
                <br />
                <ButtonGroup>
                    <Button type="primary">
                        <Icon type="left" />
                        Previous
                    </Button>
                    <Button type="primary">
                        Next
                        <Icon type="right" />
                    </Button>
                </ButtonGroup>
            </div>
        );
        const custEventDetail = (
            <div>
                <Button type="primary" onClick={this.toggleList.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>

                <Button type="primary" onClick={this.showConfirm}>
                    Change Status
                </Button>

                <br />
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>{this.state.sel.event_name}</h4>
                    <h5>{this.state.sel.category}</h5>
                </span>

                <br />
                <p>Subject: </p>
                <p>{this.state.sel.description}</p>
                <p>Time: {this.state.sel.time}</p>
                <p>Date: {this.state.sel.date}</p>
                <br />
                <hr />
                <h4>Budget Manager</h4>
                <p>Budget: {this.state.sel.budget}</p>
                <p>Expenses: NaN</p>
                <p>Budget Status: </p>
                <p style={{ color: "green" }}>Within Budget</p>
                <br />
                <div>
                    <Tooltip placement="topLeft" title="Total Budget">
                        <Progress percent={100} />
                    </Tooltip>
                    <Tooltip placement="topLeft" title="Used Budget">
                        <Progress percent={0} status="active" />
                    </Tooltip>
                    <Tooltip placement="topLeft" title="Exceeding Budget">
                        <Progress percent={0} status="exception" />
                    </Tooltip>
                    <Tooltip placement="topLeft" title="Within Budget">
                        <Progress percent={100} />
                    </Tooltip>
                </div>

                <br />
                <br />
                <hr />
                <EventOrders event_id={this.state.sel.event_id} />
                <br />
            </div>
        );

        return (
            <div>
                <br />

                {this.state.list
                    ? custEventList
                    : this.state.detail
                    ? custEventDetail
                    : custEventList}
            </div>
        );
    }
}

export default ViewEventCust;
