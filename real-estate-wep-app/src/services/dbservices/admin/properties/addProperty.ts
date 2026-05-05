import Swal from "sweetalert2";
import { supabase } from "../../../../supabaseClient";
import { IPropertyMain } from "../../../../models/interfaces/PropertyInterface";

export const AddPropertyAction = async (data: IPropertyMain): Promise<string> => {
  const now = new Date().toISOString();
  data.created_on = now;
  data.updated_on = now;

  if (!data.video_url || data.video_url.length < 1) {
    data.video_url = "";
  }

  try {
    const { error } = await supabase.from('properties').insert({
      name: data.name,
      about: data.about,
      main_image_id: data.main_image_id,
      main_image_path: data.main_image_path,
      cover_image_path: data.cover_image_path,
      video_url: data.video_url,
      property_price: data.property_price,
      property_price_discount: data.property_price_discount,
      published: data.published,
      status: data.status,
      likes: data.likes,
      tour_fee: data.tour_fee,
      created_on: data.created_on,
      updated_on: data.updated_on,
      zip_code: data.zip_code,
      country: data.country,
      city: data.city,
      street_name: data.street_name,
      house_number: data.house_number,
      state: data.state,
      property_type: data.property_type,
      latitude: data.latitude,
      longitude: data.longitude,
      total_bedrooms: data.total_bedrooms,
      total_bathrooms: data.total_bathrooms,
      plot_size: data.plot_size,
      is_hot_property: data.is_hot_property,
      is_company_property: data.is_company_property,
      agent_id: data.agent_id,
      owner_id: data.owner_id,
    })

    if (error) throw new Error(error.message)

    Swal.fire({
      icon: "success",
      title: "Congratulations!",
      text: "Property added successfully.",
    })

    return "success"
  } catch (error) {
    return "Failed to add Property: " + error
  }
}