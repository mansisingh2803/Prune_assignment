let form = document.getElementById("form");
let nm = document.getElementsByClassName("name")[0];
let email = document.getElementsByClassName("email")[0];
let phone = document.getElementsByClassName("phone")[0];
let btn = document.getElementsByTagName("button");
let msgDiv = document.getElementsByClassName("message")[0];
let allInput = document.querySelectorAll("input");

let message = false;

let err1 = false;
let err2 = false;
let err3 = false;



allInput.forEach((ele) => {
    ele.addEventListener("focusout", handleValidation);
})


function handleValidation(e) {
    let inp = e.target.getAttribute("name");
    let val = e.target.value;
    console.log(val);
    console.log(inp);
    if (inp === "name") {
        if (val.length > 20) {
            let message = "name should be smaller than 20 characters!"
            err1 = true;
            nm.closest("span").innerHTML = message;
            nm.closest("div").querySelector("input").classList.remove("greenborder");
            nm.closest("div").querySelector("input").classList.add("redborder")
        } else if (val.match(/[0-9]/)) {
            let mg = "name cannot contain digits!"
            err1 = true;
            nm.closest("span").innerHTML = mg;
            nm.closest("div").querySelector("input").classList.remove("greenborder");
            nm.closest("div").querySelector("input").classList.add("redborder");

        }
        else if (val.length < 3) {
            let mg = "please write your proper name!"
            err1 = true;
            nm.closest("span").innerHTML = mg;
            nm.closest("div").querySelector("input").classList.remove("greenborder");
            nm.closest("div").querySelector("input").classList.add("redborder");
        } else {
            nm.closest("div").querySelector("input").classList.add("greenborder");
            nm.closest("span").innerHTML = "";
            err1 = false;
        }
    } else if (inp == "email") {
        if (val.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]@{1}.*/)) {
            let mg = "please write your proper email!"
            err2 = true;
            email.closest("span").innerHTML = mg;
            email.closest("div").querySelector("input").classList.remove("greenborder");
            email.closest("div").querySelector("input").classList.add("redborder");

        } else if (val == "") {
            let mg = "please fill email"
            err2 = true;
            email.closest("span").innerHTML = mg;
            email.closest("div").querySelector("input").classList.remove("greenborder");
            email.closest("div").querySelector("input").classList.add("redborder");
        }
        else {
            email.closest("div").querySelector("input").classList.add("greenborder");
            email.closest("span").innerHTML = "";
            err2 = false;
        }

    } else if (inp == "phone") {
        if (val.length < 10) {
            let mg = "phone number should have 10 digit without country code"
            err3 = true;
            phone.closest("span").innerHTML = mg;
            phone.closest("div").querySelector("input").classList.remove("greenborder");
            phone.closest("div").querySelector("input").classList.add("redborder");
        } else if (val.length > 10) {
            let mg = "phone number should have 10 digit without country code"
            err3 = true;
            phone.closest("span").innerHTML = mg;
            phone.closest("div").querySelector("input").classList.remove("greenborder");
            phone.closest("div").querySelector("input").classList.add("redborder");
        }
        else {
            phone.closest("div").querySelector("input").classList.add("greenborder");
            phone.closest("span").innerHTML = "";
            err3 = false;
        }
    }

}



form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
    e.preventDefault();
    if (err1 || err2 || err3) {
        msgDiv.innerHTML = "Please fill proper details! <span onClick='handleCross(event)'>x</span>"
        msgDiv.classList.remove("ok_message")
        msgDiv.classList.add("error_message")
    } else {
        console.log(e.target.elements["dob"].value);

        if (e.target.elements["gender"].value == "" || e.target.elements["dob"].value == "") {
            msgDiv.innerHTML = "Please fill proper details! <span onClick='handleCross(event)'>x</span>"
            msgDiv.classList.remove("ok_message")
            msgDiv.classList.add("error_message")
        } else {
            msgDiv.innerHTML = "Successfully sent your Information! <span  onClick='handleCross(event)'>x</span>"
            msgDiv.classList.add("ok_message")
            msgDiv.classList.remove("error_message")
            let a = document.createElement("a");
            a.setAttribute("href", "./login.html");
            a.click();
        }


    }

}


function handleCross(e) {
    console.log("clicked");
    e.target.closest(".message").classList.remove("ok_message");
    e.target.closest(".message").classList.remove("error_message");

}