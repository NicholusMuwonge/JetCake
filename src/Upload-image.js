import React, { Component } from "react";
import PropType from "prop-types";
import firebase from "./Firebase/Firebase";
import Axios from "axios";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';


class ProfileIsEdited extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      securityQuestions: "",
      dateOfBirth: "",
      address: "",
      image: "",
      phoneNumber: "",
      profile:[],
      buttonLoading: false,
      status: 0
    };
  }

  componentDidMount(){
    Axios.get("http://127.0.0.1:5000/users/1", 
    {
      headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODAzMjk5MDQsIm5iZiI6MTU4MDMyOTkwNCwianRpIjoiM2VhMWRiY2UtYjQ3MC00MmI1LTg2ODktNDFhMTI3YzdmMDNjIiwiZXhwIjoxNTgwMzMzNTA0LCJpZGVudGl0eSI6Im5hbWUiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.D8AOcFyCVYKdgWR2Zi_9zJP_kZEY0_xBA6bbmIdKl00"
    }, }
      )
      .then(res => {
        Object.values(res.data).map(i => (
          Object.values(i).map(j => (
            this.setState({profile: j})
          ))
        ))
        
      })
  }

  fetchData = () => {
    this.setState({ buttonLoading: true });
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  /* istanbul ignore next */
  uploadImage(files) {
    const fileload = firebase
      .storage()
      .ref(`images/${files[0].name}`)
      .put(files[0]);
    fileload.then(() => {
      firebase
        .storage()
        .ref(`images/${files[0].name}`)
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
  }

  render() {
    const { image, status, name, profile } = this.state;
    console.log(name, 'profile')
    return (
        <div>
          <h2>some how </h2>
          <input type="text" name="some"  defaultValue={profile.name} onChange={e=> this.handleChange(e)} />
          <input type="text" name="phone"  defaultValue={profile.phone_number} onChange={e=> this.handleChange(e)} />
          <input type="text" name="address"  defaultValue={profile.address} onChange={e=> this.handleChange(e)} />
          <input type="date" 
          name="phone"  
          defaultValue={profile.date_of_birth} 
          onChange={e=> this.handleChange(e)} 
          placeholder={profile.date_of_birth}
          />
          <input type="text" name="email"  defaultValue={profile.email} onChange={e=> this.handleChange(e)} />
          <input type="text" name="security"  defaultValue={profile.security} onChange={e=> this.handleChange(e)} />
          <input type="text" name="qn1"  defaultValue={profile.security_questions} onChange={e=> this.handleChange(e)} />
          <input type="text" name="qn2"  defaultValue={profile.security_questions} onChange={e=> this.handleChange(e)} />
          <input type="text" name="qn3"  defaultValue={profile.security_questions} onChange={e=> this.handleChange(e)} />
          {/* <PhoneInput
            placeholder="Enter phone number"
            // name="phone"
            value={profile.number}
            onChange={profile.number}/> */}
          <img src={image} alt='' width="40px" height="40px"/>
          <input
            type="file"
            name={image}
            onChange={event => this.uploadImage(event.target.files)}
          />
          <progress value={status} max="100" />
        </div>
    );
  }
}

export default ProfileIsEdited;
