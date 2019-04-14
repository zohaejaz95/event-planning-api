import React, { Component } from "react";
import { List, Avatar, Button, Icon } from "antd";
import ReactPlayer from "react-player";
import avatar from "../../images/avatar.jpg";

const ButtonGroup = Button.Group;
const data = [
    {
        title: "Service 1"
    },
    {
        title: "Service 2"
    },
    {
        title: "Service 3"
    },
    {
        title: "Service 4"
    },
    {
        title: "Service 5"
    }
];

class Services extends Component {
    constructor() {
        super();
        this.state = {
            detail: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleDetail() {
        this.setState({
            detail: !this.state.detail
        });
    }
    render() {
        const serviceList = (
            <div>
                <h4>Services</h4>
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
                                    description="Category and Events"
                                />
                                <Button
                                    type="primary"
                                    onClick={this.toggleDetail.bind(this)}
                                >
                                    View Detail
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
        const serviceDetail = (
            <div>
                <Button type="primary" onClick={this.toggleDetail.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>Service Name</h4>
                </span>
                <br />
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=lqx5ocbekWA"
                    playing
                />
                <br />
                <p>Event Type: </p>
                <p>Category: </p>
                <p>Price:</p>
                <p>Description: </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aliquid quod nostrum inventore sit accusantium alias,
                    maiores quo cumque, error perferendis at et quasi sequi,
                    distinctio assumenda dicta ea officia in.
                </p>
                <p>More according to category</p>
                <br />
            </div>
        );
        return (
            <div>
                <br />

                {this.state.detail ? serviceDetail : serviceList}
            </div>
        );
    }
}

export default Services;
