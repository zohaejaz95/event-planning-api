import React, { Component } from "react";
import { List, Avatar, Button, Icon, Progress, Tooltip } from "antd";
//import NGODetail from "../admin/ngoDetail";
import avatar from "../../images/avatar.jpg";

const ButtonGroup = Button.Group;
const data = [
    {
        title: "NGO 1"
    },
    {
        title: "NGO 2"
    },
    {
        title: "NGO 3"
    },
    {
        title: "NGO 4"
    },
    {
        title: "NGO 5"
    }
];
class NGOInfo extends Component {
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
        const ngoList = (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={avatar} />}
                                title={<p>{item.title}</p>}
                                description="Statement of Purpose"
                            />
                            <Button
                                type="primary"
                                onClick={this.toggleDetail.bind(this)}
                            >
                                View Detail
                            </Button>
                        </List.Item>
                    )}
                />
                <br />
                <ButtonGroup>
                    <Button
                        type="primary"
                        onClick={this.toggleDetail.bind(this)}
                    >
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
        const ngoDetail = (
            <div>
                <div>
                    <Button
                        type="primary"
                        onClick={this.toggleDetail.bind(this)}
                    >
                        Back
                        <Icon type="left-circle" />
                    </Button>
                    <br />
                    <br />
                    <span>
                        <Avatar size={64} icon="user" />
                        <h4>NGO Name</h4>
                    </span>
                    <br />
                    <p>Email: </p>
                    <p>Website: </p>
                    <p>Contact</p>
                    <p>Purpose: </p>
                    <br />
                    <Button type="primary">Accept</Button>
                    <Button type="danger">Reject</Button>
                </div>
            </div>
        );
        return (
            <div>
                <div>
                    <Tooltip placement="top" title="Total NGOs">
                        <Progress type="circle" percent={30} width={80} />
                    </Tooltip>
                    <span />
                    <Tooltip placement="top" title="Pending Accounts ">
                        <Progress
                            type="circle"
                            percent={70}
                            width={80}
                            status="exception"
                            className="m-4 "
                        />
                    </Tooltip>

                    <span />
                    <Tooltip placement="top" title="Approved">
                        <Progress type="circle" percent={100} width={80} />
                    </Tooltip>
                </div>
                <hr />
                <br />
                {this.state.detail ? ngoDetail : ngoList}
            </div>
        );
    }
}

export default NGOInfo;
