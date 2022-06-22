//jshint esversion6//

const socket = io.connect()
let name;
let textArea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message-area')
let date  = new Date();
const year = date.getFullYear();
function foot(){
    const footer = document.querySelector('footer');
    let copyright = `
    <div>© ${year}</div>
    `
    footer.innerHTML = copyright
}
foot();
do {
  name = prompt("Enter your name: ")
}while(!name)


textArea.addEventListener('keyup', (e)=>{
    // console.log(e.target.value)
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')
    textArea.value = ''
    scrollToBottom()
    socket.emit('send', msg) 
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'msg') 
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

socket.on('send' , (msg) =>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}