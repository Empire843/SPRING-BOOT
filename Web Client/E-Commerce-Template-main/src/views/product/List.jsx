import React, { lazy, Component } from "react";
// import { data } from "../../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "bootstrap";
import axios from "axios";
import Search from "../../components/Search";
const Paging = lazy(() => import("../../components/Paging"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterSize = lazy(() => import("../../components/filter/Size"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const FilterColor = lazy(() => import("../../components/filter/Color"));
const FilterTag = lazy(() => import("../../components/filter/Tag"));
const FilterClear = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() =>
  import("../../components/card/CardProductGrid")
);
const CardProductList = lazy(() =>
  import("../../components/card/CardProductList")
);

class ProductListView extends Component {
  state = {
    currentProducts: [],
    currentPage: null,
    totalPages: null,
    totalItems: 0,
    view: "list",
    pageLimit: 100,
    products: [],
    selectedCategories: [],
    selectedPrice: '',

  };

  // componentDidMount() {
  //   this.getProducts();
  // }


  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:8080/api/products/all");
      const products = await response.json();
      this.setState({
        products,
        currentProducts: products.slice(0, 100),
        totalItems: products.length,
        totalPages: Math.ceil(products.length / 100),
        currentPage: 1,
      });
    } catch (error) {
      console.error(error);
    }
  }

  onPageChanged = (page) => {
    const { currentPage, totalPages, pageLimit } = page;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = this.state.products.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  onChangeView = (view) => {
    this.setState({ view });
  };

  handleFilter = (filter) => {
    this.setState({ selectedCategories: filter.category });

  }
  handleFilter2 = (filter) => {
    this.setState({ selectedPrice: filter.price });

  }
  //"1,2,3,4"
  handleFilterSubmit = async () => {

    try {
      let { selectedCategories, selectedPrice } = this.state;


      const selectedPrices = selectedPrice.split('-');

      let _aaa = `http://localhost:8080/api/products/filter/combination?ids=${selectedCategories.join(',')}&start=${selectedPrices[0]}&end=${selectedPrices[1]}`;

      const response = await axios.get(_aaa);
      const products = response.data;
      console.log(" response.data ", response.data);
      this.setState({
        products,
        currentProducts: products.slice(0, 100),
        totalItems: products.length,
        totalPages: Math.ceil(products.length / 100),
        currentPage: 1,
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleSearch = (searchResults) => {
    const products = searchResults;
    this.setState({
      products,
      currentProducts: products.slice(0, 100),
      totalItems: products.length,
      totalPages: Math.ceil(products.length / 100),
      currentPage: 1,
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <div
          className="p-5 bg-primary bs-cover"
          style={{
            backgroundImage: "url(../../images/banner/50-Banner.webp)",
          }}
        >
          <div className="container text-center">
            <span className="display-5 px-3 bg-white rounded shadow">
              Electron-Category
            </span>
          </div>
        </div> */}
        <Breadcrumb />
        <div className="container-fluid mb-3">
          <div className="row">
            <div className="col-md-3">
              <FilterCategory onFilter={this.handleFilter} />
              {/* <p>Selected categories: {this.state.selectedCategories}</p> */}

              <FilterPrice onFilter={this.handleFilter2} />
              {/* <p>Selected Price: {this.state.selectedPrice}</p> */}
              <button
                type="button"
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  marginLeft: '100px'
                }}
                onClick={this.handleFilterSubmit}>

                Lọc

              </button>
            </div>
            <div className="col-md-9">
              <div style={{ justifyContent: "center", width: "80%" }} >
                <Search onSearch={this.handleSearch} />
              </div>
              <br></br>
              <div className="row">
                <div className="col-7">
                  <span className="align-middle fw-bold">
                    {this.state.totalItems} results for{" "}
                    <span className="text-warning">Product</span>
                  </span>
                </div>
                <div className="col-5 d-flex justify-content-end">

                  <div className="btn-group ms-3" role="group">
                    <button
                      aria-label="Grid"
                      type="button"
                      onClick={() => this.onChangeView("grid")}
                      className={`btn ${this.state.view === "grid"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        }`}
                    >
                      <FontAwesomeIcon icon={faTh} />
                    </button>
                    <button
                      aria-label="List"
                      type="button"
                      onClick={() => this.onChangeView("list")}
                      className={`btn ${this.state.view === "list"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        }`}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row g-3">
                {this.state.view === "grid" &&
                  this.state.currentProducts.map((product) => {
                    return (
                      <div className="col-md-4">
                        <CardProductGrid data={product} />
                      </div>
                    );
                  })}
                {this.state.view === "list" &&
                  this.state.currentProducts.map((product) => {
                    return (
                      <div className="col-md-12">
                        <CardProductList data={product} />
                      </div>
                    );
                  })}
              </div>
              <hr />
              <Paging
                totalRecords={this.state.totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={this.onPageChanged}
                sizing=""
                alignment="justify-content-center"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductListView;
