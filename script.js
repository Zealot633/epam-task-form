const page = document.querySelector(".page");
const pageDefault = page.innerHTML;
let form = document.forms.my;
let mail = form.elements.email;
let name = form.elements.username;
let password = form.elements.password;
const regExpName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
const regExpMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let requestUrl = "https://jsonplaceholder.typicode.com/users";

focus();
change();
submit();

function clear() {
    form = document.forms.my;
    mail = form.elements.email;
    name = form.elements.username;
    password = form.elements.password;
    focus();
    change();
    submit();
}

function createHint(inputName) {
    let hint = document.createElement("div");
    hint.classList.add("hint");
    switch (inputName) {
        case "username":
            hint.innerHTML =
                "<p> от 1 до 20 латинских символов, может содержать цифры, без пробелов и спецсимволов</p>";
            hint.id = "username";
            break;
        case "password":
            hint.innerHTML =
                "<p>латинские символы, пароль должен содержать хотя бы один символ в высоком и низком регистре и цифру</p>";

            hint.id = "password";
            break;
        case "email":
            hint.innerHTML =
                "<p>email должен содержать @ и толко латинские буквы и иметь правильный формат</p>";
            hint.id = "email";
            break;
    }
    return hint;
}

function focus() {
    Array.from(form.elements).forEach((e) => {
        e.addEventListener("focus", () => {
            if (e.classList.contains("wrongInput")) {
                e.classList.remove("wrongInput");
                e.placeholder = "";
                document.querySelector(`#${e.name}`).remove();
            } else if (e.classList.contains("correctInput")) {
                e.classList.remove("correctInput");
            }
        });
    });
}

function checkInput(input) {
    const wrongInput = (input) => {
        input.value = "";
        input.placeholder = `incorrect ${input.name}`;
        input.classList.add("wrongInput");
        document
            .querySelector(`.${input.name}`)
            .append(createHint(`${input.name}`));
    };

    switch (input.name) {
        case "username":
            regExpName.test(input.value)
                ? input.classList.add("correctInput")
                : wrongInput(input);
            break;
        case "password":
            regExpPassword.test(input.value)
                ? input.classList.add("correctInput")
                : wrongInput(input);
            break;
        case "email":
            regExpMail.test(input.value)
                ? input.classList.add("correctInput")
                : wrongInput(input);
            break;
    }
}

function change() {
    Array.from(form.elements).forEach((e) => {
        e.addEventListener("change", function (event) {
            checkInput(event.target);
        });
    });
}

function submit() {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let hints = document.querySelectorAll(".hint");
        hints.forEach((e) => e.remove());
        Array.from(form.elements).forEach((e) => checkInput(e));
        if (mail.value && name.value && password.value) {
            let userInfo = {
                name: name.value,
                email: mail.value,
                password: password.value,
            };
            sendRequest("POST", requestUrl, userInfo)
                .then((data) => {
                    console.log(data)
                    page.innerHTML =
                        '<div class="success"><div class="button">Success!</div></div>';
                    document.querySelector(".success").addEventListener("click", () => {
                        page.innerHTML = pageDefault;
                        clear();
                    });
                })
                .catch((err) => console.log(err));

        }
    });
}

function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };
        xhr.send(JSON.stringify(body));
    });
}
