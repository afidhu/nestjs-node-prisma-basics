import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({cors:'*'})
export class SocketGateway {
    @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // console.log(message);
//|||socket.emit() =>send message to specific client
    // client.emit('reply',"this is private message");

    // console.log(message); // why here show x2 message? => because socket.io client send message twice
    // // return 'Hello world!';

    client.broadcast.emit('userConnected', {message: 'User connected'});
    // client.join('room1');
    // this.server.to('room1').emit('reply', 'This is room message');// == io.to('room1').emit()
  }


    handleDisconnection(client: Socket) {
    // console.log(message);
//|||socket.emit() =>send message to specific client
    // client.emit('reply',"this is private message");
this.server.emit('userDisconnected', {message: 'User disconnected'});
    // client.join('room1');
    // this.server.to('room1').emit('reply', 'This is room message');// == io.to('room1').emit()
  }



  @SubscribeMessage('message') // == socket.on('message')
  handleMessage(@MessageBody() message:any){
    console.log(message);// why message x2? => because socket.io client send message twice, how to fix it?
  this.server.emit('reply', {message: message});// == io.emit() 
  }

}

//NB
//socket.emit() =>send message to specific client
//socket.broadcast.emit() =>send message to all clients except the one who sent the message
//io.emit() =>send message to all clients even sender(eg; this.server.emit())