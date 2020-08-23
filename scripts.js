const form = document.getElementById("form");
const usuarios = document.getElementById("users");
const table = document.getElementById("table");

// const fragment = document.createDocumentFragment();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getData(users.children[users.selectedIndex].value);
});

const getData = (id) => {
  let xhr;
  if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
  else xhr = new ActiveXObject("Microsoft.XMLHTTP");

  if (id == undefined) {
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

    xhr.addEventListener("load", (data) => {
      const dataJSON = JSON.parse(data.target.response);

      console.log(dataJSON);

      const fragment = document.createDocumentFragment();

      for (const users of dataJSON) {
        const option = document.createElement("option");

        option.setAttribute("value", users.id);
        option.setAttribute("class", "form-control-file");

        option.textContent = users.name;
        fragment.append(option);
      }

      usuarios.append(fragment);
    });
  } else {
    xhr.open("GET", `https://jsonplaceholder.typicode.com/users?id=${id}`);

    xhr.addEventListener("load", (data) => {
      const dataJSON = JSON.parse(data.target.response);
      console.log(dataJSON);

      const fragment = document.createDocumentFragment();

      for (const users of dataJSON) {
        const row = document.createElement("tr");
        const nombre = document.createElement("td");
        const nroId = document.createElement("td");
        const userName = document.createElement("td");
        const email = document.createElement("td");

        nombre.textContent = users.name;
        nroId.textContent = users.id;
        userName.textContent = users.username;
        email.textContent = users.email;

        row.append(nombre);
        row.append(nroId);
        row.append(userName);
        row.append(email);

        fragment.append(row);
      }
      if (table.children[1]) {
        table.removeChild(table.children[1]);
      }

      table.append(fragment);
    });
  }

  xhr.send();
};

getData();
