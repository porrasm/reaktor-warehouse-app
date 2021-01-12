import { stringify } from 'querystring';
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Alert, Table, Col, Row, Card } from 'react-bootstrap'
import { Container, Grid, Menu, Rail, Segment, Dropdown, Item, Message, List } from 'semantic-ui-react'
import productApi from '../services/productApi'

interface IViewState {
  category: string,
  selectedProduct: IProduct | null,
  products: { [name: string]: Array<IProduct> },
  availability: { [name: string]: { [name: string]: string } }
}
interface IProduct {
  id: string,
  type: string,
  name: string,
  color: Array<string>,
  price: number,
  manufacturer: string
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

                <Rail position="left">{this.getCategoryDropdown(this.categories)}</Rail>
                <Rail position="right">{this.productInfo(this.state.selectedProduct)}</Rail>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }


  //#region views
  getCategoryDropdown = (categories: Array<string>) => {
    let key = 0


    return <Dropdown
      placeholder="Select category"
      fluid
      selection
      onChange={(event, data) => this.enableCategory(data.value as string)}
      options={categories.map(c => {
        return {
          key: c,
          text: this.categoryToString(c),
          value: c
        }
      })}
    />
  }

  getProductListing = (products: Array<IProduct>) => {
    if (!products) {
      return
    } else if (products.length == 0) {
      return <Alert>Loading...</Alert>
    } else {

      return (
        <List divided>
          {products.map(p => {
            return <List.Item onClick={() => this.selectProduct(p)}>
              <List.Content>
                <List.Header as='a'>{p.name}</List.Header>
                <List.Description>Manufacturer: {p.manufacturer}</List.Description>
                <List.Description>Price: {p.price}</List.Description>
              </List.Content>
            </List.Item>
          })}
        </List>
      )
    }
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
    console.log("Selected product: ", selectedProduct.name)
    this.setState({ selectedProduct })
    if (!this.state.availability[selectedProduct.manufacturer]) {
      const availability = this.state.availability
      const productAvailability = await productApi.getManufacturerAvailability(selectedProduct.manufacturer)
      availability[selectedProduct.manufacturer] = productAvailability
      this.setState({ availability })
    }
  }

  enableCategory = async (category: string) => {

    this.setState({ category })

    if (this.state.products[category].length > 0) {
      return
    }

    console.log("Enabled category: ", category)

    const products = await productApi.getCategoryProducts(category)

    const productDict = this.state.products
    productDict[category] = products

    this.setState({ products: productDict })
  }

  categoryToString = (cat: string) => {
    return cat.substring(0, 1).toUpperCase() + cat.substring(1)
  }
  //#endregion
}



export default Listing