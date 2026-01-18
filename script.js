const form = document.getElementById('emailForm');
const btn = document.getElementById('btnEnviar');
const loader = document.querySelector('.spinner-border');
const resultadoArea = document.getElementById('resultadoArea');
const badge = document.getElementById('categoriaResult');
const respostaDiv = document.getElementById('respostaSugerida');

const fileInput = document.getElementById('emailArquivo');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const dropZone = document.getElementById('dropZone');
const uploadContent = document.getElementById('uploadContent');


fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
        const nomeArquivo = this.files[0].name;
        
        uploadContent.innerHTML = `
            <p class="upload-text text-white mb-0">${nomeArquivo}</p>
        `;
        dropZone.style.borderColor = "#198754";
    }
});

dropZone.addEventListener('dragover', () => dropZone.classList.add('dragover'));
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', () => dropZone.classList.remove('dragover'));


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btn.disabled = true;
    loader.style.display = 'inline-block';
    resultadoArea.style.display = 'none';
    btn.lastChild.textContent = " Processando...";

    const texto = document.getElementById('emailTexto').value;
    const arquivo = fileInput.files[0];
    const formData = new FormData();

    if (arquivo) {
        formData.append('file', arquivo);
    } else if (texto) {
        formData.append('text', texto);
    } else {
        alert("Por favor, insira um texto ou selecione um arquivo.");
        resetarBotao();
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Erro no servidor");

        const data = await response.json();

        resultadoArea.style.display = 'block';
        
        badge.innerText = data.categoria;
        badge.className = 'badge'; 
        if (data.categoria.toLowerCase().includes('produtivo') && !data.categoria.toLowerCase().includes('improdutivo')) {
            badge.classList.add('bg-success'); 
        } else {
            badge.classList.add('bg-danger'); 
        }

        respostaDiv.innerText = data.resposta_sugerida;

    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao processar. Verifique o Python.");
    } finally {
        resetarBotao();
    }
});

function resetarBotao() {
    btn.disabled = false;
    loader.style.display = 'none';
    btn.lastChild.textContent = " Processar E-mail";
}