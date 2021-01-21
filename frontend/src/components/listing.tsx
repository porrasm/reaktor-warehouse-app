import React from 'react';
import { Container, Grid, Rail, Segment, Message } from 'semantic-ui-react'
import productApi from '../services/productApi'
import { IProduct } from '../../../general_types'
import { ProductInfo, ProductList } from './product'
import SideBar from './sidebar'

export interface IViewState {
  loadingMessage: string,
  category: string,
  manufacturer: string,
  manufacturers: string[],
  products: IProduct[],
  selectedProduct: IProduct | null,
  page: number,
  filter: string
}

class Listing extends React.Component<any, IViewState> {

  pageItemCount = 20
  categories = ["gloves", "facemasks", "beanies"]

  constructor(props: any) {
    super(props)

    const productDict: { [name: string]: Array<IProduct> } = {}
    this.categories.forEach(c => {
      productDict[c] = []
    });

    this.state = {
      loadingMessage: "",
      category: "",
      manufacturer: "",
      manufacturers: [],
      products: [],
      selectedProduct: null,
      page: 1,
      filter: ""
    }
  }

  render() {

    return (
      <div>
        <Container>
          <Grid centered columns={3}>
            <Grid.Column>
              <Segment>
                <ProductList products={this.state.products} clickHandler={this.selectProduct} />

                <Rail position="left">
                  <SideBar
                    currentCategory={this.state.category}
                    categories={this.categories}
                    selectCategory={this.selectCategory}
                    currentManufacturer={this.state.manufacturer}
                    manufacturers={this.state.manufacturers}
                    selectManufacturer={this.selectManufacturer}
                    updateFilter={this.updateFilter}
                    page={this.state.page}
                    pageCount={this.getCurrentPageCount()}
                    selectPage={this.selectPage}
                    loadingMessage={this.state.loadingMessage}
                  />
                </Rail>

                <Rail position="right">
                  {this.state.selectedProduct ? <ProductInfo product={this.state.selectedProduct} />
                    : <Message><Message.Content>Select a product for more information</Message.Content></Message>}
                </Rail>

              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }


  //#region utility
  selectPage = (page: number) => {
    console.log("Select page: ", page)
    this.updateProducts(page, this.state.filter)
  }

  updateFilter = (filter: string) => {
    this.updateProducts(1, filter)
  }

  updateProducts = async (page: number = 1, filter: string = "") => {
    console.log("Update products with page: ", page)
    this.setState({ loadingMessage: "Loading products...", products: [] })
    const products = await productApi.getProducts(this.state.category, this.state.manufacturer, page, filter)
    this.setState({ products, loadingMessage: "", page, filter })
  }

  getCurrentPageCount = () => {
    return 100000
    return Math.ceil(this.state.products.length / this.pageItemCount)
  }

  selectProduct = async (selectedProduct: IProduct) => {
    console.log("Selected product: ", selectedProduct)
    this.setState({ selectedProduct })
  }

  selectCategory = async (category: string) => {
    const prevCategory = this.state.category
    this.setState({ category, loadingMessage: "Loading manufacturers..." })
    console.log("Enabled category: ", category)

    const manufacturers = await productApi.getManufacturers(category)
    this.setState({ manufacturers, loadingMessage: "" })

    if (manufacturers.length == 0) {
      window.alert("There seems to be an error accessing the API. Please try again.")
      return
    }

    this.selectManufacturer(manufacturers[0])
  }

  selectManufacturer = async (manufacturer: string) => {
    this.setState({ manufacturer })
    console.log("Enabled manufacturer: ", manufacturer)
    this.updateProducts()
  }
  //#endregion
}

export default Listing