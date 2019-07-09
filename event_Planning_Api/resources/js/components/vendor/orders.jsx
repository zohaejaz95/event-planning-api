import React, { Component } from "react";

import { Tabs } from "antd";
import OrderRequests from "./orderRequests";
import OrdersPending from "./ordersPending";

const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
class Orders extends Component {
    render() {
        return (
            <div style={{ minHeight: 400 }}>
                <div
                    style={{
                        background: "#fff",
                        padding: 32
                    }}
                    className="text-to-left"
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Request" key="1">
                            <div
                                style={{
                                    paddingLeft: "5%",
                                    paddingRight: "5%"
                                }}
                            >
                                <Tabs defaultActiveKey="3" onChange={callback}>
                                    <TabPane tab="Services" key="3">
                                        <OrderRequests order_type="services" />
                                    </TabPane>
                                    <TabPane tab="Packages" key="4">
                                        <OrderRequests order_type="packages" />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Pending" key="2">
                            <div
                                style={{
                                    paddingLeft: "5%",
                                    paddingRight: "5%"
                                }}
                            >
                                <Tabs defaultActiveKey="5" onChange={callback}>
                                    <TabPane tab="Services" key="5">
                                        <OrdersPending order_type="services" />
                                    </TabPane>
                                    <TabPane tab="Packages" key="6">
                                        <OrdersPending order_type="packages" />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div style={{ height: 40 }} />
            </div>
        );
    }
}

export default Orders;
