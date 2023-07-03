let form = document.getElementById("form");
let phone = document.getElementsByClassName("phone")[0];
let otp = document.getElementsByClassName("phone")[1];
let btn = document.getElementsByTagName("button");
let msgDiv = document.getElementsByClassName("message")[0];
let allInput = document.querySelectorAll("input");
let phonediv = document.querySelector(".phdiv");
let otpdiv = document.querySelector(".otpdiv");

let message = false;

let err1 = false;
let err2 = false;


allInput.forEach((ele) => {
    ele.addEventListener("focusout", handleValidation);
})


function handleValidation(e) {
    let inp = e.target.getAttribute("name");
    let val = e.target.value;
    if (inp == "phone") {
        if (val.length < 10) {
            let mg = "phone number should have 10 digit without country code"
            err1 = true;
            phone.closest("span").innerHTML = mg;
            phone.closest("div").querySelector("input").classList.remove("greenborder");
            phone.closest("div").querySelector("input").classList.add("redborder");
        } else if (val.length > 10) {
            let mg = "phone number should have 10 digit without country code"
            err1 = true;
            phone.closest("span").innerHTML = mg;
            phone.closest("div").querySelector("input").classList.remove("greenborder");
            phone.closest("div").querySelector("input").classList.add("redborder");
        }
        else {
            phone.closest("div").querySelector("input").classList.add("greenborder");
            phone.closest("span").innerHTML = "";
            err1 = false;
        }
    } else if (inp == "otp") {
        console.log(val.length, "otp");

        if (val.length < 6) {
            let mg = "otp contain 6 digit!"
            err1 = true;
            otp.closest("span").innerHTML = mg;
            otp.closest("div").querySelector("input").classList.remove("greenborder");
            otp.closest("div").querySelector("input").classList.add("redborder");
        } else if (val.length > 6) {
            let mg = "otp contain 6 digit!"
            err1 = true;
            otp.closest("span").innerHTML = mg;
            otp.closest("div").querySelector("input").classList.remove("greenborder");
            otp.closest("div").querySelector("input").classList.add("redborder");

        } else {
            otp.closest("div").querySelector("input").classList.add("greenborder");
            otp.closest("span").innerHTML = "";
            err1 = false;
        }
    }

}



form.addEventListener("submit", handleSubmit);

let phone_num = null;

function handleSubmit(e) {

    e.preventDefault();
    if (err1) {
        msgDiv.innerHTML = "Please fill proper details! <span onClick='handleCross(event)'>x</span>"
        msgDiv.classList.remove("ok_message")
        msgDiv.classList.add("error_message")
    } else {
        let phn = e.target.elements['phone'].value;
        let otp = e.target.elements['otp'].value;
        console.log(phn, otp);
        if (otp) {
            verifyotp(otp)
        } else if (phone) {
            phone_num = phn
            getotp();
            phonediv.classList.add("nodis");
            otpdiv.classList.remove("nodis");
            otpdiv.classList.add("dis");
        }


    }

}


async function getotp() {

    try {
        const url = "https://prune.co.in/api/accounts/get_otp";

        let res = await fetch(`${url}/?phone_number=${phone_num}&country_code=+91&is_login="true"`, {
            method: 'Post'
        });
        let data = await res.json();
        if (data.user_exists != 0) {
            msgDiv.innerHTML = "You don't have account , please signup first! <span onClick='handleCross(event)'>x</span>"
            msgDiv.classList.remove("ok_message")
            msgDiv.classList.add("error_message")
            return false;
        }
    } catch (e) {
        console.log(e);

    }


}


async function verifyotp(otp) {

    try {
        console.log("verify");

        const url = "https://prune.co.in/api/accounts/get_otp";

        let res = await fetch(`${url}/?phone_number=${phone_num}&country_code=+91&otp=${otp}`, {
            method: 'POST'
        });
        let data = await res.json();
        if (data.user_exists != 0) {
            msgDiv.innerHTML = "You don't have account , please signup first! <span onClick='handleCross(event)'>x</span>"
            msgDiv.classList.remove("ok_message")
            msgDiv.classList.add("error_message")
            return false;
        }
        if (data.status == "fail") {
            let a = document.createElement("a");
            a.setAttribute("href", "./welcome.html");
            a.click();
        }
    } catch (e) {
        console.log(e);

    }


}

function handleCross(e) {
    e.target.closest(".message").classList.remove("ok_message");
    e.target.closest(".message").classList.remove("error_message");

}