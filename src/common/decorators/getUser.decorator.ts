import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const getUser = createParamDecorator(
    (field, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        let data = request.user ?? undefined;

        console.log({ field })

        if (field)
            data = data[field]

        return data;
    })