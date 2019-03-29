import React, { Component } from "react";
import { Row, Col } from "antd";
//import Upload from "./upload";
//import Cate from "../../images/cate.jpg";
import Avatar from "../../images/avatar.jpg";

class VendorProfile extends Component {
    render() {
        return (
            <div className="contents ">
                <Row>
                    <Col span={4}>
                        <img className="avatar-uploader" src={Avatar} alt="" />
                    </Col>
                    <Col
                        span={19}
                        offset={1}
                        style={{ background: "#ECECEC", padding: "30px" }}
                    >
                        <h4>Vendor name</h4>
                        <p>Email: </p>
                        <p>Website: </p>
                        <p>Contact:</p>
                        <p>City/ies: </p>
                        <p>Events: </p>
                        <p>Payment Methods:</p>
                        <p>Description: </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Iste ipsam doloribus mollitia minima a enim
                            sit, aliquid amet temporibus eum autem recusandae
                            culpa vel perspiciatis dolorem repellendus similique
                            deleniti laudantium?
                        </p>
                    </Col>
                </Row>
                <br />
            </div>
        );
    }
}

export default VendorProfile;
