import React, { useEffect, useState } from "react";
import { UpdatePropertyOwnerAction } from "../../../services/dbservices/user/UpdatePropertyOwner";
import { getLoginSession } from "../../../services/session/UserLoginSession";
import { useNavigate } from "react-router-dom";

interface BuyPropertyProps {
  propertyName: string;
  propertyId: number;
  propertyPrice: number;
  isCompanyProperty: boolean;
}

declare const PaystackPop: any;

const BuyPropertyComponent: React.FC<BuyPropertyProps> = ({ propertyName, propertyId, propertyPrice, isCompanyProperty }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");
  const [refcode, setRefcode] = useState<string>("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const payWithPaystack = (email: string, userId: number, amount: number, publicKey: string) => {
    try {
      const handler = PaystackPop.setup({
        key: publicKey,
        email: email,
        amount: amount * 100,
        currency: "NGN",
        callback: function (response: any) {
          console.log("Payment successful", response);
          UpdatePropertyOwnerAction(propertyId, Number(userId), refcode).then((result) => {
            if (result === "success") {
              navigate("/myproperties");
            } else {
              setLoading(false);
              setErrors("Failed to process the transaction. Please try again.");
            }
          });
        },
        onClose: function () {
          setErrors("Transaction was cancelled.");
          setLoading(false);
        },
      });
      handler.openIframe();
    } catch (e) {
      setErrors("Failed to process the transaction. Please try again. " + e);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    if (!propertyId || propertyId < 1) {
      setErrors("Invalid property selected.");
      setLoading(false);
      return;
    }

    const userEmail = await getLoginSession("userEmail");
    if (!userEmail) {
      navigate("/signin");
      setLoading(false);
      return;
    }

    const userId = await getLoginSession("userId");
    if (!userId) {
      navigate("/signin");
      setLoading(false);
      return;
    }

    payWithPaystack(userEmail, Number(userId), propertyPrice, "pk_live_3f9a55db51c6af5233a0b0774489b401018b6366");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="details-siderbar2">
          <h4>Checkout</h4>
          <div className="space24"></div>

          <div className="personal-info">
            <div className="content">
              <p style={{ marginBottom: 20 }}>&#8226; &nbsp; {propertyName}</p>
              <p style={{ marginBottom: 20 }}>&#8226; &nbsp; Pay ₦{propertyPrice.toLocaleString()}</p>
            </div>
          </div>

          {/* Disclaimer Section */}
          {isCompanyProperty && (
            <div className="alert alert-warning" role="alert">
              <h5 className="alert-heading">Disclaimer</h5>
              <p className="mb-0">
                The property is not owned by Sommy Properties Limited. Due diligence is advised. Please contact a
                property lawyer and licensed surveyor before proceeding.
              </p>
            </div>
          )}
          

          {/* Referral Code Input */}
          <div className="input-area mt-4">
            <label className="form-label">
              <b>Referral Code (Optional)</b>
              <span
                style={{ marginLeft: 8, cursor: "pointer" }}
                onClick={() => alert("If you enter a valid referral code, your referrer will receive a bonus, and you will get a discount on your purchase.")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12z" />
                  <path d="m8.93 6.588-.066.325c-.1.464-.343.663-.588.663-.287 0-.465-.175-.465-.488 0-.249.084-.395.233-.566.218-.248.289-.38.289-.645 0-.47-.356-.827-.872-.827-.388 0-.706.175-.875.469-.102.175-.15.395-.12.616l.03.194H5.255l-.026-.19c-.054-.41.044-.882.274-1.232.283-.422.81-.66 1.366-.66.92 0 1.571.612 1.571 1.496 0 .337-.102.58-.367.91-.195.228-.243.33-.277.497zm-.312 3.546c0 .328-.27.566-.572.566-.303 0-.567-.238-.567-.566s.264-.572.567-.572c.302 0 .572.244.572.572z" />
                </svg>
              </span>
            </label>
            <input
              className="form-control mt-2"
              name="refcode"
              type="text"
              placeholder="Enter referral code"
              value={refcode}
              onChange={(e) => setRefcode(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {errors && (
            <div className="alert alert-danger mt-3" role="alert">
              {errors}
            </div>
          )}

          {/* Buy Button */}
          <div className="input-area mt-4">
            <button type="submit" className="btn btn-success w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                <>
                  Buy Property
                  <span className="ms-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BuyPropertyComponent;
