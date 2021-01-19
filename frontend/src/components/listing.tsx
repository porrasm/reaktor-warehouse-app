import { stringify } from 'querystring';
import React from 'react';
import { Container, Grid, Menu, Rail, Segment, Dropdown, Item, Message, List, Icon, Input, Pagination, Button } from 'semantic-ui-react'
import productApi from '../services/productApi'
import { IProduct } from '../services/productApi'

export interface IViewState {
  message: string,
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
  timer: any = null
  filterUpdate: string = ""

  constructor(props: any) {
    super(props)

    const productDict: { [name: string]: Array<IProduct> } = {}
    this.categories.forEach(c => {
      productDict[c] = []
    });

    this.state = {
      message: "",
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
                {this.state.message == "" ? "" : <Message onClick={() => this.setState({ message: "" })}><Message.Content>{this.state.filter}</Message.Content></Message>}
                {this.getProductListing(this.state.products[this.state.category])}

                <Rail position="left">{this.leftRail()}</Rail>
                <Rail position="right">{this.productInfo(this.state.selectedProduct)}</Rail>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }


  //#region views
  leftRail = () => {

    const pageCount = this.getCurrentPageCount()

    return <div>
      {this.getCategoryDropdown(this.categories)}
      {this.getManufacturerDropdown()}
      &nbsp;
      <Input icon='search'
        style={{ width: "272px" }}
        onChange={(e, data) => this.filterUpdate = data.value}>
        <input />
        <Button type='submit' onClick={this.filterSearch}>Search</Button>
      </Input>
      &nbsp;
      {pageCount > 0 ? <Pagination
        style={{ width: "272px" }}
        boundaryRange={0}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={pageCount}
        activePage={this.state.page + 1}
        onPageChange={(e, data) => { this.setState({ page: Number(data.activePage) - 1 }) }}
      /> : ""}

      &nbsp;
      {this.state.loadingMessage.length == 0 ? "" : <Message icon><Icon name='circle notched' loading /><Message.Content>{this.state.loadingMessage}</Message.Content></Message>}
    </div >
  }

  getCategoryDropdown = (categories: Array<string>) => {
    return <Dropdown
      placeholder="Select category"
      fluid
      selection
      value={this.state.category}
      onChange={(event, data) => this.selectCategory(data.value as string)}
      options={categories.map(c => {
        return {
          key: c,
          text: this.categoryToString(c),
          value: c
        }
      })}
    />
  }

  getManufacturerDropdown = () => {
    const manufacturers = this.getAvailableManufacturers(this.state.products[this.state.category])
    return <Dropdown
      placeholder="Select Manufacturer"
      fluid
      selection
      value={this.state.manufacturer}
      onChange={(event, data) => this.selectManufacturer(data.value as string)}
      options={manufacturers.map(c => {
        return {
          key: c,
          text: this.categoryToString(c),
          value: c
        }
      })}
    />
  }

  getProductListing = (products: Array<IProduct>) => {
    const page = this.state.page * this.pageItemCount
    if (!products) {
      return
    } else {

      return (
        <List divided>
          {products.filter(p => {
            return this.state.manufacturer == p.manufacturer && p.name.toLocaleLowerCase().includes(this.state.filter.toLowerCase())
          }).slice(page, page + this.pageItemCount)
            .map(p => {
              const availability: string | Element = this.getProductAvailability(p)
              return <List.Item key={p.id} onClick={() => this.selectProduct(p)}>
                <List.Content>
                  <List.Header as='a'>{p.name}</List.Header>
                  {availability == "" ? "" : <List.Description>Availability: {availability}</List.Description>}

                  <List.Description>Price: {p.price}</List.Description>
                </List.Content>
              </List.Item>
            })}
        </List>
      )
    }
  }

  getProductAvailability = (p: IProduct) => {
    if (!this.state.availability[p.manufacturer]) {
      return ""
    }
    const availability = this.state.availability[p.manufacturer][p.id]
    return availability ? availability : "Error"
  }

  productInfo = (product: IProduct | null) => {
    if (!product) {
      return <Message>Select a product to view more info</Message>
    }
    return <Container>
      <Item>
        <Item.Content>
          <Item.Header>{product.name}</Item.Header>
          <Item.Description>
            Availability: {this.getProductAvailability(product)}
          </Item.Description>
          <Item.Description>
            Price: {product.price}
          </Item.Description>
          <Item.Description>
            Manufacturer: {product.manufacturer}
          </Item.Description>
          <Item.Description>
            Color: {product.color.join(", ")}
          </Item.Description>
          <Item.Description>
            Type: {product.type}
          </Item.Description>
          <Item.Description>
            ID: {product.id}
          </Item.Description>
        </Item.Content>
      </Item>
    </Container>
  }
  //#endregion

  //#region utility
  filterSearch = () => {
    this.setState({ filter: this.filterUpdate, page: 0 })
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

  getAvailableManufacturers = (products: Array<IProduct>): string[] => {
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

  categoryToString = (cat: string) => {
    return cat.substring(0, 1).toUpperCase() + cat.substring(1)
  }
  //#endregion
}

export default Listing