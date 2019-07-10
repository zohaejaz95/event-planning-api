import React, { Component } from "react";
import { List, Avatar, Button, Icon, Select, message, Row, Col } from "antd";
//import ReactPlayer from "react-player";
import ServiceDetails from "./serviceDetails";
import avatar from "../../images/avatar.jpg";
import UpdateService from "./updateService";
import { getServicesCatToken, deleteServices } from "./vendorFunctions";

const ButtonGroup = Button.Group;

class Services extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            category: "",
            service: [],
            show: [],
            profile: [],
            edit: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.paginateService = this.paginateService.bind(this);
        this.deleteService = this.deleteService.bind(this);
    }
    toggleDetail(item) {
        this.setState({
            detail: true,
            show: item,
            edit: false
        });
    }
    toggleDetails() {
        this.setState({
            detail: false,
            edit: false
        });
    }
    toggleEdit() {
        this.setState({
            edit: true,
            detail: false
        });
    }
    handleChange(value) {
        console.log(`selected ${value}`);
        this.setState({
            category: value,
            profile: JSON.parse(localStorage.getItem("profile"))
        });
        this.paginateService(value);
    }
    paginateService(value) {
        getServicesCatToken(value).then(res => {
            if (res) {
                //console.log(res.data);
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
    deleteService(id) {
        deleteServices(id).then(res => {
            if (res) {
                message.success("Service Deleted!");
                this.setState({
                    detail: false,
                    show: []
                });
            } else {
                message.error("Unable to delete service!");
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
            <div style={{ minHeight: 420 }}>
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
                <Row>
                    <Col span={14}>
                        <Button
                            type="primary"
                            onClick={this.toggleDetails.bind(this)}
                        >
                            Back
                            <Icon type="left-circle" />
                        </Button>
                        <br />
                        <br />

                        <ServiceDetails service={this.state.show} />

                        <Button
                            type="primary"
                            onClick={this.toggleEdit.bind(this)}
                        >
                            Update
                        </Button>
                        <Button
                            type="danger"
                            onClick={() =>
                                this.deleteService(this.state.show.id)
                            }
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
                <br />
            </div>
        );
        return (
            <div>
                <br />

                {this.state.detail ? (
                    serviceDetail
                ) : this.state.edit ? (
                    <div>
                        <Button
                            type="primary"
                            onClick={() => this.toggleDetail(this.state.show)}
                        >
                            Back
                        </Button>
                        <UpdateService service={this.state.show} />
                    </div>
                ) : (
                    serviceList
                )}
            </div>
        );
    }
}

export default Services;
