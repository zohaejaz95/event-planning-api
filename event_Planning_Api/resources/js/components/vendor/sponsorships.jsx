import React, { Component } from "react";
import {
    List,
    Avatar,
    Button,
    Icon,
    Collapse,
    Modal,
    Checkbox,
    message
} from "antd";
import avatar from "../../images/avatar.jpg";
import { getSponsorships } from "./vendorFunctions";
const confirm = Modal.confirm;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const data = [
    {
        num: 1,
        title: "Sponsorship Event 1"
    },
    {
        num: 2,
        title: "Sponsorship Event 2"
    },
    {
        num: 3,
        title: "Sponsorship Event 3"
    },
    {
        num: 4,
        title: "Sponsorship Event 4"
    },
    {
        num: 5,
        title: "Sponsorship Event 5"
    }
];
const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};
function showDeleteConfirm() {
    confirm({
        title: "Are you sure delete this task?",
        content: "Some descriptions",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
            console.log("OK");
            message.success("Click on Yes");
        },
        onCancel() {
            console.log("Cancel");
            message.error("Click on No");
        }
    });
}

class Sponsorships extends Component {
    constructor() {
        super();
        this.state = {
            spons: []
        };
    }
    componentWillMount() {
        getSponsorships().then(res => {
            if (res) {
                this.setState({
                    spons: res.data
                });
                console.log(res.data);
            }
        });
    }
    render() {
        return (
            <div>
                <h4>Sponsored Events</h4>
                <hr />
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.spons}
                        renderItem={item => (
                            <div>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={avatar} />}
                                        title={<p>{item.subject}</p>}
                                        description={item.ngo_name}
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
                                                    <th>Donation</th>
                                                    <td>{item.donation}</td>
                                                </tr>
                                                <tr>
                                                    <th>Service</th>
                                                    <td>{item.service_name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Status</th>
                                                    <td>{item.status}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <Checkbox onClick={showDeleteConfirm}>
                                            Mark as Complete
                                        </Checkbox> */}
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
