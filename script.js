
const form = document.getElementById('emailForm');
const btn = document.getElementById('btnEnviar');
const loader = document.querySelector('.spinner-border');
const resultadoArea = document.getElementById('resultadoArea');

const fileInput = document.getElementById('emailArquivo');
const dropZone = document.getElementById('dropZone');
const uploadContent = document.getElementById('uploadContent');

// Salva o conteúdo HTML original (ícone de nuvem) para restaurar depois
const conteudoOriginal = uploadContent.innerHTML;

// --- LÓGICA DE UPLOAD E REMOÇÃO ---

fileInput.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
        const nomeArquivo = this.files[0].name;
        
        // 1. Esconde o input invisível para permitir clicar no botão de remover
        fileInput.style.display = 'none';
        
        // 2. Muda o HTML para mostrar sucesso e o botão de remover
        uploadContent.innerHTML = `
            <div class="d-flex align-items-center gap-3">
            <span class="text-white fs-5">${nomeArquivo}</span>
            <button type="button" class="btn btn-sm btn-outline-danger btn-remove-file" onclick="removerArquivo()">✕</button>
            </div>
        `;
        dropZone.style.borderColor = "#198754"; // Borda verde
    }
});

// Função chamada pelo botão de remover
window.removerArquivo = function() {
    // 1. Limpa o valor do input (memória)
    fileInput.value = ''; 
    
    // 2. Traz de volta o input invisível para permitir nova seleção
    fileInput.style.display = 'block';
    
    // 3. Restaura o visual original (ícone de nuvem)
    uploadContent.innerHTML = conteudoOriginal;
    dropZone.style.borderColor = "#6c757d"; // Volta para cinza
};

// Efeitos de drag and drop
dropZone.addEventListener('dragover', () => dropZone.classList.add('dragover'));
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', () => dropZone.classList.remove('dragover'));

// --- LÓGICA DE ENVIO ---
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
        const response = await fetch('https://autouback-n48m.onrender.com/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("Erro no servidor");

        const data = await response.json();

        // Exibir resultados
        resultadoArea.style.display = 'block';
        const badge = document.getElementById('categoriaResult');
        badge.innerText = data.categoria;
        badge.className = 'badge'; 
        
        if (data.categoria.toLowerCase().includes('produtivo') && !data.categoria.toLowerCase().includes('improdutivo')) {
            badge.classList.add('bg-success'); 
        } else {
            badge.classList.add('bg-danger'); 
        }

        document.getElementById('respostaSugerida').innerText = data.resposta_sugerida;

    } catch (error) {
        console.error(error);
        alert("Erro ao processar. Verifique se o backend está rodando.");
    } finally {
        resetarBotao();
    }
});

function resetarBotao() {
    btn.disabled = false;
    loader.style.display = 'none';
    btn.lastChild.textContent = " Processar E-mail";
}