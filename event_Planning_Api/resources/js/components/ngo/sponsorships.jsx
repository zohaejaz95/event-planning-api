import React, { Component } from "react";
import { List, Avatar, Button, Icon, Collapse, Modal } from "antd";
import avatar from "../../images/avatar.jpg";
import { getSponsorships } from "./ngoFunctions";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const data = [
    {
        num: 1,
        title: "Sponsor 1"
    },
    {
        num: 2,
        title: "Sponsor 2"
    },
    {
        num: 3,
        title: "Sponsor 3"
    },
    {
        num: 4,
        title: "Sponsor 4"
    },
    {
        num: 5,
        title: "Sponsor 5"
    }
];
const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};

class Sponsorships extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cash: [],
            service: [],
            event_id: "",
            details: true
        };
    }
    componentWillMount() {
        this.setState({
            event_id: this.props.spon
        });
        getSponsorships(this.props.spon, "accepted", "cash").then(res => {
            if (res) {
                this.setState({
                    cash: res.data
                });
            }
        });
        getSponsorships(this.props.spon, "accepted", "service").then(res => {
            if (res) {
                this.setState({
                    service: res.data
                });
            }
        });
    }
    render() {
        return (
            <div>
                <h5>Financial Aid</h5>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.cash}
                        renderItem={item => (
                            <div>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatar} />}
                                        title={
                                            "Sponsorship ID: " +
                                            item.sponsorship_id
                                        }
                                        description={
                                            "Sponsored By: " + item.vendor_id
                                        }
                                    />
                                </List.Item>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel
                                        header="Details"
                                        key={item.sponsorship_id}
                                        style={customPanelStyle}
                                    >
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Service Name</th>
                                                    <td>{item.service_id}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                    </Panel>
                                </Collapse>
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

                <br />
                <h5>Services Provided</h5>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.service}
                        renderItem={item => (
                            <div>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatar} />}
                                        title={
                                            "Sponsorship ID: " +
                                            item.sponsorship_id
                                        }
                                        description={
                                            "Sponsored By: " + item.vendor_id
                                        }
                                    />
                                </List.Item>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel
                                        header="Details"
                                        key={item.sponsorship_id}
                                        style={customPanelStyle}
                                    >
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Financial Aid</th>
                                                    <td>{item.donation}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                    </Panel>
                                </Collapse>
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
            </div>
        );
    }
}

export default Sponsorships;
