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

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  removeLocalStorage(key);
  localStorage.setItem(key, JSON.stringify(data));  
}

export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

    console.log(formData);

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
