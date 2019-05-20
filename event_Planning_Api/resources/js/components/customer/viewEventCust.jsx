import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    List,
    Avatar,
    Button,
    Icon,
    Card,
    Progress,
    Tooltip,
    Switch,
    Modal,
    message
} from "antd";
import avatar from "../../images/avatar.jpg";
import { getEvents, updateEventStatus } from "./customerFunction";
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
            filter: true
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.initEvents = this.initEvents.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
    }
    showConfirm() {
        var stat = "";
        if (this.state.type == "active") {
            stat = "inactive";
        } else {
            stat = "active";
        }
        this.updateStatus();
        confirm({
            title: "Do you want to mark event as " + stat + "?",
            content:
                "When clicked the OK button, the event status will be changed!",
            onOk() {
                //this.updateStatus();
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log("Oops errors!"));
            },
            onCancel() {}
        });
    }
    updateStatus() {
        updateEventStatus(this.state.sel.event_id, "inactive").then(res => {
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
                <hr />
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.events}
                    renderItem={item => (
                        <div>
                            <List.Item>
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
                <p>Expenses:</p>
                <p>Budget Status:</p>
                <br />
                <Tooltip placement="topLeft" title="Total Budget">
                    <Progress percent={30} />
                </Tooltip>
                <Tooltip placement="topLeft" title="Used Budget">
                    <Progress percent={50} status="active" />
                </Tooltip>
                <Tooltip placement="topLeft" title="Exceeding Budget">
                    <Progress percent={70} status="exception" />
                </Tooltip>
                <Tooltip placement="topLeft" title="Within Budget">
                    <Progress percent={100} />
                </Tooltip>
                <Tooltip placement="topLeft" title="Status">
                    <Progress percent={50} />
                </Tooltip>
                <br />
                <br />
                <hr />
                <h4>Services</h4>
                <h5>Category 1</h5>

                <Link to="/">
                    <Card hoverable bordered={false}>
                        <h6>Service Name</h6>
                    </Card>
                </Link>
                <br />
                <Link to="/">
                    <Card hoverable bordered={false}>
                        <h6>Service Name</h6>
                    </Card>
                </Link>
                <br />
                <h5>Category 2</h5>
                <Link to="/">
                    <Card hoverable bordered={false}>
                        <h6>Service Name</h6>
                    </Card>
                </Link>
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
