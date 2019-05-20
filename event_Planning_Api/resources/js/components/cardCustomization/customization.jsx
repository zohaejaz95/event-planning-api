import React, { Component } from "react";
import { Row, Col } from "antd";
import TemplatesBar from "./templatesBar";
class Customization extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={16}>html template here!</Col>
                    <Col span={8}>
                        <Row>Color palettes</Row>
                        <hr />
                        <Row>
                            <TemplatesBar />
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Customization;
