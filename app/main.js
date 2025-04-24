let db = {};
const storage = sessionStorage;

function loadTable(name) {
  if (!storage.hasOwnProperty(name))
    fetch(`./data/${name}.data.json`)
      .then((x) => x.text())
      .then((x) => {
        storage.setItem(name, x);
        db[name] = JSON.parse(x);
      });
  else db[name] = JSON.parse(storage.getItem(name));
}

function dc(tx) {
  return decodeURIComponent(tx);
}

function ref(tx) {
  const keys = [...dc(tx).matchAll(/\((.*?)\)/g)].map((x) => x[1]);
  return db.sources
    .filter((x) => keys.includes(x.key))
    .map((x) => `<p>${x.key} - ${x.name}</p>`)
    .join("");
}

if (!db.sources) loadTable("sources");
if (!db.words) loadTable("words");

document.getElementById("form-search").addEventListener("submit", (event) => {
  event.preventDefault();
  const view = document.getElementById("view");
  const query = event.target.q.value;
  const results = db["words"].filter(
    (x) => x.muchik.indexOf(query) > -1 || x.spanish.indexOf(query) > -1,
  );

  view.innerHTML = "";
  results.forEach((x) => {
    const p = document.createElement("div");
    p.innerHTML = `
      <h3><a href="./#/id/${dc(x.id)}">${dc(x.muchik)}</a></h3>
      <pre>${dc(x.spanish)}</pre>`;
    view.appendChild(p);
  });
});

const onHashChange = async () => {
  const uri = location.hash.slice(1) || "./app/home.html";

  if (uri.startsWith("/id/")) {
    const id = parseInt(uri.slice(4));
    const dialog = document.getElementById("dialog");
    const word = db.words.filter((x) => x.id === id);
    if (word.length > 0) {
      dialog.querySelector("section").innerHTML = `
        <h2>${dc(word[0].muchik)}</h2>
        <pre>${dc(word[0].spanish)}</pre>
        <blockquote>${ref(word[0].muchik)}</blockquote>
      `;
      dialog.showModal();
    }
    return;
  }

  const req = await fetch("." + uri);
  if (req.status != 200) return;
  let html = await req.text();

  if (uri.endsWith(".md")) {
    html = marked.parse(html);
  }
  document.getElementById("view").innerHTML = html;
};

window.addEventListener("hashchange", onHashChange);
onHashChange();
