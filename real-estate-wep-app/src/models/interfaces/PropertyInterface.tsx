export interface IProperty {
    id?: number;
    name: string,
    mainImageId?: number;
    imageFilePath?: string;
    tourFee: number;
    propertyPrice: number;
    propertyPriceDiscount: number;
    published: boolean;
    status: string;
    likes?: number;
    zipCode: string;
    country: string;
    city: string;
    streetName: string;
    houseNumber: string;
    state: string;
    propertyType: string;
    latitude: string;
    longitude: string;
    totalBathRooms: string;
    totalBedRooms: string;
    plotSize: string;
    videoUrl: string,
    about: string,
    agentId?: number;
    createdOn?: string;
    updatedOn?: string;
  }

  export interface IPropertyMain {
    id: number;
    name: string;
    about: string;
    main_image_id: number;
    main_image_path: string;
    cover_image_path: string;
    video_url: string;
    tour_fee: number;
    property_price: number;
    property_price_discount: number;
    published: boolean;
    status: string;
    likes: number;
    created_on: string;
    updated_on: string;
    zip_code: string;
    country: string;
    city: string;
    street_name: string;
    house_number: string;
    state: string;
    property_type: string;
    latitude?: number;
    longitude?: number;
    total_bedrooms: number;
    total_bathrooms: number;
    plot_size: string;
    is_hot_property: boolean;
    is_company_property: boolean;
    agent_id: number;
    owner_id: number;
  }
  
