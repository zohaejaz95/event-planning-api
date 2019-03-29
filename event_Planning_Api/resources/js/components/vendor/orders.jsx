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
            <div>
                <div
                    style={{
                        background: "#fff",
                        padding: 32,
                        minHeight: 280
                    }}
                    className="text-to-left"
                >
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Request" key="1">
                            <OrderRequests />
                        </TabPane>
                        <TabPane tab="Pending" key="2">
                            <OrdersPending />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Orders;
