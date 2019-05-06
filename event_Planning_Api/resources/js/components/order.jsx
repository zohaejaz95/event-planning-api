import React, { Component } from "react";
import { Avatar, Row, Col, Button } from "antd";
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
                        {this.state.show ? (
                            <div>
                                <OrderForm />
                            </div>
                        ) : (
                            <div />
                        )}
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
