import React, { Component } from "react";

import { Tabs } from "antd";
import SponsorRequest from "./sponsorRequest";
import Sponsorships from "./sponsorships";

const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
class Sponsors extends Component {
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
                            <SponsorRequest />
                        </TabPane>
                        <TabPane tab="Pending" key="2">
                            <Sponsorships />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Sponsors;
