export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const header = document.querySelector("#mainHeader");
    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footer = document.querySelector("#mainFooter");
  
    renderWithTemplate(headerTemplate, header);
    renderWithTemplate(footerTemplate, footer);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

