import React, { Component } from "react";
import { List, Avatar, Button, Icon, message } from "antd";
import ReactPlayer from "react-player";

//import VendorDetail from "../admin/vendorDetail";
import avatar from "../../images/avatar.jpg";
import { getPackages, deletePackages } from "./vendorFunctions";
const ButtonGroup = Button.Group;

class Packages extends Component {
    constructor() {
        super();
        this.state = {
            detail: false,
            packages: [],
            pack: []
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
            detail: false
        });
    }
    toggleDetails(item) {
        this.setState({
            detail: true,
            pack: item
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
            detail: false
        });
    }
    render() {
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
                <Button type="primary" onClick={this.toggleDetail.bind(this)}>
                    Back
                    <Icon type="left-circle" />
                </Button>
                <br />
                <br />
                <Avatar size={64} icon="user" />
                <span>
                    <h4>{this.state.pack.name}</h4>
                </span>
                <br />
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=lqx5ocbekWA"
                    playing
                />
                <br />
                <p>Expiration date:</p>
                <p className="m-4">{this.state.pack.expiration_date}</p>
                <p>Description: </p>
                <p>{this.state.pack.description}</p>
                <Button type="primary">Update</Button>
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

                {this.state.detail ? packageDetail : packageList}
            </div>
        );
    }
}

export default Packages;
