const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}


let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let emailGuardado = localStorage.getItem("email"); //obtiene el email y lo guarda

document.addEventListener("DOMContentLoaded", () => { 
  mailCortado() ;
});

function mailCortado() {
  // Obtener el correo electrónico del localStorage
  const emailGuardado = localStorage.getItem("email");

  // Verificar si el correo electrónico no es null
  if (emailGuardado) {
    // Dividir la dirección de correo electrónico
    const mailCortado = emailGuardado.split("@")[0];

    // Guardar el correo cortado en el localStorage como nombre de usuario
    localStorage.setItem("username", mailCortado);

    // Obtener el correo cortado del localStorage y mostrarlo en el span con el ID "correoUsuario"
    const username = localStorage.getItem("username");
    document.getElementById("correoUsuario").textContent = username;
  }
}

// Parte de cerrar sesión
const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
  localStorage.clear();
});

// Redirigir al usuario al login si no esta iniciado sesion (Esta vez desde cualquier pagina)
if (!localStorage.getItem("email") && !localStorage.getItem("password")){
  window.location.href='login.html'
}

document.addEventListener("DOMContentLoaded", function () {
    //Evalua si está en modo oscuro o claro la pagina desde el local storge
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        document.body.classList.add('dark-mode');
        addModoDark(1)
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        addModoDark(0)
    }
})

//Segun el localStorage o el boton cliceado, muestra el tema oscuro o claro
document.getElementById('btnSwitch').addEventListener('click', () => {
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); // Almacena el tema en localStorage
        addModoDark(0)
    }
    else {
        document.documentElement.setAttribute('data-bs-theme', 'dark')
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Almacena el tema en localStorage
        addModoDark(1)
    }
})

//Cambia en el listado Menu por Modo Oscuro o Claro
function addModoDark(modo) {
    let modoOscuro = document.getElementById('btnSwitch');
    let icono = '';
    if (modo === 1) {
        icono = `<ion-icon name="sunny-outline"></ion-icon> 
                            Modo claro
                        `;

    } else if (modo === 0) {
        icono = `<ion-icon name="moon-outline"></ion-icon>
                            Modo oscuro
                        `;
    }
    let html = `${icono}`;

    modoOscuro.innerHTML = '';
    modoOscuro.innerHTML = html;
}