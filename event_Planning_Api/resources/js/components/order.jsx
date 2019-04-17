import React, { Component } from "react";
import { Avatar, Row, Col, Button } from "antd";
import ReactPlayer from "react-player";
import OrderForm from "./custOrderForm";
import Feedbacks from "./feedbacks";
class Order extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }
    showOrder() {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <Row>
                    <Col span={14} offset={2}>
                        <div className="text-to-left">
                            <Avatar size={64} icon="user" />
                            <span>
                                <h4>Service Name</h4>
                            </span>
                            <br />
                            <ReactPlayer
                                url="https://www.youtube.com/watch?v=lqx5ocbekWA"
                                playing
                            />
                            <br />
                            <p>Event Type: </p>
                            <p>Category: </p>
                            <p>Price:</p>
                            <p>No of Pictures:</p>
                            <p>No of hours:</p>
                            <p>Description: </p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Aliquid quod nostrum inventore
                                sit accusantium alias, maiores quo cumque, error
                                perferendis at et quasi sequi, distinctio
                                assumenda dicta ea officia in.
                            </p>
                        </div>
                    </Col>
                    <Col span={7} offset={1}>
                        {this.state.show ? <OrderForm /> : <div />}
                    </Col>
                </Row>
                <Row>
                    <Col span={14} offset={2}>
                        <Button
                            type="primary"
                            style={{ width: "100%" }}
                            onClick={this.showOrder.bind(this)}
                        >
                            Order Now
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={14} offset={2}>
                        <Feedbacks />
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default Order;
