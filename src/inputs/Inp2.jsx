import React, { useState , useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { next, add } from './reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/inp2.module.css';
import google from '../imgs/search.png';
import fcb from '../imgs/facebook.png';
import x from '../imgs/twitter.png';
import Load from '../imgs/Double Ring-1.8s-200px.gif'

const Inp2 = () => {


     const [pay, setPay] = useState('');
     const [fname, setfname] = useState('');
     const [lname, setlname] = useState('');
     const [mail, setmail] = useState('');
     const [passwd, setpasswd] = useState('');
     const [cpasswd, setCpasswd] = useState('');
     const [show, setShow] = useState(true);
     const [fname_error, setfname_error] = useState('')
     const [lname_error, setlname_error] = useState('')
     const [email_error, setemail_error] = useState('');
     const [passwd_error, setpasswd_error] = useState('');
     const [cpasswd_error, setcpasswd_error] = useState('');
     const [country_error, setcountry_error] = useState('');
     const [loading, setLoading] = useState(false);

     const validateEmail = (mail) => {
          return String(mail)
               .toLowerCase()
               .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
               );
     };



     function ValidatePassword() {
          if (passwd.length < 8) {
               return 'Your password must be at least 8 characters';
          }
          if (passwd.search(/[a-z]/i) < 0) {
               return 'Your password must contain at least one letter.';
          }
          if (passwd.search(/[0-9]/) < 0) {
               return 'Your password must contain at least one digit.';
          }
          return true;
     }

     const dispatch = useDispatch();

     const first_name = (e) => {
          setfname(e.target.value);
          setfname_error('')
     };
     const last_name = (e) => {
          setlname(e.target.value);
          setlname_error('')
     };
     const email = (e) => {
          setmail(e.target.value);
          setemail_error('')
     };
     const password = (e) => {
          setpasswd(e.target.value);
          setpasswd_error('')
     };
     const cpassword = (e) => {
          setCpasswd(e.target.value);
          setcpasswd_error('')
     };
     const country = (e) => {
          setPay(e.target.value);
          setShow(true);

          setcountry_error('')
     };
     const handleCountryClick = (e) => {
          setPay(e.target.textContent);
          setShow(false);
     };

     const validation_emptiness = () => {
          if (fname.length === 0) {
               setfname_error('first name filed is empty')
          }
          if (lname.length === 0) {
               setlname_error('last name filed is empty')
          }
          if (email.length === 0) {
               setemail_error('email filed is empty')
          }
          if (passwd.length === 0) {
               setpasswd_error('password filed is empty')
          }
          if (cpasswd.length === 0) {
               setcpasswd_error('confirmation password filed is empty')
          } if (pay.length === 0) {
               setcountry_error('country filed is empty')
          }
     }

     const handlenext = async () => {



          setfname_error('')
          setlname_error('')
          setemail_error('')
          setpasswd_error('')
          setcpasswd_error('')
          setcountry_error('')

          validation_emptiness()

          if (validateEmail(mail) === null) {
               setemail_error('you have entered an invalid email address');
          } else if (ValidatePassword() !== true) {
               setpasswd_error(ValidatePassword());
          } else if (passwd !== cpasswd) {
               setcpasswd_error('confirmation password is incorrect');
          } else {
               setLoading(true);
               try {
                    const dataToSend = {
                         email: mail,
                    };

                    const response = await axios.post(
                         'http://127.0.0.1:8000/api/verifyemail',
                         dataToSend
                    );

                    if (response.data.exists) {
                         setemail_error('you have entered an email address already');
                    } else {
                         // User does not exist, continue with registration
                         console.log(response.data);
                         dispatch(add('first_name', fname));
                         dispatch(add('last_name', lname));
                         dispatch(add('email', mail));
                         dispatch(add('password', passwd));
                         dispatch(add('country', pay));
                         dispatch(next());
                    }
               } catch (error) {
                    console.error('Error sending data:', error);
                    throw error;

               } finally {
                    setLoading(false);
               }

          }
     };

     const countryList = [
          "Afghanistan",
          "Åland Islands",
          "Albania",
          "Algeria",
          "American Samoa",
          "Andorra",
          "Angola",
          "Anguilla",
          "Antarctica",
          "Antigua and Barbuda",
          "Argentina",
          "Armenia",
          "Aruba",
          "Australia",
          "Austria",
          "Azerbaijan",
          "Bahamas (the)",
          "Bahrain",
          "Bangladesh",
          "Barbados",
          "Belarus",
          "Belgium",
          "Belize",
          "Benin",
          "Bermuda",
          "Bhutan",
          "Bolivia (Plurinational State of)",
          "Bonaire, Sint Eustatius and Saba",
          "Bosnia and Herzegovina",
          "Botswana",
          "Bouvet Island",
          "Brazil",
          "British Indian Ocean Territory (the)",
          "Brunei Darussalam",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Cabo Verde",
          "Cambodia",
          "Cameroon",
          "Canada",
          "Cayman Islands (the)",
          "Central African Republic (the)",
          "Chad",
          "Chile",
          "China",
          "Christmas Island",
          "Cocos (Keeling) Islands (the)",
          "Colombia",
          "Comoros (the)",
          "Congo (the Democratic Republic of the)",
          "Congo (the)",
          "Cook Islands (the)",
          "Costa Rica",
          "Croatia",
          "Cuba",
          "Curaçao",
          "Cyprus",
          "Czechia",
          "Côte d'Ivoire",
          "Denmark",
          "Djibouti",
          "Dominica",
          "Dominican Republic (the)",
          "Ecuador",
          "Egypt",
          "El Salvador",
          "Equatorial Guinea",
          "Eritrea",
          "Estonia",
          "Eswatini",
          "Ethiopia",
          "Falkland Islands (the) [Malvinas]",
          "Faroe Islands (the)",
          "Fiji",
          "Finland",
          "France",
          "French Guiana",
          "French Polynesia",
          "French Southern Territories (the)",
          "Gabon",
          "Gambia (the)",
          "Georgia",
          "Germany",
          "Ghana",
          "Gibraltar",
          "Greece",
          "Greenland",
          "Grenada",
          "Guadeloupe",
          "Guam",
          "Guatemala",
          "Guernsey",
          "Guinea",
          "Guinea-Bissau",
          "Guyana",
          "Haiti",
          "Heard Island and McDonald Islands",
          "Holy See (the)",
          "Honduras",
          "Hong Kong",
          "Hungary",
          "Iceland",
          "India",
          "Indonesia",
          "Iran (Islamic Republic of)",
          "Iraq",
          "Ireland",
          "Isle of Man",
          "Israel",
          "Italy",
          "Jamaica",
          "Japan",
          "Jersey",
          "Jordan",
          "Kazakhstan",
          "Kenya",
          "Kiribati",
          "Korea (the Democratic People's Republic of)",
          "Korea (the Republic of)",
          "Kuwait",
          "Kyrgyzstan",
          "Lao People's Democratic Republic (the)",
          "Latvia",
          "Lebanon",
          "Lesotho",
          "Liberia",
          "Libya",
          "Liechtenstein",
          "Lithuania",
          "Luxembourg",
          "Macao",
          "Madagascar",
          "Malawi",
          "Malaysia",
          "Maldives",
          "Mali",
          "Malta",
          "Marshall Islands (the)",
          "Martinique",
          "Mauritania",
          "Mauritius",
          "Mayotte",
          "Mexico",
          "Micronesia (Federated States of)",
          "Moldova (the Republic of)",
          "Monaco",
          "Mongolia",
          "Montenegro",
          "Montserrat",
          "Morocco",
          "Mozambique",
          "Myanmar",
          "Namibia",
          "Nauru",
          "Nepal",
          "Netherlands (the)",
          "New Caledonia",
          "New Zealand",
          "Nicaragua",
          "Niger (the)",
          "Nigeria",
          "Niue",
          "Norfolk Island",
          "Northern Mariana Islands (the)",
          "Norway",
          "Oman",
          "Pakistan",
          "Palau",
          "Palestine, State of",
          "Panama",
          "Papua New Guinea",
          "Paraguay",
          "Peru",
          "Philippines (the)",
          "Pitcairn",
          "Poland",
          "Portugal",
          "Puerto Rico",
          "Qatar",
          "Republic of North Macedonia",
          "Romania",
          "Russian Federation (the)",
          "Rwanda",
          "Réunion",
          "Saint Barthélemy",
          "Saint Helena, Ascension and Tristan da Cunha",
          "Saint Kitts and Nevis",
          "Saint Lucia",
          "Saint Martin (French part)",
          "Saint Pierre and Miquelon",
          "Saint Vincent and the Grenadines",
          "Samoa",
          "San Marino",
          "Sao Tome and Principe",
          "Saudi Arabia",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leone",
          "Singapore",
          "Sint Maarten (Dutch part)",
          "Slovakia",
          "Slovenia",
          "Solomon Islands",
          "Somalia",
          "South Africa",
          "South Georgia and the South Sandwich Islands",
          "South Sudan",
          "Spain",
          "Sri Lanka",
          "Sudan (the)",
          "Suriname",
          "Svalbard and Jan Mayen",
          "Sweden",
          "Switzerland",
          "Syrian Arab Republic",
          "Taiwan (Province of China)",
          "Tajikistan",
          "Tanzania, United Republic of",
          "Thailand",
          "Timor-Leste",
          "Togo",
          "Tokelau",
          "Tonga",
          "Trinidad and Tobago",
          "Tunisia",
          "Turkey",
          "Turkmenistan",
          "Turks and Caicos Islands (the)",
          "Tuvalu",
          "Uganda",
          "Ukraine",
          "United Arab Emirates (the)",
          "United Kingdom of Great Britain and Northern Ireland (the)",
          "United States Minor Outlying Islands (the)",
          "United States of America (the)",
          "Uruguay",
          "Uzbekistan",
          "Vanuatu",
          "Venezuela (Bolivarian Republic of)",
          "Viet Nam",
          "Virgin Islands (British)",
          "Virgin Islands (U.S.)",
          "Wallis and Futuna",
          "Western Sahara",
          "Yemen",
          "Zambia",
          "Zimbabwe"
        ];
     return (
          <div className={styles.ctn}>
               {loading && (
                    <div className={styles.bodyforload}>
                         <img src={Load} alt="this slowpoke moves" width="80" />
                    </div>
               )}
               <h1>SIGN UP</h1>
               <div className={styles.fname}>
                    <div>
                         <input
                              className={styles.input1}
                              type="text"
                              id="firstName"
                              name="firstName"
                              required
                              onChange={first_name}
                              placeholder="First Name"
                         />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{fname_error}</p>
                    </div>
                    <div>
                         <input
                              className={styles.input1}
                              type="text"
                              id="lastName"
                              name="lastName"
                              required
                              onChange={last_name}
                              placeholder="Last Name"
                         />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{lname_error}</p>
                    </div>
               </div>
               <div className={styles.other}>
                    <div>
                         <input
                              className={styles.input1}
                              type="email"
                              id="email"
                              name="email"
                              required
                              onChange={email}
                              placeholder="Email"
                         />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{email_error}</p>
                    </div>
                    <div>
                         <input
                              className={styles.input1}
                              type="password"
                              id="password1"
                              name="password"
                              required
                              onChange={password}
                              placeholder="Password"
                         />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{passwd_error}</p>
                    </div>
                    <div>
                         <input
                              className={styles.input1}
                              type="password"
                              id="password2"
                              name="password"
                              required
                              onChange={cpassword}
                              placeholder="Confirm Password *"
                         />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{cpasswd_error}</p>
                    </div>
                    <div className={styles.countriesdiv}>
                         <input
                              className={styles.inputcourtry}
                              type="text"
                              id="country"
                              name="country"
                              onChange={country}
                              placeholder="Country"
                              value={pay}
                         />
                         <p style={{ color: 'red', cursor: 'auto', margin: '0px' }}>{country_error}</p>
                         {pay.length > 0 && show && (
                              <div className={styles.countryDropdown}>
                                   {countryList
                                        .filter((elm) =>
                                             elm.toLowerCase().startsWith(pay.toLowerCase())
                                        )
                                        .length > 0 ? (
                                             countryList
                                             .filter((elm) =>
                                                  elm.toLowerCase().startsWith(pay.toLowerCase())
                                             )
                                             .map((elm) => (
                                                  <p key={elm} onClick={handleCountryClick}>
                                                       {elm}
                                                  </p>
                                             ))
                                   ) : (
                                        <p style={{ color: 'red', cursor: 'auto' }}>
                                             Pays not found
                                        </p>
                                   )}
                              </div>
                         )}
                    </div>
                    <div className={styles.check}>
                         <div className={styles.c_div} id="first">
                              <input className={styles.input1} type="checkbox" name="first" />
                              <label className={styles.label} htmlFor="first">
                                   Envoyez-moi des e-mails utiles pour trouver un travail et des
                                   pistes d'emploi enrichissants.
                              </label>
                         </div>
                         <div className={styles.c_div}>
                              <input className={styles.input1} type="checkbox" name="second" />
                              <label className={styles.label} htmlFor="second">
                                   Oui, je comprends et j'accepte les conditions d'utilisation
                                   d'Upwork, y compris les termes de l'accord d'utilisation et de{' '}
                                   <a>la politique de confidentialité.</a>
                              </label>
                         </div>
                    </div>
               </div>

               <button onClick={handlenext}>Créer mon compte</button>
               <div className={styles.or}>
                    <hr />
                    <p>or</p>
                    <hr />
               </div>
               <div className={styles.otr}>
                    <div className={styles.google}>
                         <img src={google} alt="" />
                         <p>Sign up with Google</p>
                    </div>
                    <div className={styles.facebook}>
                         <img src={fcb} alt="" />
                         <p>Sign up with Facebook</p>
                    </div>
                    <div className={styles.x}>
                         <img src={x} alt="" />
                         <p>Sign up with X</p>
                    </div>
               </div>
               <p>
                    Vous avez déjà un compte ?{' '}
                    <a className={styles.link}>
                         <Link to="/Authentication/Login">Log in</Link>
                    </a>
               </p>
          </div>
     );
};

export default Inp2;