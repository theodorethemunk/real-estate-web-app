import React, { useEffect, useState } from "react";
import { IUserProfile } from "../../models/interfaces/IUserProfile";
import UpdateUserPersonalInfo from "../../services/dbservices/user/UpdateUserPersonalInfo";
import UpdateUserAddress from "../../services/dbservices/user/UpdateUserAddress";

interface Props {
  userProfile: IUserProfile | null;
}

const ManagePersonalInfoComponent: React.FC<Props> = ({ userProfile }) => {

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [errors1, setErrors1] = useState<string>("");
  const [errors2, setErrors2] = useState<string>("");

  const [formData1, setFormData1] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    phone: "",
    dob: "",
    nationality: "", 
    occupation: "",
    monthly_income: 0.00
  });

  const [formData2, setFormData2] = useState({
    company_name: "",
    zip_code: "",
    street_name: "",
    house_number: "",
    city: "",
    state: "",
    country: ""
  });

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
    setErrors1(""); // Clear errors when user types
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
    setErrors2(""); // Clear errors when user types
  };
  

  const validateForm1 = (): string => {
    if (!formData1.first_name || !formData1.middle_name || !formData1.last_name || !formData1.phone || !formData1.dob || !formData1.nationality || !formData1.occupation || !formData1.monthly_income) {
      return "All fields are required.";
    }
    
    return "";
  };

  const validateForm2 = (): string => {
    if (!formData2.company_name || !formData2.street_name || !formData2.house_number || !formData2.city || !formData2.state || !formData2.country) {
      return "All fields are required.";
    }
    
    return "";
  };

  useEffect(() => {
    setFormData1({
      first_name: userProfile!.first_name ?? "",
      middle_name: userProfile!.middle_name ?? "",
      last_name: userProfile!.last_name ?? "",
      gender: userProfile!.gender ?? "",
      phone: userProfile!.phone ?? "",
      dob: userProfile!.dob ?? "",
      nationality: userProfile!.nationality ?? "", 
      occupation: userProfile!.occupation ?? "",
      monthly_income: userProfile!.monthly_income ?? 0.00
    });

    setFormData2({
      company_name: userProfile!.company_name ?? "",
      zip_code: userProfile!.zip_code ?? "",
      street_name: userProfile!.street_name ?? "",
      house_number: userProfile!.house_number ?? "",
      city: userProfile!.city ?? "",
      state: userProfile!.state ?? "",
      country: userProfile!.country ?? ""
    });
  }, []);

  const handleSubmit1 = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading1(true);
  
    const validationError = validateForm1();
    if (validationError) {
      setLoading1(false);
      setErrors1(validationError);
      return;
    }
  
    const response = await UpdateUserPersonalInfo({
      first_name: formData1.first_name,
      middle_name: formData1.middle_name,
      last_name: formData1.last_name,
      gender: formData1.gender,
      phone: formData1.phone ?? "",
      dob: formData1.dob,
      nationality: formData1.nationality,
      occupation: formData1.occupation ?? "",
      monthly_income: formData1.monthly_income ?? 0,
      id: userProfile!.id
    });
    
    if (response !== "success") {
      setErrors1(response);
    }

    setLoading1(false);
  };  

  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading2(true);
  
    const validationError = validateForm2();
    if (validationError) {
      setLoading2(false);
      setErrors2(validationError);
      return;
    }
  
    const response = await UpdateUserAddress({
      company_name: formData2.company_name ?? "",
      zip_code: formData2.zip_code ?? "",
      street_name: formData2.street_name,
      house_number: formData2.house_number,
      city: formData2.city,
      state: formData2.state,
      country: formData2.country,
      id: userProfile!.id
    });
    
    if (response !== "success") {
      setErrors2(response);
    }

    setLoading2(false);
  };  

  return (
    <>
<form onSubmit={handleSubmit1}>
    <div className="personal-info-area">
            <h2>Personal Information</h2>
            <div className="space28"></div>
            <div className="input-area">
              <h5>Email Address <span className="text-success">✅</span></h5>
              <div className="space16"></div>
              <input type="text" placeholder="Email Address" value={userProfile?.email} disabled/>
            </div>
            <div className="space28"></div>            
            <div className="row">
            <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>First Name*</h5>
                  <div className="space16"></div>
                  <input type="text" name="first_name" required value={formData1.first_name} onChange={handleChange1} placeholder="Enter your first name"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Middle Name*</h5>
                  <div className="space16"></div>
                  <input type="text" name="middle_name" required value={formData1.middle_name} onChange={handleChange1} placeholder="Enter your middle name"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Last Name*</h5>
                  <div className="space16"></div>
                  <input type="text" name="last_name" required value={formData1.last_name} onChange={handleChange1} placeholder="Enter your last name"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Gender</h5>
                  <div className="space16"></div>
                  <select className="form-control" name="gender" value={formData1.gender} onChange={handleChange1} style={{height: 50}}>
                    <option>Male</option>
                    <option>Female</option>
                  </select>  
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Phone Number*</h5>
                  <div className="space16"></div>
                  <input inputMode="numeric" type="text" value={formData1.phone} onChange={handleChange1} name="phone" placeholder="Enter your phone number"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Date Of Birth*</h5>
                  <div className="space16"></div>
                  <input type="date" name="dob" required value={formData1.dob} onChange={handleChange1}/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Nationality*</h5>
                  <div className="space16"></div>
                  <select className="form-control" name="nationality" value={formData1.nationality} onChange={handleChange1} style={{height: 50}}>
                    <option value="afghan">Afghan</option>
                    <option value="albanian">Albanian</option>
                    <option value="algerian">Algerian</option>
                    <option value="american">American</option>
                    <option value="andorran">Andorran</option>
                    <option value="angolan">Angolan</option>
                    <option value="antiguans">Antiguans</option>
                    <option value="argentinean">Argentinean</option>
                    <option value="armenian">Armenian</option>
                    <option value="australian">Australian</option>
                    <option value="austrian">Austrian</option>
                    <option value="azerbaijani">Azerbaijani</option>
                    <option value="bahamian">Bahamian</option>
                    <option value="bahraini">Bahraini</option>
                    <option value="bangladeshi">Bangladeshi</option>
                    <option value="barbadian">Barbadian</option>
                    <option value="barbudans">Barbudans</option>
                    <option value="batswana">Batswana</option>
                    <option value="belarusian">Belarusian</option>
                    <option value="belgian">Belgian</option>
                    <option value="belizean">Belizean</option>
                    <option value="beninese">Beninese</option>
                    <option value="bhutanese">Bhutanese</option>
                    <option value="bolivian">Bolivian</option>
                    <option value="bosnian">Bosnian</option>
                    <option value="brazilian">Brazilian</option>
                    <option value="british">British</option>
                    <option value="bruneian">Bruneian</option>
                    <option value="bulgarian">Bulgarian</option>
                    <option value="burkinabe">Burkinabe</option>
                    <option value="burmese">Burmese</option>
                    <option value="burundian">Burundian</option>
                    <option value="cambodian">Cambodian</option>
                    <option value="cameroonian">Cameroonian</option>
                    <option value="canadian">Canadian</option>
                    <option value="cape verdean">Cape Verdean</option>
                    <option value="central african">Central African</option>
                    <option value="chadian">Chadian</option>
                    <option value="chilean">Chilean</option>
                    <option value="chinese">Chinese</option>
                    <option value="colombian">Colombian</option>
                    <option value="comoran">Comoran</option>
                    <option value="congolese">Congolese</option>
                    <option value="costa rican">Costa Rican</option>
                    <option value="croatian">Croatian</option>
                    <option value="cuban">Cuban</option>
                    <option value="cypriot">Cypriot</option>
                    <option value="czech">Czech</option>
                    <option value="danish">Danish</option>
                    <option value="djibouti">Djibouti</option>
                    <option value="dominican">Dominican</option>
                    <option value="dutch">Dutch</option>
                    <option value="east timorese">East Timorese</option>
                    <option value="ecuadorean">Ecuadorean</option>
                    <option value="egyptian">Egyptian</option>
                    <option value="emirian">Emirian</option>
                    <option value="equatorial guinean">Equatorial Guinean</option>
                    <option value="eritrean">Eritrean</option>
                    <option value="estonian">Estonian</option>
                    <option value="ethiopian">Ethiopian</option>
                    <option value="fijian">Fijian</option>
                    <option value="filipino">Filipino</option>
                    <option value="finnish">Finnish</option>
                    <option value="french">French</option>
                    <option value="gabonese">Gabonese</option>
                    <option value="gambian">Gambian</option>
                    <option value="georgian">Georgian</option>
                    <option value="german">German</option>
                    <option value="ghanaian">Ghanaian</option>
                    <option value="greek">Greek</option>
                    <option value="grenadian">Grenadian</option>
                    <option value="guatemalan">Guatemalan</option>
                    <option value="guinea-bissauan">Guinea-Bissauan</option>
                    <option value="guinean">Guinean</option>
                    <option value="guyanese">Guyanese</option>
                    <option value="haitian">Haitian</option>
                    <option value="herzegovinian">Herzegovinian</option>
                    <option value="honduran">Honduran</option>
                    <option value="hungarian">Hungarian</option>
                    <option value="icelander">Icelander</option>
                    <option value="indian">Indian</option>
                    <option value="indonesian">Indonesian</option>
                    <option value="iranian">Iranian</option>
                    <option value="iraqi">Iraqi</option>
                    <option value="irish">Irish</option>
                    <option value="israeli">Israeli</option>
                    <option value="italian">Italian</option>
                    <option value="ivorian">Ivorian</option>
                    <option value="jamaican">Jamaican</option>
                    <option value="japanese">Japanese</option>
                    <option value="jordanian">Jordanian</option>
                    <option value="kazakhstani">Kazakhstani</option>
                    <option value="kenyan">Kenyan</option>
                    <option value="kittian and nevisian">Kittian and Nevisian</option>
                    <option value="kuwaiti">Kuwaiti</option>
                    <option value="kyrgyz">Kyrgyz</option>
                    <option value="laotian">Laotian</option>
                    <option value="latvian">Latvian</option>
                    <option value="lebanese">Lebanese</option>
                    <option value="liberian">Liberian</option>
                    <option value="libyan">Libyan</option>
                    <option value="liechtensteiner">Liechtensteiner</option>
                    <option value="lithuanian">Lithuanian</option>
                    <option value="luxembourger">Luxembourger</option>
                    <option value="macedonian">Macedonian</option>
                    <option value="malagasy">Malagasy</option>
                    <option value="malawian">Malawian</option>
                    <option value="malaysian">Malaysian</option>
                    <option value="maldivan">Maldivan</option>
                    <option value="malian">Malian</option>
                    <option value="maltese">Maltese</option>
                    <option value="marshallese">Marshallese</option>
                    <option value="mauritanian">Mauritanian</option>
                    <option value="mauritian">Mauritian</option>
                    <option value="mexican">Mexican</option>
                    <option value="micronesian">Micronesian</option>
                    <option value="moldovan">Moldovan</option>
                    <option value="monacan">Monacan</option>
                    <option value="mongolian">Mongolian</option>
                    <option value="moroccan">Moroccan</option>
                    <option value="mosotho">Mosotho</option>
                    <option value="motswana">Motswana</option>
                    <option value="mozambican">Mozambican</option>
                    <option value="namibian">Namibian</option>
                    <option value="nauruan">Nauruan</option>
                    <option value="nepalese">Nepalese</option>
                    <option value="new zealander">New Zealander</option>
                    <option value="ni-vanuatu">Ni-Vanuatu</option>
                    <option value="nicaraguan">Nicaraguan</option>
                    <option value="Nigerian">Nigerian</option>
                    <option value="north korean">North Korean</option>
                    <option value="northern irish">Northern Irish</option>
                    <option value="norwegian">Norwegian</option>
                    <option value="omani">Omani</option>
                    <option value="pakistani">Pakistani</option>
                    <option value="palauan">Palauan</option>
                    <option value="panamanian">Panamanian</option>
                    <option value="papua new guinean">Papua New Guinean</option>
                    <option value="paraguayan">Paraguayan</option>
                    <option value="peruvian">Peruvian</option>
                    <option value="polish">Polish</option>
                    <option value="portuguese">Portuguese</option>
                    <option value="qatari">Qatari</option>
                    <option value="romanian">Romanian</option>
                    <option value="russian">Russian</option>
                    <option value="rwandan">Rwandan</option>
                    <option value="saint lucian">Saint Lucian</option>
                    <option value="salvadoran">Salvadoran</option>
                    <option value="samoan">Samoan</option>
                    <option value="san marinese">San Marinese</option>
                    <option value="sao tomean">Sao Tomean</option>
                    <option value="saudi">Saudi</option>
                    <option value="scottish">Scottish</option>
                    <option value="senegalese">Senegalese</option>
                    <option value="serbian">Serbian</option>
                    <option value="seychellois">Seychellois</option>
                    <option value="sierra leonean">Sierra Leonean</option>
                    <option value="singaporean">Singaporean</option>
                    <option value="slovakian">Slovakian</option>
                    <option value="slovenian">Slovenian</option>
                    <option value="solomon islander">Solomon Islander</option>
                    <option value="somali">Somali</option>
                    <option value="south african">South African</option>
                    <option value="south korean">South Korean</option>
                    <option value="spanish">Spanish</option>
                    <option value="sri lankan">Sri Lankan</option>
                    <option value="sudanese">Sudanese</option>
                    <option value="surinamer">Surinamer</option>
                    <option value="swazi">Swazi</option>
                    <option value="swedish">Swedish</option>
                    <option value="swiss">Swiss</option>
                    <option value="syrian">Syrian</option>
                    <option value="taiwanese">Taiwanese</option>
                    <option value="tajik">Tajik</option>
                    <option value="tanzanian">Tanzanian</option>
                    <option value="thai">Thai</option>
                    <option value="togolese">Togolese</option>
                    <option value="tongan">Tongan</option>
                    <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                    <option value="tunisian">Tunisian</option>
                    <option value="turkish">Turkish</option>
                    <option value="tuvaluan">Tuvaluan</option>
                    <option value="ugandan">Ugandan</option>
                    <option value="ukrainian">Ukrainian</option>
                    <option value="uruguayan">Uruguayan</option>
                    <option value="uzbekistani">Uzbekistani</option>
                    <option value="venezuelan">Venezuelan</option>
                    <option value="vietnamese">Vietnamese</option>
                    <option value="welsh">Welsh</option>
                    <option value="yemenite">Yemenite</option>
                    <option value="zambian">Zambian</option>
                    <option value="zimbabwean">Zimbabwean</option>
                  </select> 
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Occupation</h5>
                  <div className="space16"></div>
                  <input type="text" name="occupation" value={formData1.occupation} onChange={handleChange1} placeholder="What do you do for a living?"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Monthly Income (USD)*</h5>
                  <div className="space16"></div>
                  <input inputMode="numeric" name="monthly_income" value={formData1.monthly_income} onChange={handleChange1} type="text" placeholder="Earnings per month?"/>
                </div>
              </div>
              <div className="space10"></div>
                  <div className="input-area">
                    {errors1 && <p style={{ color: "red" }}>{errors1}</p>}
                  </div>
                  <div className="space10"></div>
              <div className="col-lg-12">
                <div className="space32"></div>
                <div className="btn-area1">
                <button className="theme-btn1">
                  {loading1 ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                <>
                  Save Changes
                  <span className="arrow1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                  <span className="arrow2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                </>
              )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>

          <div className="space48"></div>

          <form onSubmit={handleSubmit2}>
          <div className="personal-info-area">
            <h2>Address</h2>
            <div className="space28"></div>
            <div className="input-area">
              <h5>Company Name</h5>
              <div className="space16"></div>
              <input type="text" placeholder="Enter your company name" name="company_name" value={formData2.company_name} onChange={handleChange2}/>
            </div>
            <div className="space28"></div>            
            <div className="row">
            <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Zip Code</h5>
                  <div className="space16"></div>
                  <input name="zip_code" type="text" value={formData2.zip_code} onChange={handleChange2} placeholder="Enter your zip code"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Street Name*</h5>
                  <div className="space16"></div>
                  <input name="street_name" type="text" required value={formData2.street_name} onChange={handleChange2} placeholder="Enter your street name"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>House Number*</h5>
                  <div className="space16"></div>
                  <input name="house_number" type="text" inputMode="numeric"required value={formData2.house_number} onChange={handleChange2} placeholder="Enter your house number"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>City*</h5>
                  <div className="space16"></div>
                  <input name="city" type="text" required value={formData2.city} onChange={handleChange2} placeholder="Enter your city"/>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>State*</h5>
                  <div className="space16"></div>
                  <input name="state" type="text" required value={formData2.state} onChange={handleChange2} placeholder="Enter your state"/>  
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="space28"></div>
                <div className="input-area">
                  <h5>Country*</h5>
                  <div className="space16"></div>
                  <select name="country" className="form-control" value={formData2.country} onChange={handleChange2} style={{height: 50}}>
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
              </div>
              <div className="space10"></div>
                  <div className="input-area">
                    {errors2 && <p style={{ color: "red" }}>{errors2}</p>}
                  </div>
                  <div className="space10"></div>
              <div className="col-lg-12">
                <div className="space32"></div>
                <div className="btn-area1">
                  <button className="theme-btn1">
                  {loading2 ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                <>
                  Save Changes
                  <span className="arrow1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                  <span className="arrow2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12 13H4V11H12V4L20 12L12 20V13Z"></path>
                    </svg>
                  </span>
                </>
              )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
    </>
  );
};

export default ManagePersonalInfoComponent;
