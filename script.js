
function entrar(){
    
    username = document.querySelector(".login").value;
    const user = {name: username};

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    promessa.then(entrouNaSala);
    promessa.catch(erroAoEntrar);
}

function entrouNaSala(sucesso){
    document.querySelector('.telaLogin').classList.add('escondido');
    document.querySelector('.container').classList.remove('escondido');

    BuscaMensagem();
}

function erroAoEntrar(erro){
    alert('Insira um outro nome');
}

setInterval(function usuarioAtivo(){
    const user = {name: username};
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
}, 5000)

function BuscaMensagem(){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promessa.then(exibirChat);
    promessa.catch(erroMensagem);
}

function erroMensagem(erro){
    alert("As mensagems não puderam ser exibidas");
	window.location.reload();
}

function exibirChat(sucesso){

    const tipo = sucesso.type;
    
    const mensagens = document.querySelector('.chat');
    

    if(tipo === 'status'){
        mensagens.innerHTML +=
        `<div class="entrouSaiuNaSala">
        <span class="tempo">${mensagens.time}</span>
        <span class="nome">${mensagens.from}</span>
        para
        <span class="nome">${mensagens.to}:</span>
        ${mensagens.text}
        </div>`
    }

}

function UsernameInvalido() {
	if (username === undefined){ 
        return;
    }
}