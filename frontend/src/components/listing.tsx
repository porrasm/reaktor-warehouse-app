import { stringify } from 'querystring';
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Alert, Table, Col, Row, Card } from 'react-bootstrap'
import { Container, Grid, Menu, Rail, Segment, Dropdown, Item, Message, List } from 'semantic-ui-react'
import productApi from '../services/productApi'
import { IProduct } from '../services/productApi'

export interface IViewState {
  category: string,
  manufacturer: string,
  selectedProduct: IProduct | null,
  products: { [name: string]: Array<IProduct> },
  availability: { [name: string]: { [name: string]: string } }
}

class Listing extends React.Component<any, IViewState> {

  categories = ["gloves", "facemasks", "beanies"]

  constructor(props: any) {
    super(props)

    const productDict: { [name: string]: Array<IProduct> } = {}
    this.categories.forEach(c => {
      productDict[c] = []
    });

    this.state = {
      category: "",
      manufacturer: "",
      selectedProduct: null,
      products: productDict,
      availability: {}
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <p>test</p>
          </Nav>

          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>

        <Container>
          <Grid centered columns={3}>
            <Grid.Column>
              <Segment>
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

  leftRail = () => {
    return <div>
      {this.getCategoryDropdown(this.categories)}
      {this.getManufacturerDropdown()}
    </div>
  }



  //#region views
  getCategoryDropdown = (categories: Array<string>) => {
    return <Dropdown
      placeholder="Select category"
      fluid
      selection
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

  getProductListing = (products: Array<IProduct>) => {
    if (!products) {
      return
    } else if (products.length == 0) {
      return <Alert>Loading...</Alert>
    } else {

      return (
        <List divided>
          {products.filter(p => {
            return this.state.manufacturer == p.manufacturer
          }).map(p => {
            return <List.Item onClick={() => this.selectProduct(p)}>
              <List.Content>
                <List.Header as='a'>{p.name}</List.Header>
                <List.Description>availability: {this.getProductAvailability(p)}</List.Description>
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
      return "Loading..."
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
            Color: {product.color}
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
  selectProduct = async (selectedProduct: IProduct) => {
    console.log("Selected product: ", selectedProduct)
    this.setState({ selectedProduct })
  }

  selectCategory = async (category: string) => {
    this.setState({ category })

    if (this.state.products[category].length > 0) {
      return
    }

    console.log("Enabled category: ", category)

    const products = (await productApi.getCategoryProducts(category)).sort((a, b) => a.name.localeCompare(b.name))

    const manufacturer = products.length > 0 ? this.getAvailableManufacturers(products)[0] : ""

    const productDict = this.state.products
    productDict[category] = products

    this.setState({ products: productDict })
    this.selectManufacturer(manufacturer)
  }

  selectManufacturer = async (manufacturer: string) => {
    console.log("Selected manufacturer: ", manufacturer)

    this.setState({ manufacturer })
    if (manufacturer == "") {
      return
    }

    if (this.state.availability[manufacturer]) {
      console.log("Already got information from manufacturer: ", manufacturer)
      return
    }

    const manAvailabilityArray = await productApi.getManufacturerAvailability(manufacturer)
    console.log("Received availability array: ", manAvailabilityArray)
    const manAvailability: { [name: string]: string } = {}
    manAvailabilityArray.forEach(a => {
      manAvailability[a.id.toLowerCase()] = a.availability
    });

    const availability = this.state.availability
    availability[manufacturer] = manAvailability
    this.setState({ availability })
  }

  categoryToString = (cat: string) => {
    return cat.substring(0, 1).toUpperCase() + cat.substring(1)
  }
  //#endregion
}



export default Listing