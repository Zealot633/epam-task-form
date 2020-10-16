const page = document.querySelector('.page');
const pageDefault = page.innerHTML;
const form = document.forms.my;
const mail = form.elements.email;
const name = form.elements.username;
const password = form.elements.password;
const regExpName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
const regExpMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

form.addEventListener('submit', event => {
    if (!regExpName.test(name.value)) {
        name.value = '';
        name.placeholder = 'имя 1-20 символов,не должно начинаться с цифры, не содержит пробелов'
    }
    if (!regExpPassword.test(password.value)) {
        password.value = '';
        password.placeholder = 'пароль должен содержать символ в высоком регистре и цифру'
    }
    if (!regExpMail.test(mail.value)) {
        mail.value = '';
        mail.placeholder = 'введите корректный email'
    }

    let userInfo = {
        name: name.value,
        email: mail.value,
        password: password.value
    }
    if (mail.value && name.value && password.value) {
        page.innerHTML = '<div class="success"><div class="button">Success!</div></div>'
        document.querySelector('.success').addEventListener('click', () => {
            page.innerHTML = pageDefault;
        })
        console.log(JSON.stringify(userInfo))
        return JSON.stringify(userInfo)
    }
    event.preventDefault()
})