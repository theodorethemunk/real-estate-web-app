import { useEffect, useState } from "react";
import { ISettings } from "../../models/interfaces/ISettings";
import Swal from "sweetalert2";
import { saveSettingsAction } from "../../services/dbservices/admin/settings/saveSettings";
import { fetchSettings } from "../../services/dbservices/admin/settings/fetchSettings";

const SettingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingIndex, setLoadingIndex] = useState<number>(0);
  const [settings, setSettings] = useState<ISettings[]>([]);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    setLoading(true);
    await refreshPage();
    setLoading(false);
  };

  const refreshPage = async () => {
    const fetchedData = await fetchSettings();
    setSettings(fetchedData);
  };

  const saveSettings = async (id: number, value: string) => {
    if (!value || value.length < 1) {
      return;
    }

    try {
      setLoadingIndex(id);
      await saveSettingsAction(id, value);

      // Show success modal
      Swal.fire({
        icon: "success",
        title: "Congratulations!",
        text: "Settings saved successfully.",
      });

      // Refresh settings
      refreshPage();
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setLoadingIndex(0);
    }
  };

  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="live-preview">
                  {loading ? (
                    <div className="text-center mt-5 mb-5 d-flex justify-content-center align-items-center gap-2">
                      <div className="spinner-border text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                      <h5 className="mb-0">Fetching settings...</h5>
                    </div>
                  ) : (
                    <ul className="list-group">
                      {settings.map((setting, index) => (
                        <li
                          key={setting.id}
                          className="list-group-item"
                          style={{ marginBottom: "20px" }}
                        >
                          <div>
                            <div className="card-header align-items-center d-flex">
                              <h3 className="card-title mb-0 flex-grow-1">
                                {index + 1}. {setting.name}
                              </h3>
                            </div>

                            <div
                              className="alert alert-dark alert-dismissible alert-label-icon rounded-label fade show mt-2"
                              role="alert"
                            >
                              <i className="ri-error-warning-line label-icon"></i>
                              <strong>{setting.about}</strong>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                              ></button>
                            </div>

                            <div className="input-group">
                              {setting.data_type === "boolean" ? (
                                <select
                                  className="form-select"
                                  value={
                                    setting.context === "true"
                                      ? "true"
                                      : "false"
                                  }
                                  onChange={(e) => {
                                    const updatedSettings = [...settings];
                                    updatedSettings[index].context =
                                      e.target.value;
                                    setSettings(updatedSettings);
                                  }}
                                >
                                  <option value="true">true</option>
                                  <option value="false">false</option>
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  className="form-control"
                                  value={setting.context}
                                  onChange={(e) => {
                                    const updatedSettings = [...settings];
                                    updatedSettings[index].context =
                                      e.target.value;
                                    setSettings(updatedSettings);
                                  }}
                                />
                              )}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() =>
                                  saveSettings(
                                    setting.id,
                                    setting.context ?? ""
                                  )
                                }
                                disabled={loadingIndex === setting.id}
                              >
                                {loadingIndex === setting.id ? (
                                  <div className="d-flex align-items-center">
                                    <span
                                      className="spinner-border spinner-border-sm text-white"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    &nbsp;Saving...
                                  </div>
                                ) : (
                                  "Save Changes"
                                )}
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
