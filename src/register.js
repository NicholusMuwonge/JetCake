import React from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      options: countryList().getData(),
      value: null
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
    if (this.validateForm()) {
      let fields = {};
      fields["name"] = "";
      fields["email"] = "";
      fields["phoneNumber"] = "";
      fields["password"] = "";
      fields["password1"] = "";
      fields["qn1"] = "";
      fields["qn2"] = "";
      fields["qn3"] = "";
      fields["address"] = "";
      fields["country"] = "";
      fields["dob"] = "";
      this.setState({ fields: fields });
      alert("Form submitted");
    }
  }

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
    if (this.state.value == null) {
      formIsValid = false;
      errors["country"] = "*Please enter your country";
    }
    if (!fields["phoneNumber"]) {
      formIsValid = false;
      errors["phoneNumber"] = "*Please enter your mobile no.";
    }

    if (typeof fields["phoneNumber"] !== "undefined") {
      if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phoneNumber"] = "*Please enter valid mobile no.";
      }
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
  render() {
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3>Registration page</h3>
          <form
            method="post"
            name="userRegistrationForm"
            onSubmit={this.submituserRegistrationForm}
          >
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.fields.name}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.name}</div>
            <label>Email ID:</label>
            <input
              type="text"
              name="email"
              value={this.state.fields.email}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.email}</div>
            <label>Mobile No:</label>
            <input
              type="text"
              name="phoneNumber"
              value={this.state.fields.phoneNumber}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.phoneNumber}</div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.fields.password}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.password}</div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="password1"
              value={this.state.fields.password1}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.password1}</div>
            <Select
              options={this.state.options}
              value={this.state.value}
              onChange={value => this.setState({ value })}
            />
            <div className="errorMsg">{this.state.errors.country}</div>
            <label>address</label>
            <input
              type="text"
              name="address"
              value={this.state.fields.address}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.address}</div>
            <label>Date of birth</label>
            <input
              type="date"
              name="dob"
              value={this.state.fields.dob}
              onChange={this.handleChange}
            />
            <div className="errorMsg">{this.state.errors.dob}</div>
            <label>What was your first elemntary school called?</label>
            <input
              type="text"
              name="qn1"
              value={this.state.fields.qn1}
              onChange={this.handleChange}
            />
            <label>What was your best frined growing up?</label>
            <input
              type="text"
              name="qn2"
              value={this.state.fields.qn2}
              onChange={this.handleChange}
            />
            <label>What place have you always wanted to go to?</label>
            <input
              type="text"
              name="qn3"
              value={this.state.fields.qn3}
              onChange={this.handleChange}
            />
            <input
              type="submit"
              className="button"
              onClick={this.Click()}
              value="Register"
            />
          </form>
        </div>
      </div>
    );
  }
}

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      nameError: "",
      emailError: ""
    };
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value }, () => {
      this.validateEmail();
    });
  };

  validateName = () => {
    const { name } = this.state;
    this.setState({
      nameError:
        name.length > 3 ? null : "Name must be longer than 3 characters"
    });
  };

  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 3 ? null : "Email must be longer than 3 characters"
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email } = this.state;
    alert(`Your state values: \n 
              name: ${name} \n 
              email: ${email}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className={`form-control ${
              this.state.nameError ? "is-invalid" : ""
            }`}
            id="name"
            placeholder="Enter name"
            value={this.state.name}
            onChange={this.handleNameChange}
            onBlur={this.validateName}
          />
          <div className="invalid-feedback">{this.state.nameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            className={`form-control ${
              this.state.emailError ? "is-invalid" : ""
            }`}
            id="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            onBlur={this.validateEmail}
          />
          <div className="invalid-feedback">{this.state.emailError}</div>
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
    );
  }
}
export default RegisterForm;
