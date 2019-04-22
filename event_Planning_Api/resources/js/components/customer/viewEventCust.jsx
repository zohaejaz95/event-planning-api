import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Icon, Card, Progress, Tooltip } from "antd";
import avatar from "../../images/avatar.jpg";
import { getEvents } from "./customerFunction";
const ButtonGroup = Button.Group;
const data = [
    {
        title: "Customer Event 1"
    },
    {
        title: "Customer Event 2"
    },
    {
        title: "Customer Event 3"
    },
    {
        title: "Customer Event 4"
    },
    {
        title: "Customer Event 5"
    }
];

class ViewEventCust extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            detail: false,
            events: [],
            sel: []
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    componentDidMount() {
        getEvents().then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    events: elist
                });
                console.log(this.state.events);
                console.log(this.state.events.length);
                console.log(this.state.events[0]);
                console.log(this.state.events[0].event_id);
            }
        });
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
                <Button type="primary">
                    Guest List
                    <Icon type="user" />
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
