const user = {name: ""};
const envioDeMensagem = {from:"", to:"", text:"", type:""};

function entrar(login){
    
    user.name = document.querySelector(".login").value;

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', user);
    
    document.querySelector('.telaLogin').classList.add('escondido');
    document.querySelector('.carregando').classList.remove('escondido');

    promessa.then(entrouNaSala);
    promessa.catch(erroAoEntrar);
}

function entrouNaSala(sucesso){
    document.querySelector('.carregando').classList.add('escondido');
    document.querySelector('.container').classList.remove('escondido');

    interval();
}

function erroAoEntrar(erro){
    alert('Insira um outro nome');
    document.querySelector('.carregando').classList.add('escondido');
    document.querySelector('.telaLogin').classList.remove('escondido');
}

function interval(){
    setInterval(usuarioAtivo, 5000);
    setInterval(BuscaMensagem, 3000);
}

function usuarioAtivo(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', user);
}

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
    let mensagens = sucesso.data;
    
    let chat = document.querySelector('.chat');
    chat.innerHTML = "";

    for(let i = 0; i < mensagens.length; i++){

        let tipo = mensagens[i].type;

        if(tipo == 'status'){
            
            chat.innerHTML +=
            `<div data-test="message" class="msg entrouSaiuNaSala">
            <span class="tempo">(${mensagens[i].time})</span>
            <span class="nome">${mensagens[i].from}</span>
            <span>${mensagens[i].text}</span>
            </div>`

        } else if (tipo == 'message') {
            chat.innerHTML +=
            `<div data-test="message" class="msg mensagemNaSala">
            <span class="tempo">(${mensagens[i].time})</span>
            <span class="nome">${mensagens[i].from}</span>
            <span>para<span>
            <span class="nome">${mensagens[i].to}:</span>
            <span>${mensagens[i].text}</span>
            </div>`

        } else if(tipo == 'private_message'){
            
            if(mensagens[i].from == user || mensagens[i].to == user){

            chat.innerHTML += 
            `<div data-test="message" class="msg mensagemReservada">
            <span class="tempo">(${mensagens[i].time})</span>
            <span class="nome">${mensagens[i].from}</span>
            <span>reservadamente para<span>
            <span class="nome">${mensagens[i].to}:</span>
            <span>${mensagens[i].text}</span>
            </div>`
           }
        }
    }
    
    const elementoQueQueroQueApareca = document.querySelectorAll(".msg");
    const ultimaMsg = elementoQueQueroQueApareca.length - 1;
    elementoQueQueroQueApareca[ultimaMsg].scrollIntoView();

}

function enviarMensagem(enviar){
    let mensagem = document.querySelector(".mensagem").value;

        envioDeMensagem.from = user.name,
        envioDeMensagem.to =  usuarioSelecionado
        envioDeMensagem.text = mensagem,
        envioDeMensagem.type = VS;

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', envioDeMensagem)
    promessa.then(sucessoEnviar);
    promessa.catch(erroEnviar);   
    document.querySelector(".mensagem").value = "";
}

function erroEnviar(erro){
    window.location.reload();
}

function sucessoEnviar(sucesso){
    BuscaMensagem();
    exibirChat();
}

document.addEventListener('keypress', function(e){
    if(e.key === "Enter"){

        const botao = document.querySelector('.enviar');

        botao.click();
    }
    
})





