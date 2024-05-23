const socket = io();
$('#chat-box').hide();

$('#send-btn').on('click' , function(){
    const msgText = $('#inp').val();
    if(!msgText){
        return
    }else{
        socket.emit('send-msg'  , {
            msg: msgText
        })
    }
    $('#inp').val("")
})

socket.on('recieved-msg', (data)=>{ 
    console.log(data)
    $('#chat').append(`<li class="border p-2 ms-0 mb-2 rounded-pill"><span class="fw-bold">${data.username} : ${data.msg}</span></li>`)
})

$('#login-btn').on('click',()=>{
    const username = $('#username').val();
    socket.emit('login',{
        username
    })
    $('#chat-box').show();
    $('#login-box').hide();
    $('#username').val('')
})