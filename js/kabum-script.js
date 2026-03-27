var arrowReview = document.querySelector('.kabum-review>svg')
var mainVideo = document.getElementById('mainVideo')

function selectHidden() {

    mainVideo.classList.add('kabum-hidden')

    if (arrowReview.dataset.state == "close") {
        arrowReview.setAttribute('data-state', 'open')
        /* mainVideo.kabum-hidden = tru */
        mainVideo.classList.add('kabum-hidden')

    } else if (arrowReview.dataset.state == "open") {
        arrowReview.setAttribute('data-state', 'close')
        /* mainVideo.kabum-hidden = false */

        mainVideo.classList.remove('kabum-hidden')
    }


}
document.querySelector('#kabum-button > button').addEventListener('click', selectHidden)

// --- 1. CONFIGURAÇÃO: Lista de IDs dos vídeos ---
// Adicione quantos quiser aqui, separados por vírgula
const videoList = [
    "hqMZ4x4NNx0",
    "kd7Sl09apfg",
    "5fENP-yhwhY",
    "h6D5AgrpMGo",
    "Ws2iIZ5WPyw"
];

// Seleciona o container ONDE os vídeos serão inseridos (certifique-se que esse elemento existe no HTML)
const mainContainer = document.querySelector('.uk-grid');

// Limpa o container antes de começar (opcional, evita duplicação se rodar 2x)
if (mainContainer) mainContainer.innerHTML = '';
var videoTitle = "";

// --- 2. LOOP PRINCIPAL ---
videoList.forEach(async (videoId) => {

    const oEmbedUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;
    async function getTitleWithoutAPI() {
        try {
            const response = await fetch(oEmbedUrl);
            const data = await response.json();

            // Se der certo, injeta o título no HTML
            if (data.title) {
                return data.title;

            } else {
                return "Título não disponível";
            }
        } catch (error) {
            console.error("Erro:", error);
            return "Erro ao carregar título";
        }
    }

    const videoTitle = await getTitleWithoutAPI();
    console.log(`Título recebido para o ID ${videoId}:`, videoTitle);

    // Cria o wrapper para ESTE vídeo específico
    const wrapper = document.createElement('div');
    wrapper.classList.add('kabum-thumbnail-wrapper');
    wrapper.style.cursor = "pointer"; // Indica que é clicável

    // Template String do HTML da Thumbnail (usando o ID atual do loop)
    const thumbnailHTML = `        
            <img class="video-thumbnail cr-card" 
                 src="https://img.youtube.com/vi/${videoId}/sddefault.jpg" 
                 alt="Thumbnail do vídeo">

            <div class="kabum-play-icon-overlay">
                <i class="fab fa-youtube"></i>
            </div>
             <div class="kabum-text-overlay">

                <!-- Substitua o titulo da Thumbnail dentro da tag <h3> -->
                <h3 class="kabum-video-title">
                    ${videoTitle}
                </h3>

                <!-- coloque o Sub-titulo da Thumbnail  dentro da tag <p> -->
                <p class="kabum-video-subtitle">
                    <!-- Insira aqui -->
                </p>
            </div
            
    `;

    // Insere o HTML dentro do wrapper que criamos
    wrapper.innerHTML = thumbnailHTML;

    wrapper.dataset.originalHtml = thumbnailHTML;

    // --- 3. VALIDAÇÃO (Sua lógica original, adaptada) ---
    const imgCheck = new Image();
    imgCheck.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    imgCheck.onload = function () {
        // Se a imagem for pequena demais (erro do YT), mostramos erro
        if (this.naturalWidth <= 120) {
            wrapper.innerHTML = "<p class='video-error-msg'>Vídeo indisponível</p>";
            wrapper.style.cursor = "default";
            console.log(`Vídeo ID ${videoId} inválido.`);
        } else {
            // Se for válido, adicionamos o wrapper validado ao container principal
            if (mainContainer) {
                mainContainer.appendChild(wrapper);
            }

            // Adiciona o evento de clique APENAS neste wrapper específico
            wrapper.addEventListener('click', () => playVideo(wrapper, videoId));
        }
    };
});




// --- 4. FUNÇÃO DE PLAY (Separada e Limpa) ---
function playVideo(wrapperElement, videoId) {

    const allWrappers = mainContainer.querySelectorAll('div')


    allWrappers.forEach(item => {
        if (item !== wrapperElement && item.dataset.originalHtml) {
            if (item.classList.contains('validacao-iframe')) {
                item.innerHTML = item.dataset.originalHtml; // Restaura a imagem
                item.classList.remove('validacao-iframe'); // Remove classe do iframe
                item.classList.add('kabum-thumbnail-wrapper'); // Devolve a classe original
            }
        }
    })

    document.querySelectorAll('.prevNext > a').forEach(item => {
        item.addEventListener('click', () => {
            const blockVideo = document.querySelector('.validacao-iframe')
            blockVideo.innerHTML = blockVideo.dataset.originalHtml; // Restaura a imagem
        })

    })


    // O template do Iframe com o ID correto
    const iframeHTML = `
    <iframe class="kabum-video-iframe cr-card"
    src="https://www.youtube.com/embed/${videoId}?autoplay=1"
    title="YouTube video player"  allow="autoplay; encrypted-media" allowfullscreen loading="lazy">
    </iframe>`;

    // Substitui o conteúdo da Thumbnail pelo Iframe
    wrapperElement.innerHTML = iframeHTML;

    // Remove classes antigas se necessário ou ajusta o estilo
    wrapperElement.classList.remove('kabum-thumbnail-wrapper'); // Opcional, dependendo do seu CSS
    wrapperElement.classList.add('validacao-iframe');

}