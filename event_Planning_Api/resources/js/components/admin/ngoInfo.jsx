import React, { Component } from "react";
import { List, Avatar, Button, Icon, Progress, Tooltip, message } from "antd";
//import NGODetail from "../admin/ngoDetail";
import avatar from "../../images/avatar.jpg";
import { getPendingNGOs, updateNGOStatus } from "../userFunction";

const ButtonGroup = Button.Group;

class NGOInfo extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            ngos: [],
            arr: []
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.pending = this.pending.bind(this);
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

    accepted() {
        var v_id = this.state.arr.ngo_id;
        console.log(this.state.arr.ngo_id);
        updateNGOStatus("approved", v_id).then(res => {
            if (res) {
                this.setState({
                    ngos: []
                });
                this.pending();
                this.toggleDetails();
                message.success("NGO Account Accepted");
                //this.props.history.push("/admin");
            } else {
                message.error("Something went wrong!!");
            }
        });
    }
    rejected() {
        var v_id = this.state.arr.ngo_id;
        console.log(this.state.arr.ngo_id);
        updateNGOStatus("rejected", v_id).then(res => {
            if (res) {
                this.setState({
                    ngos: []
                });
                this.pending();
                this.toggleDetails();
                message.warning("NGO Account Rejected");
                //this.props.history.push("/admin");
            } else {
                message.error("Something went wrong!!");
            }
        });
    }
    pending() {
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
    componentDidMount() {
        this.pending();
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
                                onClick={() => this.toggleDetail(item)}
                            >
                                View Detail
                            </Button>
                        </List.Item>
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
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <td>
                                    <Avatar size={64} icon="user" />
                                </td>
                                <td>
                                    <h4>{this.state.arr.ngo_name}</h4>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <td>{this.state.arr.email}</td>
                            </tr>
                            <tr>
                                <th>Website</th>
                                <td>{this.state.arr.website}</td>
                            </tr>
                            <tr>
                                <th>Contact</th>
                                <td>{this.state.arr.contact}</td>
                            </tr>
                            <tr>
                                <th>Purpose</th>
                                <td>{this.state.arr.purpose}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />
                    <Button type="primary" onClick={this.accepted.bind(this)}>
                        Accept
                    </Button>
                    <Button type="danger" onClick={this.rejected.bind(this)}>
                        Reject
                    </Button>
                </div>
            </div>
        );
        return (
            <div>
                {/* <div>
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
                </div> */}
                <hr />
                <br />
                {this.state.detail ? ngoDetail : ngoList}
            </div>
        );
    }
}

export default NGOInfo;
