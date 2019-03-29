import React, { Component } from "react";
import { Progress, List, Avatar } from "antd";

const data = [
  {
    title: "Customer 1"
  },
  {
    title: "Customer 2"
  },
  {
    title: "Customer 3"
  },
  {
    title: "Customer 4"
  }
];
class CustomerInfo extends Component {
  render() {
    return (
      <div>
        <br />
        <div>
          <Progress percent={30} />
          <Progress percent={50} status="active" />
          <Progress percent={70} status="exception" />
          <Progress percent={100} />
          <Progress percent={50} showInfo={false} />
        </div>
        <br />
        <hr />
        <br />
        <h6>Clients</h6>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default CustomerInfo;
