import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  ListGroupItem,
  ListGroup,
  OverlayTrigger,
  Popover,
  Well
} from "react-bootstrap";
import { menuList, modify_menu, modify_categories } from "../actions/Menu";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Menu = ({
  menuList,
  modify_menu,
  modify_categories,
  supplies,
  products,
  categories,
  loading
}) => {
  const [formData, setformData] = useState({
    SearchCategory: "all",
    Category: "",
    CategoryID: "",
    SuppliesConsumptionCount: 1,
    SuppliesConsumption: [
      {
        SupplyName: "",
        SupplyID: "",
        Quantity: "",
        QuantityUnit: ""
      }
    ],
    ProductID: "",
    ProductName: "",
    Cost: "",
    AddShow: false,
    EditShow: false,
    CategoryShow: false
  });
  const {
    SearchCategory,
    Category,
    CategoryID,
    SuppliesConsumptionCount,
    SuppliesConsumption,
    ProductID,
    ProductName,
    Cost,
    AddShow,
    EditShow,
    CategoryShow
  } = formData;

  const onChange = e =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    menuList();
  }, [menuList]);

  const onSubmit = async e => {
    e.preventDefault();
    modify_menu({
      ProductID,
      ProductName,
      Category,
      CategoryID,
      SuppliesConsumption,
      Cost
    });
    window.location.reload(false);
  };

  const handleAddShow = async e => {
    setformData({
      ...formData,
      AddShow: true,
      Category: "",
      CategoryID: "",
      SuppliesConsumptionCount: 1,
      SuppliesConsumption: [
        {
          SupplyName: "",
          SupplyID: "",
          Quantity: "",
          QuantityUnit: ""
        }
      ],
      ProductID: products.length,
      ProductName: "",
      Cost: ""
    });
  };

  const handleAddClose = () => {
    setformData({
      ...formData,
      AddShow: false
    });
  };

  const onCategorySubmit = async e => {
    e.preventDefault();
    modify_categories({ CategoryID, Category });
    window.location.reload(false);
  };

  const handleCategoryShow = async e => {
    setformData({
      ...formData,
      CategoryShow: true,
      Category: "",
      CategoryID: categories.length
    });
  };

  const handleCategoryClose = () => {
    setformData({
      ...formData,
      CategoryShow: false
    });
  };

  const handleEditShow = async e => {
    setformData({
      ...formData,
      EditShow: true,
      Category: products[e.target.value].Category,
      CategoryID: products[e.target.value].CategoryID,
      SuppliesConsumptionCount:
        products[e.target.value].SuppliesConsumption.length,
      SuppliesConsumption: products[e.target.value].SuppliesConsumption,
      ProductID: products[e.target.value].ProductID,
      ProductName: products[e.target.value].ProductName,
      Cost: products[e.target.value].Cost
    });
  };

  const handleEditClose = () => {
    setformData({
      ...formData,
      EditShow: false
    });
  };

  const onSelect = async e => {
    e.preventDefault();
    setformData({
      ...formData,
      SearchCategory: categories[e.target.value].CategoryName
    });
  };

  const selectList = () => {
    let temp = [];
    if (!loading) {
      for (let i = 0; i < categories.length; i++) {
        temp.push(
          <ListGroupItem
            key={i}
            value={i}
            onClick={onSelect}
            style={{ fontSize: 16, textAlign: "center" }}
            className={
              categories[i].CategoryName === SearchCategory ? "active" : null
            }
          >
            {categories[i].CategoryName}
          </ListGroupItem>
        );
      }
    }
    return temp;
  };

  const suppliesList = () => {
    let temp = [];
    for (let i = 0; i < supplies.length; i++) {
      temp.push(
        <option key={i} value={i}>
          {supplies[i].ProductName}
        </option>
      );
    }
    return temp;
  };

  const SuppliesCount = () => {
    let temp = [];
    if (!loading) {
      for (let i = 0; i < SuppliesConsumptionCount; i++) {
        temp.push(
          <Fragment key={i}>
            <Row>
              <div className="col-md-6">
                <Row>
                  <select
                    className="form-control"
                    onChange={e => {
                      let TempSupplySelect = SuppliesConsumption;
                      TempSupplySelect[i].SupplyName =
                        supplies[e.target.value].ProductName;

                      TempSupplySelect[i].SupplyID =
                        supplies[e.target.value].ProductID;

                      TempSupplySelect[i].QuantityUnit =
                        supplies[e.target.value].QuantityType;
                      setformData({
                        ...formData,
                        SuppliesConsumption: TempSupplySelect
                      });
                    }}
                    defaultValue={SuppliesConsumption[i].SupplyID}
                  >
                    <option value="" disabled>
                      Select Required Supply
                    </option>
                    {suppliesList()}
                  </select>
                </Row>
              </div>
              <div className="col-md-4">
                <Row>
                  <FormGroup>
                    <FormControl
                      label="Consumption Quantity"
                      type="number"
                      bsClass="form-control"
                      placeholder="Consumption Quantity"
                      value={SuppliesConsumption[i].Quantity}
                      onChange={e => {
                        let TempQuantity = SuppliesConsumption;
                        TempQuantity[i].Quantity = e.target.value;
                        setformData({
                          ...formData,
                          SuppliesConsumption: TempQuantity
                        });
                      }}
                    />
                  </FormGroup>
                </Row>
              </div>
              <div className="col-md-2">
                <Row>
                  <Well className="form-control">
                    {SuppliesConsumption[i].QuantityUnit}
                  </Well>
                </Row>
              </div>
            </Row>
          </Fragment>
        );
      }
    }
    return temp;
  };

  const AddSupply = async () => {
    SuppliesConsumption.push({
      SupplyName: "",
      SupplyID: "",
      Quantity: "",
      QuantityUnit: ""
    });
    let temp = SuppliesConsumptionCount + 1;
    setformData({
      ...formData,
      SuppliesConsumptionCount: temp
    });
  };

  const RemoveSupply = async () => {
    let temp;
    if (SuppliesConsumptionCount - 1 > 0) {
      temp = SuppliesConsumptionCount - 1;
      SuppliesConsumption.splice(SuppliesConsumption.length - 1, 1);
    } else {
      temp = SuppliesConsumptionCount;
    }
    setformData({
      ...formData,
      SuppliesConsumptionCount: temp
    });
  };

  const onCategorySelect = async e => {
    e.preventDefault();
    setformData({
      ...formData,
      Category: categories[e.target.value].CategoryName,
      CategoryID: e.target.value
    });
  };

  const CategoriesList = () => {
    let temp = [];
    if (!loading) {
      for (let i = 0; i < categories.length; i++) {
        temp.push(
          <option key={i} value={i}>
            {categories[i].CategoryName}
          </option>
        );
      }
    }
    return temp;
  };

  const MenuTable = () => {
    let temp = [];
    let PopoverTemp = [];
    if (!loading) {
      for (let i = 0; i < products.length; i++) {
        if (
          SearchCategory === "all" ||
          SearchCategory === products[i].Category
        ) {
          PopoverTemp = [];
          for (let q = 0; q < products[i].SuppliesConsumption.length; q++) {
            PopoverTemp.push(
              <tr key={q}>
                <td className="text-center" style={{ fontSize: 15 }}>
                  {products[i].SuppliesConsumption[q].SupplyName}
                </td>
                <td className="text-center" style={{ fontSize: 14 }}>
                  {products[i].SuppliesConsumption[q].Quantity}{" "}
                  {products[i].SuppliesConsumption[q].QuantityUnit}
                </td>
              </tr>
            );
          }
          temp.push(
            <tr key={i}>
              <td>{products[i].ProductID}</td>
              <td>{products[i].Category}</td>
              <td>{products[i].ProductName}</td>
              <td>{products[i].Cost} egp</td>
              <td>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-positioned-top">
                      {
                        <Row>
                          <Table striped condensed hover>
                            <thead>
                              <tr>
                                <th
                                  className="col-md-8 text-center"
                                  style={{ fontSize: 14 }}
                                >
                                  Supply Name
                                </th>
                                <th
                                  className="col-md-4 text-center"
                                  style={{ fontSize: 14 }}
                                >
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody>{PopoverTemp}</tbody>
                          </Table>
                        </Row>
                      }
                    </Popover>
                  }
                >
                  <Button bsStyle="default" className=" btn-simple btn-xsmall">
                    Supplies
                  </Button>
                </OverlayTrigger>
                <Button
                  bsStyle="default"
                  className=" btn-simple"
                  onClick={handleEditShow}
                  value={i}
                >
                  Edit
                </Button>
                <Modal show={EditShow}>
                  <form onSubmit={onSubmit}>
                    <Modal.Header>
                      <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <br></br>
                      <Grid fluid>
                        <Row>
                          <div className="col-md-2">
                            <Row>
                              <FormGroup>
                                <ControlLabel>Product ID</ControlLabel>
                                <FormControl
                                  label="Product ID"
                                  name="ProductID"
                                  type="number"
                                  bsClass="form-control"
                                  placeholder="Product Name"
                                  disabled={true}
                                  value={ProductID}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Row>
                          </div>
                          <div className="col-md-10">
                            <Row>
                              <FormGroup>
                                <ControlLabel>Product Name</ControlLabel>
                                <FormControl
                                  label="Product Name"
                                  name="ProductName"
                                  type="text"
                                  bsClass="form-control"
                                  placeholder="Product Name"
                                  value={ProductName}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Row>
                          </div>
                        </Row>
                        <Row>
                          <br></br>
                          <div className="col-md-6">
                            <Row>
                              <FormGroup>
                                <ControlLabel>Product Category</ControlLabel>
                                <select
                                  className="form-control"
                                  onChange={onCategorySelect}
                                  value={CategoryID}
                                >
                                  <option value="" disabled>
                                    Select Product Category
                                  </option>
                                  {CategoriesList()}
                                </select>
                              </FormGroup>
                            </Row>
                          </div>
                          <div className="col-md-6">
                            <Row>
                              <FormGroup>
                                <ControlLabel>Product Cost</ControlLabel>
                                <FormControl
                                  label="Product Cost"
                                  name="Cost"
                                  type="number"
                                  bsClass="form-control"
                                  placeholder="Product Cost"
                                  value={Cost}
                                  onChange={e => onChange(e)}
                                />
                              </FormGroup>
                            </Row>
                          </div>
                        </Row>
                        {SuppliesCount()}
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
                        className="pull-right btn-simple"
                        onClick={AddSupply}
                      >
                        Add
                      </Button>
                      <Button
                        bsStyle="warning"
                        className="pull-right btn-simple"
                        onClick={RemoveSupply}
                      >
                        Remove
                      </Button>
                      <Button
                        bsStyle="danger"
                        className="pull-right btn-simple"
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
    }
    return temp;
  };

  if (!loading) {
    return (
      <Fragment>
        <div className="content">
          <h3 className="title">
            <b>Menu</b>
          </h3>
          <Grid fluid>
            <Row>
              <Col md={10}>
                <Row>
                  <div className="text-center MenuBox card">
                    <Table striped bordered condensed hover>
                      <thead>
                        <tr>
                          <th className="col-md-1 text-center">Product ID</th>
                          <th className="col-md-2 text-center">
                            Product Category
                          </th>
                          <th className="col-md-6 text-center">Product Name</th>
                          <th className="col-md-1 text-center">Cost</th>
                          <th className="col-md-2 text-center"></th>
                        </tr>
                      </thead>
                      <tbody>{MenuTable()}</tbody>
                    </Table>
                    <div className="clearfix" />
                  </div>
                  <br></br>
                </Row>
                <Row>
                  <Button
                    className="pull-right btn-round btn-simple btn-fill"
                    onClick={handleAddShow}
                  >
                    New Product
                  </Button>
                  <Modal show={AddShow}>
                    <form onSubmit={onSubmit}>
                      <Modal.Header>
                        <Modal.Title>New Product</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <br></br>
                        <Grid fluid>
                          <Row>
                            <div className="col-md-12">
                              <Row>
                                <FormControl
                                  label="Product Name"
                                  name="ProductName"
                                  type="text"
                                  bsClass="form-control"
                                  placeholder="Product Name"
                                  value={ProductName}
                                  onChange={e => onChange(e)}
                                />
                              </Row>
                            </div>
                          </Row>
                          <Row>
                            <br></br>
                            <div className="col-md-6">
                              <Row>
                                <FormGroup>
                                  <ControlLabel>Product Category</ControlLabel>
                                  <select
                                    className="form-control"
                                    onChange={onCategorySelect}
                                    value={CategoryID}
                                  >
                                    <option value="" disabled>
                                      Select Product Category
                                    </option>
                                    {CategoriesList()}
                                  </select>
                                </FormGroup>
                              </Row>
                            </div>
                            <div className="col-md-6">
                              <Row>
                                <FormGroup>
                                  <ControlLabel>Product Cost</ControlLabel>
                                  <FormControl
                                    label="Product Cost"
                                    name="Cost"
                                    type="number"
                                    bsClass="form-control"
                                    placeholder="Product Cost"
                                    value={Cost}
                                    onChange={e => onChange(e)}
                                  />
                                </FormGroup>
                              </Row>
                            </div>
                          </Row>
                          {SuppliesCount()}
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
                          className="pull-right btn-simple"
                          onClick={AddSupply}
                        >
                          Add
                        </Button>
                        <Button
                          bsStyle="warning"
                          className="pull-right btn-simple"
                          onClick={RemoveSupply}
                        >
                          Remove
                        </Button>
                        <Button
                          bsStyle="danger"
                          className="pull-right btn-simple"
                          onClick={handleAddClose}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                  <Button
                    className="pull-right btn-simple"
                    onClick={handleCategoryShow}
                  >
                    New Category
                  </Button>
                  <Modal show={CategoryShow}>
                    <form onSubmit={onCategorySubmit}>
                      <Modal.Header>
                        <Modal.Title>New Products Category</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <br></br>
                        <Grid fluid>
                          <Row>
                            <div className="col-md-12">
                              <Row>
                                <FormGroup>
                                  <ControlLabel>Category Name</ControlLabel>
                                  <FormControl
                                    label="Category Name"
                                    name="Category"
                                    type="text"
                                    bsClass="form-control"
                                    placeholder="Category Name"
                                    value={Category}
                                    onChange={e => onChange(e)}
                                  />
                                </FormGroup>
                              </Row>
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
                          className="pull-right btn-simple"
                          onClick={handleCategoryClose}
                        >
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Modal>
                </Row>
              </Col>
              <Col md={2}>
                <div className="listBox">
                  <ListGroup>{selectList()}</ListGroup>
                </div>
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
Menu.prototype = {
  menuList: PropTypes.func.isRequired,
  modify_menu: PropTypes.func.isRequired,
  modify_categories: PropTypes.func.isRequired,
  supplies: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  supplies: state.menu.supplies,
  products: state.menu.products,
  categories: state.menu.categories,
  loading: state.menu.loading
});
export default connect(
  mapStateToProps,
  {
    menuList,
    modify_menu,
    modify_categories
  }
)(Menu);
