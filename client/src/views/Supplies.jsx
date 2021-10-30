import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Row,
  Table,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import {
  suppliesList,
  modify_supplies,
  add_supplies,
  increase_stock
} from "../actions/supplies";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Supplies = ({
  suppliesList,
  modify_supplies,
  add_supplies,
  increase_stock,
  supplies,
  loading
}) => {
  const [formData, setformData] = useState({
    ProductID: "",
    ProductName: "",
    QuantityType: "",
    Quantity: "",
    Cost: "",
    MinimumQuantity: "",
    AddShow: false,
    EditShow: false,
    IncreaseShow: false
  });
  const {
    ProductID,
    ProductName,
    QuantityType,
    Quantity,
    Cost,
    MinimumQuantity,
    AddShow,
    EditShow,
    IncreaseShow
  } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    suppliesList();
  }, [suppliesList]);

  const onAddSubmit = async e => {
    e.preventDefault();
    let ID = supplies.length;
    add_supplies({
      ID,
      ProductName,
      QuantityType,
      Quantity,
      MinimumQuantity
    });
    window.location.reload(false);
  };

  const onEditSubmit = async e => {
    e.preventDefault();
    modify_supplies({
      ProductID,
      ProductName,
      QuantityType,
      Quantity,
      MinimumQuantity
    });
    window.location.reload(false);
  };

  const onIncreaseSubmit = async e => {
    e.preventDefault();
    console.log("Quantity: ", Quantity, "Cost: ", Cost);
    increase_stock({
      ProductID,
      Quantity,
      Cost
    });
    window.location.reload(false);
  };

  const handleEditShow = async e => {
    setformData({
      ...formData,
      ProductID: supplies[e.target.value].ProductID,
      ProductName: supplies[e.target.value].ProductName,
      QuantityType: supplies[e.target.value].QuantityType,
      Quantity: supplies[e.target.value].Quantity,
      MinimumQuantity: supplies[e.target.value].MinimumQuantity,
      EditShow: true
    });
  };

  const handleEditClose = () => {
    setformData({
      ...formData,
      EditShow: false
    });
  };

  const handleIncreaseShow = async e => {
    setformData({
      ...formData,
      ProductID: supplies[e.target.value].ProductID,
      ProductName: supplies[e.target.value].ProductName,
      Quantity: 0,
      Cost: 0,
      IncreaseShow: true
    });
  };

  const handleIncreaseClose = () => {
    setformData({
      ...formData,
      IncreaseShow: false
    });
  };

  const handleAddShow = () => {
    setformData({
      ...formData,
      ProductID: "",
      ProductName: "",
      QuantityType: "",
      Quantity: 0,
      Cost: "",
      MinimumQuantity: 0,
      AddShow: true
    });
  };

  const handleAddClose = () => {
    setformData({
      ...formData,
      AddShow: false
    });
  };

  const suppliesTable = () => {
    let temp = [];
    let dangerTemp = [];
    let returnTemp = [];
    if (!loading) {
      for (let i = 0; i < supplies.length; i++) {
        if (
          supplies[i].Quantity > supplies[i].MinimumQuantity ||
          supplies[i].Quantity === supplies[i].MinimumQuantity
        ) {
          temp.push(
            <tr key={i}>
              <td>{supplies[i].ProductID}</td>
              <td>{supplies[i].ProductName}</td>
              <td>
                {supplies[i].Quantity} {supplies[i].QuantityType}
                <Button
                  style={{ fontSize: 23 }}
                  bsSize="xsmall"
                  onClick={handleIncreaseShow}
                  className="btn-simple"
                  value={i}
                >
                  +
                </Button>
                <div>
                  <Modal show={IncreaseShow}>
                    <Modal.Header>
                      <Modal.Title>Increase Supply Stock</Modal.Title>
                    </Modal.Header>
                    <form method="post" onSubmit={e => onIncreaseSubmit(e)}>
                      <Modal.Body>
                        <br></br>
                        <Grid fluid>
                          <Row>
                            <div className="col-md-2">
                              <FormGroup>
                                <ControlLabel>Supply ID</ControlLabel>
                                <FormControl
                                  label="Supply ID"
                                  name="ProductID"
                                  type="number"
                                  disabled={true}
                                  bsClass="form-control"
                                  placeholder="Supply ID"
                                  value={ProductID}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                            <div className="col-md-10">
                              <FormGroup>
                                <ControlLabel>Supply Name</ControlLabel>
                                <FormControl
                                  label="Supply Name"
                                  name="ProductName"
                                  type="text"
                                  disabled
                                  bsClass="form-control"
                                  placeholder="Supply Name"
                                  value={ProductName}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                          </Row>
                          <Row>
                            <div className="col-md-6">
                              <FormGroup>
                                <ControlLabel>
                                  Supply Stock Quantity
                                </ControlLabel>
                                <FormControl
                                  label="Supply Stock Quantity"
                                  name="Quantity"
                                  type="number"
                                  bsClass="form-control"
                                  placeholder="Supply Stock Quantity"
                                  value={Quantity}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                            <div className="col-md-6">
                              <FormGroup>
                                <ControlLabel>
                                  Increased Stock Quantity Cost
                                </ControlLabel>
                                <FormControl
                                  label="Increased Stock Quantity Cost"
                                  name="Cost"
                                  type="number"
                                  bsClass="form-control"
                                  placeholder="Increased Stock Quantity Cost"
                                  value={Cost}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                          </Row>
                        </Grid>
                        <br></br>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="pull-right btn-round btn-simple btn-fill"
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button
                          bsStyle="danger"
                          className="pull-right btn-simple "
                          onClick={handleIncreaseClose}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </div>
              </td>
              <td>
                <FormControl
                  type="date"
                  bsClass="form-control"
                  value={supplies[i].Date}
                  disabled
                  onChange={e => onChange(e)}
                />
              </td>
              <td>
                <Button
                  bsStyle="default"
                  className=" btn-simple"
                  onClick={handleEditShow}
                  value={i}
                >
                  Edit
                </Button>
                <Modal show={EditShow}>
                  <Modal.Header>
                    <Modal.Title>Edit Supply</Modal.Title>
                  </Modal.Header>
                  <form onSubmit={e => onEditSubmit(e)}>
                    <Modal.Body>
                      <br></br>
                      <Grid fluid>
                        <Row>
                          <div className="col-md-2">
                            <FormGroup>
                              <ControlLabel>Supply ID</ControlLabel>
                              <FormControl
                                label="Supply ID"
                                name="ProductID"
                                type="number"
                                disabled={true}
                                bsClass="form-control"
                                placeholder="Supply ID"
                                value={ProductID}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-10">
                            <FormGroup>
                              <ControlLabel>Supply Name</ControlLabel>
                              <FormControl
                                label="Supply Name"
                                name="ProductName"
                                type="text"
                                bsClass="form-control"
                                placeholder="Supply Name"
                                value={ProductName}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>Supply Stock Quantity</ControlLabel>
                              <FormControl
                                label="Supply Stock Quantity"
                                name="Quantity"
                                type="number"
                                bsClass="form-control"
                                placeholder="Supply Stock Quantity"
                                value={Quantity}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>
                                Minimum Stock Required Quantity
                              </ControlLabel>
                              <FormControl
                                label="Minimum Stock Required Quantity"
                                name="MinimumQuantity"
                                type="number"
                                bsClass="form-control"
                                placeholder="Minimum Stock Required Quantity"
                                value={MinimumQuantity}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                      </Grid>
                      <br></br>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="pull-right btn-round btn-simple btn-fill"
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        bsStyle="danger"
                        className="pull-right btn-simple "
                        onClick={handleEditClose}
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </td>
            </tr>
          );
        } else {
          dangerTemp.push(
            <tr key={i} className="danger">
              <td>{supplies[i].ProductID}</td>
              <td>{supplies[i].ProductName}</td>
              <td>
                {supplies[i].Quantity} {supplies[i].QuantityType}
                <Button
                  style={{ fontSize: 23 }}
                  bsSize="xsmall"
                  onClick={handleIncreaseShow}
                  className="btn-simple"
                  value={i}
                >
                  +
                </Button>
                <div>
                  <Modal show={IncreaseShow}>
                    <Modal.Header>
                      <Modal.Title>Increase Supply Stock</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={e => onIncreaseSubmit(e)}>
                      <Modal.Body>
                        <br></br>
                        <Grid fluid>
                          <Row>
                            <div className="col-md-2">
                              <FormGroup>
                                <ControlLabel>Supply ID</ControlLabel>
                                <FormControl
                                  label="Supply ID"
                                  name="ProductID"
                                  type="number"
                                  disabled={true}
                                  bsClass="form-control"
                                  placeholder="Supply ID"
                                  value={ProductID}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                            <div className="col-md-10">
                              <FormGroup>
                                <ControlLabel>Supply Name</ControlLabel>
                                <FormControl
                                  label="Supply Name"
                                  name="ProductName"
                                  type="text"
                                  disabled
                                  bsClass="form-control"
                                  placeholder="Supply Name"
                                  value={ProductName}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                          </Row>
                          <Row>
                            <div className="col-md-6">
                              <FormGroup>
                                <ControlLabel>
                                  Supply Stock Quantity
                                </ControlLabel>
                                <FormControl
                                  label="Supply Stock Quantity"
                                  name="Quantity"
                                  type="number"
                                  bsClass="form-control"
                                  placeholder="Supply Stock Quantity"
                                  value={Quantity}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                            <div className="col-md-6">
                              <FormGroup>
                                <ControlLabel>
                                  Increased Stock Quantity Cost
                                </ControlLabel>
                                <FormControl
                                  label="Increased Stock Quantity Cost"
                                  name="Cost"
                                  type="number"
                                  bsClass="form-control"
                                  placeholder="Increased Stock Quantity Cost"
                                  value={Cost}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </div>
                          </Row>
                        </Grid>
                        <br></br>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="pull-right btn-round btn-simple btn-fill"
                          type="submit"
                        >
                          Submit
                        </Button>
                        <Button
                          bsStyle="danger"
                          className="pull-right btn-simple "
                          onClick={handleIncreaseClose}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </div>
              </td>
              <td>
                <FormControl
                  type="date"
                  bsClass="form-control"
                  value={supplies[i].Date}
                  disabled
                  onChange={e => onChange(e)}
                />
              </td>
              <td>
                <Button
                  bsStyle="default"
                  className=" btn-simple"
                  onClick={handleEditShow}
                  value={i}
                >
                  Edit
                </Button>
                <Modal show={EditShow}>
                  <Modal.Header>
                    <Modal.Title>Edit Supply</Modal.Title>
                  </Modal.Header>
                  <form onSubmit={e => onEditSubmit(e)}>
                    <Modal.Body>
                      <br></br>
                      <Grid fluid>
                        <Row>
                          <div className="col-md-2">
                            <FormGroup>
                              <ControlLabel>Supply ID</ControlLabel>
                              <FormControl
                                label="Supply ID"
                                name="ProductID"
                                type="number"
                                disabled={true}
                                bsClass="form-control"
                                placeholder="Supply ID"
                                value={ProductID}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-10">
                            <FormGroup>
                              <ControlLabel>Supply Name</ControlLabel>
                              <FormControl
                                label="Supply Name"
                                name="ProductName"
                                type="text"
                                bsClass="form-control"
                                placeholder="Supply Name"
                                value={ProductName}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>Supply Stock Quantity</ControlLabel>
                              <FormControl
                                label="Supply Stock Quantity"
                                name="Quantity"
                                type="number"
                                bsClass="form-control"
                                placeholder="Supply Stock Quantity"
                                value={Quantity}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>
                                Minimum Stock Required Quantity
                              </ControlLabel>
                              <FormControl
                                label="Minimum Stock Required Quantity"
                                name="MinimumQuantity"
                                type="number"
                                bsClass="form-control"
                                placeholder="Minimum Stock Required Quantity"
                                value={MinimumQuantity}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                      </Grid>
                      <br></br>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="pull-right btn-round btn-simple btn-fill"
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        bsStyle="danger"
                        className="pull-right btn-simple "
                        onClick={handleEditClose}
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </td>
            </tr>
          );
        }
      }
      returnTemp.push(dangerTemp);
      returnTemp.push(temp);
    }
    return returnTemp;
  };

  if (!loading) {
    return (
      <Fragment>
        <div className="content card-plain">
          <div className="header">
            <h3 className="title">
              <b>Supplies</b>
            </h3>
            <br></br>
          </div>
          <Grid fluid>
            <Row>
              <div className="text-center SuppliesBox card">
                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th className="col-md-1 text-center">Supply ID</th>
                      <th className="col-md-5 text-center">Supply Name</th>
                      <th className="col-md-1 text-center">Stock Quantity</th>
                      <th className="col-md-1 text-center">
                        Last Updated Date
                      </th>
                      <th className="col-md-1 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>{suppliesTable()}</tbody>
                </Table>
                <div className="clearfix" />
              </div>
              <br></br>
            </Row>
            <Row>
              <div>
                <Button
                  className="pull-right btn-round btn-simple btn-fill"
                  onClick={handleAddShow}
                >
                  Add New Supply
                </Button>
                <Modal show={AddShow}>
                  <form method="post" onSubmit={e => onAddSubmit(e)}>
                    <Modal.Header>
                      <Modal.Title>New Supplie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <br></br>
                      <Grid fluid>
                        <Row>
                          <div className="col-md-12">
                            <FormControl
                              label="Supply Name"
                              name="ProductName"
                              type="text"
                              bsClass="form-control"
                              placeholder="Supply Name"
                              value={ProductName}
                              onChange={e => onChange(e)}
                            />
                          </div>
                        </Row>
                        <Row>
                          <br></br>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>Supply Stock Quantity</ControlLabel>
                              <FormControl
                                label="Supply Stock Quantity"
                                name="Quantity"
                                type="number"
                                bsClass="form-control"
                                placeholder="Supply Stock Quantity"
                                value={Quantity}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>
                                Minimum Required Stock Quantity
                              </ControlLabel>
                              <FormControl
                                label=">Minimum Required Stock Quantity"
                                name="MinimumQuantity"
                                type="number"
                                bsClass="form-control"
                                placeholder=">Minimum Required Stock Quantity"
                                value={MinimumQuantity}
                                onChange={e => onChange(e)}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-md-12">
                            <select
                              className="form-control"
                              name="QuantityType"
                              value={QuantityType}
                              onChange={e => onChange(e)}
                            >
                              <option value="" disabled>
                                Select Supply Quantity Unit Type
                              </option>
                              <option value="Kg">Kg</option>
                              <option value="Liter">Liter</option>
                              <option value="Piece">Piece</option>
                            </select>
                          </div>
                        </Row>
                      </Grid>
                      <br></br>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        className="pull-right btn-round btn-simple btn-fill"
                        type="submit"
                      >
                        Submit
                      </Button>
                      <Button
                        bsStyle="danger"
                        className="pull-right btn-simple "
                        onClick={handleAddClose}
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>
              </div>
            </Row>
          </Grid>
        </div>
      </Fragment>
    );
  } else {
    return null;
  }
};
Supplies.prototype = {
  suppliesList: PropTypes.func.isRequired,
  modify_supplies: PropTypes.func.isRequired,
  increase_stock: PropTypes.func.isRequired,
  add_supplies: PropTypes.func.isRequired,
  supplies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  supplies: state.supplies.supplies,
  loading: state.supplies.loading
});
export default connect(
  mapStateToProps,
  {
    suppliesList,
    modify_supplies,
    add_supplies,
    increase_stock
  }
)(Supplies);
