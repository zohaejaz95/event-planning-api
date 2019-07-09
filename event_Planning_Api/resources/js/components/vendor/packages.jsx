import React, { Component } from "react";
import { List, Avatar, Button, Icon, message, Row, Col, Card } from "antd";
//import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import photography from "../../images/photography.jpg";
import UpdatePackage from "./updatePackage";
import PackageDetails from "./packageDetails";
import avatar from "../../images/avatar.jpg";
import { getPackages, deletePackages, getServicesCat } from "./vendorFunctions";
const ButtonGroup = Button.Group;

class Packages extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            packages: [],
            pack: [],
            services: [],
            edit: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
        this.paginatePackage = this.paginatePackage.bind(this);
        this.toggleDetails = this.toggleDetails.bind(this);
        this.deletePackage = this.deletePackage.bind(this);
    }
    paginatePackage() {
        getPackages().then(res => {
            if (res) {
                console.log(res);
                this.setState({
                    packages: res.data
                });
            }
        });
    }
    componentDidMount() {
        this.paginatePackage();
    }
    toggleDetail() {
        this.setState({
            detail: false,
            edit: false
        });
    }
    toggleDetails(item) {
        this.setState({
            detail: true,
            pack: item,
            edit: false
        });
        getServicesCat("photographs").then(res => {
            if (res) {
                console.log(res.data);
                const lists = JSON.stringify(res.data);
                const elist = JSON.parse(lists);
                this.setState({
                    services: elist
                });
            }
        });
    }
    deletePackage(id) {
        deletePackages(id).then(res => {
            if (res) {
                message.success("Package Deleted!");
            } else {
                message.error("Unable to delete package!");
            }
        });
        this.paginatePackage();
        this.setState({
            detail: false,
            edit: false
        });
    }
    editEvent() {
        this.setState({
            detail: false,
            edit: true
        });
    }
    render() {
        const { Meta } = Card;
        const cardLayout = {
            labelcol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrappercol: {
                xs: { span: 24 },
                sm: { span: 4 }
            }
        };
        const packageList = (
            <div>
                <h4>Packages</h4>
                <hr />
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.packages}
                    renderItem={item => (
                        <div>
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={avatar} />}
                                    title={<p>{item.name}</p>}
                                    description={item.description}
                                />
                                <Button
                                    type="primary"
                                    onClick={() => this.toggleDetails(item)}
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
        const packageDetail = (
            <div>
                <Row>
                    <Col span={14}>
                        <Button
                            type="primary"
                            onClick={this.toggleDetail.bind(this)}
                        >
                            Back
                            <Icon type="left-circle" />
                        </Button>
                        <br />
                        <br />

                        <PackageDetails package={this.state.pack} />
                    </Col>
                </Row>

                <Row type="flex" justify="center">
                    {this.state.services.map((serve, i) => (
                        <Col {...cardLayout} className="m-4" key={i}>
                            <Link
                                to={{
                                    pathname: "/services",
                                    search: "?id=" + serve.id,
                                    state: { service: serve }
                                }}
                            >
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    // cover={
                                    //     <img alt="example" src={photography} />
                                    // }
                                    key={i}
                                    onClick={() => this.toggleDetail(serve)}
                                >
                                    <Meta title={serve.service_name} />
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>

                <Button type="primary" onClick={this.editEvent.bind(this)}>
                    <Icon type="edit" />
                    Update
                </Button>
                <Button
                    type="danger"
                    onClick={() => this.deletePackage(this.state.pack.p_id)}
                >
                    Delete
                </Button>

                <br />
            </div>
        );
        return (
            <div>
                <br />

                {this.state.detail ? (
                    packageDetail
                ) : this.state.edit ? (
                    <div>
                        <Button
                            type="primary"
                            onClick={this.toggleDetail.bind(this)}
                        >
                            Back
                        </Button>
                        <UpdatePackage pack={this.state.pack} />
                    </div>
                ) : (
                    packageList
                )}
            </div>
        );
    }
}

export default Packages;
