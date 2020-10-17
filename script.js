const page = document.querySelector(".page");
const pageDefault = page.innerHTML;
const form = document.forms.my;
const mail = form.elements.email;
const name = form.elements.username;
const password = form.elements.password;
const regExpName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
const regExpMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function createHint(inputName) {
    let hint = document.createElement("div");
    hint.classList.add("hint");
    switch (inputName) {
        case "username":
            hint.innerHTML =
                "<p>имя не должно превышать 20 символов и содержать пробелы</p>";

            hint.id = 'username'
            break;
        case "password":
            hint.innerHTML =
                "<p>пароль должен содержать хотя бы один символ в высоком регистре и цифру</p>";

            hint.id = 'password'
            break;
        case "email":
            hint.innerHTML =
                "<p>email должен содержать @ и толко латинские буквы и иметь правильный формат</p>";
            hint.id = 'email'
            break;
    }
    return hint;
}

Array.from(form.elements).forEach(e => {
    e.addEventListener('focus', () => {
        if (e.classList.contains('wrongInput')) {
            e.classList.remove('wrongInput');
            e.placeholder = '';
            document.querySelector(`#${e.name}`).remove();
        } else if (e.classList.contains('correctInput')) {
            e.classList.remove('correctInput')
        }
    })
})


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

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let hints = document.querySelectorAll('.hint');
    hints.forEach(e => e.remove())
    Array.from(form.elements).forEach((e) => checkInput(e));
    if (mail.value && name.value && password.value) {
        let userInfo = {
            name: name.value,
            email: mail.value,
            password: password.value,
        };
        page.innerHTML =
            '<div class="success"><div class="button">Success!</div></div>';
        document.querySelector(".success").addEventListener("click", () => {
            page.innerHTML = pageDefault;
        });
        console.log(JSON.stringify(userInfo));
        return JSON.stringify(userInfo);
    }

});
