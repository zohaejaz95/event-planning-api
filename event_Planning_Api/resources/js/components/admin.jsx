import React, { Component } from "react";
import { Row, Col, Card, Icon, Layout, Tabs } from "antd";
import VendorInfo from "./admin/vendorInfo";
//import CustomerInfo from "./admin/customerInfo";
import NGOInfo from "./admin/ngoInfo";

import avatar from "../images/avatar.jpg";

const { Meta } = Card;
const { Content } = Layout;
const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
class Admin extends Component {
    render() {
        return (
            <div className="content">
                <br />
                <br />
                <Row type="flex" justify="space-around">
                    <Col span={4} />
                    <Col span={14}>
                        <Content>
                            <div
                                style={{
                                    background: "#fff",
                                    padding: 24,
                                    minHeight: 280
                                }}
                                className="text-to-left"
                            >
                                <Tabs defaultActiveKey="1" onChange={callback}>
                                    <TabPane tab="Vendors" key="1">
                                        <VendorInfo />
                                    </TabPane>
                                    <TabPane tab="NGOs" key="2">
                                        <NGOInfo />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Content>
                    </Col>
                </Row>
                <div className="admin-left-div">
                    <Card
                        style={{ width: 300 }}
                        cover={<img alt="example" src={avatar} />}
                        actions={[
                            <Icon type="setting" />,
                            <Icon type="edit" />,
                            <Icon type="logout" />
                        ]}
                    >
                        <Meta title="Username" description="email address" />
                    </Card>
                </div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default Admin;
