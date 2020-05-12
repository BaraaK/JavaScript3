'use strict' 
{
    const MY_URL = "https://xkcd.now.sh/?comic=latest";
    const xhrBtn = document.getElementById("xhr");
    const axiosBtn = document.getElementById("Axios");
    const app = document.getElementById('app');
    let list = document.createElement('ul');
    app.appendChild(list);
    function xhrGetData(){
        let xHReq = new XMLHttpRequest();
        xHReq.onload = () => {
            if(xHReq.status < 400 ) {
                let res = JSON.parse(xHReq.responseText);
                let img = `<img src=${res.img}>`;
                let output ="";
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        output += `<li> ${key} : ${res[key]}</li>`
                                                
                        
                    }
                    else 
                    console.log(`Network error: ${xhr.status} - ${xhr.statusText}`);

                }
                list.innerHTML += img + output;
            }
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
            let img = `<img src=${response.data.img}>`;
            let output ="";
            for (const key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                    output += `<li> ${key} : ${response.data[key]}</li>`
                                            
                    
                }
            }
            list.innerHTML += img + output;

        })
        .catch(function (error) {
          console.log(error);
        })
 
    }
    xhrBtn.addEventListener("click", xhrGetData );
    axiosBtn.addEventListener("click",axiosGetData)}