export interface IUserProfile {
    id: number;
    profile_image_path?: string;
    is_agent?: boolean;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    gender?: string;
    email?: string;
    is_email_verified?: boolean;
    phone?: string;
    country_code?: string;
    credit?: number;
    dob?: string;
    company_name?: string;
    zip_code?: string;
    country?: string;
    city?: string;
    street_name?: string;
    temp_pin?: string;
    house_number?: string;
    state?: string;
    nationality?: string;
    password?: string;
    sign_in_id?: string;
    status?: string;
    occupation?: string;
    monthly_income?: number;
    created_on?: string;
    updated_on?: string;
    refcode?: string;
  }
  
