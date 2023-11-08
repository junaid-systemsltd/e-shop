import { Injectable, Logger, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { InjectConnection, InjectModel, MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./modules/users/user.schema";
import { Product, ProductSchema } from "./modules/products/schemas/product.schema";
import { Connection, Model } from "mongoose";
import users from "./data/users";
import products from "./data/products";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Injectable()
class SeederService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectConnection() private connection: Connection,

    ) { }

    async seed() {
        // Removing existing records
        await this.userModel.deleteMany({});
        await this.productModel.deleteMany({})

        // inserting 'User' records
        await this.userModel.insertMany(users)
        // inserting 'Product' records
        await this.productModel.insertMany(products)

        this.connection.close()
    }
}


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env.development',
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI')
            })
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Product.name, schema: ProductSchema }
        ])
    ],
    providers: [SeederService]
})

class SeederModule { }


(async function seedBootstrap(): Promise<void> {
    const app = await NestFactory.create(SeederModule)
    const seeder = await app.get<SeederService>(SeederService)
    const logger = new Logger('Seeding')
    logger.log(`==================  Insertion of Data - STARTED ==================`);
    await seeder.seed().catch(error => {
        throw error;
    })
    logger.log(`==================  Insertion of Data - COMPLETED   ==================`);

    await app.close()
})()


