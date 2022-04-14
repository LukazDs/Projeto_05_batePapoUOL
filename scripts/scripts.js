let posts = []

 


function chamarListaEscondida () {
    const listaEscondida = document.querySelector(".conteudo-escondido");
    listaEscondida.classList.toggle("bloqueado");
}
/* 
function enviarDados() {
    let textMessage = document.querySelector("input").value
    let objetoEnvio = {
        from: "LucasDS",
        to: "Todos",
        text: textMessage,
        type: "message",
    }
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objetoEnvio)
    promise.then(pegarDados)
} */

function pegarDados() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(carregarDados);
}

function carregarDados(response) {

    posts = response.data

    imprimirMensagem()
}

function imprimirMensagem() {
    const mensagem = document.querySelector(".mensagens");
    mensagem.innerHTML = ""
    
    
    /* let texto = document.querySelector("input").value; */
    for(let i = 0; i < posts.length; i++) {
        
        if(posts[i].type === "status") {
            mensagem.innerHTML += `<p class="mensagem-status">${posts[i].time} ${posts[i].from} para  ${posts[i].to} ${posts[i].text}</p>`
        }

        else {

            if(posts[i].type === "message" && posts[i].to === "Todos") {
                mensagem.innerHTML += `<p class="mensagem-publica">${posts[i].time} ${posts[i].from} para  ${posts[i].to} ${posts[i].text}</p>` 
            }
            else {
                mensagem.innerHTML += `<p class="mensagem-privada">${posts[i].time} ${posts[i].from} para  ${posts[i].to} ${posts[i].text}</p>` 
            }
        }
    
        
    }
    
}

function adicionarMensagem() {
    const novaMensagem = document.querySelector("input").value

    const newPost  = {from: "zabuzai", to: "Todos", text: novaMensagem, type: "message"}
    
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", newPost)
    promise.then(pegarDados)
}

function atualizarChat() {
    
    setInterval(adicionarMensagem, 3000)
}


adicionarMensagem()
