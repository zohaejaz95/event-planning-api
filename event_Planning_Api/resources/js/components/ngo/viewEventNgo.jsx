import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Sponsorships from "./sponsorships";
import {
    List,
    Avatar,
    Button,
    Icon,
    Progress,
    Tooltip,
    message,
    Modal,
    Row,
    Col
} from "antd";
import avatar from "../../images/avatar.jpg";
import {
    getEvents,
    getEventStatus,
    getSponsorships,
    deleteEvent,
    getEventId
} from "./ngoFunctions";
import NGOEditEvent from "./editEvent";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
class ViewEventNGO extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            detail: false,
            events: [],
            edit: false,
            sel: [],
            num: 0,
            spon: []
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.getNGOEvent = this.getNGOEvent.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.getData = this.getData.bind(this);
        this.getUpdatedEvent = this.getUpdatedEvent.bind(this);
    }

    toggleList() {
        this.setState({
            list: true,
            detail: false,
            events: [],
            edit: false
        });
        this.getNGOEvent();
    }
    toggleDetail(item) {
        this.setState({
            list: false,
            detail: true,
            sel: item,
            edit: false
        });
        this.getData(item);
    }
    getData(item) {
        getEventStatus(item.id).then(res => {
            if (res) {
                this.setState({
                    num: res
                });
            }
            console.log(res);
        });
        getSponsorships(item.id, "accepted", "service").then(res => {
            if (res) {
                this.setState({
                    spon: res
                });
                console.log(res);
            }
        });
    }
    getUpdatedEvent(item) {
        getEventId(item.event_id).then(res => {
            if (res) {
                this.setState({
                    list: false,
                    detail: true,
                    sel: res[0],
                    edit: false
                });
                console.log(res[0]);
                // this.getData(item);
            }
        });
    }
    componentDidMount() {
        this.getNGOEvent();
    }
    getNGOEvent() {
        getEvents().then(res => {
            if (res) {
                this.setState({
                    events: res.data
                });
                console.log(res.data);
            }
        });
    }
    confirmDelete(data) {
        confirm({
            title: "Are you sure you want to delete this event?",
            content: "Subject: " + data.subject,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                deleteEvent(data.event_id).then(res => {
                    if (res) {
                        message.success("Deleted Successfully!");
                    } else {
                        message.error("Unable to perform action!");
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    editEvent() {
        this.setState({
            list: false,
            detail: false,
            edit: true
        });
    }
    render() {
        //const { Option, OptGroup } = Select;
        const custEventList = (
            <div style={{ minHeight: 300 }}>
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
                                    title={<p>{item.subject}</p>}
                                    description={"Fund Required: " + item.fund}
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

                <br />
                <br />
                <Row>
                    <Col span={20}>
                        <Avatar size={64} icon="user" />
                    </Col>
                    <Col span={4}>
                        <Button
                            type="danger"
                            onClick={() => this.confirmDelete(this.state.sel)}
                        >
                            <Icon type="delete" />
                        </Button>
                        <Button type="primary" onClick={this.editEvent}>
                            <Icon type="edit" />
                        </Button>
                    </Col>
                </Row>
                <span>
                    <h4>Event Details</h4>
                    <h5>{"Fund Required: " + this.state.sel.fund}</h5>
                </span>

                <br />
                <p>Subject: </p>
                <p>{this.state.sel.subject}</p>
                <p>Start Time: {this.state.sel.start_time}</p>
                <p>End Time: {this.state.sel.end_time}</p>
                <p>Date: {this.state.sel.date}</p>
                <br />
                <hr />
                <h4>Statistics</h4>
                <p>Fund: {this.state.sel.fund}</p>
                <p>Sponsored Fund: {this.state.num}</p>
                <br />
                <Tooltip placement="topLeft" title="Required Fund">
                    <Progress
                        percent={Math.ceil(
                            ((this.state.sel.fund - this.state.num) /
                                this.state.sel.fund) *
                                100
                        )}
                        status="exception"
                    />
                </Tooltip>
                <Tooltip placement="topLeft" title="Fund Received">
                    <Progress
                        percent={Math.ceil(
                            (this.state.num / this.state.sel.fund) * 100
                        )}
                        status="active"
                    />
                </Tooltip>
                <br />
                <br />
                <h4>Sponsors</h4>
                <Sponsorships spon={this.state.sel.event_id} />
                <br />
            </div>
        );

        return (
            <div>
                <br />

                {this.state.list ? (
                    custEventList
                ) : this.state.detail ? (
                    custEventDetail
                ) : this.state.edit ? (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => this.getUpdatedEvent(this.state.sel)}
                        >
                            Back
                        </Button>
                        <NGOEditEvent event={this.state.sel} />
                    </div>
                ) : (
                    custEventList
                )}
                <div style={{ height: 100 }} />
            </div>
        );
    }
}

export default ViewEventNGO;
