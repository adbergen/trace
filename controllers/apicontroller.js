const axios = require("axios");

axios({
  method: "GET",
  url:
    "https://apidojo-17track-v1.p.rapidapi.com/track?codes=9374889727009104132569",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "apidojo-17track-v1.p.rapidapi.com",
    "x-rapidapi-key": "5c0544514dmsh2ee3e81aa7ad3b4p130f66jsn919e3e24daa7",
    useQueryString: true,
  },
  params: {
    timeZoneOffset: "0",
  },
})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
