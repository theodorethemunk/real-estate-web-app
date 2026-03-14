import { useEffect, useState } from "react";
import { ICareerApplication } from "../../models/interfaces/ICareerApplication";
import { fetchCareerApplications } from "../../services/dbservices/admin/careers/career-applications/fetchCareerApplications";
import { approveCareerApplicationAction } from "../../services/dbservices/admin/careers/career-applications/approveCareerApplications";
import { copyToClipboard } from "../../services/Util/CopyText";
import { dateToWords } from "../../services/Util/ConvertDateToWords";
import { deleteCareerApplicationAction } from "../../services/dbservices/admin/careers/career-applications/deleteCareerApplications";
import { rejectCareerApplicationAction } from "../../services/dbservices/admin/careers/career-applications/rejectCareerApplications";

const ManageCareersPage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [careerApplications, setCareerApplications] = useState<ICareerApplication[]>([]);
    const [searchKeyword, setSearchKeyword] = useState(String);
  
    useEffect(() => {
      getCareerApplications();
    }, [searchKeyword]);
  
    const getCareerApplications = async () => {
      setLoading(true);
      await refreshPage();
      setLoading(false);
    };

    const approveCareerApplication = async (application_id: number) => {
      setLoadingIndex(application_id);
      await approveCareerApplicationAction(application_id);
      await refreshPage();
      setLoadingIndex(0);
    };

    const rejectCareerApplication = async (application_id: number) => {
      setLoadingIndex(application_id);
      await rejectCareerApplicationAction(application_id);
      await refreshPage();
      setLoadingIndex(0);
    };

    const deleteCareerApplication = async (application_id: number) => {
      setLoadingIndex(application_id);
      await deleteCareerApplicationAction(application_id);
      await refreshPage();
      setLoadingIndex(0);
    }

    const refreshPage = async () =>{
      const fetchedData = await fetchCareerApplications(searchKeyword);
      setCareerApplications(fetchedData);
    }

  return (
    <div className="row">
          <div className="col-lg-12">
            <div className="card" id="invoiceList">
              <div className="card-header border-0 d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Career Applications</h5>
              </div>
    
              {/* Search Input */}
              <div className="card-body p-0 border-bottom border-bottom-dashed">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search border-0 py-3"
                    placeholder="Search for applications..."
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
                  ) : careerApplications.length === 0 ? (
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
                          <th>Name</th>
                          <th>Contact</th>
                          <th>Gender</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="mb-5">
                        {careerApplications.map((careerApplication, index) => (
                          <tr key={careerApplication.id}>
                            <td>{index + 1}.</td>
                            <td>{careerApplication.full_name}</td>
                            <td>{careerApplication.email}<br />{careerApplication.country_code} {careerApplication.phone}</td>
                            <td>
                              {careerApplication.gender == "m" ? "Male" : careerApplication.gender == "n/a" ? "n/a" : "Female"}
                            </td>
                            <td>
                              <span className={careerApplication.status == "approved" ? "badge badge-soft-success" : careerApplication.status == "pending" ? "badge badge-soft-warning" : "badge badge-soft-danger"}>{careerApplication.status?.toUpperCase()}</span>
                              <br />
                              Last-Updated: {dateToWords(careerApplication.updated_on?.toString() ?? "")}
                            </td>
                            <td>
                              {
                                loadingIndex == careerApplication.id
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
                                        <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target={`#view-more-info-${careerApplication.id}`}>
                                          More Info
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href={careerApplication.cv_file_path} target="_blank">
                                          View CV (Resume)
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" onClick={() => copyToClipboard(careerApplication.email ?? "", "Email Address")}>
                                          Copy Email
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          href="#"
                                          onClick={() => copyToClipboard(`${careerApplication.country_code ?? ""}${careerApplication.phone ?? ""}`, "Phone Number")}
                                        >
                                          Copy Phone Number
                                        </a>
                                      </li>    
                                      <li>
                                        <a className="dropdown-item" href="#" onClick={() => approveCareerApplication(careerApplication.id)}>
                                          Approve Application
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" onClick={() => rejectCareerApplication(careerApplication.id)}>
                                          Reject Application
                                        </a>
                                      </li>
                                      <li>
                                        <a className="dropdown-item" href="#" onClick={() => deleteCareerApplication(careerApplication.id)}>
                                          Delete Application
                                        </a>
                                      </li>
                                    </ul>
                                    {/* Modal */}
                                    <div id={`view-more-info-${careerApplication.id}`} className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none", }}>
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="myModalLabel">{careerApplication.full_name}'s Resume</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                                          </div>
                                          <div className="modal-body">
                                            <h5 className="fs-15">
                                              Address
                                            </h5>
                                            <p className="text-muted">
                                              {careerApplication.address}
                                            </p>
                                            <h5 className="fs-15">
                                              Career Applied For
                                            </h5>
                                            <p className="text-muted">
                                              {careerApplication.career}
                                            </p>
                                            <h5 className="fs-15">
                                              About Career
                                            </h5>
                                            <p className="text-muted">
                                              {careerApplication.about_career}
                                            </p>
                                            <h5 className="fs-15">
                                              Proposed Salary                                            
                                            </h5>
                                            <p className="text-muted">
                                              {careerApplication.salary?.toLocaleString()} Naira
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

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
  );
};

export default ManageCareersPage;
