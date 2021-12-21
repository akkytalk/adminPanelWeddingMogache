import React from "react";
import { Row, Col } from "reactstrap";
import "../../assets/css/datatable.css";
import BookingSummary from "../../components/dashboard-components/booking-summary/booking-summary";
import Feeds from "../../components/dashboard-components/feeds/feeds";
class Starter extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm={6} lg={8}>
            {/* <BookingSummary /> */}
          </Col>
          <Col sm={6} lg={4}>
            {/* <Feeds /> */}
          </Col>
        </Row>
        <Row>
          <Col sm={12}></Col>
        </Row>
        <Row>
          <Col sm={12}></Col>
        </Row>
      </div>
    );
  }
}
export default Starter;
