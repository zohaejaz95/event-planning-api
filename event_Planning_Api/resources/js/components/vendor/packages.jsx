import React, { Component } from "react";
import { List, Avatar, Button, Icon } from "antd";
//import VendorDetail from "../admin/vendorDetail";
import avatar from "../../images/avatar.jpg";

const ButtonGroup = Button.Group;
const data = [
    {
        title: "Package 1"
    },
    {
        title: "Package 2"
    },
    {
        title: "Package 3"
    },
    {
        title: "Package 4"
    },
    {
        title: "Package 5"
    }
];

class Packages extends Component {
    constructor() {
        super();
        this.state = {
            detail: false
        };
        this.toggleDetail = this.toggleDetail.bind(this);
    }
    toggleDetail() {
        this.setState({
            detail: !this.state.detail
        });
    }
    render() {
        const packageList = (
            <div>
                <h4>Packages</h4>
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
                                    description="Category and Events"
                                />
                                <Button
                                    type="primary"
                                    onClick={this.toggleDetail.bind(this)}
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
                    <h4>Package Name</h4>
                </span>
                <br />
                <p>Service: </p>
                <p>Price: </p>

                <p>Description: </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Saepe numquam eveniet quo esse debitis mollitia, ratione
                    maiores, quidem deleniti quam inventore voluptatum cumque
                    vitae commodi nobis reprehenderit natus provident dolores.
                </p>
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
