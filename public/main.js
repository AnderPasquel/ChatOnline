var socket = io.connect('http://148.234.130.159:3000',{'forceNew':true});

//Resivimos el evento "messages" emitido por el servidor
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(messages,index){
        return(`
            <div class="messages container">
                <strong>${messages.nickname}</strong>_dice:
                <p>${messages.text}</p>
                </div>
                `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-Message', message);
    return false;
}