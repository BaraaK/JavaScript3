'use strict'
{
    //const axios = require('axios');
    const MY_URL = "https://www.randomuser.me/api";
    const xhrBtn = document.getElementById("XHR");
    const axiosBtn = document.getElementById("Axios");
    function xhrGetData(){
        let xHReq = new XMLHttpRequest();
        xHReq.onload = () => {
            if(xHReq.status < 400 ) {
                console.log(JSON.parse(xHReq.responseText));
            }
            else
            console.log(`Network error: ${xhr.status} - ${xhr.statusText}`);
        }
        xHReq.onerror = function () {
            console.log("Network request failed")
        }
        xHReq.open("GET", MY_URL);
        xHReq.send();

    }
    function axiosGetData() {
        axios.get(MY_URL)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    xhrBtn.addEventListener("click", xhrGetData );
    axiosBtn.addEventListener("click",axiosGetData)

    
    

}