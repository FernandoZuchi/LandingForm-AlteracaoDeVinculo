const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mailgunConfig = {
    apiKey: 'e6fb70e43d617e06ba203f5d151fd5ff-7ecaf6b5-f77fb6ee',
    domain: 'sandbox07b52750d47b40e0a3d66ada9b350588.mailgun.org',
};

const mailgunClient = mailgun(mailgunConfig);

app.post('/enviar-email', (req, res) => {
    const { nome, email, curso, start_date } = req.body;

    const data = {
        from: 'sandbox07b52750d47b40e0a3d66ada9b350588.mailgun.org',
        to: 'trancamentocodiacademy@gmail.com',
        subject: 'Requerimento de trancamento',
        text: `Nome: ${nome}\nEmail: ${email}\nCurso: ${curso}\nData de Início: ${start_date}`,
    };

    mailgunClient.messages().send(data, (error, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Erro ao enviar e-mail.');
        }

        console.log('E-mail enviado:', body);
        res.status(200).send('E-mail enviado com sucesso.');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
