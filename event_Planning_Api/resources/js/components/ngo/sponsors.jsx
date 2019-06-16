import React, { Component } from "react";

import { Tabs } from "antd";
import SponsorRequest from "./sponsorRequest";
//import Sponsorships from "./sponsorships";

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
                        <TabPane tab="Request: Financial" key="1">
                            <SponsorRequest type="cash" />
                        </TabPane>
                        <TabPane tab="Request: Services" key="2">
                            <SponsorRequest type="service" />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Sponsors;
