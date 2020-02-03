import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Profile.scss";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import firebase from "./Firebase/Firebase";
import { Authenticated, normaliseDate, Alerts } from "./Utils";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: "",
        email: "",
        phone_number: "",
        address: "",
        date_of_birth: ""
      },
      errors: {},
      buttonLoading: false,
      server_errors: "",
      success: "false",
      profile: [],
      editMode: "no",
      values: "",
      phone: "",
      options: countryList().getData(),
      status: 0,
      image: ""
    };
  }

  componentDidMount() {
    axios
      .get(`https://jetcake-backend.herokuapp.com/users/${sessionStorage.getItem("id")}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      })
      .then(res => {
        Object.values(res.data).map(ObjectsList =>
          Object.values(ObjectsList).map(Items =>
            this.setState({ profile: Items })
          )
        );
      });
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  makeEdit = () => {
    const patchUrl = `https://jetcake-backend.herokuapp.com/users/${sessionStorage.getItem(
      "id"
    )}/edit`;
    this.setState({ buttonLoading: true });
    axios
      .patch(
        patchUrl,
        {
          name:
            this.state.fields.name === ""
              ? this.state.profile.name
              : this.state.fields.name,
          email:
            this.state.fields.email === ""
              ? this.state.profile.email
              : this.state.fields.email,
          phone_number:
            this.state.phone === ""
              ? this.state.profile.phone_number
              : this.state.phone,
          date_of_birth:
            this.state.fields.date_of_birth === ""
              ? this.state.profile.date_of_birth
              : this.state.fields.date_of_birth,
          address:
            this.state.values.label === undefined
              ? this.state.fields.address
              : this.state.values.label === undefined &&
                !this.state.fields.address
              ? this.state.profile.address
              : `${this.state.values.label}  ${this.state.fields.address}`,
          photo:
            this.state.image === "" ? this.state.profile.photo : this.state.image
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        }
      )
      .then(result => {
        if (result.status === 200) {
          this.setState({ success: "true" });
          this.setState({ buttonLoading: false });
          this.setState({ editMode: "no" });
          setTimeout(() => {
            window.location.reload();
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
  };

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.editMode === "yes") {
      this.makeEdit();
    } else {
      this.setState({ editMode: "yes" });
    }
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

  render() {
    return (
      <div className="container-fluid user-profile">
        {this.state.profile.photo !== null ? (
          <div className="row">
            <div className="col-xs-12">
              <div className="well well-sm">
                <div className="user-profile-card">
                  <div className="user-profile-header"></div>
                  {this.state.editMode === "yes" ? (
                    <h4>Edit your profile</h4>
                  ) : (
                    ""
                  )}
                  <div className="user-profile-avatar text-center">
                    <img
                      alt=""
                      src={
                        this.state.status === 100
                          ? this.state.image
                          : this.state.profile.photo
                      }
                    />
                    {this.state.editMode === "yes" ? (
                      <React.Fragment>
                        <input
                          className="form-control"
                          type="file"
                          name={this.state.image}
                          id="upload"
                          required
                          accept=".jpg, .svg , .png"
                          placeholder="Update Image"
                          onChange={event =>
                            this.uploadImage(event.target.files)
                          }
                        />
                        {this.state.status === 0 ? (
                          ""
                        ) : (
                          <progress value={this.state.status} max="100" />
                        )}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="row">
                    <div className="text-center">
                      {this.state.editMode === "yes" ? (
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          id="nameProfile"
                          placeholder="John Doe"
                          defaultValue={this.state.profile.name}
                          onChange={e => this.handleChange(e)}
                        />
                      ) : (
                        <h4>{this.state.profile.name}</h4>
                      )}
                      <small>Name</small>
                      <br />
                    </div>
                    <div className="panel-footer"></div>
                    <div className="container">
                      <p>
                        <small>Email</small>
                        {this.state.editMode === "yes" ? (
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            id="email"
                            placeholder="james.bond@spectre.com"
                            defaultValue={this.state.profile.email}
                            onChange={e => this.handleChange(e)}
                          />
                        ) : (
                          <span>{this.state.profile.email}</span>
                        )}
                      </p>
                      <span>
                        <small>Phone Number</small>
                        {this.state.editMode === "yes" ? (
                          <PhoneInput
                            country={"ug"}
                            value={this.state.phone}
                            width="100%"
                            id="phone"
                            onChange={phone => this.setState({ phone })}
                          />
                        ) : (
                          ""
                        )}
                        <small>
                          {this.state.editMode === "yes"
                            ? "This is your current phone number"
                            : ""}
                        </small>
                        <span>{this.state.profile.phone_number}</span>
                      </span>
                      <br />
                      <br />
                      <span>
                        <small>Address</small>
                        {this.state.editMode === "yes" ? (
                          <React.Fragment>
                            <label for="address" className="text-center">
                              City, street, and country
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              name="address"
                              id="address"
                              placeholder="Plot 3 Lenon Street, Narnia"
                              defaultValue={this.state.profile.address}
                              onChange={e => this.handleChange(e)}
                            />
                            <br />
                            <Select
                              options={this.state.options}
                              value={this.state.values}
                              onChange={values => this.setState({ values })}
                            />
                          </React.Fragment>
                        ) : (
                          <span>{this.state.profile.address}</span>
                        )}
                      </span>
                      <br />
                      <br />
                      <span>
                        <small>Born on</small>
                        {this.state.editMode === "yes" ? (
                          <input
                            className="form-control"
                            type="date"
                            name="date_of_birth"
                            id="dob"
                            placeholder="1/1/0001"
                            defaultValue={normaliseDate(
                              this.state.profile.date_of_birth
                            )}
                            onChange={e => this.handleChange(e)}
                          />
                        ) : (
                          ""
                        )}
                        <small>
                          {this.state.editMode === "yes"
                            ? "This is your current date of birth"
                            : ""}
                        </small>
                        {normaliseDate(this.state.profile.date_of_birth)}
                      </span>
                      {this.state.server_errors === 400 ? (
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
                          text={"Successfully updated profile."}
                        />
                      ) : (
                        ""
                      )}
                      <br />
                      <br />

                      <div className="panel-footer">
                        <span
                          data-original-title="Edit My Profile"
                          data-toggle="tooltip"
                          type="button"
                          className="btn btn-sm btn-primary"
                          onClick={e => this.handleSubmit(e)}
                        >
                          Edit Profile
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading ...</p>
        )}
      </div>
    );
  }
}

export default Authenticated(Profile);
