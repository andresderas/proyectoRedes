const usersList = document.querySelector(".cards-container");
const addUserForm = document.querySelector(".add-user-form");
const userCreate = document.getElementById("usuario-crear");
const nameCreate = document.getElementById("nombre");
const lastNameCreate = document.getElementById("apellido");
const ageCreate = document.getElementById("edad");
const updateBtn = document.querySelector(".btnAdministrar");
const userUpdate = document.getElementById("usuario");
const tempUpdate = document.getElementById("temperatura-picker");
let output = "";

const url = "http://localhost:3306";

const renderUsers = (users) => {
  users.forEach((user) => {
    output += `
    <article class="user-card">
      <h2 class="card-title">${user.username}</h2>
      <hr />
      <div class="usercard-container">
        <p class="edad-text">${user.age} años</p>
        <p class="temperatura-text">${user.temperature} °C</p>
      </div>
    </article>  
    `;
  });
  usersList.innerHTML = output;
};

// Muestra todos los usuarios
const showCards = () => {
  output = "";
  fetch(url + "/all")
    .then((res) => res.json())
    .then((data) => renderUsers(data));
};

const addUser = () => {
  addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        username: userCreate.value,
        name: nameCreate.value,
        lastname: lastNameCreate.value,
        age: ageCreate.value,
        temperature: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        renderUsers(dataArr);
      });
    addUserForm.reset();
  });
};

//Registrar temperatura, cada usuario solo tiene una temperatura.
const registerTemp = () => {
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${userUpdate.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temperature: tempUpdate.value,
      }),
    }).then((res) => res.json);
    userUpdate.value = "";
    tempUpdate.value = "";
  });
};

/**
 * Encargada de cambiar paginas
 */
const hideListener = () => {
  document.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("temperatura-show")) {
      document.querySelector("#temperatura").classList.remove("hide");
      document.querySelector("#usuarios").classList.add("hide");
      document.querySelector("#administrar").classList.add("hide");
    } else if (target.classList.contains("usuarios-show")) {
      document.querySelector("#usuarios").classList.remove("hide");
      document.querySelector("#temperatura").classList.add("hide");
      document.querySelector("#administrar").classList.add("hide");
      showCards();
    } else if (target.classList.contains("administrar-show")) {
      document.querySelector("#administrar").classList.remove("hide");
      document.querySelector("#usuarios").classList.add("hide");
      document.querySelector("#temperatura").classList.add("hide");
    }
  });
};

const addListeners = () => {
  hideListener();
};

window.onload = () => {
  addListeners();
  showCards();
  addUser();
  registerTemp();
};
