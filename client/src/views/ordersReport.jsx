import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Row,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { OrdersReportList } from "../actions/ordersReport";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Report = ({ OrdersReportList, orders, loading }) => {
  const [formData, setformData] = useState({
    StartDate: "",
    EndDate: ""
  });
  const { StartDate, EndDate } = formData;

  useEffect(() => {
    OrdersReportList();
  }, [OrdersReportList]);

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const OrdersTable = () => {
    let temp = [],
      Items = [],
      Flag;
    let today = new Date().toISOString().slice(0, 10);
    if (!loading) {
      if (!(StartDate || EndDate)) {
        setformData({
          ...formData,
          StartDate: today,
          EndDate: today
        });
      }
      for (let i = 0; i < orders.length; i++) {
        if (
          (orders[i].Date > StartDate && orders[i].Date < EndDate) ||
          orders[i].Date === StartDate ||
          orders[i].Date === EndDate
        ) {
          for (let q = 0; q < orders[i].Items.length; q++) {
            Flag = true;
            for (let z = 0; z < Items.length; z++) {
              if (orders[i].Items[q].ProductName === Items[z].ProductName) {
                Items[z].Cost += orders[i].Items[q].Cost;
                Items[z].Quantity += orders[i].Items[q].Quantity;
                Flag = false;
              }
            }
            if (Flag) {
              Items.push({
                ProductName: orders[i].Items[q].ProductName,
                Quantity: orders[i].Items[q].Quantity,
                Cost: orders[i].Items[q].Cost
              });
            }
          }
        }
      }
      for (let i = 0; i < Items.length; i++) {
        temp.push(
          <tr key={i}>
            <td>{Items[i].ProductName}</td>
            <td>{Items[i].Quantity}</td>
            <td>{Items[i].Cost}</td>
          </tr>
        );
      }
    }
    return temp;
  };

  if (!loading) {
    return (
      <Fragment>
        <div className="content card-plain FullBox">
          <h3 className="title">
            <b>Orders Report</b>
          </h3>
          <Grid fluid>
            <Row>
              <div className="col-md-8"></div>
              <div className="col-md-2">
                <Row>
                  <FormGroup>
                    <ControlLabel>Start Date</ControlLabel>
                    <FormControl
                      label="From"
                      name="StartDate"
                      type="date"
                      bsClass="form-control"
                      placeholder="Strat Date"
                      value={StartDate}
                      onChange={e => onChange(e)}
                    />
                  </FormGroup>
                </Row>
              </div>
              <div className="col-md-2">
                <Row>
                  <FormGroup>
                    <ControlLabel>End Date</ControlLabel>
                    <FormControl
                      label="End Date"
                      name="EndDate"
                      type="date"
                      bsClass="form-control"
                      placeholder="End Date"
                      value={EndDate}
                      onChange={e => onChange(e)}
                    />
                  </FormGroup>
                </Row>
              </div>
            </Row>
            <Row>
              <div className="text-center OrdersReportBox card">
                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th className="col-md-8 text-center">product Name</th>
                      <th className="col-md-2 text-center">Quantity</th>
                      <th className="col-md-2 text-center">Cost</th>
                    </tr>
                  </thead>
                  <tbody>{OrdersTable()}</tbody>
                </Table>
                <div className="clearfix" />
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
Report.prototype = {
  OrdersReportList: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  orders: state.ordersReport.orders,
  loading: state.ordersReport.loading
});

export default connect(
  mapStateToProps,
  { OrdersReportList }
)(Report);
