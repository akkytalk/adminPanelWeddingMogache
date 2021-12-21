import React, { Component } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card outline color="success">
            <CardHeader className="bg-warning text-white">
              <h3 className="mb-0">Total Rooms</h3>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">18</h2>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card>
            <CardHeader className="bg-danger text-white">
              <h3 className="mb-0">Available Rooms</h3>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">5</h2>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4">
          <Card>
            <CardHeader className="bg-info text-white">
              <h3 className="mb-0">Booked Rooms</h3>
            </CardHeader>
            <CardBody>
              <h2 className="mb-0">3</h2>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div>
        {/* <div className="col-sm-12 col-md-3 col-lg-3">
          <Card>
            <CardHeader className="bg-success text-white">
              <h3 className="mb-0">No of Users</h3>
            </CardHeader>
            <CardBody>
              <h5>33</h5>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </div> */}
      </div>
    );
  }
}

export default Top;
