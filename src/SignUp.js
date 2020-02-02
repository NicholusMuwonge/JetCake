import React from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./SignUp.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import firebase from "./Firebase/Firebase";
import { AlreadyAuthenticated, Alerts } from "./Utils";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        password1: "",
        qn1: "",
        qn2: "",
        qn3: "",
        address: "",
        country: "",
        dob: "",
        phone: ""
      },
      errors: {},
      options: countryList().getData(),
      values: "",
      phone: "",
      status: 0,
      image: "",
      names: "",
      server_errors: "",
      success: "false",
      buttonLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState(
      {
        fields
      },
      () => {
        this.validateForm();
      }
    );
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    this.makePost();
    if (this.validateForm()) {
      this.makePost();
    }
  }

  makePost() {
    const postUrl = "http://127.0.0.1:5000/signup";
    this.setState({ buttonLoading: true });
    axios
      .post(postUrl, {
        name: this.state.fields.name,
        email: this.state.fields.email,
        phone_number: this.state.phone,
        date_of_birth: this.state.fields.dob,
        address: `${this.state.values.label} - ${this.state.fields.address}`,
        password: this.state.fields.password,
        photo: this.state.image,
        security_questions: [
          "qn1",
          this.state.fields.qn1,
          "qn2",
          this.state.fields.qn2,
          "qn3",
          this.state.fields.qn2
        ]
      })
      .then(result => {
        if (result.status === 200) {
          this.setState({ success: "true" });
          this.setState({ buttonLoading: false });
          setTimeout(() => {
            this.props.history.push("/login");
          }, 5000);
        } else {
          this.setState({ success: "false" });
        }
      })
      .catch(err => {
        if (typeof err === "object") {
          this.setState({ server_errors: err.response.status });
          this.setState({ buttonLoading: false });
        }
      });
  }
  uploadImage = files => {
    const fileload = firebase
      .storage()
      .ref(`images/${files[0].names}`)
      .put(files[0]);
    fileload.then(() => {
      firebase
        .storage()
        .ref(`images/${files[0].names}`)
        .getDownloadURL()
        .then(url => {
          const image = {
            image: url
          };
          this.setState({ image: image.image });
        });
    });
    fileload.on("state_changed", snapshot => {
      const status = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      this.setState({ status });
    });
  };

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name.";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (!fields["dob"]) {
      formIsValid = false;
      errors["dob"] = "*Please enter your date of birth";
    }
    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (this.state.server_errors === 409) {
      formIsValid = false;
      errors["email"] =
        "*User Seems to be Already signed up. Please Try signing in";
    }
    if (this.state.value === null) {
      formIsValid = false;
      errors["country"] = "*Please enter your country";
    }

    if (this.state.phone === "") {
      formIsValid = false;
      errors["phone"] = "*Please enter your phone number";
    }

    if (!fields["phoneNumber"]) {
      formIsValid = false;
      errors["phoneNumber"] = "*Please enter your mobile no.";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (fields["password"] !== fields["password1"]) {
      formIsValid = false;
      errors["password1"] = "*Passwords do not match.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (
        !fields["password"].match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        formIsValid = false;
        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  errorMessage = item => (
    <h6
      className="errorMsg text-center"
      style={{ color: "red", fontSize: "14px" }}
    >
      {item}
    </h6>
  );
  render() {
    return (
      <div className="signup__container">
        <div className="container__child signup__form">
          <h3 className="text-center" style={{ color: "rgba(0, 0, 0, 0.685)" }}>
            SignUp
          </h3>
          <br />
          <form onSubmit={this.submituserRegistrationForm} autoComplete="on">
            <div className="form-group">
              <label htmlFor="name">* Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                autoComplete="on"
                value={this.state.fields.name}
                onChange={this.handleChange}
              />
              {this.errorMessage(this.state.errors.name)}
            </div>

            <div className="form-group">
              <label htmlFor="email">* Email</label>
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                autoComplete="on"
                placeholder="you@email.com"
                value={this.state.fields.email}
                onChange={this.handleChange}
                required
              />
              {this.errorMessage(this.state.errors.email)}
            </div>
            <div className="form-group">
              <label htmlFor="password">* Password</label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                autoComplete="on"
                placeholder="Must have atleast 8 characters, Special charrater , atleast 1 upporcase"
                value={this.state.fields.password}
                onChange={this.handleChange}
                required
              />
              {this.errorMessage(this.state.errors.password)}
            </div>
            <div className="form-group">
              <label htmlFor="passwordRepeat">* Repeat Password</label>
              <input
                className="form-control"
                type="password"
                name="password1"
                id="passwordRepeat"
                autoComplete="on"
                placeholder="Please re-enter the password above"
                value={this.state.fields.password1}
                onChange={this.handleChange}
                required
              />
              {this.errorMessage(this.state.errors.password1)}
            </div>
            <label htmlFor="email">* Phone Number</label>
            <PhoneInput
              country={"ug"}
              value={this.state.phone}
              width="100%"
              id="phone"
              onChange={phone => this.setState({ phone })}
            />
            {this.errorMessage(this.state.errors.phone)}
            <div className="form-group">
              <label htmlFor="email">* Date of Birth</label>
              <input
                className="form-control"
                type="date"
                name="dob"
                id="dob"
                placeholder="1/1/0001"
                autoComplete="on"
                value={this.state.fields.dob}
                onChange={this.handleChange}
                required
              />
              {this.errorMessage(this.state.errors.dob)}
            </div>

            <Select
              options={this.state.options}
              value={this.state.values}
              onChange={values => this.setState({ values })}
            />
            {this.errorMessage(this.state.errors.country)}
            <div className="form-group">
              <label htmlFor="address" className="text-center">
                * Address
              </label>
              <input
                className="form-control"
                type="text"
                name="address"
                id="address"
                autoComplete="on"
                placeholder="Plot 3 Lenon Street, Narnia"
                value={this.state.fields.address}
                onChange={this.handleChange}
                required
              />
              {this.errorMessage(this.state.errors.address)}
            </div>
            <h6
              className="text"
              style={{ color: "rgba(0, 0, 0, 0.685)", fontWeight: "bolder" }}
            >
              <div className="form-group">
                <label htmlFor="image">* Image</label>
                <input
                  className="form-control"
                  type="file"
                  name={this.state.image}
                  autoComplete="on"
                  id=""
                  required
                  accept=".jpg, .svg , .png"
                  onChange={event => this.uploadImage(event.target.files)}
                />
                <img src={this.state.image} alt="" width="40px" height="40px" />
                <progress value={this.state.status} max="100" />
              </div>
              Security Questions
            </h6>
            <div className="form-group">
              <label htmlFor="qn1">
                * What was your first elementary school called?
              </label>
              <input
                className="form-control"
                type="text"
                name="qn1"
                id="qn1"
                autoComplete="on"
                placeholder="Add something you can remember"
                value={this.state.fields.qn1}
                onChange={this.handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="qn2">
                * Who was your best friend growing up?
              </label>
              <input
                className="form-control"
                type="text"
                name="qn2"
                id="qn2"
                autoComplete="on"
                placeholder="Add something you can remember"
                value={this.state.fields.qn2}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="qn3">
                * Where have you always dreamt of going to?
              </label>
              <input
                className="form-control"
                type="text"
                name="qn3"
                id="qn3"
                autoComplete="on"
                placeholder="Add something you can remember"
                value={this.state.fields.qn3}
                onChange={this.handleChange}
                required
              />
            </div>
            {this.state.server_errors === 409 ? (
              <Alerts
                color={"warning"}
                text={
                  "User Seems to be Already signed up. Please Try signing in instead"
                }
              />
            ) : (
              ""
            )}
            {this.state.success === "true" ? (
              <Alerts
                color={"success"}
                text={
                  "Looks like you are all set you will be redirected to the login shortly."
                }
              />
            ) : (
              ""
            )}
            <div className="m-t-lg">
              <ul className="list-inline">
                <li>
                  <input
                    className="btn btn--form"
                    type="submit"
                    disabled={this.state.buttonLoading === true}
                    value={
                      this.state.buttonLoading === false
                        ? "Register"
                        : "loading"
                    }
                  />
                </li>
                <li>
                  <a className="signup__link" href="/login">
                    I am already a member
                  </a>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AlreadyAuthenticated(SignUp);
