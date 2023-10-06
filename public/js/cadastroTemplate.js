document.addEventListener('DOMContentLoaded', function () {
    const showSidebarButton = document.getElementById('showSidebar');
    const navbarLinks = document.querySelector('.navbar-links');
    const createColumnsButton = document.getElementById('createColumns');
    const columnWrapper = document.querySelector('.column-wrapper');
    const cadastroButton = document.getElementById('cadastroTemplates');

    const pages = {
        'Main Page': '../html/mainPage.html',
        'Cadastro de Templates': '../html/cadastroTemplate.html',
        'Permissões de Usuários': '../html/permissoes.html',
        'Visualização de Rotinas': '../html/rotinas.html',
        'Dashboard': '../html/dashboard.html'
    };

    showSidebarButton.addEventListener('click', function () {
        console.log('Ícone clicado');
        navbarLinks.classList.toggle('hidden');
        showSidebarButton.classList.toggle('navbar-expanded');
    });

    createColumnsButton.addEventListener('click', function () {
        const numColunas = document.getElementById('numColunas').value;

        columnWrapper.style.display = 'block';
        columnWrapper.innerHTML = '';

        for (let i = 1; i <= numColunas; i++) {
            const column = document.createElement('div');
            column.classList.add('column');
            column.textContent = `Coluna ${i}`;

            const fillDataButton = document.createElement('button');
            fillDataButton.classList.add('fill-data-button');
            fillDataButton.textContent = 'Preencher Dados';

            fillDataButton.addEventListener('click', function () {
                const inputNome = document.createElement('input');
                inputNome.type = 'text';
                inputNome.placeholder = 'Nome da Coluna';

                const inputTipo = document.createElement('select');
                inputTipo.name = 'tipoDado';
                inputTipo.required = true;

                const tiposDeDado = ['String', 'Inteiro', 'Ponto Flutuante', 'Booleano', 'Data', 'Moeda'];

                tiposDeDado.forEach(function (tipo) {
                    const option = document.createElement('option');
                    option.value = tipo.toLowerCase();
                    option.text = tipo;
                    inputTipo.appendChild(option);
                });

                const inputObrigatorio = document.createElement('input');
                inputObrigatorio.type = 'checkbox';
                inputObrigatorio.id = 'obrigatorio';
                const labelObrigatorio = document.createElement('label');
                labelObrigatorio.textContent = 'Obrigatório';
                labelObrigatorio.htmlFor = 'obrigatorio';

                const cancelarButton = document.createElement('button');
                cancelarButton.textContent = 'Concluir';
                cancelarButton.addEventListener('click', function () {
                    column.querySelectorAll('input, select, label, button').forEach(el => el.remove());
                    column.style.height = 'auto';
                });

                column.appendChild(inputNome);
                column.appendChild(inputTipo);
                column.appendChild(inputObrigatorio);
                column.appendChild(labelObrigatorio);
                column.appendChild(cancelarButton);

                column.style.height = 'auto';
            });

            column.appendChild(fillDataButton);
            columnWrapper.appendChild(column);
        }
    });

    cadastroButton.addEventListener('click', function () {
        console.log('Botão Cadastrar clicado.');
        alert("O template foi cadastrado com sucesso!");
    });

    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });

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
