import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
     MulterModule.register({
      storage: diskStorage({
        // Define where files will be saved
        destination: './upload',
        // Define how the filename should look
        filename: (req, file, callback) => {
          // Generate a unique hash name
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          // Get the original extension (e.g., .png)
          const fileExt = extname(file.originalname);
          // Combine them: e.g., 1712345678-987654321.png
          callback(null, `${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  ],
})
export class ProductsModule {}
