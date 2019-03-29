import React, { Component } from "react";
import { Modal, Icon, Button } from "antd";
import LoginForm from "./loginForm";

class Login extends Component {
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
                    <Icon type="login" />
                    Login
                </div>
                <Modal
                    title="Login"
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
                        <LoginForm />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Login;
