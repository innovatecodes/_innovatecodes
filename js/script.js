// Animar elementos ao rolar...
const elementos = document.querySelectorAll("[data-animar]");
const classeAnimar = "animar";
// matchmedia() - Utilize um media-querie como no CSS para verificar a largura do browser
const larguraMax = window.matchMedia("(max-width: 767.98px)");

function animarElementos() {
  const topoJanela = window.pageYOffset + (window.innerHeight * 3) / 4;

  elementos.forEach(function (item) {

    if (larguraMax.matches) {
      item.style.transform = "translate3d(0,0,0)";
      item.style.opacity = "1";
    } else {
      if (topoJanela > item.offsetTop) {
        item.classList.add(classeAnimar);
      } else {
        item.classList.remove(classeAnimar);
      }
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

function menu(event) {
  if (event.type === "touchstart") {
    event.preventDefault(event);
  }

  if (Boolean(navegacao.className) === false && false == 0) {
    navegacao.classList.add("hamburguer-ativo");
    hamburguer.classList.add("moverHamburguer");
    navegacao.classList.add("fadeIn");
    attr.adicionarAttr(event);
  } else {
    navegacao.classList.remove("hamburguer-ativo");
    hamburguer.classList.remove("moverHamburguer");
    navegacao.classList.remove("fadeIn");
    attr.removerAttr(event);
  }
}
document.getElementById("hamburguer").addEventListener("click", menu);
document.getElementById("hamburguer").addEventListener("touchstart", menu);

// Fechar navegação ao clicar no link...
let links = document.querySelectorAll("a[href$='/'], a[href^='#'");
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
})

// Alterar tema...
const tema = document.getElementById("tema");
const controle = document.querySelector(".fa-circle-half-stroke");
const root = document.querySelector(":root");

if (sessionStorage.getItem("mode") == "dark") {
  alterarModoEscuro();
} else {
  alterarModoClaro();
}

function alterarModoEscuro() {
  root.classList.add("modo-claro"); // Adiciona a classe no html - :root
  tema.checked = true; // Configura o checkbox para (true)
  sessionStorage.setItem("mode", "dark"); // Armazena um nome e valor para saber que o modo escuro está ativo
  controle.classList.add("mover-controle");
}

function alterarModoClaro() {
  root.classList.remove("modo-claro"); // Remove a classe no html - :root
  tema.checked = false; // Seta o checkbox para (false)
  sessionStorage.setItem("mode", "light"); // Armazena um nome e valor para saber que o modo claro está ativo
  controle.classList.remove("mover-controle");
}

// Se o estado do checkbox for mudado, executa a função
tema.addEventListener("change", function () {
  // Se o checkbox estiver checado, altera o tema
  if (tema.checked) {
    alterarModoEscuro();
  } else {
    alterarModoClaro();
  }

  // Altera a cor dos seguintes elementos no responsivo se o tema for claro
  const alterarFundoAnimado = document.getElementById("fundo-animado");
  const alterarAbbr = document.getElementById("introducao");
  root.classList.contains("modo-claro") ? alterarFundoAnimado.classList.add("inverter") : alterarFundoAnimado.classList.remove("inverter");
  root.classList.contains("modo-claro") ? alterarAbbr.classList.add("inverter") : alterarAbbr.classList.remove("inverter");
});

// Perguntas frequentes...
let ler = document.getElementsByTagName("dt");
ler = Array.from(ler);
const angulo = "angulo";
const resposta = "resposta";

ler.forEach(function (elemento) {
  elemento.addEventListener("click", () => {
    perguntasFrequentes(elemento);
  });
  elemento.addEventListener("keypress", (tecla) => {
    if (tecla.key === "Enter") {
      perguntasFrequentes(elemento);
    }
  });
});

const perguntasFrequentes = function (dt) {
  if (!dt.classList.contains(angulo, resposta)) {
    dt.classList.add(angulo, resposta);
    dt.setAttribute(attr.expandido, attr._verdadeiro);
    const dd = dt.nextElementSibling;
    if (dd) {
      dd.addEventListener("click", () => {
        dd.previousElementSibling.classList.remove(angulo, resposta);
      })
    }
  } else {
    dt.classList.remove(angulo, resposta);
    dt.setAttribute(attr.expandido, attr._falso);
  }
}

// Efeito parallax...
const parallax = new Rellax(".parallax");
