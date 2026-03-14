import { useEffect, useState } from "react";
import { ITestimonial } from "../../models/interfaces/ITestimonial";
import { deleteTestimonialAction } from "../../services/dbservices/admin/testimonial/deleteTestimonial";
import { fetchTestimonialByAdmin } from "../../services/dbservices/admin/testimonial/fetchTestimonials";
import { UpdateTestimonialAction } from "../../services/dbservices/admin/testimonial/updateTestimonial";
import { AddTestimonialAction, UploadTestimonialAvatar, UploadTestimonialBanner } from "../../services/dbservices/admin/testimonial/createTestimonial";
import { generateFileName } from "../../services/Util/NumberGenerator";

interface AddTestimonialFormDataState {
  full_name: string;
  testimony: string;
  category: string;
  region_name: string;
  user_image_file: File | null;
  user_image_path: string;
  banner_image_file: File | null;
  banner_image_path: string;
}

const ManageTestimonialPage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [loadingAddTestimonial, setLoadingAddTestimonial] = useState(false);
  const [loadingEditTestimonial, setLoadingEditTestimonial] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [testimonials, setTestimonial] = useState<ITestimonial[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(String);
  const [addTestimonialError, setAddTestimonialFormError] = useState(String);
  const [editTestimonialError, setEditTestimonialFormError] = useState(String);

  const [addTestimonialFormData, setAddTestimonialFormData] = useState<AddTestimonialFormDataState>({
    full_name: "",
    testimony: "",
    region_name: "",
    category: "Real Estate Agent",
    user_image_path: "",
    banner_image_path: "",
    user_image_file: null as File | null,
    banner_image_file: null as File | null,      
  });

  const [editTestimonialFormData, setEditTestimonialFormData] = useState({
    id: 0,
    full_name: "",
    testimony: "",
    category: "Real Estate Agent",
    published: "true",
    user_image_path: "",
    banner_image_path: "",
    region_name: "",
  });

  useEffect(() => {
    getTestimonial();
  }, [searchKeyword]);

  const getTestimonial = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const deleteTestimonial = async (id: number) => {
    setLoadingIndex(id);
    await deleteTestimonialAction(id);
    await refreshPage();
    setLoadingIndex(0);
  }

  const handleAddTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const file = e.target.files?.[0] || null; // Get the selected file or set to null
  
      setAddTestimonialFormData(prevState => ({
        ...prevState,
        [e.target.name]: file, // Assign file to the correct field
      }));
    } else {
      setAddTestimonialFormData(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  
    setAddTestimonialFormError(""); // Clear errors when user types
  };
    

  const handleEditTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditTestimonialFormData({ ...editTestimonialFormData, [e.target.name]: e.target.value });
    setEditTestimonialFormError(""); // Clear errors when user types
  };

  const refreshPage = async () => {
    const fetchedData = await fetchTestimonialByAdmin(searchKeyword);
    setTestimonial(fetchedData);
  }

  const validateAddTestimonialForm = (): string => {
    if (!addTestimonialFormData.full_name || !addTestimonialFormData.testimony) {
      return "All fields are required.";
    }
    return "";
  };

  const validateEditTestimonialForm = (): string => {
    if (!editTestimonialFormData.full_name || !editTestimonialFormData.testimony) {
      return "All fields are required.";
    }
    return "";
  };

  const handleAddTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setAddTestimonialFormError("");

    setLoadingAddTestimonial(true);

    const validationError = validateAddTestimonialForm();
    if (validationError) {
      setLoadingAddTestimonial(false);
      setAddTestimonialFormError(validationError);
      return;
    }

    const user_image_file = addTestimonialFormData.user_image_file as File | null;
    const banner_image_file = addTestimonialFormData.banner_image_file as File | null;

    const user_image_path_file_name = generateFileName();
    const banner_image_path_file_name = generateFileName();

    // ✅ Safely extract file extensions
    const fileExtension1 = user_image_file?.name ? `.${user_image_file.name.split('.').pop()}` : "";
    const fileExtension2 = banner_image_file?.name ? `.${banner_image_file.name.split('.').pop()}` : "";

    // ✅ Ensure files exist before uploading
    if (user_image_file) {
        await UploadTestimonialAvatar(user_image_path_file_name, user_image_file);
    }

    if (banner_image_file) {
        await UploadTestimonialBanner(banner_image_path_file_name, banner_image_file);
    }

    const response = await AddTestimonialAction({
      id: 0,
      full_name: addTestimonialFormData.full_name,
      user_image_path: `/uploads/testimonial-avatars/${user_image_path_file_name}${fileExtension1}`,
      banner_image_path: `/uploads/testimonial-banners/${user_image_path_file_name}${fileExtension2}`,
      region_name: addTestimonialFormData.region_name,
      testimony: addTestimonialFormData.testimony,
      category: addTestimonialFormData.category,
      published: true,
    });

    if (response !== "success") {
      setAddTestimonialFormError("Failed to add testimonial. Please try again.");
    } else {
      await refreshPage();
      setAddTestimonialFormData({
        full_name: "",
        testimony: "",
        category: "Real Estate Agent",
        user_image_path: "",
        banner_image_path: "",
        region_name: "",
        banner_image_file: null,
        user_image_file: null
      });
    }

    setLoadingAddTestimonial(false);
  };

  const handleEditTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditTestimonialFormError("");

    setLoadingEditTestimonial(true);

    const validationError = validateEditTestimonialForm();
    if (validationError) {
      setLoadingEditTestimonial(false);
      setEditTestimonialFormError(validationError);
      return;
    }

    const response = await UpdateTestimonialAction({
      id: editTestimonialFormData.id,
      full_name: editTestimonialFormData.full_name,
      testimony: editTestimonialFormData.testimony,
      region_name: editTestimonialFormData.region_name,
      user_image_path: "",
      banner_image_path: "",
      category: editTestimonialFormData.category,
      published: editTestimonialFormData.published == "true",
    });


    if (response !== "success") {
      setEditTestimonialFormError("Failed to save testimonial. Please try again.");
    }else{
      await refreshPage();
    }

    setLoadingEditTestimonial(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="invoiceList">
            <div className="card-header border-0 d-flex align-items-center">
              <h5 className="card-title mb-0 flex-grow-1">Manage Testimonials</h5>
            </div>

            {/* Search Input */}
            <div className="card-body p-0 border-bottom border-bottom-dashed">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search border-0 py-3"
                  placeholder="Search for testimonial..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>

            {/* Users List */}
            <div className="card-body">
              <div className="table-responsive table-card">
                {loading ? (
                  <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <h5 className="mb-0">Loading...</h5>
                  </div>
                ) : testimonials.length === 0 ? (
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
                        <th>ID</th>
                        <th>User</th>
                        <th>Testimony</th>
                        <th>Category</th>
                        <th>Published</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mb-5">
                      {testimonials.map((testimonial, index) => (
                        <tr key={testimonial.id}>
                          <td>{index + 1}.</td>
                          <td>
                          <div className="d-flex gap-2 align-items-center">
                          <img
                                src={testimonial.user_image_path?.startsWith("/uploads/testimonial-agent")
                                  ? `https://sommyprop-001-site2.otempurl.com${testimonial.user_image_path}`
                                  : testimonial.user_image_path}
                                alt=""
                                className="avatar-xs rounded-circle"
                              />
                            {testimonial.full_name}
                            </div>
                            </td>
                          <td>{testimonial.testimony}<br/><b>Region:</b> {testimonial.region_name}</td>
                          <td>{testimonial.category}</td>
                          <td>
                            <span className={testimonial.published ? "badge badge-soft-success" : "badge badge-soft-danger"}>{testimonial.published ? "PUBLISHED" : "OFFLINE"}</span>
                          </td>
                          <td>
                            {
                              loadingIndex == testimonial.id
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
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-testimonial"
                                        onClick={() => {
                                          setEditTestimonialFormData({
                                            id: testimonial.id,
                                            full_name: testimonial.full_name,
                                            testimony: testimonial.testimony,
                                            category: testimonial.category,
                                            published: testimonial.published ? "true" : "false",
                                            user_image_path: "",
                                            banner_image_path: "",
                                            region_name: testimonial.region_name
                                          });
                                        }}
                                      >
                                        Edit Testimonial
                                      </a>

                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#" onClick={() => deleteTestimonial(testimonial.id)}>
                                        Delete Testimonial
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

      <div className="modal fade" id="add-testimonial" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">New Testimonial</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddTestimonialSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Upload User's Avatar:</label>
                  <input type="file" className="form-control" name="user_image_file" onChange={handleAddTestimonialChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Upload Testimonial Banner:</label>
                  <input type="file" className="form-control" name="banner_image_file" onChange={handleAddTestimonialChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Full Name:</label>
                  <input type="text" className="form-control" name="full_name" value={addTestimonialFormData.full_name} onChange={handleAddTestimonialChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Region Name:</label>
                  <input type="text" className="form-control" name="region_name" value={addTestimonialFormData.region_name} onChange={handleAddTestimonialChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Testimony:</label>
                  <textarea className="form-control" name="testimony" value={addTestimonialFormData.testimony} onChange={handleAddTestimonialChange} required maxLength={500}></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category:</label>
                  <select className="form-control" name="category" value={addTestimonialFormData.category} onChange={handleAddTestimonialChange}>
                    <option value="Real Estate Agent">Real Estate Agent</option>
                    <option value="Other">Others</option>
                  </select>
                </div>
                <div className="mb-3">
                  {addTestimonialError && <div className="alert alert-danger">{addTestimonialError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingAddTestimonial}>
                  {loadingAddTestimonial ? (
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

      <div id="edit-testimonial" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none", }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Edit Testimonial</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleEditTestimonialSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <input name="id" value={editTestimonialFormData.id} hidden onChange={handleEditTestimonialChange} required />
                  <label className="col-form-label">Full Name:</label>
                  <input type="text" className="form-control" name="full_name" value={editTestimonialFormData.full_name} onChange={handleEditTestimonialChange} maxLength={255} required />
                </div>
                <div className="mb-3">
                  <input name="id" value={editTestimonialFormData.id} hidden onChange={handleEditTestimonialChange} required />
                  <label className="col-form-label">Region Name:</label>
                  <input type="text" className="form-control" name="region_name" value={editTestimonialFormData.region_name} onChange={handleEditTestimonialChange} maxLength={255} required />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Testimony:</label>
                  <textarea className="form-control" name="testimony" onChange={handleEditTestimonialChange} value={editTestimonialFormData.testimony} required maxLength={500}></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category:</label>
                  <select className="form-control" name="category" onChange={handleEditTestimonialChange} value={editTestimonialFormData.category}>
                    <option value="Real Estate Agent">Real Estate Agent</option>
                    <option value="Other">Others</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Status:</label>
                  <select className="form-control" name="published" value={editTestimonialFormData.published} onChange={handleEditTestimonialChange}>
                    <option value="true">Publish</option>
                    <option value="false">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  {editTestimonialError && <div className="alert alert-danger">{editTestimonialError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingEditTestimonial}>
                  {loadingEditTestimonial ? (
                    <div className="d-flex align-items-center">
                      <span className="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                      &nbsp;Saving...
                    </div>
                  ) : (
                    "Save Changes"
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

export default ManageTestimonialPage;
