import React, { Component } from "react";
import { List, Avatar, Button, Icon, Progress, Tooltip } from "antd";
//import NGODetail from "../admin/ngoDetail";
import avatar from "../../images/avatar.jpg";
import { getPendingNGOs } from "../userFunction";

const ButtonGroup = Button.Group;

class NGOInfo extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            ngos: [],
            arr: {}
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleDetail(item) {
        console.log(item);
        //console.log.(e.target.key);
        this.setState({
            detail: true,
            arr: item
        });
    }
    toggleDetails() {
        this.setState({
            detail: false
        });
    }

    componentDidMount() {
        getPendingNGOs().then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const list = JSON.parse(lists);
                this.setState({
                    ngos: list
                });
                console.log(this.state.ngos);
            }
        });
    }
    render() {
        const ngoList = (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.ngos}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={avatar} />}
                                title={<p>{item.ngo_name}</p>}
                                description="Statement of Purpose"
                            />
                            <Button
                                type="primary"
                                onClick={this.toggleDetail(item)}
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
                        onClick={this.toggleDetails.bind(this)}
                    >
                        Back
                        <Icon type="left-circle" />
                    </Button>
                    <br />
                    <br />
                    <span>
                        <Avatar size={64} icon="user" />
                        <h4>{this.state.arr.ngo_name}</h4>
                    </span>
                    <br />
                    <p>Email: {this.state.arr.email}</p>
                    <p>Website: {this.state.arr.website}</p>
                    <p>Contact: {this.state.arr.contact}</p>
                    <p>Purpose: {this.state.arr.purpose}</p>
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
