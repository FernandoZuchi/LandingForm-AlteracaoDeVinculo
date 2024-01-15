// Selecionando os elementos do DOM
//trancamento@codiacademy.com
const submitBtn = document.querySelector('.submit-btn'),
    email = document.querySelector('#mail'),
    errorDisplayers = document.getElementsByClassName('error'),
    cardContainer = document.querySelector('.card-container'),
    outroOverlay = document.querySelector('.outro-overlay'),
    form = document.querySelector('form')

// Função para validar e-mail
function isValidEmail(email) {
    // Use uma expressão regular simples para verificar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isTrancamentoPermitido(startDate) {
    // Aqui, estamos assumindo que o curso dura 12 meses
    const courseDurationMonths = 12;
    const currentDate = new Date();
    const courseStartDate = new Date(startDate);

    // Calcule a data de início do último mês do curso
    const lastMonthStartDate = new Date(courseStartDate);
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() + courseDurationMonths);

    // Verifique se a data atual não está no último mês do curso
    return currentDate < lastMonthStartDate;
}

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
    if (!startDate || !isTrancamentoPermitido(startDate)) {
        errorDisplayers[3].textContent = 'A data de início do curso não permite trancamento.';
        isValid = false;
    }


    if (isValid) {
        try {
            const formData = new FormData(form);
            const response = await fetch('https://formsubmit.co/ajax/trancamentocodiacademy@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Exibir o modal
                const successModal = document.getElementById('success-modal');
                successModal.style.display = 'flex';

                // Adicionar um botão para fechar o modal
                const closeModalBtn = document.getElementById('close-modal-btn');
                closeModalBtn.addEventListener('click', () => {
                    successModal.style.display = 'none';
                    location.reload();
                });
            } else {
                console.error('Erro ao enviar e-mail.');
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
        }
    }
});
