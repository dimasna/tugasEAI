import React from "react";
import { Container, Row, Col } from "shards-react";


import Auth from "../components/user-profile-lite/Auth";

const AuthPage = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-5">
     
    </Row>
    <Row style={{justifyContent: 'center'}}>
      <Col lg="4">
        <Auth />
      </Col>
      
    </Row>
  </Container>
);

export default AuthPage;
