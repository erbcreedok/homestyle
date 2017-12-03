export class Door {
    constructor(public id: number,
                public subcategory_id: number,
                public title: string,
                public price: number,
                public status: number,
                public characteristic_id: number,
                public created_at: Date,
                public updated_at: Date,
                public category_id: number,
                public description_code: string,
                public main_image_file_name: string,
                public main_image_content_type: string,
                public main_image_file_size: string,
                public main_image_updated_at: Date,
                public best: boolean) {}

}
