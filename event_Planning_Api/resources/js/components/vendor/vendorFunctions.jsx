import axios from "axios";

export const vendorProfile = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .get("/api/vendor/token", {
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

export const getLocation = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/vendor/locations", {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
export const getCategory = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/vendor/categories", {
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

export const createService = service => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .post("/api/vendor/create/service", service, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};

export const createPackages = service => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .post("/api/vendor/create/package", service, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getPackages = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/vendor/get/packages/token/", {
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
export const getAllPackages = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/vendor/get/packages/all", {
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

export const getAllServices = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/vendor/get/service/all/token", {
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
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const deletePackages = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .delete("/api/vendor/delete/package/" + id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteServices = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .delete("/api/vendor/delete/serivce/" + id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getServicesCat = cat => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/vendor/get/service/category/" + cat, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getServicesCatToken = cat => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/vendor/get/service/category/token/" + cat, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getVendorServices = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/vendor/get/services", {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
export const getServices = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/vendor/get/service/category/" + cat, id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getOrderRequests = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/" + cat, id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
export const getOrderPending = type => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/vendor/get/orders/pending/" + type, {
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
export const getOrderApproved = type => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/vendor/get/orders/approved/" + type, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response);
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

export const updateOrderStatus = (id, status) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/vendor/update/orders/" + id + "/" + status, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response);
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

//sponsorship apis
export const getNGOEvents = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .get("/api/NGOs/get/events", {
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

export const getNGOData = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/NGOs/" + id, {
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

export const createSponsorship = data => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .post("/api/NGOs/create/sponsorship", data, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            //console.log(response);

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
