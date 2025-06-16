const CACHE_NAME = 'redacao-nota-1000-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});

// Debug do PWA
console.log('Verificando requisitos PWA:');

// Verifica se o navegador suporta PWAs
if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
  console.log('✅ Navegador compatível com PWA');
} else {
  console.warn('⚠️ Navegador não suporta todos os recursos PWA');
}

// Debug do Service Worker
navigator.serviceWorker.getRegistration().then(reg => {
  if (reg) {
    console.log('✅ Service Worker registrado:', reg.scope);
  } else {
    console.warn('⚠️ Service Worker não registrado');
  }
});

// Debug do Manifest
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('✅ Já instalado como PWA');
} else {
  console.log('ℹ️ Não instalado ainda - modo navegador');
}

// Simula o evento de instalação após 5 segundos (apenas para desenvolvimento)
setTimeout(() => {
  if (!deferredPrompt) {
    console.log('⚠️ Evento beforeinstallprompt não disparou - simulando para desenvolvimento');
    installBtn.style.display = 'block';
    installBtn.textContent = 'Instalar App (Modo Dev)';
    
    // Implementação alternativa para desenvolvimento
    installBtn.onclick = () => {
      alert('No ambiente de produção, isto instalaria o PWA.\n\nPara testar localmente, no Chrome:\n1. Clique no ícone de 3 pontos\n2. "Instalar Redação Nota 1000"');
    };
  }
}, 5000);

// Controle de instalação PWA
const installButton = document.getElementById('installBtn');
let deferredPrompt;

// Configurações específicas por plataforma
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

// Mostra o botão de instalação de forma inteligente
function showInstallButton() {
  if (isStandalone) {
    installButton.style.display = 'none';
    return;
  }

  if (isIOS) {
    installButton.textContent = 'Adicionar à Tela Inicial';
    installButton.style.display = 'block';
  } else {
    installButton.textContent = 'Instalar App';
    installButton.style.display = 'block';
  }
}

// Evento para instalação
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

// Lógica do botão de instalação
installButton.addEventListener('click', async () => {
  if (deferredPrompt && !isIOS) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      installButton.style.display = 'none';
    }
    deferredPrompt = null;
  } else if (isIOS) {
    alert('Para instalar:\n1. Compartilhar (ícone de caixa com flecha)\n2. Adicionar à Tela de Início');
  } else {
    alert('Use o menu do navegador (⋯) e procure por "Instalar Redação Nota 1000"');
  }
});

// Verifica se já está instalado
window.addEventListener('appinstalled', () => {
  installButton.style.display = 'none';
  console.log('PWA foi instalado');
});

// Mostra o botão após 10 segundos se não detectar o evento
setTimeout(() => {
  if (!deferredPrompt && !isStandalone) {
    showInstallButton();
  }
}, 10000);

// Inicialização
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registrado:', registration.scope);
        showInstallButton();
      })
      .catch(error => {
        console.error('Falha no ServiceWorker:', error);
        showInstallButton();
      });
  });
}