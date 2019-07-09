import React, { Component } from "react";
import { List, Avatar, Button, Icon } from "antd";
import SponsorshipForm from "./sponsorshipForm";
import avatar from "../../images/avatar.jpg";
import { getNGOEvents, getNGOData } from "./vendorFunctions";
const ButtonGroup = Button.Group;
class NGOEvents extends Component {
    constructor() {
        super();
        this.state = {
            list: true,
            detail: false,
            sponsor: false,
            events: [],
            sel: [],
            ngo_det: []
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.getNGOEvent = this.getNGOEvent.bind(this);
    }
    toggleList() {
        this.setState({
            list: true,
            detail: false,
            sponsor: false
        });
    }
    toggleDetail(item) {
        this.setState({
            list: false,
            detail: true,
            sponsor: false,
            sel: item
        });
        getNGOData(item.ngo_id).then(res => {
            if (res) {
                this.setState({
                    ngo_det: res
                });
            }
        });
    }
    toggleSponsor() {
        this.setState({
            list: false,
            detail: false,
            sponsor: true
        });
    }
    componentDidMount() {
        this.getNGOEvent();
    }
    getNGOEvent() {
        getNGOEvents().then(res => {
            if (res) {
                this.setState({
                    events: res.data
                });
                console.log(res.data);
            }
        });
    }
    render() {
        const ngoEventList = (
            <div style={{ minHeight: 440 }}>
                <h4>NGO Events for Sponsorship</h4>
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
        const ngoEventDetail = (
            <div>
                <Button type="primary" onClick={this.toggleList.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Avatar size={64} icon="user" />

                <h4>{this.state.ngo_det.ngo_name}</h4>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <th>Purpose</th>
                            <td>{this.state.ngo_det.purpose}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{this.state.ngo_det.email}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>{this.state.ngo_det.website}</td>
                        </tr>
                        <tr>
                            <th>Contact</th>
                            <td>{this.state.ngo_det.contact}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <h4>Event Details</h4>

                <br />
                <table>
                    <tbody>
                        <tr>
                            <th>Subject</th>
                            <td>{this.state.sel.subject}</td>
                        </tr>
                        <tr>
                            <th>Funds Required</th>
                            <td>{this.state.sel.fund}</td>
                        </tr>
                        <tr>
                            <th>Start Time</th>
                            <td>{this.state.sel.start_time}</td>
                        </tr>
                        <tr>
                            <th>End Time</th>
                            <td>{this.state.sel.end_time}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>{this.state.sel.date}</td>
                        </tr>
                    </tbody>
                </table>
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
                <Button type="primary" onClick={this.toggleDetail.bind(this)}>
                    Back
                </Button>
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>{this.state.ngo_det.ngo_name}</h4>
                    <h5>{this.state.sel.subject}</h5>
                </span>
                <br />
                <SponsorshipForm ngo_data={this.state.sel} />
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
