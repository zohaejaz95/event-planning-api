import React, { Component } from "react";
import {
    List,
    Avatar,
    Button,
    Icon,
    Collapse,
    Modal,
    message,
    Select,
    notification
} from "antd";
import {
    getEvents,
    getSponsorships,
    acceptSponsor,
    rejectSponsor,
    createConvo
} from "./ngoFunctions";
import avatar from "../../images/avatar.jpg";

const { Option } = Select;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const customPanelStyle = {
    background: "#f7f7f7",
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: "hidden"
};
const confirm = Modal.confirm;

function onBlur() {
    console.log("blur");
}

function onFocus() {
    console.log("focus");
}

function onSearch(val) {
    console.log("search:", val);
}

class SponsorRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: true,
            type: this.props.type,
            events: [],
            request: [],
            event_id: ""
        };
        this.getNGOEvent = this.getNGOEvent.bind(this);
        this.onChange = this.onChange.bind(this);

        this.showConfirm = this.showConfirm.bind(this);
        this.showConfirmDel = this.showConfirmDel.bind(this);
    }
    componentDidMount() {
        this.getNGOEvent();
        if (this.props.type == "cash") {
            this.setState({
                details: true
            });
        } else {
            this.setState({
                details: false
            });
        }
    }
    getSponsors(value) {
        getSponsorships(value, "pending", this.state.type).then(res => {
            if (res) {
                this.setState({
                    request: res.data
                });
                console.log(res.data);
            }
        });
    }
    onChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            event_id: value
        });
        this.getSponsors(value);
    }
    getNGOEvent() {
        getEvents().then(res => {
            if (res) {
                this.setState({
                    events: res.data
                });
                console.log(res.data);
            }
        });
    }
    showConfirm(item) {
        var acc = false;
        confirm({
            title: "Are you sure this order is completed?",
            content: "Sponsorship ID: " + item.sponsorship_id,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                acceptSponsor(item.sponsorship_id).then(res => {
                    if (res) {
                        message.success("Sponsorship Accepted!!");
                        createConvo(item.ngo_id, item.vendor_id).then(res => {
                            if (res) {
                                notification["info"]({
                                    message: "Chat Now",
                                    description:
                                        "Now you can chat with the sponsor. Open messages now!"
                                });
                            }
                        });
                        acc = true;
                    } else {
                        message.error("Action could not be performed!");
                        acc = false;
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
                message.error("Still Pending");
                acc = false;
            }
        });
        // console.log(acc);
        // if (acc) {
        //     const filteredItems = this.state.request.filter(
        //         items => items !== item
        //     );
        //     console.log(filteredItems);
        //     // this.setState({
        //     //     request: []
        //     // });
        //     // this.getSponsors(this.state.event_id);
        // }
    }

    showConfirmDel(item) {
        confirm({
            title: "Are you sure this order is completed?",
            content: "Sponsorship ID: " + item.sponsorship_id,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                console.log("OK");
                rejectSponsor(item.sponsorship_id).then(res => {
                    if (res) {
                        message.warning("Sponsorship Rejected!!");
                    } else {
                        message.error("Action could not be performed!");
                    }
                });
            },
            onCancel() {
                console.log("Cancel");
                message.error("Still Pending");
            }
        });
    }
    render() {
        return (
            <div>
                <br />
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an Event"
                    optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.state.events.map((item, i) => (
                        <Option value={item.event_id} key={i}>
                            {item.subject}
                        </Option>
                    ))}
                </Select>
                <br />
                <br />
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.request}
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
                                                {this.state.details ? (
                                                    <tr>
                                                        <th>Service Name</th>
                                                        <td>
                                                            {item.service_id}
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    <tr>
                                                        <th>Financial Aid</th>
                                                        <td>{item.donation}</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <br />
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                this.showConfirm(item)
                                            }
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            type="danger"
                                            onClick={() =>
                                                this.showConfirmDel(item)
                                            }
                                        >
                                            Reject
                                        </Button>
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

export default SponsorRequest;
