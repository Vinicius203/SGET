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

    const toggleSwitches = document.querySelectorAll('.toggle-switch-checkbox');

    toggleSwitches.forEach((toggleSwitch) => {
        const parentTd = toggleSwitch.closest('td');
        const actionButtons = parentTd.querySelectorAll('.action-button');

        toggleSwitch.addEventListener('change', () => {
            if (toggleSwitch.checked) {
                actionButtons.forEach((button) => {
                    button.disabled = false;
                    if (button.textContent === 'Download') {
                        button.addEventListener('click', () => {
                            alert('O download foi realizado com sucesso!');
                        });
                    } else if (button.textContent === 'Upload') {
                        button.addEventListener('click', () => {
                            const uploadPopup = document.getElementById('uploadPopup');
                            const closeUploadPopupButton = document.getElementById('closeUploadPopup');

                            uploadPopup.style.display = 'block';

                            closeUploadPopupButton.addEventListener('click', () => {
                                uploadPopup.style.display = 'none';
                            });

                            const uploadSubmitButton = document.getElementById('uploadSubmitButton');
                            uploadSubmitButton.addEventListener('click', () => {
                                const fileInput = document.getElementById('fileInput');
                                const commentInput = document.getElementById('commentInput').value;

                                uploadPopup.style.display = 'none';
                            });
                        });
                    }
                });
            } else {
                actionButtons.forEach((button) => {
                    button.disabled = true;
                });
            }
        });
    });
});
