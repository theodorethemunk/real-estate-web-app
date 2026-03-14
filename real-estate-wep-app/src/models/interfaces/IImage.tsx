export interface IImageMain {
    id: number;
    file_path?: string;
    status?: string;
    published?: boolean;
    created_on?: Date;
    updated_on?: Date;
  }

  export interface IAddImage {
    id: number;
    file_path: string;
    property_id: number;
    published: boolean;
    created_on?: Date;
    updated_on?: Date;
  }

  export interface IImage {
    propertyId: number;
    filePath?: string;
    imageId?: string;
  }
  
