import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class ProductService{
    constructor(private readonly authService:AuthService){}
    getAllProducts(){
        return 'This action returns all products';
    }

    interModuleCommunication(){
        return this.authService.findAll(); //NB, THIS IS HOW TO USE THE SERVICE FROM ANOTHER MODULE, BY INJECTING THE SERVICE IN THE CONSTRUCTOR OF THE SERVICE WHERE WE WANT TO USE IT, AND THEN CALLING THE METHOD OF THE SERVICE.
    }
}