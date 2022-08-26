
let titulo = document.getElementById('titulo') as HTMLInputElement;
let descricao = document.getElementById('descricao') as HTMLInputElement;
let autor = document.getElementById('autor') as HTMLInputElement;
let quantidadePaginas = document.getElementById('quantidade-paginas') as HTMLInputElement;
let tabela = document.getElementById('tabela-registros') as HTMLTableElement;

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
    dadosUsuarioLogado.livros.forEach((livro) => montarHTML(livro))
})

function buscarTodosUsuarios(): Usuario[] {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

formularioLivro.addEventListener('submit', (event) => {
    event.preventDefault();

    cadastrarLivro();
});

function cadastrarLivro(): void{

    const novoLivro: Livro = {
      ISBN: `${Math.floor(Math.random() * (1000000000 - 10) + 10)}`,
      titulo: titulo.value,
      descricao: descricao.value,
      autor: autor.value,
      quantidadePaginas: Number(quantidadePaginas.value),
    };

    dadosUsuarioLogado.livros.push(novoLivro);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
    montarHTML(novoLivro);
    formularioLivro.reset();
}

function atualizarDadosUsuarioLogado(dadosAtualizados: Usuario): void{
  let listaUsuarios = buscarTodosUsuarios();
  let indiceUsuarioEncontrado = listaUsuarios.findIndex((usuario) => usuario.email === dadosAtualizados.email);

  listaUsuarios[indiceUsuarioEncontrado] = dadosAtualizados;

  atualizarStorage(listaUsuarios);

}

function atualizarStorage(listaDados: Usuario[]): void {
  localStorage.setItem('usuarios', JSON.stringify(listaDados));
}

function montarHTML(novoLivro: Livro): void {
  
  let linha = document.createElement('tr');
  linha.classList.add('registro');
  linha.setAttribute('id', novoLivro.ISBN);

  let colunaISBN = document.createElement('td');
  colunaISBN.innerHTML = novoLivro.ISBN;

  let colunaTitulo = document.createElement('td');
  colunaTitulo.innerHTML = novoLivro.titulo;

  let colunaDescricao = document.createElement('td');
  colunaDescricao.innerHTML = novoLivro.descricao;

  let colunaAutor = document.createElement('td');
  colunaAutor.innerHTML = novoLivro.autor;

  let colunaQtdPag = document.createElement('td');
  colunaQtdPag.innerHTML = `${novoLivro.quantidadePaginas}`;

  let colunaAcoes = document.createElement('td');
  let botaoEditar = document.createElement('button');
  botaoEditar.innerHTML = 'Editar';
  botaoEditar.addEventListener('click', () => editarLivro(novoLivro));

  let botaoApagar = document.createElement('button');
  botaoApagar.innerHTML = 'Apagar';
  botaoApagar.addEventListener('click', () => apagarLivro(novoLivro.ISBN));

  colunaAcoes.appendChild(botaoApagar);
  colunaAcoes.appendChild(botaoEditar);
  linha.appendChild(colunaISBN);
  linha.appendChild(colunaTitulo);
  linha.appendChild(colunaDescricao);
  linha.appendChild(colunaAutor);
  linha.appendChild(colunaQtdPag);
  linha.appendChild(colunaAcoes);
  tabela.appendChild(linha);
}

function editarLivro(livro: Livro): void{
  console.log(livro);
}

function apagarLivro(isbn: string): void{
  let indiceLivroEncontrado = dadosUsuarioLogado.livros.findIndex((livro) => livro.ISBN === isbn);

  let linha = document.getElementById(isbn) as HTMLTableRowElement;
  
  let confirma = confirm(`Você deseja realmente excluir o livro ISBN ${isbn}?`);

  if(confirma){
    linha.remove();
    dadosUsuarioLogado.livros.splice(indiceLivroEncontrado, 1);
    atualizarDadosUsuarioLogado(dadosUsuarioLogado);
  }else {
    alert("Operação Cancelada!");
  }

}

/*

C => create => criar novo dado => OK
R => read => ler => listar => OK
U => update => atualização de um registro existente => FICA PRA VOCES
D => delete => deletar um registro existente => OK

*/

