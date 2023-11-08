import { Types } from "mongoose";
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
    transform(value: any): Types.ObjectId {
        const validObjectId = Types.ObjectId.isValid(value);

        if (!validObjectId) {
            throw new BadRequestException(`${value} is not a valid MongoId`);
        }

        return Types.ObjectId.createFromHexString(value);
    }
}