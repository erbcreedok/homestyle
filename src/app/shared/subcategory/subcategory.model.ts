export class Subcategory {
    constructor ( public id: number,
                  public title: string,
                  private created_at: Date,
                  private updated_at: Date,
                  private category_id: number) { }
}