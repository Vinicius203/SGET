document.addEventListener('DOMContentLoaded', function () {
    const showSidebarButton = document.getElementById('showSidebar');
    const navbarLinks = document.querySelector('.navbar-links');
    const cadastroButton = document.getElementById('cadastroButton');
    const permissoesButton = document.getElementById('permissoesButton');
    const rotinasButton = document.getElementById('rotinasButton');
    const dashboardButton = document.getElementById('dashboardButton');

    showSidebarButton.addEventListener('click', function () {
        console.log('Ícone clicado');
        navbarLinks.classList.toggle('hidden');
        showSidebarButton.classList.toggle('navbar-expanded');
    });

    const pages = {
        'Main Page': '../html/mainPage.html',
        'Cadastro de Templates': '../html/cadastroTemplate.html',
        'Permissões de Usuários': '../html/permissoes.html',
        'Visualização de Rotinas': '../html/rotinas.html',
        'Dashboard': '../html/dashboard.html'
    };

    navbarLinks.addEventListener('click', function (event) {
        const target = event.target;

        if (target.tagName === 'A') {
            const pageName = target.textContent;

            if (pages.hasOwnProperty(pageName)) {
                window.location.href = pages[pageName];
            }
        }
    });

    cadastroButton.addEventListener('click', function () {
        redirectToPage('Cadastro de Templates');
    });

    permissoesButton.addEventListener('click', function () {
        redirectToPage('Permissões de Usuários');
    });

    rotinasButton.addEventListener('click', function () {
        redirectToPage('Visualização de Rotinas');
    });

    dashboardButton.addEventListener('click', function () {
        redirectToPage('Dashboard');
    });

    function redirectToPage(pageName) {
        if (pages.hasOwnProperty(pageName)) {
            window.location.href = pages[pageName];
        }
    }
});

const pgp = require('pg-promise')
const db = pgp('postgres://postgres:postgres@localhost:5432/SGET')

db.one('SELECT $1 AS value', 123)
    .then((data) => {
        console.log('DATA:', data.value)
    })
    .catch((error) => {
        console.log('ERROR:', error)
    })
