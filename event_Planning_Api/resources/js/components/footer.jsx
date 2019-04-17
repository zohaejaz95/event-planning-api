import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div style={{ width: "100%" }} className="sand">
                <hr />
                <br />
                <footer>
                    <Row type="flex" justify="space-around">
                        <Col span={6}>
                            <div>
                                <p>Are you a vendor?</p>
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                >
                                    Register Here
                                </button>
                            </div>
                            <br />
                            <br />
                            <div>
                                <h6>Event Era</h6>
                                <small>
                                    A website where you can plan your events
                                    virtually. We offer you a platform where you
                                    can find authentic vendors and contact them.
                                </small>
                            </div>
                        </Col>
                        <Col span={6}>
                            <h6>Important Links</h6>
                            <Link to="/">Photography</Link>
                            <br />
                            <Link to="/">Videography</Link>
                            <br />
                            <Link to="/">Makeup Artist</Link>
                            <br />
                            <Link to="/">Decorators</Link>
                            <br />
                            <Link to="/">Designers</Link>
                            <br />
                            <Link to="/">Venues</Link>
                            <br />
                            <Link to="/">Invitations and Cards</Link>
                            <br />
                            <Link to="/">Food and Catering Services</Link>
                            <br />
                            <Link to="/">Music and Entertainment</Link>
                            <br />
                            <Link to="/">Car Rental Services</Link>
                            <br />
                            <Link to="/">Event Planners</Link>
                        </Col>

                        <Col span={8}>
                            <div>
                                <h6>Follow us on:</h6>
                                <Link to="">
                                    <Icon
                                        type="facebook"
                                        className="m-2 social-icon"
                                    />
                                </Link>
                                <Link to="">
                                    <Icon
                                        type="twitter"
                                        className="m-2 social-icon"
                                    />
                                </Link>
                                <Link to="">
                                    <Icon
                                        type="instagram"
                                        className="m-2 social-icon"
                                    />
                                </Link>
                            </div>
                            <br />
                            <div>
                                <h6>Other Links:</h6>
                                <Icon type="mail" />:
                                <a href="mailto:zohaejaz@live.com?subject=Event%20Contact%20Subject%20Subject">
                                    zohaejaz@live.com
                                </a>
                                <br />
                                <Icon type="phone" />:
                                <a href="tel:#">+92 7568543012</a>
                                <br />
                                <Icon type="phone" />:
                                <a href="tel:#">+92 3214905067</a>
                                <br />
                                <a href="/contact-us">About Us</a>
                                <br />
                                <a href="/contact-us">Contact Us</a>
                                <br />
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <div className="grape">
                        <br />
                        Event Era ©2019 Created by COMSATS Students
                    </div>
                </footer>
                <br />
                <br />
            </div>
        );
    }
}

export default Footer;
