import { Injectable } from "@nestjs/common";


@Injectable() // this clas act as provider, so we can inject it in the controller
export class AppService {
  getHello(): string {
    return 'Hello World first time!';
  }

   users  : {name:String, age:Number}[] =[
    {age:10,name:'Juma'}
          ]

  async getUser(){
        return  this.users
  }
  
  createUser(users:{name:String, age:Number}){
    this.users.push(users)
    return {users:this.users, mesg:"success"};
  }

   getQuery(age:Number){
    return this.users.filter(x =>x.age ==age)
  }
}
