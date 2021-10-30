import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
  Grid,
  Button,
  FormControl,
  ControlLabel,
  FormGroup,
  ListGroupItem,
  ListGroup,
  Table,
  Well,
  Modal
} from "react-bootstrap";
import { ordersList, modify_orders } from "../actions/orders";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Order = ({
  ordersList,
  modify_orders,
  orders,
  products,
  categories,
  supplies,
  PaidOrders,
  loading
}) => {
  const [formData, setformData] = useState({
    SearchCategory: "all",
    Items: [],
    ID: "",
    TableNumber: "",
    TotalCost: 0,
    Disabled: false,
    PayShow: false,
    Waiting: true
  });
  const {
    SearchCategory,
    ID,
    TableNumber,
    Items,
    TotalCost,
    Disabled,
    PayShow,
    Waiting
  } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    ordersList();
  }, [ordersList]);

  const onCategorySelect = async e => {
    console.log();
    e.preventDefault();
    setformData({
      ...formData,
      SearchCategory: categories[e.target.value].CategoryName
    });
  };

  const Category = () => {
    let temp = [];
    for (let i = 0; i < categories.length; i++) {
      temp.push(
        <ListGroupItem
          key={i}
          onClick={onCategorySelect}
          value={i}
          style={{ fontSize: 16, textAlign: "center" }}
          className={
            SearchCategory === categories[i].CategoryName ? "active" : null
          }
        >
          {categories[i].CategoryName}
        </ListGroupItem>
      );
    }
    return temp;
  };

  const ProductTable = () => {
    let temp = [];
    let tempDanger = [];
    let tempReturn = [];
    let Flag = false;
    for (let i = 0; i < products.length; i++) {
      if (SearchCategory === "all" || products[i].Category === SearchCategory) {
        Flag = false;
        for (let q = 0; q < products[i].SuppliesConsumption.length; q++) {
          if (
            products[i].SuppliesConsumption[q].Quantity <
            supplies[products[i].SuppliesConsumption[q].SupplyID].Quantity
          ) {
            Flag = true;
          }
        }
        if (Flag) {
          temp.push(
            <tr key={i}>
              <td style={{ fontSize: 17 }}>{products[i].ProductName}</td>
              <td style={{ fontSize: 15 }}>{products[i].Cost} egp</td>
              <td>
                <Button
                  className="btn btn-simple"
                  style={{ fontSize: 15 }}
                  onClick={addProduct}
                  value={i}
                >
                  +
                </Button>
              </td>
            </tr>
          );
        } else {
          tempDanger.push(
            <tr key={i} className="danger">
              <td style={{ fontSize: 17 }}>{products[i].ProductName}</td>
              <td style={{ fontSize: 15 }}>{products[i].Cost} egp</td>
              <td>
                <i className="fa fa-exclamation-triangle"></i>
              </td>
            </tr>
          );
        }
      }
    }
    tempReturn.push(temp);
    tempReturn.push(tempDanger);
    return tempReturn;
  };

  const onSubmit = async e => {
    e.preventDefault();
    let EmployeeName = localStorage.getItem("name"),
      OrderID;
    if (ID) {
      OrderID = ID;
    } else {
      OrderID = orders.length + PaidOrders;
    }
    let Paid = false;
    modify_orders({
      OrderID,
      EmployeeName,
      TableNumber,
      Items,
      TotalCost,
      Paid
    });
    window.location.reload(false);
  };

  const PayShowHandle = async e => {
    e.preventDefault();
    setformData({
      ...formData,
      PayShow: true,
      ID: orders[e.target.value].OrderID,
      TableNumber: orders[e.target.value].TableNumber,
      Items: orders[e.target.value].Items,
      TotalCost: orders[e.target.value].TotalCost
    });
  };

  const PayHandleClose = () => {
    setformData({
      SearchCategory: "all",
      Items: [],
      ID: "",
      TableNumber: "",
      TotalCost: 0,
      Disabled: false,
      PayShow: false
    });
  };

  const Orders = () => {
    let temp = [];
    if (!loading) {
      for (let i = 0; i < orders.length; i++) {
        if (!orders[i].Paid) {
          temp.push(
            <div key={i}>
              <div className="col-md-9">
                <Row>
                  <ListGroupItem
                    onClick={onOrdersSelect}
                    value={i}
                    style={{ fontSize: 16, textAlign: "center" }}
                    className={orders[i].OrderID === ID ? "active" : null}
                  >
                    {!orders[i].Waiting ? (
                      <Fragment>
                        <i className="fas fa-spinner fa-pulse"></i>
                        &nbsp;&nbsp;&nbsp;
                      </Fragment>
                    ) : null}
                    Table {orders[i].TableNumber}
                  </ListGroupItem>
                </Row>
              </div>
              <div className="col-md-3">
                <Row>
                  <Button
                    className="pull-right btn-fill btn-primary"
                    onClick={PayShowHandle}
                    value={i}
                  >
                    Pay
                  </Button>
                  <Modal show={PayShow}>
                    <form onSubmit={Pay}>
                      <Modal.Header>
                        <Modal.Title>Receipt</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <br></br>
                        <Row>
                          <div className="card" style={{ textAlign: "center" }}>
                            <Table striped condensed hover>
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="col-md-9 text-center"
                                    style={{ fontSize: 14 }}
                                  >
                                    Product Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="col-md-1 text-center"
                                    style={{ fontSize: 14 }}
                                  >
                                    Quantity
                                  </th>
                                  <th
                                    scope="col"
                                    className="col-md-2 text-center"
                                    style={{ fontSize: 14 }}
                                  >
                                    Cost
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{orderItems()}</tbody>
                            </Table>
                          </div>
                          <div style={{ textAlign: "center" }}>
                            <div className="col-md-3">
                              <Row>
                                <Well className="form-control">
                                  Table Number
                                </Well>
                              </Row>
                            </div>
                            <div className="col-md-2">
                              <Row>
                                <Well className="form-control">
                                  {TableNumber}
                                </Well>
                              </Row>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-3">
                              <Row>
                                <Well className="form-control">Total Cost</Well>
                              </Row>
                            </div>
                            <div className="col-md-2">
                              <Row>
                                <Well className="form-control">
                                  {TotalCost}
                                </Well>
                              </Row>
                            </div>
                            <div className="col-md-1">
                              <Row>
                                <Well className="form-control">egp</Well>
                              </Row>
                            </div>
                          </div>
                        </Row>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="pull-right btn-round btn-success btn-simple btn-fill"
                          type="submit"
                        >
                          Paid
                        </Button>
                        <Button
                          bsStyle="danger"
                          className="pull-right btn-simple"
                          onClick={PayHandleClose}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </Row>
              </div>
            </div>
          );
        }
      }
    }
    return temp;
  };

  const onOrdersSelect = async e => {
    e.preventDefault();
    setformData({
      ...formData,
      ID: orders[e.target.value].OrderID,
      TableNumber: orders[e.target.value].TableNumber,
      Items: orders[e.target.value].Items,
      TotalCost: orders[e.target.value].TotalCost,
      Waiting: orders[e.target.value].Waiting,
      Disabled: true
    });
  };

  const orderItems = () => {
    let temp = [];
    for (let i = 0; i < Items.length; i++) {
      temp.push(
        <tr key={i}>
          <td style={{ fontSize: 17 }}>{Items[i].ProductName}</td>
          <td style={{ fontSize: 15 }}>{Items[i].Quantity}</td>
          <td style={{ fontSize: 15 }}>{Items[i].Cost} egp</td>
          <td>
            {Waiting ? (
              <Button
                className="btn btn-simple"
                style={{ fontSize: 15.6 }}
                onClick={removeProduct}
                value={i}
              >
                -
              </Button>
            ) : null}
          </td>
        </tr>
      );
    }
    return temp;
  };

  const addProduct = async e => {
    e.preventDefault();
    let temp = Items,
      Flag = false,
      index = 0,
      tempTotalCost = TotalCost;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].ProductName === products[e.target.value].ProductName) {
        Flag = true;
        index = i;
      }
    }
    tempTotalCost += products[e.target.value].Cost;
    if (Flag) {
      temp[index].Cost =
        (temp[index].Cost / temp[index].Quantity) * (temp[index].Quantity + 1);
      temp[index].Quantity++;
    } else {
      temp.push({
        ProductID: e.target.value,
        ProductName: products[e.target.value].ProductName,
        Quantity: 1,
        Cost: products[e.target.value].Cost
      });
    }
    setformData({
      ...formData,
      Items: temp,
      TotalCost: tempTotalCost
    });
  };

  const removeProduct = async e => {
    e.preventDefault();
    let temp = Items,
      tempTotalCost = TotalCost;

    if (temp[e.target.value].Quantity > 1) {
      temp[e.target.value].Cost =
        temp[e.target.value].Cost -
        temp[e.target.value].Cost / temp[e.target.value].Quantity;
      temp[e.target.value].Quantity--;
      tempTotalCost -=
        Items[e.target.value].Cost / Items[e.target.value].Quantity;
    } else {
      tempTotalCost -=
        Items[e.target.value].Cost / Items[e.target.value].Quantity;
      temp.splice(e.target.value, 1);
    }

    setformData({
      ...formData,
      Items: temp,
      TotalCost: tempTotalCost
    });
  };

  const Clear = () => {
    setformData({
      ...formData,
      Items: [],
      ID: "",
      TableNumber: "",
      TotalCost: 0,
      Disabled: false,
      Preparing: false
    });
  };

  const Pay = async () => {
    let EmployeeName = localStorage.getItem("name"),
      OrderID = ID,
      Paid = true;
    modify_orders({
      OrderID,
      EmployeeName,
      TableNumber,
      Items,
      TotalCost,
      Paid
    });
    window.location.reload(false);
  };

  if (!loading) {
    return (
      <Fragment>
        <div className="content card-plain FullBox">
          <h3 className="title">
            <b>Orders</b>
          </h3>
          <br></br>
          <Grid fluid>
            <Row>
              <Col md={4}>
                <form onSubmit={onSubmit}>
                  <Row>
                    <FormGroup>
                      <ControlLabel style={{ fontSize: 17 }}>
                        &nbsp;Table number
                      </ControlLabel>
                      <FormControl
                        disabled={Disabled}
                        label="Table Number"
                        name="TableNumber"
                        type="number"
                        bsClass="form-control"
                        placeholder="Table Number"
                        value={TableNumber}
                        onChange={e => onChange(e)}
                      />
                    </FormGroup>
                  </Row>
                  <Row>
                    <FormGroup>
                      <ControlLabel style={{ fontSize: 17 }}>
                        &nbsp;Order items
                      </ControlLabel>
                      <div className="card">
                        <div
                          className="OrderItemssBox"
                          style={{ textAlign: "center" }}
                        >
                          <Table striped condensed hover>
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="col-md-9 text-center"
                                  style={{ fontSize: 14 }}
                                >
                                  Product Name
                                </th>
                                <th
                                  scope="col"
                                  className="col-md-1 text-center"
                                  style={{ fontSize: 14 }}
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="col-md-2 text-center"
                                  style={{ fontSize: 14 }}
                                >
                                  Cost
                                </th>
                              </tr>
                            </thead>
                            <tbody>{orderItems()}</tbody>
                          </Table>
                        </div>
                        <div className="col-md-4">
                          <Row>
                            <Well className="form-control">Total Cost</Well>
                          </Row>
                        </div>
                        <div className="col-md-8">
                          <Row>
                            <Well className="form-control">
                              {TotalCost} egp
                            </Well>
                          </Row>
                        </div>
                      </div>
                    </FormGroup>
                  </Row>
                  <br></br>
                  <Button
                    className="pull-right btn-round btn-simple btn-fill"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    className="pull-right btn-simple btn-danger"
                    onClick={Clear}
                  >
                    Clear
                  </Button>
                  <div className="clearfix" />
                </form>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <ControlLabel style={{ fontSize: 17.68 }}>
                    &nbsp;Products
                  </ControlLabel>
                  <div
                    className="card ProductsBox"
                    style={{ textAlign: "center" }}
                  >
                    <Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="col-md-9 text-center"
                            style={{ fontSize: 14 }}
                          >
                            Product Name
                          </th>
                          <th
                            scope="col"
                            className="col-md-2 text-center"
                            style={{ fontSize: 14 }}
                          >
                            Cost
                          </th>
                          <th
                            scope="col"
                            className="col-md-1 text-center"
                            style={{ fontSize: 14 }}
                          ></th>
                        </tr>
                      </thead>
                      <tbody>{ProductTable()}</tbody>
                    </Table>
                  </div>
                </FormGroup>
              </Col>
              <Col md={2}>
                <Row>
                  <FormGroup>
                    <ControlLabel style={{ fontSize: 17 }}>
                      &nbsp;Products Category
                    </ControlLabel>
                    <div className="listBox">
                      <ListGroup>{Category()}</ListGroup>
                    </div>
                  </FormGroup>
                </Row>
                <Row>
                  <FormGroup>
                    <ControlLabel style={{ fontSize: 17 }}>
                      &nbsp;Orders
                    </ControlLabel>
                    <div className="listBox">
                      <ListGroup>{Orders()}</ListGroup>
                    </div>
                  </FormGroup>
                </Row>
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

Order.prototype = {
  ordersList: PropTypes.func.isRequired,
  modify_orders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  supplies: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  PaidOrders: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  orders: state.orders.orders,
  supplies: state.orders.supplies,
  categories: state.orders.categories,
  products: state.orders.products,
  PaidOrders: state.orders.PaidOrders,
  loading: state.orders.loading
});
export default connect(
  mapStateToProps,
  { ordersList, modify_orders }
)(Order);
