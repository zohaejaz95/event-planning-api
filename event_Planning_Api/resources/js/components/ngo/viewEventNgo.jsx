import React, { Component } from "react";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Icon, Card, Progress, Tooltip } from "antd";
import avatar from "../../images/avatar.jpg";
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

class ViewEventNGO extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            detail: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleList() {
        this.setState({
            list: true,
            detail: false
        });
    }
    toggleDetail() {
        this.setState({
            list: false,
            detail: true
        });
    }
    render() {
        const custEventList = (
            <div>
                <h4>Events</h4>
                <hr />
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <div>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={avatar} />}
                                    title={<p>{item.title}</p>}
                                    description="Event Type: Wedding"
                                />
                                <Button
                                    type="primary"
                                    onClick={this.toggleDetail.bind(this)}
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
                <Avatar size={64} icon="user" />
                <span>
                    <h4>Customer Event Name</h4>
                    <h5>Wedding Event</h5>
                </span>

                <br />
                <p>Subject: </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti accusantium consequatur numquam, nulla at omnis
                    iusto molestias facilis inventore nostrum tenetur beatae
                    dolorum ad eligendi, maxime exercitationem sequi repudiandae
                    obcaecati!
                </p>
                <p>Time: </p>
                <p>Date:</p>
                <p>Required Fund: </p>
                <br />
                <hr />
                <h4>Statistics</h4>
                <p>Fund:</p>
                <p>Expenses:</p>
                <p>Budget Status:</p>
                <br />
                <Tooltip placement="topLeft" title="Total Required Fund">
                    <Progress percent={30} />
                </Tooltip>
                <Tooltip placement="topLeft" title="Fund Received">
                    <Progress percent={50} status="active" />
                </Tooltip>
                <Tooltip placement="topLeft" title="Limited Fund">
                    <Progress percent={70} status="exception" />
                </Tooltip>
                <Tooltip placement="topLeft" title="Status">
                    <Progress percent={100} />
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

export default ViewEventNGO;
