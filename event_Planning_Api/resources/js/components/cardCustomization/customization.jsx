import React, { Component } from "react";
import { Row, Col } from "antd";
import TemplatesBar from "./templatesBar";
import { SketchPicker } from "react-color";
class Customization extends Component {
    constructor() {
        super();
        this.state = {
            background: "#fff"
        };
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    handleChangeComplete(color) {
        this.setState({ background: color.hex });
        console.log(color);
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={16}>html template here!</Col>
                    <Col span={8}>
                        <Row>
                            <SketchPicker
                                color={this.state.background}
                                onChangeComplete={this.handleChangeComplete}
                            />
                        </Row>
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
