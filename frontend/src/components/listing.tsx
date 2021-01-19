import { stringify } from 'querystring';
import React from 'react';
import { Container, Grid, Rail, Segment, Message } from 'semantic-ui-react'
import productApi from '../services/productApi'
import { IProduct } from '../services/productApi'
import { ProductInfo, ProductList } from './product'
import SideBar from './sidebar'

export interface IViewState {
  loadingMessage: string,
  category: string,
  manufacturer: string,
  selectedProduct: IProduct | null,
  products: { [name: string]: Array<IProduct> },
  availability: { [name: string]: { [name: string]: string } },
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
      selectedProduct: null,
      products: productDict,
      availability: {},
      page: 0,
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
                <ProductList products={this.filterProducts(this.getCurrentCategory()).map(p => {
                  return {
                    product: p,
                    availability: this.getProductAvailability(p)
                  }
                })} clickHandler={this.selectProduct} />

                <Rail position="left">
                  <SideBar
                    currentCategory={this.state.category}
                    categories={this.categories}
                    selectCategory={this.selectCategory}
                    currentManufacturer={this.state.manufacturer}
                    manufacturers={this.getAvailableManufacturers(this.getCurrentCategory())}
                    selectManufacturer={this.selectManufacturer}
                    updateFilter={this.updateFilter}
                    page={this.state.page}
                    pageCount={this.getCurrentPageCount()}
                    selectPage={this.selectPage}
                    loadingMessage={this.state.loadingMessage}
                  />
                </Rail>

                <Rail position="right">
                  {this.state.selectedProduct ? <ProductInfo product={this.state.selectedProduct} availability={this.getProductAvailability(this.state.selectedProduct)} />
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
  getCurrentCategory = () => {
    return this.state.products[this.state.category]
  }

  filterProducts = (products: IProduct[]) => {
    const page = this.state.page * this.pageItemCount
    return products.filter(p => {
      return this.state.manufacturer == p.manufacturer && p.name.toLocaleLowerCase().includes(this.state.filter.toLowerCase())
    }).slice(page, page + this.pageItemCount)
  }

  getProductAvailability = (p: IProduct) => {
    if (!this.state.availability[p.manufacturer]) {
      return ""
    }
    const availability = this.state.availability[p.manufacturer][p.id]
    return availability ? availability : "Error"
  }

  selectPage = (page: number) => {
    this.setState({ page })
  }

  updateFilter = (filter: string) => {
    this.setState({ filter, page: 0 })
  }

  getCurrentPageCount = () => {
    const products = this.state.products[this.state.category]
    if (!products) {
      return 0
    }
    return Math.ceil(products.length / this.pageItemCount)
  }

  selectProduct = async (selectedProduct: IProduct) => {
    console.log("Selected product: ", selectedProduct)
    this.setState({ selectedProduct })
  }

  selectCategory = async (category: string) => {
    const prevCategory = this.state.category

    if (this.state.products[category].length > 0) {
      this.setState({ category, page: 0 })
      return
    }
    this.setState({ category, loadingMessage: "Loading products...", page: 0 })

    console.log("Enabled category: ", category)

    const products = (await productApi.getCategoryProducts(category)).sort((a, b) => a.name.localeCompare(b.name))
    if (products.length == 0) {
      window.alert("There seems to be a problem accessing the database. Please try again later.")
      this.setState({ category: prevCategory, loadingMessage: "" })
      return
    }

    const manufacturer = products.length > 0 ? this.getAvailableManufacturers(products)[0] : ""

    const productDict = this.state.products
    productDict[category] = products

    this.setState({ products: productDict, loadingMessage: "" })
    this.selectManufacturer(manufacturer)
  }

  selectManufacturer = async (manufacturer: string) => {
    console.log("Selected manufacturer: ", manufacturer)

    if (manufacturer == "") {
      return
    }

    if (this.state.availability[manufacturer]) {
      console.log("Already got information from manufacturer: ", manufacturer)
      this.setState({ manufacturer, page: 0 })
      return
    }
    this.setState({ manufacturer, loadingMessage: "Loading stock data...", page: 0 })

    const manAvailabilityArray = await productApi.getManufacturerAvailability(manufacturer)
    if (manAvailabilityArray.length == 0) {
      if (manufacturer === this.state.manufacturer) {
        window.alert("The availability data could not be accessed. There might be a problem with the database. Please try again later.")
      }
      return
    }

    console.log("Received availability array: ", manAvailabilityArray)
    const manAvailability: { [name: string]: string } = {}
    manAvailabilityArray.forEach(a => {
      manAvailability[a.id.toLowerCase()] = a.availability
    });

    const availability = this.state.availability
    availability[manufacturer] = manAvailability
    this.setState({ availability, loadingMessage: "" })
  }

  getAvailableManufacturers = (products: IProduct[]): string[] => {
    if (!products) {
      return []
    }
    const hs = new Set<string>()
    products.forEach(p => {
      hs.add(p.manufacturer)
    });
    const manufacturers: string[] = []
    hs.forEach(m => {
      manufacturers.push(m)
    })
    return manufacturers.sort()
  }
  //#endregion
}

export default Listing