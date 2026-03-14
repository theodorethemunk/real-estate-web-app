import { useEffect, useState } from "react";
import { IPropertyMain } from "../../models/interfaces/PropertyInterface";
import { fetchPropertiesByAdmin } from "../../services/dbservices/admin/properties/fetchProperties";
import { AddPropertyAction } from "../../services/dbservices/admin/properties/addProperty";
import { UpdatePropertyAction } from "../../services/dbservices/admin/properties/updateProperty";
import { deletePropertyAction } from "../../services/dbservices/admin/properties/deleteProperty";
import { IPropertyFeature } from "../../models/interfaces/IPropertyFeature";
import { getPropertyFeaturesAction } from "../../services/dbservices/user/GetPropertyFeatures";
import { AddPropertyFeatureAction } from "../../services/dbservices/admin/property-features/addPropertyFeature";
import { deletePropertyFeatureAction } from "../../services/dbservices/admin/property-features/deletePropertyFeature";
import { IPlanImage } from "../../models/interfaces/IPlanImage";
import { getPropertyPlanImagesAction } from "../../services/dbservices/user/GetPropertyPlanImages";
import { IImage } from "../../models/interfaces/IImage";
import { getPropertyImagesAction } from "../../services/dbservices/user/GetPropertyImages";
import { deletePlanImageAction } from "../../services/dbservices/admin/floor-plan-images/deletePlanImage";
import { SavePlanImageAction, UploadFloorPlan } from "../../services/dbservices/admin/floor-plan-images/addPlanImage";
import { generateCode, generateFileName } from "../../services/Util/NumberGenerator";
import { COMPANY_PRIMARY_DOMAIN_URL, UPLOAD_URL } from "../../repo/datarepo";
import { deletePropertyImageAction } from "../../services/dbservices/admin/images/deletePropertyImage";
import { setMainPropertyImageAction } from "../../services/dbservices/admin/properties/setPropertyImageAsMain";
import { UploadPropertyImage } from "../../services/dbservices/admin/properties/uploadPropertyImage";
import { AddExternalPropertyAction } from "../../services/dbservices/admin/external-properties/createExternalProperty";
import { getExternalPropertiesAction } from "../../services/dbservices/user/GetExternalProperties";
import { deleteExternalPropertyAction } from "../../services/dbservices/admin/external-properties/deleteExternalProperty";
import { IExternalProp } from "../../models/interfaces/IExternalProp";
import { setPropertyAsCompanyOwnedAction, setPropertyAsIndividualOwnedAction } from "../../services/dbservices/admin/properties/setPropertyOwnership";
import { SavePropertyCoverImageAction } from "../../services/dbservices/admin/properties/saveCoverImage";

const ManagePropertiesPage: React.FC = () => {

  const [loadingIndex, setLoadingIndex] = useState(0);
  const [mainImageId, setMainImageId] = useState(0);
  const [loadingSetImageAsMainIndex, setImageAsMainLoadingIndex] = useState(0);
  const [loadingDeleteImageIndex, setDeleteImageLoadingIndex] = useState(0);
  const [loadingDeleteFeatureIndex, setDeleteFeatureLoadingIndex] = useState(0);
  const [loadingDeletePlanImageIndex, setDeletePlanImageLoadingIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingGetLandmarks, setLoadingGetLandmarks] = useState(true);
  const [properties, setProperties] = useState<IPropertyMain[]>([]);
  const [propertyFeatures, setPropertyFeatures] = useState<IPropertyFeature[]>([]);
  const [images, setImages] = useState<IImage[]>([]);
  const [planImages, setPlanImages] = useState<IPlanImage[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(String);

  const [loadingAddExternalProperty, setLoadingAddExternalProperty] = useState(false);
  const [addExternalPropertyError, setAddExternalPropertyFormError] = useState(String);
  const [externalProperties, setExternalProperties] = useState<IExternalProp[]>([]);

  const [loadingAddProperty, setLoadingAddProperty] = useState(false);
  const [loadingEditProperty, setLoadingEditProperty] = useState(false);
  const [loadingManageImage, setLoadingManageImage] = useState(false);
  const [loadingAddImage, setLoadingAddImage] = useState(false);
  const [loadingManagePlanImage, setLoadingManagePlanImage] = useState(false);
  const [loadingAddPlanImage, setLoadingAddPlanImage] = useState(false);
  const [loadingAddCoverImage, setLoadingAddCoverImage] = useState(false);
  const [loadingManagePropertyFeatures, setLoadingManagePropertyFeatures] = useState(false);
  const [loadingManagePropertyFeaturesBtn, setLoadingManagePropertyFeaturesBtn] = useState(false);

  const [addPropertyError, setAddPropertyFormError] = useState(String);
  const [editPropertyError, setEditPropertyFormError] = useState(String);
  const [manageImagesError, setManageImagesError] = useState(String);
  const [managePlanImagesError, setManagePlanImagesError] = useState(String);
  const [coverImageError, setCoverImageError] = useState(String);
  const [managePropertyFeaturesError, setManagePropertyFeaturesError] = useState(String);

  const propertyTypes: string[] = [
    "Estate",
    "Single Family Home",
    "Multi Family Home",
    "Condo",    
    "Townhouse",
    "Apartment",
    "Duplex",
    "Triplex",
    "Fourplex",
    "Mobile Home",
    "Vacant Land",
    "Commercial",
    "Industrial",
    "Mixed Use",
    "Farm Or Ranch",
    "Luxury Home",
    "Land",
  ];

  const externalPropertyTypes: string[] = [
    'school',
    'bank',
    'fueling station',
    'hotel',
    'restaurant',
    'lounge',
    'supermarket',
    'mall',
    'police station',
    'primary school',
    'ICT school',
    'secondary school',
    'university',
    'factory',
    'nuclear plant',
    'stadium',
    'playground',
    'brothel',
    'park',
    'club',
    'mechanic',
    'medical centre',
    'chemist',
    'civic centre',
    'government property',
    'church',
    'mosque',
    'laundry',
    'n/a',
    'under construction'
  ];

  const [addExternalPropertyFormData, setAddExternalPropertyFormData] = useState({
    property_id: 0,
    name: "",
    address: "",
    type: "",
    published: "",
  });

  const validateAddExternalPropertyForm = (): string => {
    if (!addExternalPropertyFormData.name || !addExternalPropertyFormData.address) {
      return "All fields are required.";
    }
    return "";
  };

  const handleAddExternalPropertySubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      setAddExternalPropertyFormError("");
  
      setLoadingAddExternalProperty(true);
  
      const validationError = validateAddExternalPropertyForm();
      if (validationError) {
        setLoadingAddExternalProperty(false);
        setAddExternalPropertyFormError(validationError);
        return;
      }
  
      const response = await AddExternalPropertyAction({
        id: 0,
        property_id: addExternalPropertyFormData.property_id,
        name: addExternalPropertyFormData.name,
        address: addExternalPropertyFormData.address,
        type: addExternalPropertyFormData.type,
        published: true,
      });
  
      if (response !== "success") {
        setAddExternalPropertyFormError("Failed to add property. Please try again.");
      } else {
        await refreshPage();
        setAddExternalPropertyFormData({
          property_id: 0,
          name: "",
          address: "",
          type: "",
          published: "",
        });
      }
  
      setLoadingAddExternalProperty(false);
    };

  const [addPropertyFormData, setAddPropertyFormData] = useState<IPropertyMain>({
    id: 0,
    name: "",
    about: "",
    main_image_id: 0,
    main_image_path: "/uploads/default/default-property-image.png",
    cover_image_path: "/uploads/default/default-property-cover.png",
    video_url: "",
    property_price: 0,
    property_price_discount: 0,
    published: false,
    status: "off market",
    likes: 0,
    tour_fee: 0,   
    created_on: new Date().toISOString(),
    updated_on: new Date().toISOString(),
    zip_code: "",
    country: "Nigeria",
    city: "",
    street_name: "",
    house_number: "",
    state: "",
    property_type: "Single Family Home",
    latitude: 0,
    longitude: 0,
    total_bedrooms: 0,
    total_bathrooms: 0,    
    plot_size: "",
    is_hot_property: false,
    is_company_property: true,   
    agent_id: 0,    
    owner_id: 0,
  });

  const [addPropertyFeatureFormData, setAddPropertyFeatureFormData] = useState<IPropertyFeature>({
    id: 0,
    name: "",
    context: "",
    property_id: 0
  });

  const [addImageFormData, setAddImageFormData] = useState({
    image: null as File | null,
    property_id: "",
  });

  const [addPlanImageFormData, setAddPlanImageFormData] = useState({
    id: 0,
    name: "",
    image: null as File | null,
    property_id: 0
  });

  const [addCoverImageFormData, setAddCoverImageFormData] = useState({
    id: 0,
    cover_image_path: "",
    image: null as File | null,
    property_id: 0
  });

  const [editPropertyFormData, setEditPropertyFormData] = useState<IPropertyMain>({
    id: 0,
    name: "",
    about: "",
    main_image_id: 0,
    main_image_path: "/uploads/default/default-property-image.png",
    cover_image_path: "/uploads/default/default-property-cover.png",
    video_url: "",
    property_price: 0,
    property_price_discount: 0,
    published: false,
    status: "off market",
    likes: 0,
    tour_fee: 0,   
    created_on: new Date().toISOString(),
    updated_on: new Date().toISOString(),
    zip_code: "",
    country: "Nigeria",
    city: "",
    street_name: "",
    house_number: "",
    state: "",
    property_type: "Single Family Home",
    latitude: 0,
    longitude: 0,
    total_bedrooms: 0,
    total_bathrooms: 0,    
    plot_size: "",
    is_hot_property: false,
    is_company_property: true,   
    agent_id: 0,    
    owner_id: 0,
  });

  useEffect(() => {
    getProperties();
  }, [searchKeyword]);

  const getProperties = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const getPropertyFeatures = async (property_id: number) => {
    setLoadingManagePropertyFeatures(true);
    addPropertyFeatureFormData.property_id = property_id;
    const fetchedData = await getPropertyFeaturesAction(property_id);
    setPropertyFeatures(fetchedData);
    setLoadingManagePropertyFeatures(false);
  };

  const getImages = async (property_id: number, main_image_id: number) => {
    setLoadingManageImage(true);
    addPropertyFeatureFormData.property_id = property_id;
    const fetchedData = await getPropertyImagesAction(property_id);
    setImages(fetchedData);
    setMainImageId(main_image_id);
    setLoadingManageImage(false);
  };

  const getPlanImages = async (property_id: number) => {
    setLoadingManagePlanImage(true);
    addPlanImageFormData.property_id = property_id;
    const fetchedData = await getPropertyPlanImagesAction(property_id);
    setPlanImages(fetchedData);
    setLoadingManagePlanImage(false);
  };

  const getExternalProperties = async (property_id: number) => {
    setLoadingGetLandmarks(true);
    const fetchedData = await getExternalPropertiesAction(property_id);
    setExternalProperties(fetchedData);
    setLoadingGetLandmarks(false);
  };

  const refreshPage = async () => {
    const fetchedData = await fetchPropertiesByAdmin(searchKeyword);
    setProperties(fetchedData);
  }

  const deleteProperty = async (property_id: number) => {
    setLoadingIndex(property_id);
    await deletePropertyAction(property_id);
    await refreshPage();
    setLoadingIndex(0);
  }

  const setPropertyOwner = async (property_id: number, is_company_property: boolean) => {
    setLoadingIndex(property_id);
    if(is_company_property){
      await setPropertyAsCompanyOwnedAction(property_id);
    }else{
      await setPropertyAsIndividualOwnedAction(property_id);
    }
    await refreshPage();
    setLoadingIndex(0);
  }

  const handleAddExternalPropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddExternalPropertyFormData({ ...addExternalPropertyFormData, [e.target.name]: e.target.value });
    setAddExternalPropertyFormError(""); // Clear errors when user types
  };

  const deleteExternalProperty = async (property_id: number) => {
      setLoadingIndex(property_id);
      await deleteExternalPropertyAction(property_id);
      await getExternalProperties(property_id);
      setLoadingIndex(0);
    }

  const handleDeleteFeature = async (feature_id: number) => {
    setDeleteFeatureLoadingIndex(feature_id);
    await deletePropertyFeatureAction(feature_id);
    await getPropertyFeatures(Number(addPropertyFeatureFormData.property_id));
    setDeleteFeatureLoadingIndex(0);
  }

  const handleSetImageAsMain = async (image_id: number, image_path: string, property_id: number) => {
    setImageAsMainLoadingIndex(image_id);
    await setMainPropertyImageAction(image_id, image_path, property_id);
    setMainImageId(image_id);
    setImageAsMainLoadingIndex(0);
  }

  const handleDeleteImage = async (image_id: number, property_id: number) => {
    setDeleteImageLoadingIndex(image_id);
    await deletePropertyImageAction(image_id, property_id);
    await getImages(property_id, image_id);
    setDeleteImageLoadingIndex(0);
  }

  const handleDeletePlanImage = async (image_id: number) => {
    setDeletePlanImageLoadingIndex(image_id);
    await deletePlanImageAction(image_id);
    await getPlanImages(Number(addPlanImageFormData.property_id));
    setDeletePlanImageLoadingIndex(0);
  }

  const handleAddPropertyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  setAddPropertyFormData((prev) => ({
    ...prev,
    [name]:
      name === "published" || name === "is_hot_property" || name === "is_company_property"
        ? value === "true"
        : ["tour_fee", "property_price", "property_price_discount", "latitude", "longitude", "total_bedrooms", "total_bathrooms", "main_image_id", "agent_id", "owner_id", "likes"].includes(name)
        ? parseFloat(value)
        : value,
  }));

  setAddPropertyFormError("");
};

const handleEditPropertyChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  const updatedValue =
    name === "published" || name === "is_hot_property" || name === "is_company_property"
      ? value === "true"
      : ["tour_fee", "property_price", "property_price_discount", "latitude", "longitude", "total_bedrooms", "total_bathrooms", "main_image_id", "agent_id", "owner_id", "likes"].includes(name)
      ? parseFloat(value)
      : value;

  const updatedFormData = {
    ...editPropertyFormData,
    [name]: updatedValue,
  };

  console.log("UPDATED FORM DATA", updatedFormData); // 🔍 Add this

  setEditPropertyFormData(updatedFormData);
  setEditPropertyFormError("");
};


  const handleAddPropertyFeatureChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddPropertyFeatureFormData({ ...addPropertyFeatureFormData, [e.target.name]: e.target.value });
    setManagePropertyFeaturesError(""); // Clear errors when user types
  };

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0] || null; // Get the selected file or set to null

      setAddImageFormData(prevState => ({
        ...prevState,
        [e.target.name]: file, // Assign file to the correct field
      }));
    } else {
      setAddImageFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
    setManageImagesError(""); // Clear errors when user types
  };

  const handleAddPlanImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    setAddPlanImageFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? (files ? files[0] : null) : value
    }));
    setManagePlanImagesError(""); // Clear errors when user types
  };

  const handleAddCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value, files } = e.target;

  if (name === "image" && files && files[0]) {
    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setAddCoverImageFormData((prevData) => ({
      ...prevData,
      image: file,
      cover_image_path: previewUrl, // update preview path
    }));
  } else {
    setAddCoverImageFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  setCoverImageError(""); // Clear errors when user types
};

  const validateAddPropertyForm = (): string => {
    for (const key in editPropertyFormData) {
      if (key === "videoUrl") continue; // Skip validation for videoUrl
      if (
        addPropertyFormData.hasOwnProperty(key) &&
        (addPropertyFormData[key as keyof IPropertyMain] === "" ||
          addPropertyFormData[key as keyof IPropertyMain] === null ||
          addPropertyFormData[key as keyof IPropertyMain] === undefined)
      ) {
        return `Field "${key}" is required.`;
      }
    }

    return "";
  };

  const validateEditPropertyForm = (): string => {
    for (const key in editPropertyFormData) {
      if (key === "videoUrl") continue; // Skip validation for videoUrl
      if (
        editPropertyFormData.hasOwnProperty(key) &&
        (editPropertyFormData[key as keyof IPropertyMain] === "" ||
          editPropertyFormData[key as keyof IPropertyMain] === null ||
          editPropertyFormData[key as keyof IPropertyMain] === undefined)
      ) {
        return `Field "${key}" is required.`;
      }
    }

    return "";
  };

  const handleManageImagesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setManageImagesError("");
    setLoadingAddImage(true);

    const property_image = addImageFormData.image as File | null;

    if (!property_image) {
      setManageImagesError("Please select an image to upload.");
      setLoadingAddImage(false);
      return;
    }

    const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!validTypes.includes(property_image.type)) {
      setManageImagesError("Invalid image format. Only JPG, JPEG, PNG, WEBP, and GIF are allowed.");
      setLoadingAddImage(false);
      return;
    }

    const image_file_name = generateFileName();

    try {
      
      await UploadPropertyImage(addImageFormData.property_id, image_file_name, property_image);

      setLoadingManageImage(true);
      const fetchedData = await getPropertyImagesAction(Number(addImageFormData.property_id));
      setImages(fetchedData);
      setLoadingManageImage(false);
      // Handle successful upload (e.g., show success message, update UI)
    } catch (error) {
      setManageImagesError("Failed to upload image. Please try again.");
      // Optionally log the error for debugging: console.error(error);
    } finally {
      setLoadingAddImage(false);
    }
  };

  const handleManagePlanImagesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setManagePlanImagesError("");
    setLoadingAddPlanImage(true);

    try {
      const image_token = generateCode(16) + "-" + addPlanImageFormData.property_id;

      if (addPlanImageFormData.image) {
        const file = addPlanImageFormData.image;
        const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"];

        if (!validTypes.includes(file.type)) {
          setManagePlanImagesError("Invalid image format. Only JPG, JPEG, PNG, WEBP, and GIF are allowed.");
          setLoadingAddPlanImage(false);
          return;
        }
        
        await UploadFloorPlan(image_token, addPlanImageFormData.image);

        // Extract file extension safely
        const fileExtension = addPlanImageFormData.image.name.split('.').pop();

        await SavePlanImageAction({
          id: 0,
          name: addPlanImageFormData.name,
          image_path: `/uploads/floor-plans/${image_token}.${fileExtension}`,
          property_id: addPlanImageFormData.property_id
        });

        await getPlanImages(Number(addPlanImageFormData.property_id));
      }
    } catch (error) {
      console.error("Error managing plan images:", error);
      setManagePlanImagesError("Failed to process image.");
    } finally {
      setLoadingAddPlanImage(false);
    }
  };

  const handleCoverImageSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setCoverImageError("");
  setLoadingAddCoverImage(true);

  if (addCoverImageFormData.property_id === 0) {
    setCoverImageError("No property was selected.");
    setLoadingAddCoverImage(false);
    return;
  }

  try {
    const image_token = generateCode(16) + "-" + addCoverImageFormData.property_id;

    const file = addCoverImageFormData.image;

    if (file) {
      const validTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"];

      if (!validTypes.includes(file.type)) {
        setCoverImageError("Invalid image format. Only JPG, JPEG, PNG, WEBP, and GIF are allowed.");
        setLoadingAddCoverImage(false);
        return;
      }

      const fileExtension = file.name.split('.').pop();

      await SavePropertyCoverImageAction(
        addCoverImageFormData.property_id,
        `/uploads/property-cover-images/${image_token}.${fileExtension}`,
        image_token,
        file
      );
    }
  } catch (error) {
    console.error("Error updating cover images:", error);
    setCoverImageError("Failed to process image.");
  } finally {
    setLoadingAddCoverImage(false);
  }
};



  const handleManagePropertyFeaturesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setManagePropertyFeaturesError("");

    setLoadingManagePropertyFeaturesBtn(true);

    await AddPropertyFeatureAction({
      id: 0,
      name: addPropertyFeatureFormData.name,
      context: addPropertyFeatureFormData.context,
      property_id: addPropertyFeatureFormData.property_id,
    });

    setLoadingManagePropertyFeaturesBtn(false);

    await getPropertyFeatures(Number(addPropertyFeatureFormData.property_id));

  }

  const handleAddPropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setAddPropertyFormError("");

    setLoadingAddProperty(true);

    const validationError = validateAddPropertyForm();
    if (validationError) {
      setLoadingAddProperty(false);
      setAddPropertyFormError(validationError);
      return;
    }

    if(!addPropertyFormData.video_url){
      addPropertyFormData.video_url = "";
    }

    const response = await AddPropertyAction({
      id: 0,
      name: addPropertyFormData.name,
      about: addPropertyFormData.about,
      main_image_id: 0,
      main_image_path: "/uploads/default/default-property-image.png",
      cover_image_path: "/uploads/default/default-property-cover.png",
      video_url: addPropertyFormData.video_url,
      property_price: Number(addPropertyFormData.property_price),
      property_price_discount: Number(addPropertyFormData.property_price_discount),
      published: addPropertyFormData.published ? true : false,
      status: addPropertyFormData.status,
      likes: 0,
      tour_fee: Number(addPropertyFormData.tour_fee),  
      created_on: new Date().toISOString(),
      updated_on: new Date().toISOString(),
      zip_code: addPropertyFormData.zip_code,
      country: addPropertyFormData.country,
      city: addPropertyFormData.city,
      street_name: addPropertyFormData.street_name,
      house_number: addPropertyFormData.house_number,
      state: addPropertyFormData.state,
      property_type: addPropertyFormData.property_type,
      latitude: Number(addPropertyFormData.latitude),
      longitude: Number(addPropertyFormData.longitude),
      total_bedrooms: Number(addPropertyFormData.total_bedrooms),
      total_bathrooms: Number(addPropertyFormData.total_bathrooms),   
      plot_size: addPropertyFormData.plot_size,
      is_hot_property: false,
      is_company_property: true,   
      agent_id: 0,    
      owner_id: 0,      
    });

    if (response !== "success") {
      setAddPropertyFormError("Failed to add property. Please try again.");
    } else {
      await refreshPage();
      setAddPropertyFormData({
        id: 0,
        name: "",
        about: "",
        main_image_id: 0,
        main_image_path: "/uploads/default/default-property-image.png",
        cover_image_path: "/uploads/default/default-property-cover.png",
        video_url: "",
        property_price: 0,
        property_price_discount: 0,
        published: false,
        status: "off market",
        likes: 0,
        tour_fee: 0,   
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        zip_code: "",
        country: "Nigeria",
        city: "",
        street_name: "",
        house_number: "",
        state: "",
        property_type: "Single Family Home",
        latitude: 0,
        longitude: 0,
        total_bedrooms: 0,
        total_bathrooms: 0,    
        plot_size: "",
        is_hot_property: false,
        is_company_property: true,   
        agent_id: 0,    
        owner_id: 0,
      });
      
      const closeButton = document.getElementById('add-property-close-btn') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }
    }

    setLoadingAddProperty(false);
  }

  const handleEditPropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting edited property:", editPropertyFormData);

    setEditPropertyFormError("");

    setLoadingEditProperty(true);

    const validationError = validateEditPropertyForm();
    if (validationError) {
      setLoadingEditProperty(false);
      setEditPropertyFormError(validationError);
      return;
    }

    if(!editPropertyFormData.video_url){
      editPropertyFormData.video_url = "";
    }

    const response = await UpdatePropertyAction({
      id: Number(editPropertyFormData.id),
      name: editPropertyFormData.name,
      about: editPropertyFormData.about,
      main_image_id: editPropertyFormData.main_image_id,
      main_image_path: editPropertyFormData.main_image_path,
      cover_image_path: editPropertyFormData.cover_image_path,
      video_url: editPropertyFormData.video_url,
      property_price: editPropertyFormData.property_price,
      property_price_discount: editPropertyFormData.property_price_discount,
      published: editPropertyFormData.published,
      status: editPropertyFormData.status,
      likes: editPropertyFormData.likes,
      tour_fee: editPropertyFormData.tour_fee,   
      created_on: editPropertyFormData.created_on,
      updated_on: new Date().toISOString(),
      zip_code: editPropertyFormData.zip_code,
      country: editPropertyFormData.country,
      city: editPropertyFormData.city,
      street_name: editPropertyFormData.street_name,
      house_number: editPropertyFormData.house_number,
      state: editPropertyFormData.state,
      property_type: editPropertyFormData.property_type,
      latitude: editPropertyFormData.latitude,
      longitude: editPropertyFormData.longitude,
      total_bedrooms: editPropertyFormData.total_bedrooms,
      total_bathrooms: editPropertyFormData.total_bathrooms,
      plot_size: editPropertyFormData.plot_size,
      is_hot_property: editPropertyFormData.is_hot_property,
      is_company_property: editPropertyFormData.is_company_property,
      agent_id: editPropertyFormData.agent_id,
      owner_id: editPropertyFormData.owner_id,
    });

    if (response !== "success") {
      setAddPropertyFormError("Failed to update property. Please try again.");
    } else {
      await refreshPage();
      setEditPropertyFormData({
        id: 0,
        name: "",
        about: "",
        main_image_id: 0,
        main_image_path: "/uploads/default/default-property-image.png",
        cover_image_path: "/uploads/default/default-property-cover.png",
        video_url: "",
        property_price: 0,
        property_price_discount: 0,
        published: false,
        status: "off market",
        likes: 0,
        tour_fee: 0,   
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        zip_code: "",
        country: "Nigeria",
        city: "",
        street_name: "",
        house_number: "",
        state: "",
        property_type: "Single Family Home",
        latitude: 0,
        longitude: 0,
        total_bedrooms: 0,
        total_bathrooms: 0,    
        plot_size: "",
        is_hot_property: false,
        is_company_property: true,   
        agent_id: 0,    
        owner_id: 0,
      });

      const closeButton = document.getElementById('edit-property-close-btn') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }
    }

    setLoadingEditProperty(false);
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="invoiceList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">
                  Real Estate Properties
                </h5>
              </div>
            </div>

            <div className="card-body p-0 border-bottom border-bottom-dashed">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search border-0 py-3"
                  placeholder="Search for properties..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>

            <div>
              <div className="card-body">
                <div className="table-responsive table-card">
                  {loading ? (
                    <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                      <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <h5 className="mb-0">Loading...</h5>
                    </div>
                  ) : properties.length === 0 ? (
                    <div className="noresult">
                      <div className="text-center">

                        <h5 className="mt-2">Sorry! No Result Found</h5>
                        <p className="text-muted mb-0">
                          We've searched more than 150+ apartments but found none for your apartment.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <table
                      className="table align-middle table-nowrap"
                      id="invoiceTable"
                    >
                      <thead className="text-muted">
                        <tr>
                          <th className="sort text-uppercase" data-sort="id">
                            #
                          </th>
                          <th className="sort text-uppercase" data-sort="name">
                            Name
                          </th>
                          <th className="sort text-uppercase" data-sort="location">
                            Location
                          </th>
                          <th className="sort text-uppercase" data-sort="type">
                            Type
                          </th>
                          <th className="sort text-uppercase" data-sort="price">
                            Price
                          </th>
                          <th className="sort text-uppercase" data-sort="status">
                            Plot Size
                          </th>
                          <th className="sort text-uppercase" data-sort="status">
                            Status
                          </th>
                          <th className="sort text-uppercase" data-sort="status">
                            Published
                          </th>
                          <th className="sort text-uppercase" data-sort="action">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="list">
                        {properties.map((property, index) => (
                          <tr key={property.id}>
                            <td className="id">{index + 1}</td>
                            <td className="tasks_name"><img className="avatar-xs" src={
                              property.main_image_path
                                ? property.main_image_path.startsWith('/uploads')
                                  ? `${COMPANY_PRIMARY_DOMAIN_URL}${property.main_image_path}`
                                  : property.main_image_path
                                : '//client/img/property-placeholder-image.png' // Fallback image
                            } />{" "}{property.name}</td>
                            <td className="tasks_name">
                              #{property.house_number} {property.street_name} {property.city} <br/> {property.zip_code} {property.state} {property.country}
                              <br />
                              <b>LAT:</b> {property.latitude}
                              <br />
                              <b>LONG:</b> {property.longitude}
                            </td>
                            <td className="tasks_name">{property.property_type}</td>
                            <td className="tasks_name">
                              {property.property_price.toLocaleString()} Naira
                              <br />
                              {property.tour_fee.toLocaleString()} Naira
                              <br />
                              <b>Discount:</b> {property.property_price_discount.toLocaleString()}%
                            </td>
                            <td className="client_name">
                              {property.plot_size}
                            </td>
                            <td className="priority">
                              <span
                                className={`badge ${property.status === "available" || property.status === "foreclosure"
                                  ? "bg-success" : property.status === "sold" || property.status === "rented" ? "bg-muted"
                                    : property.status === "under construction" || property.status === "coming soon" ? "bg-warning" : "bg-danger"
                                  } text-uppercase`}
                              >
                                {property.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="priority">
                              <span
                                className={`badge ${property.published
                                  ? "bg-success"
                                  : "bg-danger"
                                  } text-uppercase`}
                              >
                                {property.published ? "PUBLISHED" : "OFFLINE"}
                              </span>
                            </td>
                            <td>
                              {
                                loadingIndex == property.id
                                  ?
                                  <div className="spinner-border text-dark" role="status">
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                  :
                                  <div className="dropdown">
                                    <button className="btn btn-sm btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                      Actions
                                    </button>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <a className="dropdown-item" 
                                           href={`/listing?${new URLSearchParams(property as any).toString()}`}
                                           target="_blank">
                                          View Property
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#edit-property"
                                          onClick={() => {
                                            setEditPropertyFormData({
                                              id: property.id,
                                              name: property.name,
                                              about: property.about,
                                              main_image_id: property.main_image_id,
                                              main_image_path: property.main_image_path,
                                              cover_image_path: property.cover_image_path,
                                              video_url: property.video_url,
                                              property_price: property.property_price,
                                              property_price_discount: property.property_price_discount,
                                              published: property.published,
                                              status: property.status,
                                              likes: property.likes,
                                              tour_fee: property.tour_fee,   
                                              created_on: property.created_on,
                                              updated_on: new Date().toISOString(),
                                              zip_code: property.zip_code,
                                              country: property.country,
                                              city: property.city,
                                              street_name: property.street_name,
                                              house_number: property.house_number,
                                              state: property.state,
                                              property_type: property.property_type,
                                              latitude: property.latitude,
                                              longitude: property.longitude,
                                              total_bedrooms: property.total_bedrooms,
                                              total_bathrooms: property.total_bathrooms, 
                                              plot_size: property.plot_size,
                                              is_hot_property: property.is_hot_property,
                                              is_company_property: property.is_company_property,
                                              agent_id: property.agent_id,
                                              owner_id: property.owner_id,
                                            });
                                          }}
                                        >
                                          Edit Property
                                        </a>

                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#add-landmarks"
                                          onClick={async () => {
                                            setAddExternalPropertyFormData({
                                              property_id: property.id,
                                              name: "",
                                              address: "",
                                              type: "",
                                              published: "",
                                            });
                                          }}
                                        >
                                          Add Landmark
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          data-bs-toggle="modal"
                                          data-bs-target="#manage-landmarks"
                                          onClick={async () => {
                                            getExternalProperties(property.id);
                                          }}
                                        >
                                          Manage Landmarks
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#manage-property-cover-images-modal" onClick={() => {
                                          setAddCoverImageFormData({
                                            ...addCoverImageFormData,
                                            cover_image_path: property.cover_image_path,
                                            property_id: property.id,
                                            image: null
                                          });
                                        }}>
                                          Change Cover Image
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#manage-images-modal" onClick={() => {
                                          setAddImageFormData({
                                            property_id: property.id?.toString() ?? '',
                                            image: null,
                                          });
                                          getImages(property.id ?? 0, Number(property.main_image_id ?? 0));
                                        }}>
                                          Manage Images
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#manage-plan-images-modal" onClick={() => {
                                          getPlanImages(property.id ?? 0);
                                        }}>
                                          Manage Plan Images
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#manage-property-features-modal" onClick={() => {
                                          getPropertyFeatures(property.id ?? 0);
                                        }}>
                                          Manage Property Features
                                        </a>
                                      </li>
                                      {property.is_company_property && (
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="#"
                                            title="This will set property as owned by Sommy Properties"
                                            data-bs-toggle="modal"
                                            data-bs-target="#manage-property-features-modal"
                                            onClick={() => {
                                              setPropertyOwner(property.id ?? 0, true);
                                            }}
                                          >
                                            Set As Company Owned
                                          </a>
                                        </li>
                                      )}
                                      {property.is_company_property && (
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            href="#"
                                            title="This will show a disclaimer when users are about to buy this property"
                                            data-bs-toggle="modal"
                                            data-bs-target="#manage-property-features-modal"
                                            onClick={() => {
                                              setPropertyOwner(property.id ?? 0, false);
                                            }}
                                          >
                                            Set As Private Owned
                                          </a>
                                        </li>
                                      )}
                                      <li>
                                        <a className="dropdown-item" href="#" onClick={() => deleteProperty(property.id ?? 0)}>
                                          Delete Property
                                        </a>
                                      </li>
                                    </ul>

                                  </div>
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="manage-landmarks" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Manage Property's Landmarks</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          
              <div className="modal-body">
                
                <div className="card-body">
                  <div className="table-responsive table-card">
                    {loadingGetLandmarks ? (
                      <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                        <div className="spinner-border text-dark" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                        <h5 className="mb-0">Loading...</h5>
                      </div>
                    ) : externalProperties.length === 0 ? (
                      <div className="noresult text-center">
                        <h5 className="mt-2">Sorry! No Result Found</h5>
                        <p className="text-muted mb-0">
                          We've searched more than 150+ results but found none from your search.
                        </p>
                      </div>
                    ) : (
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="mb-5">
                          {externalProperties.map((externalProperty, index) => (
                            <tr key={externalProperty.id}>
                              <td>{index + 1}. {externalProperty.name}</td>
                              <td>{externalProperty.address}</td>
                              <td>{externalProperty.type}</td>
                              <td>
                                {
                                  loadingIndex == externalProperty.id
                                    ?
                                    <div className="spinner-border text-dark" role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    <div className="dropdown">
                                      <button className="btn btn-sm btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                        Actions
                                      </button>
                                      <ul className="dropdown-menu">
                                        <li>
                                          <a className="dropdown-item" href="#" onClick={() => deleteExternalProperty(externalProperty.id)}>
                                            Delete Landmark
                                          </a>
                                        </li>
                                      </ul>

                                    </div>
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="add-landmarks" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Add Property's Landmark</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          
              <div className="modal-body">
                  <form onSubmit={handleAddExternalPropertySubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Property Name:</label>
                  <input type="text" className="form-control" name="name" value={addExternalPropertyFormData.name} onChange={handleAddExternalPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Full Address:</label>
                  <input type="text" className="form-control" name="address" value={addExternalPropertyFormData.address} onChange={handleAddExternalPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Type:</label>
                  <select className="form-control" name="type" value={addExternalPropertyFormData.type} onChange={handleAddExternalPropertyChange}>
                    {externalPropertyTypes.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  {addExternalPropertyError && <div className="alert alert-danger">{addExternalPropertyError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingAddExternalProperty}>
                  {loadingAddExternalProperty ? (
                    <div className="d-flex align-items-center">
                      <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                      &nbsp;Loading...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
              </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="manage-images-modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Manage Property Images</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleManageImagesSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Upload Image:</label>
                  <div className="input-group">
                    <input name="property_id" type="number" value={addImageFormData.property_id} onChange={handleAddImageChange} hidden />
                    <input type="file" accept="image/*" className="form-control" name="image" onChange={handleAddImageChange} required />
                    <button type="submit" className="btn btn-dark" disabled={loadingAddImage}>
                      {loadingAddImage ? (
                        <div className="d-flex align-items-center">
                          <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                          &nbsp;Loading...
                        </div>
                      ) : (
                        "Add Image"
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  {manageImagesError && <div className="alert alert-danger">{manageImagesError}</div>} {/* Show error message if any */}
                </div>
                <hr className="mb-3" />
                <h5 className="modal-title mb-3" id="varyingcontentModalLabel">Manage Property Images</h5>
                <hr />
                {loadingManageImage ? (
                  <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <h5 className="mb-0">Fetching images...</h5>
                  </div>
                ) : images.length === 0 ? (
                  <div className="noresult">
                    <div className="text-center">
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">Could not load property images.</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {images.map((image, index) => (
                      <div>
                        <div key={index} className="mb-3">
                          <h5>Image {index + 1} {mainImageId == Number(image.imageId) && "(Main Image)"}</h5> {/* Number each image */}
                          <img src={
                            image.filePath
                              ? image.filePath.startsWith('/uploads')
                                ? `${COMPANY_PRIMARY_DOMAIN_URL}${image.filePath}`
                                : image.filePath
                              : '//client/img/property-placeholder-image.png' // Fallback image
                          } className="w-100 mb-2" alt={`Image ${index + 1}`} />
                          {mainImageId != Number(image.imageId) && <button className="btn btn-dark me-2" disabled={loadingSetImageAsMainIndex === Number(image.imageId)} onClick={() => handleSetImageAsMain(Number(image.imageId), image.filePath ?? "", Number(image.propertyId))}>
                            {loadingSetImageAsMainIndex == Number(image.imageId) ? (
                              <div className="d-flex align-items-center">
                                <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                                &nbsp;Loading...
                              </div>
                            ) : (
                              <div className="d-flex align-items-center">
                                Set Image As Main
                              </div>
                            )}
                          </button>
                          }
                          {mainImageId != Number(image.imageId) && <button className="btn btn-danger" disabled={loadingDeleteImageIndex === Number(image.imageId)} onClick={() => handleDeleteImage(Number(image.imageId), Number(image.propertyId))}>
                            {loadingDeleteImageIndex == Number(image.imageId) ? (
                              <div className="d-flex align-items-center">
                                <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                                &nbsp;Deleting...
                              </div>
                            ) : (
                              <div className="d-flex align-items-center">
                                <i className='bx bx-trash fs-22'></i>
                                &nbsp;Delete Image
                              </div>
                            )}
                          </button>}
                        </div>
                        <hr />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="manage-plan-images-modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Add Floor Plan Image</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleManagePlanImagesSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Image Name:</label><div className="input-group">
                    <input name="property_id" type="number" value={addPlanImageFormData.property_id} onChange={handleAddPlanImageChange} required hidden />
                    <input type="text" className="form-control" name="name" value={addPlanImageFormData.name} onChange={handleAddPlanImageChange} required maxLength={255} />
                  </div>
                  <label className="col-form-label">Upload Image:</label>
                  <div className="input-group">
                    <input type="file" accept="image/*" className="form-control" name="image" onChange={handleAddPlanImageChange} required />
                    <button type="submit" className="btn btn-dark" disabled={loadingAddPlanImage}>
                      {loadingAddPlanImage ? (
                        <div className="d-flex align-items-center">
                          <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                          &nbsp;Loading...
                        </div>
                      ) : (
                        "Add Image"
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  {managePlanImagesError && <div className="alert alert-danger">{managePlanImagesError}</div>} {/* Show error message if any */}
                </div>
                <hr className="mb-3" />
                <h5 className="modal-title mb-3" id="varyingcontentModalLabel">Manage Floor Plans</h5>
                {loadingManagePlanImage ? (
                  <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <h5 className="mb-0">Fetching floor plans...</h5>
                  </div>
                ) : properties.length === 0 ? (
                  <div className="noresult">
                    <div className="text-center">
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">Could not load property features.</p>
                    </div>
                  </div>
                ) : (
                  <div className="accordion" id="propertyAccordion">
                    {planImages.map((image, index) => (
                      <div className="accordion-item mb-3" key={index}>
                        <h2 className="accordion-header" id={`heading${index}`}>
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="true"
                            aria-controls={`collapse${index}`}
                          >
                            {image.name}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading${index}`}
                          data-bs-parent="#propertyAccordion"
                        >
                          <div className="accordion-body">
                            <img
                              src={image.image_path.startsWith("/uploads/floor-plans/") ? `${UPLOAD_URL}${image.image_path}` : image.image_path}
                              className="w-100"
                              alt="Floor Plan"
                            />
                            <hr />
                            <button type="button" onClick={() => handleDeletePlanImage(image.id)} className="btn btn-danger" disabled={loadingDeletePlanImageIndex == image.id}>
                              {loadingDeletePlanImageIndex ? (
                                <div className="d-flex align-items-center">
                                  <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                                  &nbsp;Deleting...
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <i className='bx bx-trash fs-22'></i>
                                  &nbsp;Delete Image
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="manage-property-cover-images-modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Change Property Cover Image</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleCoverImageSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Upload Image:</label>
                  <img src={
                              addCoverImageFormData.cover_image_path
                                ? addCoverImageFormData.cover_image_path.startsWith('/uploads')
                                  ? `${COMPANY_PRIMARY_DOMAIN_URL}${addCoverImageFormData.cover_image_path}`
                                  : addCoverImageFormData.cover_image_path
                                : '//client/img/default-property-cover.png' // Fallback image
                            } width="100%"/>
                  <div className="input-group pt-3">
                    <input type="file" accept="image/*" className="form-control" name="image" onChange={handleAddCoverImageChange} required />
                    <button type="submit" className="btn btn-dark" disabled={loadingAddCoverImage}>
                      {loadingAddCoverImage ? (
                        <div className="d-flex align-items-center">
                          <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                          &nbsp;Loading...
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  {coverImageError && <div className="alert alert-danger">{coverImageError}</div>} {/* Show error message if any */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="manage-property-features-modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Add Property Feature</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleManagePropertyFeaturesSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Feature Name:</label><div className="input-group">
                    <input name="property_id" type="number" value={addPropertyFeatureFormData.property_id} onChange={handleAddPropertyFeatureChange} required hidden />
                    <input type="text" className="form-control" name="name" value={addPropertyFeatureFormData.name} onChange={handleAddPropertyFeatureChange} required maxLength={255} />
                  </div>
                  <label className="col-form-label">Context:</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="context" value={addPropertyFeatureFormData.context} onChange={handleAddPropertyFeatureChange} required maxLength={255} />
                    <button type="submit" className="btn btn-dark" disabled={loadingManagePropertyFeaturesBtn}>
                      {loadingManagePropertyFeaturesBtn ? (
                        <div className="d-flex align-items-center">
                          <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                          &nbsp;Loading...
                        </div>
                      ) : (
                        "Save Feature"
                      )}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  {managePropertyFeaturesError && <div className="alert alert-danger">{managePropertyFeaturesError}</div>} {/* Show error message if any */}
                </div>
                <hr className="mb-3" />
                <h5 className="modal-title mb-3" id="varyingcontentModalLabel">Manage Features</h5>
                {loadingManagePropertyFeatures ? (
                  <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <h5 className="mb-0">Fetching property features...</h5>
                  </div>
                ) : properties.length === 0 ? (
                  <div className="noresult">
                    <div className="text-center">
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">Could not load property features.</p>
                    </div>
                  </div>
                ) : (
                  <div className="accordion" id="propertyAccordion">
                    {propertyFeatures.map((feature, index) => (
                      <div className="accordion-item mb-3" key={index}>
                        <h2 className="accordion-header" id={`heading${index}`}>
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="true"
                            aria-controls={`collapse${index}`}
                          >
                            {feature.name}
                          </button>
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading${index}`}
                          data-bs-parent="#propertyAccordion"
                        >
                          <div className="accordion-body">
                            <p className="mb-3">{feature.context}</p>
                            <hr />
                            <button type="button" onClick={() => handleDeleteFeature(feature.id)} className="btn btn-danger" disabled={loadingDeleteFeatureIndex == feature.id}>
                              {loadingDeleteFeatureIndex ? (
                                <div className="d-flex align-items-center">
                                  <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                                  &nbsp;Deleting...
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <i className='bx bx-trash fs-22'></i>
                                  &nbsp;Delete Feature
                                </div>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="add-property" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">New Real Estate Property</h5>
              <button id="add-property-close-btn" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddPropertySubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Property Name:</label>
                  <input type="text" className="form-control" name="name" value={addPropertyFormData.name} onChange={handleAddPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Tour Fee:</label>
                  <input className="form-control" name="tour_fee" type="number" step={.01} inputMode="numeric" value={addPropertyFormData.tour_fee} onChange={handleAddPropertyChange} required maxLength={13} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Property Price:</label>
                  <input className="form-control" name="property_price" type="number" step={.01} inputMode="numeric" value={addPropertyFormData.property_price} onChange={handleAddPropertyChange} required maxLength={13} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Zip Code:</label>
                  <input className="form-control" name="zip_code" type="number" inputMode="numeric" value={addPropertyFormData.zip_code} onChange={handleAddPropertyChange} required maxLength={13} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Country:</label>
                  <select name="country" className="form-control" value={addPropertyFormData.country} onChange={handleAddPropertyChange}>
                    <option value="United States">United States</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo">Congo, the Democratic Republic of the</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan">France, Metropolitan</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                    <option value="Holy See">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia, Federated States of</option>
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint LUCIA</option>
                    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                    <option value="Span">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Viet Nam</option>
                    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">State:</label>
                  <input className="form-control" name="state" value={addPropertyFormData.state} onChange={handleAddPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">City:</label>
                  <input className="form-control" name="city" value={addPropertyFormData.city} onChange={handleAddPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Street Name:</label>
                  <input className="form-control" name="street_name" value={addPropertyFormData.street_name} onChange={handleAddPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">House Number:</label>
                  <input className="form-control" name="house_number" value={addPropertyFormData.house_number} onChange={handleAddPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Latitude:</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    className="form-control"
                    name="latitude"
                    step={0.000001}
                    value={addPropertyFormData.latitude}
                    onChange={handleAddPropertyChange}
                    required
                    min={-90}
                    max={90}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Longitude:</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    className="form-control"
                    name="longitude"
                    step={0.000001}
                    value={addPropertyFormData.longitude}
                    onChange={handleAddPropertyChange}
                    required
                    min={-180}
                    max={180}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Total Bedrooms:</label>
                  <input className="form-control" name="total_bedrooms" type="number" inputMode="numeric" value={addPropertyFormData.total_bedrooms} onChange={handleAddPropertyChange} required maxLength={11} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Total Bathrooms Number:</label>
                  <input className="form-control" type="number" inputMode="numeric" name="total_bathrooms" value={addPropertyFormData.total_bathrooms} onChange={handleAddPropertyChange} required maxLength={11} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Property Type:</label>
                    <select className="form-control" name="property_type" value={addPropertyFormData.property_type} onChange={handleAddPropertyChange}>
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Plot Size:</label>
                  <input className="form-control" name="plot_size" value={addPropertyFormData.plot_size} onChange={handleAddPropertyChange} required maxLength={50} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Video Url (Option):</label>
                  <input className="form-control" type="url" name="video_url" value={addPropertyFormData.video_url} onChange={handleAddPropertyChange} maxLength={50} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">About:</label>
                  <textarea className="form-control" name="about" onChange={handleAddPropertyChange} value={addPropertyFormData.about} required maxLength={500}></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Visibility:</label>
                  <select className="form-control" name="published" value={addPropertyFormData.published ? "true" : "false"} onChange={handleAddPropertyChange}>
                    <option value="">- Set Property Visibility -</option>
                    <option value="true">Publish</option>
                    <option value="false">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  {addPropertyError && <div className="alert alert-danger">{addPropertyError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingAddProperty}>
                  {loadingAddProperty ? (
                    <div className="d-flex align-items-center">
                      <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                      &nbsp;Loading...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>            

      <div className="modal fade" id="edit-property" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Edit Real Estate Property</h5>
              <button id="edit-property-close-btn" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleEditPropertySubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Property Name:</label>
                  <input type="text" className="form-control" name="name" value={editPropertyFormData.name} onChange={handleEditPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Tour Fee:</label>
                  <input className="form-control" name="tour_fee" type="number" step={.01} inputMode="numeric" value={editPropertyFormData.tour_fee} onChange={handleEditPropertyChange} required maxLength={13} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Tour Fee:</label>
                  <input className="form-control" name="property_price" type="number" step={.01} inputMode="numeric" value={editPropertyFormData.property_price} onChange={handleEditPropertyChange} required maxLength={13} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Zip Code:</label>
                  <input className="form-control" name="zip_code" type="number" inputMode="numeric" value={editPropertyFormData.zip_code} onChange={handleEditPropertyChange} required maxLength={13} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Country:</label>
                  <select name="country" className="form-control" value={editPropertyFormData.country} onChange={handleEditPropertyChange}>
                    <option value="United States">United States</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antartica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo">Congo, the Democratic Republic of the</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                    <option value="Croatia">Croatia (Hrvatska)</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="East Timor">East Timor</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="France Metropolitan">France, Metropolitan</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                    <option value="Holy See">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran (Islamic Republic of)</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                    <option value="Korea">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macau">Macau</option>
                    <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia">Micronesia, Federated States of</option>
                    <option value="Moldova">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint LUCIA</option>
                    <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia (Slovak Republic)</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                    <option value="Span">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="St. Helena">St. Helena</option>
                    <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syria">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Viet Nam</option>
                    <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                    <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                    <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">State:</label>
                  <input className="form-control" name="state" value={editPropertyFormData.state} onChange={handleEditPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">City:</label>
                  <input className="form-control" name="city" value={editPropertyFormData.city} onChange={handleEditPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Street Name:</label>
                  <input className="form-control" name="street_name" value={editPropertyFormData.street_name} onChange={handleEditPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">House Number:</label>
                  <input className="form-control" name="house_number" value={editPropertyFormData.house_number} onChange={handleEditPropertyChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Latitude:</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    className="form-control"
                    name="latitude"
                    step={0.000001}
                    value={editPropertyFormData.latitude}
                    onChange={handleEditPropertyChange}
                    required
                    min={-90}
                    max={90}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Longitude:</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    className="form-control"
                    name="longitude"
                    step={0.000001}
                    value={editPropertyFormData.longitude}
                    onChange={handleEditPropertyChange}
                    required
                    min={-180}
                    max={180}
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Total Bedrooms:</label>
                  <input className="form-control" name="total_bedrooms" type="number" inputMode="numeric" value={editPropertyFormData.total_bedrooms} onChange={handleEditPropertyChange} required maxLength={11} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Total Bathrooms Number:</label>
                  <input className="form-control" type="number" inputMode="numeric" name="total_bathrooms" value={editPropertyFormData.total_bathrooms} onChange={handleEditPropertyChange} required maxLength={11} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Property Type:</label>
                  <select className="form-control" name="property_type" value={editPropertyFormData.property_type} onChange={handleEditPropertyChange}>
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Plot Size:</label>
                  <input className="form-control" name="plot_size" value={editPropertyFormData.plot_size} onChange={handleEditPropertyChange} required maxLength={50} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Video Url (Option):</label>
                  <input className="form-control" type="url" name="video_url" value={editPropertyFormData.video_url} onChange={handleEditPropertyChange} maxLength={50} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">About:</label>
                  <textarea className="form-control" name="about" onChange={handleEditPropertyChange} value={editPropertyFormData.about} required maxLength={500}></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Visibility:</label>
                  <select className="form-control" name="published" value={editPropertyFormData.published ? "true" : "false"} onChange={handleEditPropertyChange}>
                    <option value="">- Set Property Visibility -</option>
                    <option value="true">Publish</option>
                    <option value="false">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Status:</label>
                  <select
                    name="status"
                    className="form-control"
                    value={editPropertyFormData.status}
                    onChange={handleEditPropertyChange}
                  >
                    <option value="available">Available</option>
                    <option value="under construction">Under Construction</option>
                    <option value="sold">Sold</option>
                    <option value="off market">Off Market</option>
                    <option value="coming soon">Coming Soon</option>
                    <option value="foreclosed">Foreclosed</option>
                    <option value="rented">Rented</option>
                  </select>
                </div>
                <div className="mb-3">
                  {editPropertyError && <div className="alert alert-danger">{editPropertyError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingEditProperty}>
                  {loadingEditProperty ? (
                    <div className="d-flex align-items-center">
                      <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                      &nbsp;Loading...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePropertiesPage;
