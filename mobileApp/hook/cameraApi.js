const axios = require("axios");

const cameraApi = ()=>{ 
    return(
        axios({
            method: "POST",
            url: "https://detect.roboflow.com/plant-wtcrc/3",
            params: {
                api_key: "pmoESnYL9PvaNON2BScS",
                image: "https://imagescdn.simons.ca/images/7393-1231110-80-A1_2/artificial-orange-tulip-bouquet.jpg?__=5"
            }
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error.message);
        })
    )
}

export default cameraApi;