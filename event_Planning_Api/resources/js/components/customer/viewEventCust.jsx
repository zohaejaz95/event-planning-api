import React, { Component } from "react";
import EditEvent from "./editEvent";
import EventOrders from "./eventOrders";
import {
    List,
    Avatar,
    Button,
    Icon,
    Checkbox,
    Progress,
    Tooltip,
    Switch,
    Modal,
    message,
    Row,
    Col
} from "antd";
import avatar from "../../images/avatar.jpg";
import {
    getEvents,
    updateEventStatus,
    deleteEvent,
    getExpenses,
    getEventId
} from "./customerFunction";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
class ViewEventCust extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            edit: false,
            detail: false,
            events: [],
            sel: [],
            type: "",
            e_id: [],
            services: [
                { id: 56, name: "Johar Shaadi Hall" },
                { id: 11, name: "Junoon Band" }
            ],
            filter: true,
            expenses: 0,
            used: 0,
            exeed: 0,
            within: 0,
            status: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.initEvents = this.initEvents.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.deleteEvents = this.deleteEvents.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.updatedEvent = this.updatedEvent.bind(this);
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
                    //console.log(res.data);
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
                    //console.log(res.data);
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
                //console.log(res.data);
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
            detail: false,
            edit: false
        });
    }
    toggleDetail(item) {
        this.setState({
            list: false,
            detail: true,
            edit: false,
            sel: item
        });
        getExpenses(item.event_id).then(res => {
            if (res) {
                this.setState({
                    expenses: res.expenses,
                    used: Math.ceil((res.expenses / item.budget) * 100),
                    exeed: Math.ceil(
                        ((res.expenses - item.budget) / item.budget) * 100
                    ),
                    within: Math.ceil(
                        ((item.budget - res.expenses) / item.budget) * 100
                    )
                });
                if (res.expenses >= item.budget) {
                    this.setState({
                        status: false
                    });
                } else {
                    this.setState({
                        status: true
                    });
                }
                //console.log(res);
            }
        });
    }
    toggleEdit() {
        this.setState({
            list: false,
            detail: false,
            edit: true
        });
    }
    updatedEvent() {
        getEventId(this.state.sel.event_id).then(res => {
            if (res) {
                this.setState({
                    list: false,
                    detail: true,
                    edit: false,
                    sel: res
                });
            }
        });
    }
    render() {
        const custEventList = (
            <div style={{ minHeight: 440 }}>
                {"Inactive "}
                <Switch defaultChecked onChange={this.onChange} />
                {" Active"}
                <h4>Events</h4>
                <Button type="primary" onClick={this.changeStatus}>
                    Change Status
                </Button>{" "}
                <Button type="danger" onClick={this.deleteEvents}>
                    <Icon type="delete" />
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
                    <Icon type="left" />
                    Back
                </Button>
                <br />
                <br />
                <Row>
                    <Col span={20}>
                        <Avatar size={64} icon="user" />
                    </Col>
                    <Col span={4}>
                        <Button type="primary" onClick={this.showConfirm}>
                            Change Status
                        </Button>
                        <Button type="primary" onClick={this.toggleEdit}>
                            <Icon type="edit" />
                        </Button>
                    </Col>
                </Row>
                <br />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Event Name</th>
                            <td>{this.state.sel.event_name}</td>
                        </tr>
                        <tr>
                            <th>Category</th>
                            <td>{this.state.sel.category}</td>
                        </tr>
                        <tr>
                            <th>Subject</th>
                            <td>{this.state.sel.description}</td>
                        </tr>
                        <tr>
                            <th>Time</th>
                            <td>{this.state.sel.time}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>{this.state.sel.date}</td>
                        </tr>
                        <tr>
                            <th>
                                <h4>Budget Manager</h4>
                            </th>
                            <td> </td>
                        </tr>
                        <tr>
                            <th>Budget</th>
                            <td>{this.state.sel.budget}</td>
                        </tr>
                        <tr>
                            <th>Expenses</th>
                            <td>{this.state.expenses}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                {this.state.status ? (
                                    <h6 style={{ color: "green" }}>
                                        Within Budget
                                    </h6>
                                ) : (
                                    <h6 style={{ color: "red" }}>
                                        Out of Budget
                                    </h6>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />
                <div>
                    {/* <Tooltip placement="topLeft" title="Total Budget">
                        <Progress percent={100} />
                    </Tooltip> */}
                    <Tooltip placement="topLeft" title="Budget Used">
                        <Progress percent={this.state.used} />
                    </Tooltip>
                    {/* <Tooltip placement="topLeft" title="Exceeding Budget">
                        <Progress
                            percent={this.state.exeed}
                            status="exception"
                        />
                    </Tooltip>
                    <Tooltip placement="topLeft" title="Within Budget">
                        <Progress percent={this.state.within} />
                    </Tooltip> */}
                </div>
                <br />

                <hr />
                <br />
                <h4>Orders</h4>
                <EventOrders event_id={this.state.sel.event_id} />
                <br />
            </div>
        );

        return (
            <div >
                <br />

                {this.state.list ? (
                    custEventList
                ) : this.state.detail ? (
                    custEventDetail
                ) : this.state.edit ? (
                    <div>
                        <Button type="primary" onClick={this.updatedEvent}>
                            <Icon type="left" />
                            Back
                        </Button>
                        <EditEvent event={this.state.sel} />
                    </div>
                ) : (
                    custEventList
                )}
                <div style={{ height: 10 }} />
            </div>
        );
    }
}

export default ViewEventCust;
