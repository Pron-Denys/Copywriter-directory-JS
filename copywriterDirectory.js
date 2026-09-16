"use strict";
let users = [];

function User(tempId, tempName, tempUserName, tempEmail) {
    let id = tempId;
    let name = tempName;
    let userName = tempUserName;
    let email = tempEmail;
    this.getId = () => {
        return id;
    }
    this.getName = () => {
        return name;
    }
}

function resolveShowAllUsers(response) {
    if (response) {
        const allUsers = document.getElementById("allUsers");
        let innerHtml = "";
        for (const value of response) {
            users[value.name] = new User(value.id, value.name, value.username, value.email);
            innerHtml += `<div><p>${value.name}</p></div>`;
        }
        allUsers.innerHTML = innerHtml;
    }
}

function rejectShowAllUsers(error) {
    console.error(error);
}

function showAllUsers() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        request.responseType = "json";
        request.addEventListener("load", () => {
            if (request.status === 200) {
                const response = request.response;
                resolve(response);
            }
        });
        request.addEventListener("error", () => {
            reject(`Помилка серверу: ${request.status}`);
        });
        request.send();
    });
}

function resolveClickUser(response) {
    if (response) {
        const btn = document.querySelector("#btn");
        btn.style.display = "inline-block";
        const userInfo = document.getElementById("userInfo");
        let tempTable = document.querySelector("#userInfo table");
        if (tempTable !== null) userInfo.removeChild(tempTable);
        const tempPar = document.querySelector("#userInfo p");
        if (tempPar === null) {
            const par = document.createElement("p");
            par.innerText = "User info:";
            userInfo.appendChild(par);
        }
        const table = document.createElement("table");
        const tr1 = document.createElement("tr");
        const nameHeader = document.createElement("td");
        const td1 = document.createElement("td");
        nameHeader.innerHTML = "<b>Name :</b>";
        td1.innerText = `${response.name}`;
        tr1.appendChild(nameHeader);
        tr1.appendChild(td1);
        table.appendChild(tr1);
        const tr2 = document.createElement("tr");
        const userNameHeader = document.createElement("td");
        const td2 = document.createElement("td");
        userNameHeader.innerHTML = "<b>Username :</b>";
        td2.innerText = `${response.username}`;
        tr2.appendChild(userNameHeader);
        tr2.appendChild(td2);
        table.appendChild(tr2);
        const tr3 = document.createElement("tr");
        const addressHeader = document.createElement("td");
        const td3 = document.createElement("td");
        addressHeader.innerHTML = "<b>Address :</b>";
        td3.innerText = `${response.address.city}, ${response.address.street}`;
        tr3.appendChild(addressHeader);
        tr3.appendChild(td3);
        table.appendChild(tr3);
        const tr4 = document.createElement("tr");
        const emailHeader = document.createElement("td");
        const td4 = document.createElement("td");
        emailHeader.innerHTML = "<b>Email :</b>";
        td4.innerText = `${response.email}`;
        tr4.appendChild(emailHeader);
        tr4.appendChild(td4);
        table.appendChild(tr4);
        const tr5 = document.createElement("tr");
        const phoneHeader = document.createElement("td");
        const td5 = document.createElement("td");
        phoneHeader.innerHTML = "<b>Phone :</b>";
        td5.innerText = `${response.phone}`;
        tr5.appendChild(phoneHeader);
        tr5.appendChild(td5);
        table.appendChild(tr5);
        const tr6 = document.createElement("tr");
        const websiteHeader = document.createElement("td");
        const td6 = document.createElement("td");
        websiteHeader.innerHTML = "<b>Website :</b>";
        td6.innerText = `${response.website}`;
        tr6.appendChild(websiteHeader);
        tr6.appendChild(td6);
        table.appendChild(tr6);
        userInfo.appendChild(table);
    }
}

function rejectClickUser(error) {
    console.error(error);
}

function clickUser() {
    return new Promise((resolve, reject) => {
        if (event.target.tagName === "P") {
            for (const index in users) {
                let name = users[index].getName();
                if (event.target.innerText === name) {
                    const request = new XMLHttpRequest();
                    const id = users[index].getId();
                    request.open("GET", `https://jsonplaceholder.typicode.com/users/${id}`, true);
                    request.responseType = "json";
                    request.addEventListener("load", () => {
                        if (request.status === 200) {
                            const response = request.response;
                            resolve(response);
                        }
                    });
                    request.addEventListener("error", () => {
                        reject(`Помилка серверу: ${request.status}`);
                    });
                    request.send();
                    break;
                }
            }
        }
    });
}

function resolveClickShowPosts(response) {
    if (response) {
        const conteiner = document.getElementById("conteiner");
        const tempShowPosts = document.getElementById("showPosts");
        if (tempShowPosts !== null) conteiner.removeChild(tempShowPosts);
        const showPosts = document.createElement("div");
        showPosts.setAttribute("id", "showPosts");
        for (const value of response) {
            const div = document.createElement("div");
            const p = document.createElement("p");
            p.innerText = value.title;
            const text = document.createTextNode(value.body);
            div.appendChild(p);
            div.appendChild(text);
            showPosts.appendChild(div);
        }
        conteiner.appendChild(showPosts);
        const tempPar = document.getElementById("postHeader");
        if (tempPar === null) {
            const par = document.createElement("p");
            par.setAttribute("id", "postHeader")
            par.innerHTML = "User's posts :";
            conteiner.insertBefore(par, showPosts);
        }
    }
}

function rejectClickShowPosts(error) {
    console.error(error);
}

function clickShowPosts() {
    return new Promise((resolve, reject) => {
        const table = document.getElementsByTagName("table")[0];
        const tr = table.childNodes[0];
        const name = tr.childNodes[1];
        const id = users[name.innerText].getId();
        const request = new XMLHttpRequest();
        request.responseType = "json";
        request.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`, true);
        request.addEventListener("load", () => {
            if (request.status === 200) {
                const response = request.response;
                resolve(response);
            }
        });
        request.addEventListener("error", () => {
            reject(`Помилка серверу: ${request.status}`);
        });
        request.send();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showAllUsers().then(resolveShowAllUsers).catch(rejectShowAllUsers);
});
allUsers.addEventListener("click", () => {
    clickUser().then(resolveClickUser).catch(rejectClickUser);
});
btn.addEventListener("click", () => {
    clickShowPosts().then(resolveClickShowPosts).catch(rejectClickShowPosts);
});