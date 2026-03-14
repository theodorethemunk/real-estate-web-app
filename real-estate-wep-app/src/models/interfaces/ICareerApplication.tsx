export interface ICareerApplication {
    id: number;
    full_name?: string;
    gender?: string;
    email?: string;
    country_code?: string;
    phone?: string;

    address?: string;
    career?: string;
    about_career?: string;

    salary?: number;
    nationality?: string;
    cv_file_path?: string;
    status?: string;
    created_on?: Date;
    updated_on?: Date;
  }
  
