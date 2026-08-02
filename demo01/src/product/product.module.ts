import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { AuthModule } from "src/auth/auth.module";


@Module({
    imports:[AuthModule], //NB, ONLY IMPORT THE MODULE, NOT THE SERVICE OR CONTROLLER, BECAUSE THE SERVICE AND CONTROLLER ARE ALREADY PROVIDED IN THE MODULE, SO WE ONLY NEED TO IMPORT THE MODULE TO USE ITS PROVIDERS
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule{}