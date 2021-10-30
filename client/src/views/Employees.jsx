import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Grid,
  ListGroup,
  Radio,
  Button,
  ListGroupItem
} from "react-bootstrap";
import { employees, modify_employees } from "../actions/employees";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Employees = ({ employees, modify_employees, users, loading }) => {
  const [formData, setformData] = useState({
    username: "",
    password: "",
    password_2: "",
    name: "",
    Birthdate: "",
    NationalID: "",
    Phone_1: "",
    Phone_2: "",
    Adress: "",
    Job: "",
    Salary: "",
    StartedDate: "",
    EndedDate: "",
    admin: false,
    About: "",
    Disabled: false
  });
  const {
    username,
    password,
    password_2,
    name,
    Birthdate,
    NationalID,
    Phone_1,
    Phone_2,
    Adress,
    Job,
    Salary,
    StartedDate,
    EndedDate,
    admin,
    About,
    Disabled
  } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSelect = async e => {
    e.preventDefault();
    setformData({
      ...formData,
      username: users[e.target.value].username,
      password: "0123456",
      password_2: "0123456",
      name: users[e.target.value].name,
      Birthdate: users[e.target.value].Birthdate,
      NationalID: users[e.target.value].NationalID,
      Phone_1: users[e.target.value].Phone_1,
      Phone_2: users[e.target.value].Phone_2,
      Adress: users[e.target.value].Adress,
      Job: users[e.target.value].Job,
      Salary: users[e.target.value].Salary,
      StartedDate: users[e.target.value].StartedDate,
      EndedDate: users[e.target.value].EndedDate,
      admin: users[e.target.value].admin,
      About: users[e.target.value].About,
      Disabled: true
    });
  };

  const clear = () => {
    setformData({
      ...formData,
      username: "",
      password: "",
      password_2: "",
      name: "",
      Birthdate: "",
      NationalID: "",
      Phone_1: "",
      Phone_2: "",
      Adress: "",
      Job: "",
      Salary: "",
      StartedDate: "",
      EndedDate: "",
      admin: false,
      About: "",
      Disabled: false
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    modify_employees({
      username,
      password,
      name,
      Birthdate,
      NationalID,
      Phone_1,
      Phone_2,
      Adress,
      Job,
      Salary,
      EndedDate,
      admin,
      About
    });
    window.location.reload(false);
  };
  useEffect(() => {
    employees();
  }, [employees]);

  const selectList = () => {
    let temp = [];
    if (!loading) {
      for (let i = 0; i < users.length; i++) {
        temp.push(
          <ListGroupItem
            onClick={onSelect}
            key={i}
            value={i}
            style={{ fontSize: 16, textAlign: "center" }}
            className={users[i].username === username ? "active" : null}
          >
            {users[i].name}
          </ListGroupItem>
        );
      }
    }
    return temp;
  };

  if (!loading) {
    return (
      <Fragment>
        <div className="content card-plain FullBox">
          <div className="header">
            <h3 className="title">
              <b>Employees</b>
            </h3>
            <br></br>
          </div>
          <Grid fluid>
            <Row>
              <Col md={10}>
                <FormGroup>
                  <form onSubmit={e => onSubmit(e)}>
                    <Row>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Username</ControlLabel>
                          <FormControl
                            label="username"
                            name="username"
                            type="text"
                            disabled={Disabled}
                            bsClass="form-control"
                            placeholder="username"
                            value={username}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>password</ControlLabel>
                          <FormControl
                            label="password"
                            name="password"
                            type="password"
                            disabled={Disabled}
                            bsClass="form-control"
                            placeholder="password"
                            value={password}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>confirm password</ControlLabel>
                          <FormControl
                            label="Confirm Password"
                            name="password_2"
                            type="password"
                            disabled={Disabled}
                            bsClass="form-control"
                            placeholder="Confirm Password"
                            value={password_2}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-8">
                        <FormGroup>
                          <ControlLabel>name</ControlLabel>
                          <FormControl
                            label="name"
                            name="name"
                            type="text"
                            bsClass="form-control"
                            placeholder="name"
                            value={name}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Birthdate</ControlLabel>
                          <FormControl
                            label="Birthdate"
                            name="Birthdate"
                            type="date"
                            bsClass="form-control"
                            placeholder="Birthdate"
                            value={Birthdate}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>National ID Number</ControlLabel>
                          <FormControl
                            label="National ID Number"
                            name="NationalID"
                            type="text"
                            bsClass="form-control"
                            placeholder="National ID Number"
                            value={NationalID}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Phone Number</ControlLabel>
                          <FormControl
                            label="Phone Number"
                            name="Phone_1"
                            type="text"
                            bsClass="form-control"
                            placeholder="Phone Number"
                            value={Phone_1}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Phone Number</ControlLabel>
                          <FormControl
                            label="Phone Number"
                            name="Phone_2"
                            type="text"
                            bsClass="form-control"
                            placeholder="Phone Number"
                            value={Phone_2}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-8">
                        <FormGroup>
                          <ControlLabel>Adress</ControlLabel>
                          <FormControl
                            label="Adress"
                            name="Adress"
                            type="text"
                            bsClass="form-control"
                            placeholder="Home Adress"
                            value={Adress}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Job</ControlLabel>
                          <FormControl
                            label="Job"
                            name="Job"
                            type="text"
                            bsClass="form-control"
                            placeholder="Job Description"
                            value={Job}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Salary</ControlLabel>
                          <FormControl
                            label="Salary"
                            name="Salary"
                            type="number"
                            bsClass="form-control"
                            placeholder="Salary per Hour"
                            value={Salary}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Started Date</ControlLabel>
                          <FormControl
                            label="Started Date"
                            name="StartedDate"
                            type="date"
                            bsClass="form-control"
                            placeholder="Started Date"
                            disabled
                            value={StartedDate}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                      <div className="col-md-4">
                        <FormGroup>
                          <ControlLabel>Ended Date</ControlLabel>
                          <FormControl
                            label="Ended Date"
                            name="EndedDate"
                            type="date"
                            bsClass="form-control"
                            placeholder="Ended Date"
                            value={EndedDate}
                            onChange={e => onChange(e)}
                          />
                        </FormGroup>
                      </div>
                    </Row>
                    <Row>
                      <FormGroup>
                        <Radio
                          name="admin"
                          value={true}
                          checked={admin}
                          disabled={admin}
                          onChange={e => onChange(e)}
                          inline
                        >
                          admin
                        </Radio>{" "}
                        <Radio
                          name="admin"
                          value={false}
                          checked={!admin}
                          onChange={e => onChange(e)}
                          inline
                        >
                          employee
                        </Radio>
                      </FormGroup>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About</ControlLabel>
                          <FormControl
                            onChange={e => onChange(e)}
                            name="About"
                            value={About}
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be employee's description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      bsClass="btn btn-fill"
                      className="pull-right btn-round btn-simple btn-fill"
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Button
                      bsStyle="danger"
                      className="pull-right btn-simple "
                      onClick={clear}
                    >
                      Clear all
                    </Button>
                    <div className="clearfix" />
                  </form>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <ControlLabel>Employees List</ControlLabel>
                  <br></br>
                  <div className="listBox">
                    <ListGroup>{selectList()}</ListGroup>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Grid>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};
Employees.prototype = {
  employees: PropTypes.func.isRequired,
  modify_employees: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  users: state.employees.users,
  loading: state.employees.loading
});
export default connect(
  mapStateToProps,
  { employees, modify_employees }
)(Employees);
