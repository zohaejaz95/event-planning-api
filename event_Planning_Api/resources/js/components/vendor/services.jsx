import React, { Component } from "react";
import { List, Avatar, Button, Icon, Select, message } from "antd";
import ReactPlayer from "react-player";
import avatar from "../../images/avatar.jpg";
import { getServicesCat, getServices } from "./vendorFunctions";

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
            detail: false,
            category: "",
            service: [],
            show: [],
            profile: []
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    toggleDetail(item) {
        this.setState({
            detail: true,
            show: item
        });
    }
    toggleDetails() {
        this.setState({
            detail: false
        });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            category: value,
            profile: JSON.parse(localStorage.getItem("profile"))
        });
        var id = this.state.profile.vendor_id;

        getServicesCat(value).then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    service: elist
                });
                console.log(this.state.service);
                console.log(this.state.service.length);
                console.log(this.state.service[0]);
                //console.log(this.state.service[0]);
            }
        });
    }
    render() {
        const Option = Select.Option;

        function handleBlur() {
            console.log("blur");
        }

        function handleFocus() {
            console.log("focus");
        }
        const serviceList = (
            <div>
                <h4>Services</h4>
                <hr />
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select category to search"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="photographs">Photography</Option>
                    <Option value="videography">Videography</Option>
                    <Option value="makeup artists">Makeup Artist</Option>
                    <Option value="decorators">Decorators</Option>
                    <Option value="designers">Designers</Option>
                    <Option value="venues">Venues</Option>
                    <Option value="cards">Invitations and Cards</Option>
                    <Option value="catering">Food and Catering Services</Option>
                    <Option value="entertainment">
                        Music and Entertainment
                    </Option>
                    <Option value="car rental">Car Rental Services</Option>
                    <Option value="event planners">Event Planners</Option>
                </Select>
                <br />
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.service}
                    renderItem={item => (
                        <div>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={avatar} />}
                                    title={<p>{item.service_name}</p>}
                                    description={item.description}
                                />
                                <Button
                                    type="primary"
                                    onClick={() => this.toggleDetail(item)}
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
                <Button type="primary" onClick={this.toggleDetails.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>{this.state.show.service_name}</h4>
                </span>
                <br />
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=lqx5ocbekWA"
                    playing
                />
                <br />
                <h6>Event Type: </h6> {this.state.show.event_type}
                <h6>Category: </h6> {this.state.show.category}
                <h6>Price: </h6> {this.state.show.price}
                <h6>Description: </h6>
                <p>{this.state.show.description}</p>
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
