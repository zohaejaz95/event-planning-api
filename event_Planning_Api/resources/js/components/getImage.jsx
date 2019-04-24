import React, { Component } from "react";
import { Upload, message, Button, Icon } from "antd";

class ImageUpload extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    render() {
        const props = {
            name: "file",
            action: "//jsonplaceholder.typicode.com/posts/",
            listType: "picture",
            className: "upload-list-inline"
            // headers: {
            //     authorization: "authorization-text"
            // }
        };
        return (
            <div>
                <Upload {...props} onClick={this.onChange}>
                    <Button>
                        <Icon type="upload" /> Upload Images
                    </Button>
                </Upload>
            </div>
        );
    }
}

export default ImageUpload;
