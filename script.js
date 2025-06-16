// Banco de dados de redações
const essaysDatabase = [
    {
        title: "Desafios da Educação no Brasil",
        text: `A educação é um dos pilares fundamentais para o desenvolvimento de qualquer sociedade. No Brasil, apesar dos avanços nas últimas décadas, ainda existem desafios significativos que precisam ser superados para garantir um ensino de qualidade para todos.\n\nEm primeiro lugar, é preciso considerar a desigualdade social que afeta diretamente o acesso à educação. Enquanto escolas particulares oferecem infraestrutura adequada e professores bem remunerados, muitas instituições públicas sofrem com a falta de recursos básicos. Essa disparidade cria um abismo educacional entre diferentes classes sociais.\n\nAlém disso, a formação docente é outro ponto crítico. Muitos professores, especialmente nas regiões mais pobres do país, não recebem capacitação adequada nem condições de trabalho satisfatórias. Consequentemente, o processo de ensino-aprendizagem fica comprometido, prejudicando o desenvolvimento dos estudantes.\n\nDiante desse cenário, é essencial que o governo federal, em parceria com estados e municípios, invista na melhoria da infraestrutura escolar e na valorização dos professores. Paralelamente, programas de assistência estudantil devem ser ampliados para garantir que todos os jovens possam permanecer na escola. Somente com essas medidas será possível construir um sistema educacional mais justo e eficiente.`,
        thesis: "A educação no Brasil enfrenta desafios significativos que impedem o ensino de qualidade para todos.",
        arguments: "1. Desigualdade social no acesso à educação\n2. Formação docente inadequada\n3. Condições precárias de trabalho para professores",
        intervention: "Investimento governamental em infraestrutura escolar, valorização dos professores e ampliação de programas de assistência estudantil.",
        connectors: "Em primeiro lugar, Além disso, Consequentemente, Diante desse cenário, Paralelamente"
    },
    {
        title: "Consumo Sustentável na Sociedade Moderna",
        text: `Nos últimos anos, o consumo desenfreado tem se tornado um problema global, com impactos ambientais cada vez mais evidentes. Nesse contexto, a adoção de práticas sustentáveis de consumo surge como uma necessidade urgente para preservar os recursos naturais do planeta.\n\nUm dos principais problemas é a cultura do descartável, que gera quantidades absurdas de lixo diariamente. Produtos com vida útil curta e embalagens excessivas contribuem para o acúmulo de resíduos que muitas vezes não são reciclados. Esse padrão de consumo precisa ser revisto com urgência.\n\nOutro aspecto preocupante é a pegada ecológica da produção industrial. Muitos bens de consumo demandam grande quantidade de energia e matéria-prima em sua fabricação, além de gerarem poluição. Portanto, reduzir o consumo desses produtos é fundamental para diminuir os danos ao meio ambiente.\n\nPara enfrentar esses desafios, é necessário que governos criem políticas de incentivo à economia circular e à produção sustentável. Ao mesmo tempo, as escolas devem educar as novas gerações sobre consumo consciente. Já as empresas precisam assumir sua responsabilidade social, desenvolvendo produtos ecologicamente corretos. Com essas ações conjuntas, será possível construir um futuro mais sustentável.`,
        thesis: "O consumo desenfreado é um problema global que exige a adoção urgente de práticas sustentáveis.",
        arguments: "1. Cultura do descartável gera excesso de lixo\n2. Pegada ecológica da produção industrial\n3. Necessidade de revisão dos padrões de consumo",
        intervention: "Políticas governamentais de incentivo à economia circular, educação escolar sobre consumo consciente e responsabilidade social das empresas.",
        connectors: "Um dos principais problemas, Outro aspecto preocupante, Portanto, Para enfrentar esses desafios, Ao mesmo tempo, Já as empresas"
    }
];

// Variáveis de estado
let currentEssayIndex = 0;

// Elementos da DOM
const initialScreen = document.getElementById('initialScreen');
const viewEssayBtn = document.getElementById('viewEssayBtn');
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
const thesisInput = document.getElementById('thesis');
const argumentsInput = document.getElementById('arguments');
const interventionInput = document.getElementById('intervention');
const connectorsInput = document.getElementById('connectors');
const userThesis = document.getElementById('userThesis');
const userArguments = document.getElementById('userArguments');
const userIntervention = document.getElementById('userIntervention');
const userConnectors = document.getElementById('userConnectors');
const correctThesis = document.getElementById('correctThesis');
const correctArguments = document.getElementById('correctArguments');
const correctIntervention = document.getElementById('correctIntervention');
const correctConnectors = document.getElementById('correctConnectors');
const installBtn = document.getElementById('installBtn');

// Event Listeners
viewEssayBtn.addEventListener('click', showMainContent);
showAnswerBtn.addEventListener('click', showComparison);
nextEssayBtn.addEventListener('click', nextEssay);
backToHomeBtn.addEventListener('click', backToHome);

// Funções
function showMainContent() {
    initialScreen.classList.add('hidden');
    mainContent.classList.add('visible');
    loadCurrentEssay();
}

function loadCurrentEssay() {
    const currentEssay = essaysDatabase[currentEssayIndex];
    essayTitle.textContent = currentEssay.title;
    essayText.textContent = currentEssay.text;
    compareEssayTitle.textContent = currentEssay.title;
    compareEssayText.textContent = currentEssay.text;
    
    thesisInput.value = '';
    argumentsInput.value = '';
    interventionInput.value = '';
    connectorsInput.value = '';
    
    exerciseScreen.style.display = 'block';
    comparisonScreen.style.display = 'none';
}

function showComparison() {
    const currentEssay = essaysDatabase[currentEssayIndex];
    
    userThesis.textContent = thesisInput.value || "(Não respondido)";
    userArguments.textContent = argumentsInput.value || "(Não respondido)";
    userIntervention.textContent = interventionInput.value || "(Não respondido)";
    userConnectors.textContent = connectorsInput.value || "(Não respondido)";
    
    correctThesis.textContent = currentEssay.thesis;
    correctArguments.textContent = currentEssay.arguments;
    correctIntervention.textContent = currentEssay.intervention;
    correctConnectors.textContent = currentEssay.connectors;
    
    exerciseScreen.style.display = 'none';
    comparisonScreen.style.display = 'block';
}

function nextEssay() {
    currentEssayIndex = (currentEssayIndex + 1) % essaysDatabase.length;
    loadCurrentEssay();
}

function backToHome() {
    mainContent.classList.remove('visible');
    initialScreen.classList.remove('hidden');
    currentEssayIndex = 0; // Reseta para a primeira redação
}

// Carrega a primeira redação
loadCurrentEssay();