"use strict";
let emailHTML = document.getElementById('email-cadastro');
let passwordHTML = document.getElementById('password-cadastro');
let repasswordHTML = document.getElementById('repassword-cadastro');
let formularioCadastro = document.getElementById('formulario-cadastro');
formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    let retorno = validarCampos();
    if (!retorno) {
        return;
    }
    cadastrarUsuario();
});
function validarCampos() {
    if (passwordHTML.value !== repasswordHTML.value) {
        alert('Preencha os campos corretamente!');
        return false;
    }
    return true;
}
function cadastrarUsuario() {
    let listaUsuarios = buscarUsuariosStorage();
    let existe = listaUsuarios.some((usuario) => usuario.email === emailHTML.value);
    if (existe) {
        alert("Já existe esse email cadastrado na plataforma!");
        return;
    }
    const novoUsuario = {
        email: emailHTML.value,
        password: passwordHTML.value,
        livros: []
    };
    listaUsuarios.push(novoUsuario);
    alert("Conta criada com sucesso!");
    formularioCadastro.reset();
    salvarUsuarioStorage(listaUsuarios);
}
function salvarUsuarioStorage(listaDados) {
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}
function buscarUsuariosStorage() {
    return JSON.parse(localStorage.getItem('usuarios') || "[]");
}
