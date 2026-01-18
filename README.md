# 🖥️ Interface Web - Classificador de E-mails

Este é o **Frontend** do projeto de classificação de e-mails. Trata-se de uma interface moderna, responsiva e em **Dark Mode** que permite ao usuário enviar arquivos ou textos para análise pela Inteligência Artificial.


## 🛠️ Tecnologias Utilizadas

* **HTML / CSS**
* **JavaScript**
* **[Bootstrap 5](https://getbootstrap.com/):**


## 🚀 Como Usar

### 1. Pré-requisito: Backend Rodando
Para que o sistema funcione, o servidor Python (Backend) deve estar rodando.
* Certifique-se de ter iniciado o arquivo `app.py`.
* Endereço padrão esperado: `http://127.0.0.1:5000/upload`

### 2. Abrindo a Interface
Não é necessário instalar nada para o frontend.
1.  Baixe o arquivo `index.html`.
2.  Clique duas vezes para abri-lo no navegador.

## ⚙️ Configuração da API

Por padrão, a interface tenta conectar-se ao servidor Render.

Se você hospedou seu backend (ex: no Render) ou mudou a porta, você precisa atualizar a URL no código JavaScript.

1.  Abra o arquivo `index.html` em um editor de texto (VS Code, Bloco de Notas).
2.  Procure pela linha que contém o `fetch` (aproximadamente linha 220):

```javascript
// Linha original (Produção)
const response = await fetch('https://autouback-n48m.onrender.com/upload', {
    method: 'POST',
    body: formData
});
// Exemplo para Local
const response = await fetch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: formData
});
```