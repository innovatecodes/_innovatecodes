// Animar elementos ao rolar...
const elementos = document.querySelectorAll("[data-animar]");
const classeAnimar = "animar";

function animarElementos() {
  const topoJanela = window.pageYOffset + (window.innerHeight * 3) / 4;
  elementos.forEach(function (item) {
    if (topoJanela > item.offsetTop) {
      item.classList.add(classeAnimar);
    } else {
      item.classList.remove(classeAnimar);
    }
  });
}

if (elementos.length) {
  addEventListener("scroll", () => {
    animarElementos();
  })
}

// Efeito rolagem suave...
function rolagemSuave() {
  const html = document.querySelector("html");
  const topo = html.offsetTop;
  // Posição do elemento em relação ao topo da página
  window.scrollTo({ top: topo, behavior: "smooth" });
  // Faz a rolagem suave até a posição do elemento
}
document.querySelector("#fa-angles-up").addEventListener("click", rolagemSuave);

// Navegação interna primária...
const navegacao = document.querySelector("header nav");
const hamburguer = document.getElementById("hamburguer");
const attr = {
  fechar: "Fechar menu",
  abrir: "Abrir menu",
  expandido: "aria-expanded",
  pressionado: "aria-pressed",
  _etiqueta: "aria-label",
  _falso: false,
  _verdadeiro: true,
  adicionarAttr() {
    hamburguer.setAttribute(attr.expandido, attr._verdadeiro);
    hamburguer.setAttribute(attr.pressionado, attr._verdadeiro);
    hamburguer.setAttribute(attr._etiqueta, attr.fechar);
  },
  removerAttr() {
    hamburguer.setAttribute(attr.expandido, attr._falso);
    hamburguer.setAttribute(attr.pressionado, attr._falso);
    hamburguer.setAttribute(attr._etiqueta, attr.abrir);
  }
}

function adicionar() {
  navegacao.classList.add("ativo");
  hamburguer.classList.add("mover");
  navegacao.classList.add("fadeIn");
  document.getElementById("sobrepor").classList.add("sobrepor");
}

function remover() {
  navegacao.classList.remove("ativo");
  hamburguer.classList.remove("mover");
  navegacao.classList.remove("fadeIn");
  document.getElementById("sobrepor").classList.remove("sobrepor");
}

function menu(event) {
  if (event.type === "touchstart") {
    event.preventDefault(event);
  }

  if (Boolean(navegacao.className) === false && false == 0) {
    adicionar();
    attr.adicionarAttr(event);
  } else {
    remover();
    attr.removerAttr(event);
  }
}
document.getElementById("hamburguer").addEventListener("click", menu);
document.getElementById("hamburguer").addEventListener("touchstart", menu);

// Se um evento de clique for detectado fora do menu, ele será fechado
document.addEventListener("click", function (event) {
  if (!document.getElementById("menu").contains(event.target) && !hamburguer.contains(event.target) && navegacao.classList.contains("ativo")) {
    remover();
  }
});

// Se um evento de scroll for detectado fora do menu, ele será fechado
window.addEventListener("scroll", function (event) {
  if (!document.getElementById("menu").contains(event.target)) {
    remover();
  }
});

// Previne que a página seja recarregada ao fazer um movimento sobre a tela caso o menu esteja aberto
document.getElementById("menu").addEventListener("touchmove", function (event) {
  event.preventDefault();
});

// Fechar navegação ao clicar no link...
let links = document.querySelectorAll("a[href^='#'");
// Converte HTMLCollectionOf para Array
links = Array.from(links);

links.forEach(function (link) {
  link.addEventListener("click", (event) => {
    menu(event);
    attr.removerAttr(hamburguer);
  })
})

// Efeito máquina de escrever...
const obterH1 = document.querySelector("h1");

function digitando(element) {
  const array = element.innerHTML.split("");
  element.innerHTML = "";

  array.forEach((letra, i) => {
    setTimeout(() => {
      element.innerHTML += letra;
    }, 100 * i);
  });
}
digitando(obterH1);

// Ano atual e data de criação...
const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const obterAnoAtual = document.getElementById("ano-atual");

const obterTime = document.querySelector("time");
obterTime.dateTime = 2022;
obterTime.textContent = 2022;

function ano() {
  return obterAnoAtual.innerHTML = anoAtual;
}
window.addEventListener("load", event => {
  ano();
});

// Alterar tema...
const input = document.querySelector("nav label");
const root = document.querySelector(":root");

if (sessionStorage.getItem("mode") === "dark") {
  temaEscuro();
} else {
  temaPrincipal();
}

function temaEscuro() {
  root.classList.add("tema-escuro"); // Adiciona a classe no html - :root
  input.checked = true; // Configura o checkbox para (true)
  input.classList.add("controle")
  sessionStorage.setItem("mode", "dark"); // Armazena um nome e valor para saber que o modo escuro está ativo
}

function temaPrincipal() {
  root.classList.remove("tema-escuro"); // Remove a classe no html - :root
  input.checked = false; // Seta o checkbox para (false)
  input.classList.remove("controle")
  sessionStorage.setItem("mode", "light"); // Armazena um nome e valor para saber que o modo claro está ativo
}

input.addEventListener("change", function (event) {
  // No clique, verifica se o checkbox está checado e muda o tema
  if (event.target.checked) {
    temaEscuro();
  } else {
    temaPrincipal();
  }
});

input.addEventListener("keydown", function (event) {
  // Ao pressionar uma tecla, se o checkbox não estiver chegado, o ! irá retornar true, e o tema será mudado
  if (!event.target.checked) {
    temaEscuro();
    // Exibe no console o código da tecla pressionada
    // console.log(`A tecla pressionada foi a ${event.keyCode}`);
  } else {
    temaPrincipal();
  }
});

// Perguntas frequentes...
let ler = document.getElementsByTagName("dl");
ler = Array.from(ler);
const angulo = "angulo";
const resposta = "resposta";

ler.forEach(function (elemento, event) {
  elemento.addEventListener("click", () => {
    perguntasFrequentes(elemento);
  });
  elemento.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      perguntasFrequentes(elemento);
    }
  });
});

const perguntasFrequentes = function (elemento) {
  if (!elemento.classList.contains(angulo, resposta)) {
    elemento.classList.add(angulo, resposta);
    elemento.setAttribute(attr.expandido, attr._verdadeiro);
  } else {
    elemento.classList.remove(angulo, resposta);
    elemento.setAttribute(attr.expandido, attr._falso);
  }
}

// Efeito parallax...
const parallax = new Rellax(".parallax");

// matchmedia() - Utilize um media-querie como no CSS para verificar a largura do browser
const larguraMax = window.matchMedia("(max-width: 767.98px)");
if(larguraMax.matches){
  document.getElementById("fundo-animado").classList.toggle("ajustarBrilho");
}