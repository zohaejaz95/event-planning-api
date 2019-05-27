import axios from "axios";

export const customerProfile = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .get("/api/customer/token", {
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
        });
};

export const createEvent = event => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .post("/api/customer/newevent", event, {
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

export const createContact = contact => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .post("/api/customer/newcontact", contact, {
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

export const getExpenses = event_id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));

    return axios
        .get("/api/customer/events/expenses/" + event_id, {
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
        });
};

export const updateEventStatus = (id, status) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .post(
            "/api/customer/events/update/status",
            { id: id, status: status },
            {
                headers: {
                    "Content-Type": "application/json",
                    Access: "application/json",
                    Authorization: "Bearer " + token.api_token
                }
            }
        )
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

export const getEvents = stat => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/customer/events/list/" + stat, {
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
export const getActiveEvents = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/customer/events/active/", {
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

export const getService = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);

    return axios
        .get("/api/vendor/get/service/" + id, {
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

export const getPackage = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);

    return axios
        .get("/api/vendor/get/package/" + id, {
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

export const getContacts = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    return axios
        .get("/api/customer/contacts", {
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
export const getGuests = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    //console.log(token.api_token);
    return axios
        .get("/api/customer/guest_list/get/" + id, {
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

export const getPendingOrders = (id, type) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    console.log(id, type);
    var event = { id: id };
    return axios
        .get(
            "/api/customer/orders/pending/" +
                type +
                "/" +
                id +
                "?api_token=" +
                token.api_token,
            event,
            {
                headers: {
                    "Content-Type": "application/json",
                    Access: "application/json",
                    Authorization: "Bearer " + token.api_token
                }
            }
        )
        .then(response => {
            //console.log(response);
            return response;
        })
        .catch(err => {
            console.log(err);
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const getApprovedOrders = (id, order_type) => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    var event = {
        id: id
    };
    return axios
        .get(
            "/api/customer/orders/approved/" +
                order_type +
                "/" +
                id +
                "?api_token=" +
                token.api_token,
            event,
            {
                headers: {
                    "Content-Type": "application/json",
                    Access: "application/json",
                    Authorization: "Bearer " + token.api_token
                }
            }
        )
        .then(response => {
            //console.log(response);
            return response;
        })
        .catch(err => {
            console.log(err);
            console.log(typeof err);
            if (err.response) {
                console.log(err.response);
            }
        });
};

export const addGuest = guest => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    console.log(guest);

    return axios
        .post("api/customer/guest_list/add", guest, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};
export const deleteContact = contact => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    //console.log(guest);

    return axios
        .delete("api/customer/contacts/delete/" + contact, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};
export const deleteGuest = guest => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    console.log(guest);

    return axios
        .delete("api/customer/guest_list/remove/" + guest, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
            return true;
        })
        .catch(err => {
            console.log(err);
        });
};

export const deleteEvent = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //newUser["api_token"] = token.api_token;
    console.log(token.api_token);
    //console.log(guest);

    return axios
        .delete("api/customer/events/delete/" + id, {
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                Authorization: "Bearer " + token.api_token
            }
        })
        .then(response => {
            console.log(response.data);
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

export const newOrder = items => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //console.log(token.api_token);
    return axios
        .post("/api/customer/orders/new", items, {
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
