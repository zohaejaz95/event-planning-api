import axios from "axios";

export const getVendorToNgo = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/chat/ngo/conversations/vendor", {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response.data.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getNgoToVendor = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/chat/ngo/conversations", {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response.data.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getChatNgo = convo_id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/chat/ngo/chat/" + convo_id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response.data.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const sendMsgNGO = (ngo_id, ven_id) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/chat/ngo/new/conversation/" + ngo_id + "/" + ven_id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response.data.data);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};
