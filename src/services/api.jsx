// import axios from "axios";

// const API = axios.create({
//     // baseURL: "http://localhost:3000"

//     baseURL:" https://megamart-backend-foau.onrender.com/products"
// });

// export default API;
//----------------------------------------
// import axios from "axios";

// const API = axios.create({
//     // baseURL: "https://megamart-backend-foau.onrender.com"
//     baseURL: "http://localhost:9090"
// });

// export default API;


// import axios from "axios";

// const API = axios.create({
//     baseURL: "https://pct-metadata-engine-pounds.trycloudflare.com"
// });

// export default API;

// import axios from "axios";

// const API = axios.create({
//     baseURL: "https://complex-civil-fly-tom.trycloudflare.com"
// });

// export default API;
// import axios from "axios";

// const API = axios.create({
//     baseURL: "https://sheffield-respondents-fallen-salvation.trycloudflare.com"
// });

// export default API;


// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:8081"
// });

// export default API;

// import axios from "axios";

// const API = axios.create({
//     baseURL: "http://localhost:8081"
// });

// // Add JWT token to every request
// API.interceptors.request.use(
//     (config) => {

//         const token = localStorage.getItem("token");

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default API;


import axios from "axios";
const API = axios.create({
    // baseURL: "http://localhost:8081"//Springboot ki
    // baseURL: "http://localhost:9090"//docker ki
    baseURL: "https://kinda-rank-heather-size.trycloudflare.com"//vercel ki
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default API;



