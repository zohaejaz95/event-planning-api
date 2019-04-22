import axios from "axios";

export const register = newUser => {
    return axios
        .post("/api/register", {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            user_type: newUser.user_type
        })
        .then(response => {
            console.log("Registered as User: " + response.data);
            localStorage.setItem("usertoken", response.data);
            //console.log();
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
export const getPendingVendors = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/admin/vendor/pending/", {
            headers: { Authorization: "Bearer " + token.api_token }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getPendingNGOs = () => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    return axios
        .get("/api/admin/NGO/pending/", {
            headers: { Authorization: "Bearer " + token.api_token }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateVendorStatus = id => {
    const token = JSON.parse(localStorage.getItem("usertoken"));
    //console.log(token.api_token);
    console.log(id);
    return axios
        .put("/api/admin/vendor/update/${id}", {
            headers: { Authorization: "Bearer " + token.api_token }
        })
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};
export const customerRegister = newUser => {
    return axios
        .post(
            "/api/customer/create",
            {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                contact: newUser.contact,
                address: newUser.address
            },
            {
                headers: { Authorization: "Bearer ${localStorage.usertoken}" },
                headers: { "Content-Type": "application/json" }
            }
        )
        .then(response => {
            console.log("Registeration Successful!");
        })
        .catch(err => {
            console.log(err);
        });
};

export const vendorRegister = newUser => {
    return axios
        .post("/api/vendor/create", {
            vendor_name: newUser.name,
            description: newUser.description,
            contact: newUser.contact,
            email: newUser.email,
            website: newUser.website,
            username: newUser.username,
            account_status: newUser.status
        })
        .then(response => {
            console.log("Registered");
        })
        .catch(err => {
            console.log(err);
        });
};

export const ngoRegister = newUser => {
    return axios
        .post("/api/ngo/create", {
            ngo_name: newUser.name,
            purpose: newUser.purpose,
            contact: newUser.contact,
            email: newUser.email,
            website: newUser.website,
            username: newUser.username,
            status: newUser.status
        })
        .then(response => {
            console.log("Registered");
        })
        .catch(err => {
            console.log(err);
        });
};

export const userLogin = user => {
    return axios
        .post("/api/login", {
            email: user.email,
            password: user.password
        })
        .then(response => {
            console.log("Login Successfull");
            console.log(response.data.data);
            localStorage.setItem(
                "usertoken",
                JSON.stringify(response.data.data)
            );
            console.log(JSON.parse(localStorage.getItem("usertoken")));
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

export const customerProfile = () => {
    return axios
        .post("api/customer/profile", {
            headers: { Authorization: "Bearer ${localStorage.usertoken}" }
        })
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
};

/*
export const vendorLogin = user => {
  return axios
    .post("vendor/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};


export const userLogout = user => {
  return axios
      .post("/api/logout", {
          email: user.email,
          password: user.password
      })
      .then(response => {
          localStorage.setItem("usertoken", response.data);
          return response.data;
      })
      .catch(err => {
          console.log(err);
      });
};

export const ngoLogin = user => {
  return axios
    .post("ngo/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const adminLogin = user => {
  return axios
    .post("customer/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
*/
