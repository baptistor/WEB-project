import { ApiProperty } from "@nestjs/swagger";

export class AssociationInput {

    @ApiProperty({
        description: 'Ids of the users',
        example: [1,2,3],
        type: [Number],
    })
    public idUsers: number[];

    @ApiProperty({
        description: 'The name of the association',
        example: "Association",
        type: String,
    })
    public name: string;
}