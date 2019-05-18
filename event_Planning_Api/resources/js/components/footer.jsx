import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import Background from "../images/bg-petals.jpg";
class Footer extends Component {
    render() {
        var sectionStyle = {
            width: "100%",
            //backgroundImage: `url(${Background})`,
            /* Add the blur effect */
            filter: blur("8px"),
            WebkitFilter: blur("8px"),
            //height: "500px",
            /* Center and scale the image nicely */
            backgroundPosition: "center",
            backgroundRepeat: "no - repeat",
            backgroundSize: "cover"
        };
        /* Position text in the middle of the page/image */
        var bgText = {
            backgroundColor: "rgb(0, 0, 0)" /* Fallback color */,
            backgroundColor:
                "rgba(0,0,0, 0.2)" /* Black w/opacity/see-through */,
            color: "white",
            //fontWeight: "bold",
            border: "3px solid #f1f1f1",
            position: "relative",
            //top: "50%",
            //left: "50%",
            //transform: "translate(-50%, -50%)",
            zIndex: "2",
            width: "100%",
            padding: "20px",
            textAlign: "center"
        };
        return (
            <footer style={{ width: "100%" }}>
                <br />
                <div style={sectionStyle}>
                    <Row type="flex" justify="space-around" style={bgText}>
                        <Col span={6} offset={2}>
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
                                <h6 className="eggplant-text">Event Era</h6>
                                <small>
                                    A website where you can plan your events
                                    virtually. We offer you a platform where you
                                    can find authentic vendors and contact them.
                                </small>
                            </div>
                        </Col>
                        <Col span={6} offset={2} className="text-to-left">
                            <h6 className="eggplant-text">Important Links</h6>

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

                        <Col span={8} className="text-to-left">
                            <div>
                                <h6 className="eggplant-text">Follow us on:</h6>
                                <a
                                    href="https://www.facebook.com/"
                                    style={{ color: "dodgerblue" }}
                                    target="_blank"
                                >
                                    <Icon
                                        type="facebook"
                                        className="m-2 social-icon"
                                    />
                                </a>
                                <a
                                    href="https://twitter.com/"
                                    style={{ color: "deepskyblue" }}
                                    target="_blank"
                                >
                                    <Icon
                                        type="twitter"
                                        className="m-2 social-icon"
                                    />
                                </a>
                                <a
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    style={{ color: "hotpink" }}
                                >
                                    <Icon
                                        type="instagram"
                                        className="m-2 social-icon"
                                    />
                                </a>
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
                                <br />
                                <a href="/contact-us">About Us</a>
                                <br />
                                <a href="/contact-us">Contact Us</a>
                                <br />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="end-footer">
                    <br />
                    <p> Event Era ©2019 Created by COMSATS Students</p>
                    <br />
                </div>
            </footer>
        );
    }
}

export default Footer;
