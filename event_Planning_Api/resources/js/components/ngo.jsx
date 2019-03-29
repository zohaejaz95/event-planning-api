import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import ngoMain from "../images/ngo-main.jpg";
import joinWork from "../images/join-work.jpg";

class NGO extends Component {
    render() {
        return (
            <div className="contents">
                <img
                    src={ngoMain}
                    alt={joinWork}
                    className="img-fluid myImage"
                />
                <div className="ngo-reg">
                    <h3>Come together for a better cause.</h3>
                    <h6>Get quality sponsors for your events or projects.</h6>
                    <Link to="/ngo/register">
                        <button className="btn btn-success">
                            Register Now
                        </button>
                    </Link>
                </div>
                <br />
                <br />
                <br />
                <h3>Featured NGOs</h3>
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-left">
                            <img
                                src={ngoMain}
                                alt="NGO Name"
                                style={{ width: 300, float: "left" }}
                                className="m-4"
                            />
                            <br />
                            <h5>NGO Name 1</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iste repudiandae similique,
                                quia consectetur, et, temporibus modi dolorem
                                quasi id fugiat fugit laboriosam optio eveniet
                                perspiciatis earum aspernatur nam. Esse, quod?
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-right">
                            <img
                                src={ngoMain}
                                alt="NGO Name"
                                style={{ width: 300, float: "right" }}
                                className="m-4"
                            />
                            <br />
                            <h5>NGO Name 2</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iste repudiandae similique,
                                quia consectetur, et, temporibus modi dolorem
                                quasi id fugiat fugit laboriosam optio eveniet
                                perspiciatis earum aspernatur nam. Esse, quod?
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-left">
                            <img
                                src={ngoMain}
                                alt="NGO Name"
                                style={{ width: 300, float: "left" }}
                                className="m-4"
                            />
                            <br />
                            <h5>NGO Name 3</h5>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iste repudiandae similique,
                                quia consectetur, et, temporibus modi dolorem
                                quasi id fugiat fugit laboriosam optio eveniet
                                perspiciatis earum aspernatur nam. Esse, quod?
                            </p>
                        </div>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default NGO;
