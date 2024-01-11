// Selecionando os elementos do DOM
const submitBtn = document.querySelector('.submit-btn'),
    email = document.querySelector('#mail'),
    errorDisplayers = document.getElementsByClassName('error'),
    cardContainer = document.querySelector('.card-container'),
    form = document.querySelector('form')

// Função para validar e-mail
function isValidEmail(email) {
    // Use uma expressão regular simples para verificar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Adicionar um event listener para o botão de fechar o modal
const closeModalBtn = document.getElementById('close-modal-btn');
closeModalBtn.addEventListener('click', () => {
    const successModal = document.getElementById('success-modal');
    successModal.style.display = 'none';

    // Limpar o formulário
    form.reset();

    // Recarregar a página
    location.reload();
});


// Event listener para o botão de envio
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Limpar mensagens de erro
    for (const errorDisplayer of errorDisplayers) {
        errorDisplayer.textContent = '';
    }

    // Realizar validações
    let isValid = true;

    if (!isValidEmail(email.value)) {
        errorDisplayers[1].textContent = 'Por favor, insira um e-mail válido.';
        isValid = false;
    }

    const selectedCurso = document.querySelector('#curso');
    if (selectedCurso.value === '') {
        errorDisplayers[2].textContent = 'Por favor, escolha um curso.';
        isValid = false;
    }

    const startDate = document.querySelector('#start-date').value;
    const today = new Date();
    const lastMonthOfCourse = new Date(startDate);
    lastMonthOfCourse.setMonth(lastMonthOfCourse.getMonth() + 11);
    
    // Verificar se a data de início está dentro do último mês
    if (today >= lastMonthOfCourse && today < new Date(startDate).setMonth(lastMonthOfCourse.getMonth() + 1)) {
        errorDisplayers[3].textContent = 'Você não pode trancar o curso no último mês.';
        isValid = false;
    }

    if (isValid) {
        try {
            const formData = new FormData(form);
            const response = await fetch('https://formsubmit.co/ajax/nandozuchi07@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Exibir o modal
                const successModal = document.getElementById('success-modal');
                successModal.classList.remove('disabled');
                successModal.style.display = 'flex';
            } else {
                console.error('Erro ao enviar e-mail.');
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
        }
    }
});
