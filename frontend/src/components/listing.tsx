import { stringify } from 'querystring';
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown, Alert } from 'react-bootstrap'
import productApi from '../services/productApi'

interface IState {
    category: string,
    categories: {[name: string]: Array<IProduct>}
}
interface IProduct {
    id: string,
    type: string,
    name: string,
    color: Array<string>,
    price: number,
    manufacturer: string
}

class Listing extends React.Component<any, IState> {

  categories = ["gloves", "facemasks", "beanies"]

  constructor(props: any) {
    super(props)

    const categoryDict: {[name: string]: Array<IProduct>} = {}
    this.categories.forEach(c => {
      categoryDict[c] = []
    });

    this.state = {
      category: "",
      categories: categoryDict
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

          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.category ? "Category: " + this.categoryToString(this.state.category) : "Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {this.getCategoryDropdown(this.categories)}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>


          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>

        {this.getProductListing(this.state.categories[this.state.category])}
      </div>
    );


  }
  
  //#region utility
  getCategoryDropdown = (categories: Array<string>) => {
    let key = 0
    return categories.map(cat => {
      return <Dropdown.Item key={key++} onClick={() => this.enableCategory(cat)}>{this.categoryToString(cat)}</Dropdown.Item>
    })
  }

  getProductListing = (products: Array<IProduct>) => {
    if (!products) {
      return <Alert>Loading...</Alert>
    } else {
      return (
        <li>
          {products.slice(0, 10).map(p => {
            return <p>{p.name}</p>
          })}
        </li>
      )
    }
  }

  categoryToString = (cat: string) => {
    return cat.substring(0, 1).toUpperCase() + cat.substring(1)
  }

  enableCategory = async (category: string) => {

    this.setState({ category })

    if (this.state.categories[category].length > 0) {
      return
    }

    console.log("Enabled category: ", category)
    
    const products = await productApi.getCategoryProducts(category)
    const newCategoryDict = this.state.categories
    newCategoryDict[category] = products

    this.setState({categories: newCategoryDict})
  }
  //#endregion
}

export default Listing