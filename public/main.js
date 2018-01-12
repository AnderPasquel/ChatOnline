var socket = io.connect('http://148.234.130.159:3000',{'forceNew':true});

socket.on('messages', function(data){
    console.log(data);
});

