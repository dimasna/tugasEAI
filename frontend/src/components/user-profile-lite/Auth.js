import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormSelect,
  FormGroup
} from "shards-react";




export default class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLogin: true,
      departments: []
    }


    this.changeMode = this.changeMode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch('/department')
      .then(data => data.json())
      .then(res => this.setState({ departments: res.data }))
  }


  changeMode(isLogin) {
    this.setState({ isLogin })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();


    if (this.state.isLogin) {
      let formdata = new FormData();
      formdata.append("email", this.state.email)
      formdata.append("password", this.state.password)
      fetch('/auth', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata
      }).then(response => {
        alert(response.token)
      }).catch(err => {
        console.log(err)
      })

    }

    else {

      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("access_token", "abZ3VQQb3fYtbMI6hgoKRHP6fI7IxSpM");
urlencoded.append("email", this.state.email);
urlencoded.append("password", this.state.password);
urlencoded.append("department", this.state.department);
urlencoded.append("name", this.state.email);


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("/users", requestOptions)
  .then(response => response.text())
  .then((result) => {
    let res = JSON.parse(result)
    alert('token :'+ res.token)})
  .catch(error => console.log('error', error));
    }


    let body = {
      email: this,
      password: this.state.password,
      department: this.state.department
    }
    // fetch('http://localhost:8080/users', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': 'Bearer abZ3VQQb3fYtbMI6hgoKRHP6fI7IxSpM',
    //     'Content-Type': 'application/json'

    //   },
    //   body: JSON.stringify(body)

    // }).then(res => {

    //   if (res.redirected) location.href = res.url;

    // });

  }


  render() {
    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={require("./../../images/shards-dashboards-logo.svg")}
              alt="Finance App"
              width="110"
            />
          </div>
          <h4 className="mb-0">{this.state.isLogin ? 'Masuk' : 'Daftar'}</h4>
          <span className="text-muted d-block mb-2">Finance Manufacture App</span>

        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <label htmlFor="#email">Email</label>
                <FormInput name="email" onChange={this.handleChange} type="email" id="#email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput name="password" onChange={this.handleChange} type="password" id="#password" placeholder="Password" />
              </FormGroup>
              {!this.state.isLogin ?
                <FormGroup>
                  <label htmlFor="#department">Department</label>
                  <FormSelect name="department" onChange={this.handleChange}>
                    {this.state.departments.map((el, i) =>
                      <option key={i} value={el.id_divisi}>{el.nama_divisi}</option>




                    )}
                  </FormSelect>
                </FormGroup>
                : <></>}
              <div style={{ display: 'grid', justifyContent: 'right' }}>
                <Button type="submit">{this.state.isLogin ? 'Masuk' : 'Daftar'}</Button>
              </div>
            </Form>
          </ListGroupItem>
          <ListGroupItem className="p-4" style={{ textAlign: 'center' }}>
            <span>{this.state.isLogin ? 'Belum ' : 'Sudah '}punya akun? <strong className="text-muted mb-2">
              <a href="#" onClick={() => this.changeMode(!this.state.isLogin)}>{this.state.isLogin ? 'Daftar' : 'Masuk'}</a>
            </strong></span>


          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}





