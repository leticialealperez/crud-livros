let emailHTML = document.getElementById('email-cadastro') as HTMLInputElement;
let passwordHTML = document.getElementById('password-cadastro') as HTMLInputElement;
let repasswordHTML = document.getElementById('repassword-cadastro') as HTMLInputElement;

let formularioCadastro = document.getElementById('formulario-cadastro') as HTMLFormElement;


interface Livro {
    ISBN: string,
    titulo: string,
    descricao: string,
    autor: string,
    quantidadePaginas: number
}

interface Usuario {
    email: string,
    password: string,
    livros: Livro[]  
}

formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();

    let retorno = validarCampos();
    
    if(!retorno){
        return
    }

    cadastrarUsuario();
});

function validarCampos(): Boolean {

    if(passwordHTML.value !== repasswordHTML.value){
        alert('Preencha os campos corretamente!');
        return false
    }

    return true
}

function cadastrarUsuario(){

    let listaUsuarios: Usuario[] = buscarUsuariosStorage();

    let existe = listaUsuarios.some((usuario) => usuario.email === emailHTML.value)

    if(existe){
        alert("Já existe esse email cadastrado na plataforma!")
        return
    }

    const novoUsuario: Usuario = {
        email: emailHTML.value,
        password: passwordHTML.value,
        livros: []
    }

    listaUsuarios.push(novoUsuario)
    salvarUsuarioStorage(listaUsuarios)

    alert("Conta criada com sucesso!");
    formularioCadastro.reset();
}

function salvarUsuarioStorage(listaDados: Usuario[]): void{
    localStorage.setItem('usuarios', JSON.stringify(listaDados));
}

function buscarUsuariosStorage(): Usuario[]{
    return JSON.parse(localStorage.getItem('usuarios') || "[]");
}