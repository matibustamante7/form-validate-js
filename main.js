
const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}


const validarFormulario = (e) => {

    switch (e.target.name) {

        case "usuario":
            validarCampo(expresiones.usuario, e.target, e.target.name);
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, e.target.name);
            break;
        case "password":
            validarCampo(expresiones.password, e.target, e.target.name);
            validarPassword();
            break;
        case "password2":
            validarPassword();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, e.target.name);
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, e.target.name);
            break;

        default:
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        // console.log('todo ok');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo__${campo} p`).classList.add('formulario__input-error')
        document.querySelector(`#grupo__${campo} p`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
    } else {
        // console.log('hay que mostrar error');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle')
        document.querySelector(`#grupo__${campo} p`).classList.remove('formulario__input-error')
        document.querySelector(`#grupo__${campo} p`).classList.add('formulario__input-error-activo')
        campos[campo] = false;
    }
}

const validarPassword = () => {
    const inputPass1 = document.getElementById('password')
    const inputPass2 = document.getElementById('password2')

    if (inputPass1.value !== inputPass2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle')
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle')
        document.querySelector(`#grupo__password2 p`).classList.remove('formulario__input-error')
        document.querySelector(`#grupo__password2 p`).classList.add('formulario__input-error-activo')
        campos['password'] = false;
    } else{
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle')
        document.querySelector(`#grupo__password2 p`).classList.add('formulario__input-error')
        document.querySelector(`#grupo__password2 p`).classList.remove('formulario__input-error-activo')
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos')

    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')

        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo')
            
        }, 3000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((i)=>{
            i.classList.remove('formulario__grupo-correcto')
        })
    } else{
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')

        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')
            
        }, 3000);

    }
})