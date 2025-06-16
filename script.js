// Banco de dados de redações
const essaysDatabase = [
    {
        title: "Desafios para a valorização da herança africana no Brasil",
        text: "A valorização da herança africana no Brasil enfrenta diversos obstáculos, desde a falta de reconhecimento até a perpetuação de estereótipos. Apesar da significativa contribuição cultural, econômica e social da população afrodescendente, sua história e tradições ainda são marginalizadas.\n\nEm primeiro lugar, há uma carência no ensino da história africana nas escolas. Conforme estabelecido pela Lei 10.639, o estudo da história da África e dos afrodescendentes é obrigatório, mas muitas instituições não a aplicam adequadamente.\n\nAlém disso, a mídia frequentemente retrata a cultura africana de forma reducionista, limitando-a a estereótipos. Essa representação inadequada reforça preconceitos e impede uma compreensão mais profunda da riqueza dessa herança cultural.\n\nDiante desse cenário, é fundamental que o Ministério da Educação fiscalize a aplicação da lei nas escolas, que a mídia promova representações mais autênticas e que a sociedade reconheça o valor dessa cultura. Somente assim poderemos construir uma nação verdadeiramente plural e igualitária.",
        repertoire: "Lei 10.639/2003 que torna obrigatório o ensino da história e cultura afro-brasileira",
        thesis: "A herança africana no Brasil enfrenta desafios de valorização devido ao ensino inadequado e representações estereotipadas.",
        arguments: "1. Falta de aplicação adequada da Lei 10.639 nas escolas\n2. Representação reducionista na mídia\n3. Marginalização das contribuições afrodescendentes",
        intervention: "Fiscalização do MEC, representações midiáticas mais autênticas e conscientização social sobre o valor da cultura africana.",
        connectors: "Em primeiro lugar, Além disso, Diante desse cenário, Somente assim"
    },
    {
        title: "Consumo sustentável e seus desafios na sociedade contemporânea",
        text: `Nos últimos anos, o consumo desenfreado tem se tornado um problema global, com impactos ambientais cada vez mais evidentes. Nesse contexto, a adoção de práticas sustentáveis de consumo surge como uma necessidade urgente para preservar os recursos naturais do planeta.\n\nUm dos principais problemas é a cultura do descartável, que gera quantidades absurdas de lixo diariamente. Produtos com vida útil curta e embalagens excessivas contribuem para o acúmulo de resíduos que muitas vezes não são reciclados. Esse padrão de consumo precisa ser revisto com urgência.\n\nOutro aspecto preocupante é a pegada ecológica da produção industrial. Muitos bens de consumo demandam grande quantidade de energia e matéria-prima em sua fabricação, além de gerarem poluição. Portanto, reduzir o consumo desses produtos é fundamental para diminuir os danos ao meio ambiente.\n\nPara enfrentar esses desafios, é necessário que governos criem políticas de incentivo à economia circular e à produção sustentável. Ao mesmo tempo, as escolas devem educar as novas gerações sobre consumo consciente. Já as empresas precisam assumir sua responsabilidade social, desenvolvendo produtos ecologicamente corretos. Com essas ações conjuntas, será possível construir um futuro mais sustentável.`,
        repertoire: "Dados do relatório da ONU sobre aumento do consumo global e impactos ambientais",
        thesis: "O consumo desenfreado é um problema global que exige a adoção urgente de práticas sustentáveis.",
        arguments: "1. Cultura do descartável gera excesso de lixo\n2. Pegada ecológica da produção industrial\n3. Necessidade de revisão dos padrões de consumo",
        intervention: "Políticas governamentais de incentivo à economia circular, educação escolar sobre consumo consciente e responsabilidade social das empresas.",
        connectors: "Um dos principais problemas, Outro aspecto preocupante, Portanto, Para enfrentar esses desafios, Ao mesmo tempo, Já as empresas"
    }
];

// Variáveis de estado
let currentEssayIndex = 0;
let shuffledEssays = [];

// Elementos da DOM
const initialScreen = document.getElementById('initialScreen');
const viewEssayBtn = document.getElementById('viewEssayBtn');
const readingScreen = document.getElementById('readingScreen');
const readingEssayTitle = document.getElementById('readingEssayTitle');
const readingEssayText = document.getElementById('readingEssayText');
const startQuestionsBtn = document.getElementById('startQuestionsBtn');
const mainContent = document.getElementById('mainContent');
const exerciseScreen = document.getElementById('exerciseScreen');
const comparisonScreen = document.getElementById('comparisonScreen');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const nextEssayBtn = document.getElementById('nextEssayBtn');
const backToHomeBtn = document.getElementById('backToHomeBtn');
const essayTitle = document.getElementById('essayTitle');
const essayText = document.getElementById('essayText');
const compareEssayTitle = document.getElementById('compareEssayTitle');
const compareEssayText = document.getElementById('compareEssayText');
const repertoireInput = document.getElementById('repertoire');
const thesisInput = document.getElementById('thesis');
const argumentsInput = document.getElementById('arguments');
const interventionInput = document.getElementById('intervention');
const connectorsInput = document.getElementById('connectors');
const userRepertoire = document.getElementById('userRepertoire');
const userThesis = document.getElementById('userThesis');
const userArguments = document.getElementById('userArguments');
const userIntervention = document.getElementById('userIntervention');
const userConnectors = document.getElementById('userConnectors');
const correctRepertoire = document.getElementById('correctRepertoire');
const correctThesis = document.getElementById('correctThesis');
const correctArguments = document.getElementById('correctArguments');
const correctIntervention = document.getElementById('correctIntervention');
const correctConnectors = document.getElementById('correctConnectors');

// Event Listeners
viewEssayBtn.addEventListener('click', showReadingScreen);
startQuestionsBtn.addEventListener('click', showMainContent);
showAnswerBtn.addEventListener('click', showComparison);
nextEssayBtn.addEventListener('click', nextEssay);
backToHomeBtn.addEventListener('click', backToHome);

// Funções
function showReadingScreen() {
    initialScreen.style.display = 'none';
    readingScreen.style.display = 'block';
    loadCurrentEssayForReading();
}

function showMainContent() {
    readingScreen.style.display = 'none';
    mainContent.style.display = 'block';
    loadCurrentEssay();
}

function loadCurrentEssayForReading() {
    const currentEssay = shuffledEssays[currentEssayIndex];
    readingEssayTitle.textContent = currentEssay.title;
    readingEssayText.textContent = currentEssay.text;
}

function shuffleEssays() {
    // Cria uma cópia do array original
    shuffledEssays = [...essaysDatabase];
    
    // Algoritmo Fisher-Yates para embaralhar
    for (let i = shuffledEssays.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledEssays[i], shuffledEssays[j]] = [shuffledEssays[j], shuffledEssays[i]];
    }
}

function loadCurrentEssay() {
    const currentEssay = shuffledEssays[currentEssayIndex];
    essayTitle.textContent = currentEssay.title;
    essayText.textContent = currentEssay.text;
    compareEssayTitle.textContent = currentEssay.title;
    compareEssayText.textContent = currentEssay.text;
    repertoireInput.value = '';
    thesisInput.value = '';
    argumentsInput.value = '';
    interventionInput.value = '';
    connectorsInput.value = '';
    
    exerciseScreen.style.display = 'block';
    comparisonScreen.style.display = 'none';
}

function showComparison() {
    const currentEssay = essaysDatabase[currentEssayIndex];
    
    userRepertoire.textContent = repertoireInput.value || "(Não respondido)";
    userThesis.textContent = thesisInput.value || "(Não respondido)";
    userArguments.textContent = argumentsInput.value || "(Não respondido)";
    userIntervention.textContent = interventionInput.value || "(Não respondido)";
    userConnectors.textContent = connectorsInput.value || "(Não respondido)";
    
    correctRepertoire.textContent = currentEssay.repertoire;
    correctThesis.textContent = currentEssay.thesis;
    correctArguments.textContent = currentEssay.arguments;
    correctIntervention.textContent = currentEssay.intervention;
    correctConnectors.textContent = currentEssay.connectors;
    
    exerciseScreen.style.display = 'none';
    comparisonScreen.style.display = 'block';
}


function nextEssay() {
    // Avança para a próxima redação (com loop)
    currentEssayIndex = (currentEssayIndex + 1) % shuffledEssays.length;
    
    // Volta para a tela de leitura com a nova redação
    comparisonScreen.style.display = 'none';
    readingScreen.style.display = 'block';
    loadCurrentEssayForReading();
}

function backToHome() {
    mainContent.style.display = 'none';
    initialScreen.style.display = 'flex';
    currentEssayIndex = 0;
    shuffleEssays(); // Reembaralha quando volta para o início
}

document.addEventListener('DOMContentLoaded', function() {
    shuffleEssays(); // Embaralha as redações quando a página carrega
});