"use strict";
let titulo = document.getElementById('titulo');
let descricao = document.getElementById('descricao');
let autor = document.getElementById('autor');
let quantidadePaginas = document.getElementById('quantidade-paginas');
let formularioLivro = document.getElementById('formulario-livro');
let dadosUsuarioLogado;
document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar essa página!");
        window.location.href = 'login.html';
    }
    let listaUsuarios = buscarTodosUsuarios();
    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.email === usuarioLogado);
    console.log(dadosUsuarioLogado);
});
function buscarTodosUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
formularioLivro.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarLivro();
});
function cadastrarLivro() {
    const novoLivro = {
        ISBN: '000123',
        titulo: titulo.value,
        descricao: descricao.value,
        autor: autor.value,
        quantidadePaginas: +quantidadePaginas.value,
    };
    console.log(novoLivro);
}
/*

C => create => criar novo dado
R => read => ler => listar
U => update => atualização de um registro existente
D => delete => deletar um registro existente

*/
