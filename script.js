const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeBtn.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☀️";
}

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});
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
   DIGITAR TEXTO
======================================== */

function typeText(text, element, speed = 25) {

  return new Promise((resolve) => {

    element.textContent = "";

    let index = 0;

    function type() {

      if (index < text.length) {

        element.textContent += text.charAt(index);

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
   TERMINAL
======================================== */

async function runTerminal() {

  terminalSuccess.classList.remove("show");

  progressBar.style.width = "0%";

  const message =
    terminalMessages[currentMessage];


  /* mostra linguagem */

  terminalLoading.textContent =
    `carregando ${message.language}...`;


  /* escreve código */

  await typeText(
    message.text,
    terminalOutput,
    18
  );


  /* barra de progresso */

  for (let i = 0; i <= 100; i++) {

    progressBar.style.width = `${i}%`;

    await new Promise(
      resolve => setTimeout(resolve, 12)
    );

  }


  /* sistema iniciado */

  terminalSuccess.classList.add("show");


  /* próximo */

  currentMessage++;

  if (
    currentMessage >=
    terminalMessages.length
  ) {
    currentMessage = 0;
  }


  /* espera antes de reiniciar */

  setTimeout(() => {

    terminalOutput.textContent = "";

    runTerminal();

  }, 3000);

}


/* ========================================
   INICIAR
======================================== */

if (terminalOutput) {
  runTerminal();
}
