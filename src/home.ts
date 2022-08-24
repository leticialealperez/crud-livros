let titulo = document.getElementById('titulo') as HTMLInputElement;
let descricao = document.getElementById('descricao') as HTMLInputElement;
let autor = document.getElementById('autor') as HTMLInputElement;
let quantidadePaginas = document.getElementById('quantidade-paginas') as HTMLInputElement;

let formularioLivro = document.getElementById('formulario-livro') as HTMLFormElement;

interface Livro {
  ISBN: string;
  titulo: string;
  descricao: string;
  autor: string;
  quantidadePaginas: number;
}

interface Usuario {
  email: string;
  password: string;
  livros: Livro[];
}

let dadosUsuarioLogado: Usuario;

document.addEventListener('DOMContentLoaded', () => {
    let usuarioLogado = localStorage.getItem('usuarioLogado');

    if(!usuarioLogado){
        alert("Você precisa estar logado para acessar essa página!");
        window.location.href = 'login.html';
    }

    let listaUsuarios = buscarTodosUsuarios();

    dadosUsuarioLogado = listaUsuarios.find((usuario) => usuario.email === usuarioLogado) as Usuario;
    console.log(dadosUsuarioLogado);
})

function buscarTodosUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

formularioLivro.addEventListener('submit', (event) => {
    event.preventDefault();

    cadastrarLivro()
})

function cadastrarLivro(): void{

    const novoLivro: Livro = {
      ISBN: '000123',
      titulo: titulo.value,
      descricao: descricao.value,
      autor: autor.value,
      quantidadePaginas: +quantidadePaginas.value,
    };

    console.log(novoLivro)
}


/*

C => create => criar novo dado
R => read => ler => listar
U => update => atualização de um registro existente
D => delete => deletar um registro existente

*/

