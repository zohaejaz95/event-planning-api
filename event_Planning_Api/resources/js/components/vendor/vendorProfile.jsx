import React, { Component } from "react";
import { Row, Col } from "antd";
//import Upload from "./upload";
import Cate from "../../images/cate.jpg";
class VendorProfile extends Component {
  render() {
    return (
      <div className="gutter-example">
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <div className="gutter-box">
              <img src={Cate} alt="Cate" className="avatar-uploader" />
            </div>
          </Col>
          <Col className="gutter-row" span={18} offset={1}>
            <div className="gutter-box">skjdfnkjs</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VendorProfile;
