// Fetch API

const app = document.getElementById("app");
const num = document.getElementById("num");
const txt = document.getElementById("txt");

function init() {
  num.addEventListener("change", query1);
  txt.addEventListener("change", query2);
}

function render(obj, dom) {
  let div = document.createElement("div");
  div.classList.add("wrap");
  div.innerHTML = `
    <p>${obj.name} | ${obj.id}</p>
    <img src=${obj.sprites.front_default} />
  `;
  dom.appendChild(div);
}

async function query1() {
  let n = num.value;
  txt.value = "";
  app.innerHTML = "";
  for (let i = 1; i <= n; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((res) => res.json())
      .then((data) => {
        render(data, app);
      })
      .catch((err) => console.log("Error from the server! Error " + err));
  }
}

async function query2() {
  let t = txt.value;
  if (typeof t === "string") {
    t = t.toLowerCase();
  }
  num.value = "";
  app.innerHTML = "";
  await fetch(`https://pokeapi.co/api/v2/pokemon/${t}`)
    .then((res) => res.json())
    .then((data) => {
      render(data, app);
    })
    .catch((err) => console.log("Error from the server! Error " + err));
}

init();
