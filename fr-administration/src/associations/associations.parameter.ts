import { ApiProperty } from "@nestjs/swagger";

export class AssociationParameter {
    @ApiProperty({
        description: 'the id of the association',
        minimum: 1,
        default: 1,
        type: String,
    })
    public id: string;
}