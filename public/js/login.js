document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();

        window.location.href = '../mainPage/mainPage.html';
    });

    forgotPasswordLink.addEventListener('click', function (event) {
        event.preventDefault();

        window.location.href = '../html/esqueceuSenha.html';
    });
});
