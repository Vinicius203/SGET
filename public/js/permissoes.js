document.addEventListener('DOMContentLoaded', function () {
    const showSidebarButton = document.getElementById('showSidebar');
    const navbarLinks = document.querySelector('.navbar-links');

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
});
