// Debounce do Lodash
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

// Animação
const obterAlvo = document.querySelectorAll('[data-animar]');
const animar = 'animar';

function animarRolagem() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);

    obterAlvo.forEach(function (element) {
        if ((windowTop) > element.offsetTop) {
            element.classList.add(animar);
        } else {
            element.classList.remove(animar);
        }

        if (window.innerWidth <= 767.98) {
            element.style.transform = "translate3d(0,0,0)";
            element.style.opacity = "1";
        }
    })
}

animarRolagem();

if (obterAlvo.length) {
    window.addEventListener('scroll', debounce(function () {
        animarRolagem();
    }, 120));
}

// Efeito rolagem suave
function rolagemSuave() {
    const obterHTML = document.querySelector("html");
    const topo = obterHTML.offsetTop;
    // Posição do elemento em relação ao topo da página
    window.scrollTo({ top: topo, behavior: "smooth" });
    // Faz a rolagem suave até a posição do elemento
}

document.querySelector("#fa-angles-up").addEventListener("click", rolagemSuave);

/* Navegação interna primária */
function menu(event) {
    const obterNavegacao = document.getElementById("navegacao-interna");

    if (event.type === "touchstart") {
        event.preventDefault();
    }

    if (obterNavegacao.className != "hamburguer-ativo") {
        obterNavegacao.classList.add("hamburguer-ativo");
        event.currentTarget.setAttribute("aria-expanded", true);
        event.currentTarget.setAttribute("aria-pressed", true);
        event.currentTarget.setAttribute("aria-label", "Fechar menu");
    } else {
        obterNavegacao.classList.remove("hamburguer-ativo")
        event.currentTarget.setAttribute("aria-expanded", false);
        event.currentTarget.setAttribute("aria-pressed", false);
        event.currentTarget.setAttribute("aria-label", "Abrir menu");
    }
}

document.getElementById("hamburguer").addEventListener("click", menu);
document.getElementById("hamburguer").addEventListener("touchstart", menu);

// Fechar navegação ao clicar no link
function linkAncora(event) {
    menu(event);
    document.getElementById("hamburguer").setAttribute("aria-expanded", false);
    document.getElementById("hamburguer").setAttribute("aria-pressed", false);
    document.getElementById("hamburguer").setAttribute("aria-label", "Abrir menu");
}

document.querySelectorAll("a[href^='#'")[0].addEventListener("click", linkAncora);
document.querySelectorAll("a[href^='#'")[1].addEventListener("click", linkAncora);
document.querySelectorAll("a[href^='#'")[2].addEventListener("click", linkAncora);

// Efeito máquina de escrever 
const obterH1 = document.querySelector("h1");

function digitando(element) {
    const array = element.innerHTML.split("");
    element.innerHTML = "";

    array.forEach((letra, i) => {
        setTimeout(() => { element.innerHTML += letra; }, 100 * i);
    })
}

digitando(obterH1);

// Ano atual e data de criação
const dataAtual = new Date();
const anoAtual = dataAtual.getFullYear();
const obterAnoAtual = document.getElementById("ano-atual");

window.addEventListener("load", event => {
    obterAnoAtual.innerHTML = anoAtual;
})

const dataCriacao = 2022;
const obterTime = document.querySelector("time");
obterTime.dateTime = dataCriacao;
obterTime.textContent = dataCriacao;

// Alterar tema
const alterarModoTema = document.getElementById("alterar-tema");
const obterControle = document.querySelector(".fa-circle-half-stroke");

if (sessionStorage.getItem("mode") == "dark") {
    alterarModoEscuro();
} else {
    alterarModoClaro();
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

function alterarModoEscuro() {
    const raiz = document.querySelector(":root");
    raiz.classList.add("modo-claro"); //Adiciona a classe no html - :root
    alterarModoTema.checked = true; //Configura o checkbox para (true)
    sessionStorage.setItem("mode", "dark"); //Armazena um nome e valor para saber que o modo escuro está ativo
    obterControle.classList.add("mover-controle");
}

function alterarModoClaro() {
    const raiz = document.querySelector(":root");
    raiz.classList.remove("modo-claro");  //Remove a classe no html - :root
    alterarModoTema.checked = false; //Seta o checkbox para (false)
    sessionStorage.setItem("mode", "light"); //Armazena um nome e valor para saber que o modo claro está ativo
    obterControle.classList.remove("mover-controle");
}

// Perguntas frequentes
const ler = document.querySelectorAll(".ler");
ler.forEach(function (elementoAtual) {
    elementoAtual.addEventListener("click", event => {
        elementoAtual.classList.toggle("girarAngulo");
        elementoAtual.classList.toggle("exibirResposta")
    })
})





