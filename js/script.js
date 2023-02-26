// Debounce do Lodash...
const debounce = function (func, wait, immediate) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Animar ao fazer a rolagem suave...
const elementos = document.querySelectorAll("[data-animar]");
const animar = "animar";

function animarRolagem() {
  const windowTop = window.pageYOffset + (window.innerHeight * 3) / 4;

  elementos.forEach(function (item) {
    // matchmedia() - Utilize um media-querie como no CSS para verificar a largura do browser
    let larguraMin = window.matchMedia("(min-width: 768px)");
    let larguraMax = window.matchMedia("(max-width: 767.98px)");

    if (larguraMin.matches) {
      if (windowTop > item.offsetTop) {
        item.classList.add(animar);
      } else {
        item.classList.remove(animar);
      }
    } else if (larguraMax.matches) {
      item.style.transform = "translate3d(0,0,0)";
      item.style.opacity = "1";
    }
  });
}

animarRolagem();

if (elementos.length) {
  window.addEventListener(
    "scroll",
    debounce(function () {
      animarRolagem();
    }, 120)
  );
}

// Efeito rolagem suave...
function rolagemSuave() {
  const obterHTML = document.querySelector("html");
  const topo = obterHTML.offsetTop;
  // Posição do elemento em relação ao topo da página
  window.scrollTo({ top: topo, behavior: "smooth" });
  // Faz a rolagem suave até a posição do elemento
}
document.querySelector("#fa-angles-up").addEventListener("click", rolagemSuave);

// Navegação interna primária...
const attr = {
  fechar: "Fechar menu",
  abrir: "Abrir menu",
  expandido: "aria-expanded",
  pressionado: "aria-pressed",
  _etiqueta: "aria-label",
  _falso: false,
  _verdadeiro: true,
}

function menu(event) {
  const obterNavegacao = document.getElementById("navegacao-interna");

  if (event.type === "touchstart") {
    event.preventDefault();
  }

  if (Boolean(obterNavegacao.className) === false && false == 0) {
    obterNavegacao.classList.add("hamburguer-ativo");
    event.currentTarget.setAttribute(attr.expandido, attr._verdadeiro);
    event.currentTarget.setAttribute(attr.pressionado, attr._verdadeiro);
    event.currentTarget.setAttribute(attr._etiqueta, attr.fechar);

  } else {
    obterNavegacao.classList.remove("hamburguer-ativo")
    event.currentTarget.setAttribute(attr.expandido, attr._falso);
    event.currentTarget.setAttribute(attr.pressionado, attr._falso);
    event.currentTarget.setAttribute(attr._etiqueta, attr.abrir);
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
    document.getElementById("hamburguer").setAttribute(attr.expandido, attr._falso);
    document.getElementById("hamburguer").setAttribute(attr.pressionado, attr._falso);
    document.getElementById("hamburguer").setAttribute(attr._etiqueta, attr.abrir);
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
const alterarModoTema = document.getElementById("alterar-tema");
const obterControle = document.querySelector(".fa-circle-half-stroke");
const raiz = document.querySelector(":root");

if (sessionStorage.getItem("mode") == "dark") {
  alterarModoEscuro();
} else {
  alterarModoClaro();
}

function alterarModoEscuro() {
  raiz.classList.add("modo-claro"); // Adiciona a classe no html - :root
  alterarModoTema.checked = true; // Configura o checkbox para (true)
  sessionStorage.setItem("mode", "dark"); // Armazena um nome e valor para saber que o modo escuro está ativo
  obterControle.classList.add("mover-controle");
}

function alterarModoClaro() {
  raiz.classList.remove("modo-claro"); // Remove a classe no html - :root
  alterarModoTema.checked = false; // Seta o checkbox para (false)
  sessionStorage.setItem("mode", "light"); // Armazena um nome e valor para saber que o modo claro está ativo
  obterControle.classList.remove("mover-controle");
}

//Se o estado do checkbox for mudado, executa a função
alterarModoTema.addEventListener("change", function () {
  //Verifica se o checkbox está checado ou não
  if (alterarModoTema.checked) {
    alterarModoEscuro();
  } else {
    alterarModoClaro();
  }
});

// Perguntas frequentes...
const ler = document.querySelectorAll(".ler");

ler.forEach(function (elementoAtual) {
  elementoAtual.addEventListener("click", (event) => {
    elementoAtual.classList.toggle("girarAngulo");
    elementoAtual.classList.toggle("exibirResposta");
  });
});
