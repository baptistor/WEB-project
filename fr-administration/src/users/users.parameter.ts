import { ApiProperty } from "@nestjs/swagger";

export class UserParameter {
    @ApiProperty({
        description: 'the id of the user',
        minimum: 1,
        default: 1,
        type: String,
    })
    public id: string;
}