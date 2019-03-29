import React, { Component } from "react";
import { Modal, Icon, Button } from "antd";
import CustomerForm from "./customerForm";
class CustomerRegister extends Component {
    constructor() {
        super();
        this.state = {
            visible: false
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    }

    handleCancel(e) {
        console.log(e);
        this.setState({
            visible: false
        });
    }
    render() {
        return (
            <div>
                <div onClick={this.showModal}>
                    <Icon type="user-add" />
                    Register
                </div>
                <Modal
                    title="Register"
                    style={{ top: "8%", width: "1em" }}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button
                            className="m-2"
                            type="danger"
                            key="back"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </Button>
                    ]}
                >
                    <div>
                        <CustomerForm />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default CustomerRegister;
