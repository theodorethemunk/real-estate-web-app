import { useEffect, useState } from "react";
import { IFaq } from "../../models/interfaces/FAQInterface";
import { deleteFAQAction } from "../../services/dbservices/admin/faq/deleteFAQ";
import { fetchFAQByAdmin } from "../../services/dbservices/admin/faq/fetchFAQ";
import { AddFAQAction } from "../../services/dbservices/admin/faq/createFAQ";
import { UpdateFAQAction } from "../../services/dbservices/admin/faq/updateFAQ";

const ManageFAQPage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [loadingAddFAQ, setLoadingAddFAQ] = useState(false);
  const [loadingEditFAQ, setLoadingEditFAQ] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [faqs, setFAQ] = useState<IFaq[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(String);
  const [addFAQError, setAddFAQFormError] = useState(String);
  const [editFAQError, setEditFAQFormError] = useState(String);

  const [addFAQFormData, setAddFAQFormData] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const [editFAQFormData, setEditFAQFormData] = useState({
    id: 0,
    question: "",
    answer: "",
    category: "",
    published: "true",
  });

  useEffect(() => {
    getFAQ();
  }, [searchKeyword]);

  const getFAQ = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const deleteFAQ = async (faq_id: number) => {
    setLoadingIndex(faq_id);
    await deleteFAQAction(faq_id);
    await refreshPage();
    setLoadingIndex(0);
  }

  const handleAddFAQChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddFAQFormData({ ...addFAQFormData, [e.target.name]: e.target.value });
    setAddFAQFormError(""); // Clear errors when user types
  };

  const handleEditFAQChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditFAQFormData({ ...editFAQFormData, [e.target.name]: e.target.value });
    setEditFAQFormError(""); // Clear errors when user types
  };

  const refreshPage = async () => {
    const fetchedData = await fetchFAQByAdmin(searchKeyword);
    setFAQ(fetchedData);
  }

  const validateAddFAQForm = (): string => {
    if (!addFAQFormData.question || !addFAQFormData.answer) {
      return "All fields are required.";
    }
    return "";
  };

  const validateEditFAQForm = (): string => {
    if (!editFAQFormData.question || !editFAQFormData.answer) {
      return "All fields are required.";
    }
    return "";
  };

  const handleAddFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setAddFAQFormError("");

    setLoadingAddFAQ(true);

    const validationError = validateAddFAQForm();
    if (validationError) {
      setLoadingAddFAQ(false);
      setAddFAQFormError(validationError);
      return;
    }

    const response = await AddFAQAction({
      id: 0,
      question: addFAQFormData.question,
      answer: addFAQFormData.answer,
      category: addFAQFormData.category,
      published: true,
    });

    if (response !== "success") {
      setAddFAQFormError("Failed to add faq. Please try again.");
    } else {
      await refreshPage();
      setAddFAQFormData({
        question: "",
        answer: "",
        category: "",
      });
    }

    setLoadingAddFAQ(false);
  };

  const handleEditFAQSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditFAQFormError("");

    setLoadingEditFAQ(true);

    const validationError = validateEditFAQForm();
    if (validationError) {
      setLoadingEditFAQ(false);
      setEditFAQFormError(validationError);
      return;
    }

    const response = await UpdateFAQAction({
      id: editFAQFormData.id,
      question: editFAQFormData.question,
      answer: editFAQFormData.answer,
      category: editFAQFormData.category,
      published: editFAQFormData.published == "true",
    });


    if (response !== "success") {
      setEditFAQFormError("Failed to save faq. Please try again.");
    }else{
      await refreshPage();
    }

    setLoadingEditFAQ(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="invoiceList">
            <div className="card-header border-0 d-flex align-items-center">
              <h5 className="card-title mb-0 flex-grow-1">Manage Frequently Asked Questions</h5>
            </div>

            {/* Search Input */}
            <div className="card-body p-0 border-bottom border-bottom-dashed">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control search border-0 py-3"
                  placeholder="Search for faqs..."
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
                ) : faqs.length === 0 ? (
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
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Category</th>
                        <th>Published</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="mb-5">
                      {faqs.map((faq, index) => (
                        <tr key={faq.id}>
                          <td>{index + 1}.</td>
                          <td>{faq.question}</td>
                          <td>{faq.answer}</td>
                          <td>{faq.category}</td>
                          <td>
                            <span className={faq.published ? "badge badge-soft-success" : "badge badge-soft-danger"}>{faq.published ? "PUBLISHED" : "OFFLINE"}</span>
                          </td>
                          <td>
                            {
                              loadingIndex == faq.id
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
                                        data-bs-target="#edit-faq"
                                        onClick={() => {
                                          setEditFAQFormData({
                                            id: faq.id,
                                            question: faq.question,
                                            answer: faq.answer,
                                            category: faq.category,
                                            published: faq.published ? "true" : "false",
                                          });
                                        }}
                                      >
                                        Edit FAQ
                                      </a>

                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#" onClick={() => deleteFAQ(faq.id)}>
                                        Delete FAQ
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

      <div className="modal fade" id="add-faq" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">New FAQ</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddFAQSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Question:</label>
                  <input type="text" className="form-control" name="question" value={addFAQFormData.question} onChange={handleAddFAQChange} required maxLength={255} />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Answer:</label>
                  <textarea className="form-control" name="answer" value={addFAQFormData.answer} onChange={handleAddFAQChange} required maxLength={500}></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category:</label>
                  <select className="form-control" name="category" value={addFAQFormData.category} onChange={handleAddFAQChange}>
                    <option value="account">Account</option>
                    <option value="security">Security</option>
                    <option value="payments">Payments</option>
                    <option value="properties">Properties</option>
                  </select>
                </div>
                <div className="mb-3">
                  {addFAQError && <div className="alert alert-danger">{addFAQError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingAddFAQ}>
                  {loadingAddFAQ ? (
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

      <div id="edit-faq" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none", }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="varyingcontentModalLabel">Edit FAQ</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleEditFAQSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <input name="id" value={editFAQFormData.id} hidden onChange={handleEditFAQChange} required />
                  <label className="col-form-label">Question:</label>
                  <input type="text" className="form-control" name="question" value={editFAQFormData.question} onChange={handleEditFAQChange} maxLength={255} required />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Answer:</label>
                  <textarea className="form-control" name="answer" onChange={handleEditFAQChange} value={editFAQFormData.answer} required maxLength={500}></textarea>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category:</label>
                  <select className="form-control" name="category" onChange={handleEditFAQChange} value={editFAQFormData.category}>
                    <option value="account">Account</option>
                    <option value="security">Security</option>
                    <option value="payments">Payments</option>
                    <option value="properties">Properties</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Status:</label>
                  <select className="form-control" name="published" value={editFAQFormData.published} onChange={handleEditFAQChange}>
                    <option value="true">Publish</option>
                    <option value="false">Offline</option>
                  </select>
                </div>
                <div className="mb-3">
                  {editFAQError && <div className="alert alert-danger">{editFAQError}</div>} {/* Show error message if any */}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-dark" disabled={loadingEditFAQ}>
                  {loadingEditFAQ ? (
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

export default ManageFAQPage;
