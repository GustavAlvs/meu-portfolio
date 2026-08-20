/* ========================================
   ELEMENTOS DO SITE
======================================== */

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");


/* ========================================
   ANO AUTOMÁTICO
======================================== */

if (year) {
  year.textContent = new Date().getFullYear();
}


/* ========================================
   TEMA CLARO / ESCURO
======================================== */

if (themeBtn) {

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
      document.body.classList.contains("light");

    themeBtn.textContent =
      isLight ? "☀️" : "🌙";

    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );

  });


  /* Recuperar tema salvo */

  if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light");

    themeBtn.textContent = "☀️";

  }

}


/* ========================================
   MENU MOBILE
======================================== */

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

  });


  /* Fechar menu ao clicar em um link */

  document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

      });

    });

}


/* ========================================
   TERMINAL INTERATIVO
======================================== */

const terminalOutput =
  document.getElementById("terminal-output");

const terminalLoading =
  document.getElementById("terminal-loading-text");

const progressBar =
  document.getElementById("progress-bar");

const terminalSuccess =
  document.getElementById("terminal-success");


/* ========================================
   MENSAGENS DO TERMINAL
======================================== */

const terminalMessages = [

  {
    language: "HTML",

    text:
`const gustavo = {
  área: "Desenvolvimento Web",
  skills: ["HTML", "CSS", "JavaScript"],
  objetivo: "Evoluir sempre"
};`
  },


  {
    language: "CSS",

    text:
`const design = {
  tema: "Dark / Red",
  responsivo: true,
  animações: true
};`
  },


  {
    language: "JavaScript",

    text:
`function criarProjeto() {
  return "Transformando ideias em código";
}`
  },


  {
    language: "SQL",

    text:
`SELECT *
FROM projetos
WHERE desenvolvedor = "Gustavo";`
  },


  {
    language: "Git",

    text:
`git add .
git commit -m "novo projeto"
git push origin main`
  },


  {
    language: "Projetos",

    text:
`> projetos encontrados

✓ Portfolio
✓ Helpdesk Simulator
✓ Outros projetos`
  }

];


let currentMessage = 0;


/* ========================================
   FUNÇÃO PARA DIGITAR TEXTO
======================================== */

function typeText(text, element, speed = 25) {

  return new Promise((resolve) => {

    if (!element) {
      resolve();
      return;
    }


    element.textContent = "";

    let index = 0;


    function type() {

      if (index < text.length) {

        element.textContent +=
          text.charAt(index);

        index++;

        setTimeout(type, speed);

      } else {

        resolve();

      }

    }


    type();

  });

}


/* ========================================
   BARRA DE PROGRESSO
======================================== */

function animateProgress() {

  return new Promise((resolve) => {

    if (!progressBar) {
      resolve();
      return;
    }


    progressBar.style.width = "0%";


    let progress = 0;


    const interval = setInterval(() => {

      progress++;

      progressBar.style.width =
        `${progress}%`;


      if (progress >= 100) {

        clearInterval(interval);

        resolve();

      }

    }, 12);

  });

}


/* ========================================
   EXECUTAR TERMINAL
======================================== */

async function runTerminal() {

  if (
    !terminalOutput ||
    !terminalLoading ||
    !progressBar ||
    !terminalSuccess
  ) {
    return;
  }


  /* Esconde mensagem de sucesso */

  terminalSuccess.classList.remove("show");


  /* Limpa barra */

  progressBar.style.width = "0%";


  /* Pega mensagem atual */

  const message =
    terminalMessages[currentMessage];


  /* Atualiza carregamento */

  terminalLoading.textContent =
    `carregando ${message.language}...`;


  /* Digita código */

  await typeText(
    message.text,
    terminalOutput,
    18
  );


  /* Pequena pausa */

  await new Promise(resolve =>
    setTimeout(resolve, 400)
  );


  /* Barra de progresso */

  await animateProgress();


  /* Mostra sistema iniciado */

  terminalSuccess.classList.add("show");


  /* Próxima mensagem */

  currentMessage++;


  if (
    currentMessage >=
    terminalMessages.length
  ) {

    currentMessage = 0;

  }


  /* Espera antes de reiniciar */

  setTimeout(() => {

    terminalOutput.textContent = "";

    runTerminal();

  }, 3000);

}


/* ========================================
   INICIAR TERMINAL
======================================== */

if (terminalOutput) {

  setTimeout(() => {

    runTerminal();

  }, 800);

}
