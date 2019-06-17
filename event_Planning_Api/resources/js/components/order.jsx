import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import OrderForm from "./custOrderForm";
import Feedbacks from "./feedbacks";
class Order extends Component {
    constructor(props) {
        super(props);
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
                <Row>
                    <Col span={14} offset={2}>
                        {this.state.show ? (
                            <div>
                                <OrderForm
                                    order={this.props.order}
                                    details={this.props.details}
                                />
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
                <br />
                <Row>
                    <Col span={14} offset={2}>
                        <Feedbacks
                            type={this.props.type}
                            details={this.props.details}
                        />
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default Order;
