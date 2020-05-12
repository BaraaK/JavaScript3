'use strict' 
{
    const MY_URL = "https://dog.ceo/api/breeds/image/random";
    const xhrBtn = document.getElementById("xhr");
    const axiosBtn = document.getElementById("Axios");
    const app = document.getElementById('app');
    let list = document.createElement('ul');
    list.style.listStyle ="none"
    app.appendChild(list);
    function xhrGetData(){
        let xHReq = new XMLHttpRequest();
        xHReq.onload = () => {
            if(xHReq.status < 400 ) {
                let res = JSON.parse(xHReq.responseText);
                let output =`<li><img src=${res['message']}></li>`;
                list.innerHTML += output;
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
            let output ="";
            output = `<li><img src=${response.data['message']}></li>`
            list.innerHTML += output


        })
        .catch(function (error) {
          console.log(error);
        })
 
    }
    xhrBtn.addEventListener("click", xhrGetData );
    axiosBtn.addEventListener("click",axiosGetData)}