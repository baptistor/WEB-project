export interface IData{
    id: number;
    category: string;
    name: string;
    description: string
    common_locations: string[]
    image: string
    dlc: false
    drops?: string[]
    hearts_recovered?: number
    cooking_effect?: string
    edible?: boolean
}
