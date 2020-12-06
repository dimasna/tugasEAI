import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
  FormInput,
  FormGroup
} from "shards-react";




export default class Auth extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mode: 'login',
      departments: {}
    }
  }

  componentDidMount() {

    fetch('https://kelompok-sdm-rest-server.herokuapp.com/api/divisi')
      .then(res => res.json())
      .then(data => this.setState({ departments: data.data }))

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
          <h4 className="mb-0">{this.state.mode == 'login' ? 'Masuk' : 'Daftar'}</h4>
          <span className="text-muted d-block mb-2">Finance Manufacture App</span>

        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <Form>
              <FormGroup>
                <label htmlFor="#email">Email</label>
                <FormInput type="email" id="#email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#password">Password</label>
                <FormInput type="password" id="#password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="#department">Department</label>
                <FormInput type="password" id="#password" placeholder="Password" />
              </FormGroup>
              <div style={{ display: 'grid', justifyContent: 'right' }}>
                <Button type="submit">Login</Button>
              </div>
            </Form>
          </ListGroupItem>
          <ListGroupItem className="p-4" style={{ textAlign: 'center' }}>
            <span>Belum punya akun? <strong className="text-muted mb-2">
              <a href="#">Daftar</a>
            </strong></span>


          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}





