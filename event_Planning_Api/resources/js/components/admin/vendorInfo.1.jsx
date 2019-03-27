import React, { Component } from "react";
import { Progress, Card, Collapse } from "antd";

const Panel = Collapse.Panel;

const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);
const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: "hidden"
};
class VendorInfo extends Component {
  render() {
    return (
      <div>
        <div>
          <Progress type="circle" percent={30} width={80} />
          <span />
          <Progress
            type="circle"
            percent={70}
            width={80}
            status="exception"
            className="m-4 "
          />
          <span />
          <Progress type="circle" percent={100} width={80} />
        </div>
        <br />
        <div>
          <Card>
            <p>Card content</p>
            <Collapse bordered={false} defaultActiveKey={["1"]}>
              <Panel header="Details" key="1" style={customPanelStyle}>
                {text}
              </Panel>
            </Collapse>
          </Card>

          <br />
          <Card>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <Collapse bordered={false}>
              <Panel
                header="This is panel header 2"
                key="2"
                style={customPanelStyle}
              >
                {text}
              </Panel>
              <Panel
                header="This is panel header 3"
                key="3"
                style={customPanelStyle}
              >
                {text}
              </Panel>
            </Collapse>
          </Card>
        </div>
      </div>
    );
  }
}

export default VendorInfo;
