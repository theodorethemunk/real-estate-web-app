import React, { useState } from "react";
import { IUserProfile } from "../../models/interfaces/IUserProfile";

interface Props {
  userProfile: IUserProfile | null;
}

const UserBalanceComponent: React.FC<Props> = ({ userProfile }) => {
  const userCredit = userProfile?.credit || 0;
  const referralCode = userProfile?.refcode || "";
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      // navigator.clipboard api method'
      navigator.clipboard.writeText(referralCode).then(
        () => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
        },
        () => {
          alert("Failed to copy");
        }
      );
    } else {
      // text area method
      let textArea = document.createElement("textarea");
      textArea.value = referralCode;
      // Make the textarea out of viewport
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
      document.body.prepend(textArea);
      textArea.select();
      try {
        document.execCommand("copy") ? setCopySuccess(true) : alert("Failed to copy");
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        alert("Failed to copy");
      } finally {
        textArea.remove();
      }
    }
  };

  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Account Balance</h5>
        <p className="card-text display-4">₦{userCredit.toLocaleString()}</p>
        <div className="space48"></div>
        <div className="input-group mb-3">
          <input
          title="Referral Code"
            type="text"
            className="form-control text-center"
            value={referralCode}
            readOnly
          />
          <button className="btn btn-outline-secondary" onClick={copyToClipboard}>
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBalanceComponent;

