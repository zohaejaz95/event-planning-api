import React, { Component } from "react";
import { List, Avatar, Button, Icon } from "antd";
import SponsorshipForm from "./sponsorshipForm";
import avatar from "../../images/avatar.jpg";

const ButtonGroup = Button.Group;
const data = [
    {
        title: "NGO Event 1"
    },
    {
        title: "NGO Event 2"
    },
    {
        title: "NGO Event 3"
    },
    {
        title: "NGO Event 4"
    },
    {
        title: "NGO Event 5"
    }
];

class NGOEvents extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            detail: false,
            sponsor: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleList() {
        this.setState({
            list: true,
            detail: false,
            sponsor: false
        });
    }
    toggleDetail() {
        this.setState({
            list: false,
            detail: true,
            sponsor: false
        });
    }
    toggleSponsor() {
        this.setState({
            list: false,
            detail: false,
            sponsor: true
        });
    }
    render() {
        const ngoEventList = (
            <div>
                <h4>NGO Events for Sponsorship</h4>
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
                                    description="NGO Name"
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
        const ngoEventDetail = (
            <div>
                <Button type="primary" onClick={this.toggleList.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>NGO Event Name</h4>
                    <h5>NGO Name</h5>
                </span>
                <br />
                <p>Email: </p>
                <p>Website: </p>
                <p>Contact:</p>
                <p>City/ies: </p>
                <p>Events: </p>
                <p>Payment Methods:</p>
                <p>Description: </p>
                <br />
                <Button type="primary" onClick={this.toggleSponsor.bind(this)}>
                    Accept
                </Button>
                <Button type="danger" onClick={this.toggleList.bind(this)}>
                    Reject
                </Button>
            </div>
        );
        const sponsorhipForm = (
            <div>
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>NGO Event Name</h4>
                    <h5>NGO Name</h5>
                </span>
                <br />
                financial or service?
                <SponsorshipForm />
                <Button type="danger" onClick={this.toggleDetail.bind(this)}>
                    Cancel
                </Button>
            </div>
        );
        return (
            <div>
                <br />

                {this.state.list
                    ? ngoEventList
                    : this.state.detail
                    ? ngoEventDetail
                    : this.state.sponsor
                    ? sponsorhipForm
                    : ngoEventList}
            </div>
        );
    }
}

export default NGOEvents;
