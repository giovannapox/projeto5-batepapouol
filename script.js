
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

/*setInterval(function usuarioAtivo(){
    const user = {name: username};
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
}, 5000)*/

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
    const mensagens = sucesso.data;
    const chat = document.querySelector('.chat');
    chat.innerHTML = "";

    for(let i = 0; i < mensagens.length; i++){

        const tipo = mensagens[i].type;

        if(tipo == 'status'){
            
            chat.innerHTML +=
            `<div class="entrouSaiuNaSala">
            <span class="tempo">(${mensagens[i].time})</span>
            <span class="nome">${mensagens[i].from}</span>
            <span>${mensagens[i].text}</span>
            </div>`

        } else if (tipo == 'message') {
            chat.innerHTML +=
            `<div class="mensagemNaSala">
            <span class="tempo">(${mensagens[i].time})</span>
            <span class="nome">${mensagens[i].from}</span>
            <span>para<span>
            <span class="nome">${mensagens[i].to}:</span>
            <span>${mensagens[i].text}</span>
            </div>`

        } else if(tipo == 'private_message'){
            chat.innerHTML += 
            `<div class="mensagemReservada">
            <span class="tempo">(${mensagens[i].time})</span>
            <span class="nome">${mensagens[i].from}</span>
            <span>reservadamente para<span>
            <span class="nome">${mensagens[i].to}:</span>
            <span>${mensagens[i].text}</span>
            </div>`
        }
    }
    

}

function UsernameInvalido() {
	if (username === undefined){ 
        return;
    }
}