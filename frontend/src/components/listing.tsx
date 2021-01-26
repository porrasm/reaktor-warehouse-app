import React from 'react';
import { Container, Grid, Rail, Segment, Message } from 'semantic-ui-react'
import productApi from '../services/productApi'
import { IProduct } from '../../../general_types'
import { ProductInfo, ProductList } from './product'
import SideBar from './sidebar'

export interface IViewState {
  categories: string[]
  loadingMessage: string
  category: string
  manufacturer: string
  manufacturers: string[]
  products: IProduct[]
  selectedProduct: IProduct | null
  page: number
  filter: string
}

interface IProductUpdateParams {
  category?: string
  manufacturer?: string
  page?: number
  filter?: string
}

class Listing extends React.Component<any, IViewState> {

  pageItemCount = 20

  constructor(props: any) {
    super(props)

    this.state = {
      categories: [],
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

  componentDidMount() {
    this.loadCategories()
  }
  loadCategories = async () => {
    const categories = await productApi.getCategories()
    this.setState({ categories })
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
                    categories={this.state.categories}
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
    this.updateProducts({ page, filter: this.state.filter })
  }

  updateFilter = (filter: string) => {
    this.updateProducts({ page: 1, filter })
  }

  getCurrentPageCount = () => {
    return 100000
    return Math.ceil(this.state.products.length / this.pageItemCount)
  }

  selectManufacturer = async (manufacturer: string) => {
    console.log("Enabled manufacturer: ", manufacturer)
    this.setState({ manufacturer })
    this.updateProducts({ manufacturer })
  }
  //#endregion

  //#region state
  selectCategory = async (category: string) => {
    const prevCategory = this.state.category
    this.setState({ category, loadingMessage: "Loading manufacturers..." })
    console.log("Enabled category: ", category)

    const manufacturers = await productApi.getManufacturers(category)
    this.setState({ manufacturers })

    if (manufacturers.length == 0) {
      window.alert("There seems to be an error accessing the API. Please try again.")
      return
    }

    this.updateProducts({ category, manufacturer: manufacturers[0] })
  }

  updateProducts = async ({ category = this.state.category, manufacturer = this.state.manufacturer, page = 1, filter = "" }: IProductUpdateParams) => {
    console.log("Update products with page: ", page)
    this.setState({ loadingMessage: "Loading products...", products: [] })
    const products = await productApi.getProducts(category, manufacturer, page, filter)
    this.setState({ products, loadingMessage: "", category, manufacturer, page, filter })
  }

  selectProduct = async (selectedProduct: IProduct) => {
    console.log("Selected product: ", selectedProduct)
    this.setState({ selectedProduct })
  }
  //#endregion
}

export default Listing