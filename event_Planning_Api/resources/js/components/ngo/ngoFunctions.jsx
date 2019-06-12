import axios from "axios";
import { message, notification } from "antd";

export const ngoProfile = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/ngo/token", {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const createEvent = event => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .post("/api/NGOs/create/event", event, {
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
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const getEvents = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/NGOs/get/events/token", {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const getEventStatus = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/NGOs/sponsorships/funding/" + id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const getSponsorships = (id, status, type) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/NGOs/sponsorships/get/" + id + "/" + status + "/" + type, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};
