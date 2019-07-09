import React, { Component } from "react";
import Footer from "./footer";
import { Row, Col } from "antd";

import contact from "../images/contact-us.jpg";
import cate from "../images/cate.jpg";

class ContactUs extends Component {
    render() {
        //const { getFieldDecorator } = this.props.form;
        return (
            <div className="contents">
                <br />
                <br />
                <Row>
                    <Col span={12}>
                        <img
                            src={contact}
                            alt="Contact Us Here"
                            className="img-fluid myImage"
                        />
                    </Col>
                    <Col span={10} offset={2}>
                        <br />
                        <address>
                            Email us at:{" "}
                            <a href="mailto:zohaejaz@live.com">EventEra</a>
                            <br />
                            Visit us at: <a href="/">www.eventera.com</a>
                            <br />
                            COMSATS University Islamabad,
                            <br />
                            Lahore Campus,
                            <br />
                            Off Riwind Road,
                            <br />
                            Lahore, Pakistan
                        </address>
                    </Col>
                </Row>

                <br />
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <h5>About Us</h5>
                        <br />
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iste repudiandae similique, quia consectetur,
                            et, temporibus modi dolorem quasi id fugiat fugit
                            laboriosam optio eveniet perspiciatis earum
                            aspernatur nam. Esse, quod?
                        </p>
                    </Col>
                </Row>

                <br />
                <br />
                <Row>
                    <Col span={20} offset={2}>
                        <div className="text-to-left">
                            <img
                                src={cate}
                                alt="zoha"
                                style={{ width: 300, float: "left" }}
                                className="m-4"
                            />
                            <br />
                            <h5>Zoha Ejaz</h5>
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
                                src={cate}
                                alt="zaeem"
                                style={{ width: 300, float: "right" }}
                                className="m-4"
                            />
                            <br />
                            <h5>Zaeem Waqas</h5>
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
                                src={cate}
                                alt="umer"
                                style={{ width: 300, float: "left" }}
                                className="m-4"
                            />
                            <br />
                            <h5>Umer Ali Sajid</h5>
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
                <Footer />
            </div>
        );
    }
}

export default ContactUs;
/**
 * <a href="mailto:name1@rapidtables.com?cc=name2@rapidtables.com&bcc=name3@rapidtables.com
&amp;subject=The%20subject%20of%20the%20email
&amp;body=The%20body%20of%20the%20email">
Send mail with cc, bcc, subject and body</a>
 */
