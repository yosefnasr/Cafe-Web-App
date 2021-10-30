import React, { Fragment, useEffect } from "react";
import { Grid, Row, Table, Col, Button } from "react-bootstrap";
import {
  preparingOrdersList,
  modify_order_waiting
} from "../actions/preparingOrders";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Preparing = ({
  preparingOrdersList,
  orders,
  modify_order_waiting,
  loading
}) => {
  useEffect(() => {
    preparingOrdersList();
  }, [preparingOrdersList]);

  const OrdersList = () => {
    let temp = [],
      Flag = true,
      index;
    if (!loading) {
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].Waiting) {
          if (Flag) {
            Flag = false;
            index = i;
          }
          temp.push(
            <li
              key={i}
              className={
                i === index
                  ? "list-group-item active text-center"
                  : "list-group-item text-center"
              }
            >
              {i === index ? (
                <Fragment>
                  <i className="fas fa-spinner fa-pulse"></i>&nbsp;&nbsp;&nbsp;
                </Fragment>
              ) : null}
              Table No. {orders[i].TableNumber}
            </li>
          );
        }
      }
    }
    return temp;
  };

  let index = -1;
  const OrdersTable = () => {
    let temp = [];
    if (!loading) {
      for (let q = 0; q < orders.length; q++) {
        if (orders[q].Waiting) {
          index = q;
          break;
        }
      }
      if (index !== -1) {
        for (let i = 0; i < orders[index].Items.length; i++) {
          temp.push(
            <tr key={i}>
              <td>{orders[index].Items[i].ProductName}</td>
              <td>{orders[index].Items[i].Quantity}</td>
            </tr>
          );
        }
      }
    }
    return temp;
  };

  const Ready = async () => {
    let OrderID = orders[index].OrderID;
    console.log(OrderID);
    modify_order_waiting({ OrderID });
    window.location.reload(false);
  };

  if (!loading) {
    return (
      <Fragment>
        <div className="content card-plain FullBox">
          <h3 className="title">
            <b>Preparing Orders</b>
          </h3>
          <br></br>
          <Grid fluid>
            <Row>
              <Col md={10}>
                <Row>
                  <div className="text-center preparingOrderstBox card">
                    <Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th className="col-md-10 text-center">ProductName</th>
                          <th className="col-md-2 text-center">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>{OrdersTable()}</tbody>
                    </Table>
                    <div className="clearfix" />
                  </div>
                  <br></br>
                  <Button
                    className="pull-right btn-round btn-simple btn-fill"
                    onClick={Ready}
                  >
                    Ready
                  </Button>
                </Row>
              </Col>
              <Col md={2}>
                <ul className="list-group listBox">{OrdersList()}</ul>
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
Preparing.prototype = {
  preparingOrdersList: PropTypes.func.isRequired,
  modify_order_waiting: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  orders: state.preparingOrders.orders,
  loading: state.preparingOrders.loading
});

export default connect(mapStateToProps, {
  preparingOrdersList,
  modify_order_waiting
})(Preparing);
