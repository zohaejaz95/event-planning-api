import React, { Component } from "react";
import { Card } from "antd";

const { Meta } = Card;
class Cards extends Component {
    render() {
        const { events } = this.props;
        return (
            <div>
                {events.map(tag => (
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <img
                                alt="example"
                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                        }
                    >
                        <Meta title={tag} key={tag} />
                    </Card>
                ))}
            </div>
        );
    }
}

export default Cards;
