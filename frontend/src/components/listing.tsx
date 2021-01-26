import React, { useEffect } from 'react';
import { Container, Grid, Rail, Segment, Message } from 'semantic-ui-react'
import productApi from '../services/productApi'
import { IProduct } from '../../../general_types'
import { ProductInfo, ProductList } from './product'
import SideBar from './sidebar'

export interface IViewState {
  categories: string[] | null
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

const defaultState = (): IViewState => {
  return {
    categories: null,
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

const Listing: React.FC = () => {

  const [state, setState] = React.useState<IViewState>(defaultState())

  useEffect(() => {
    if (!state.categories) {
      loadCategories()
    }
  })

  //#region utilities
  const loadCategories = async () => {
    const categories = await productApi.getCategories()
    setState({...state, categories})
  }

  const selectPage = (page: number) => {
    console.log("Select page: ", page)
    updateProducts({ page, filter: state.filter })
  }

  const updateFilter = (filter: string) => {
    updateProducts({ page: 1, filter })
  }

  const getCurrentPageCount = () => {
    return 100000
  }

  const selectManufacturer = async (manufacturer: string) => {
    console.log("Enabled manufacturer: ", manufacturer)
    updateProducts({ manufacturer })
  }

  const selectCategory = async (category: string) => {
    setState({...state, category, loadingMessage: "Loading manufacturers..." })
    console.log("Enabled category: ", category)

    const manufacturers = await productApi.getManufacturers(category)
    setState({...state, manufacturers })
    console.log("Set manufacturers: ", manufacturers)

    if (manufacturers.length == 0) {
      window.alert("There seems to be an error accessing the API. Please try again.")
      return
    }

    updateProducts({ category, manufacturer: manufacturers[0] })
  }

  const updateProducts = async ({ category = state.category, manufacturer = state.manufacturer, page = 1, filter = "" }: IProductUpdateParams) => {
    console.log("Update products with page: ", page)
    setState({...state, loadingMessage: "Loading products...", products: [] })
    const products = await productApi.getProducts(category, manufacturer, page, filter)
    setState({...state, products, loadingMessage: "", category, manufacturer, page, filter })
  }

  const selectProduct = async (selectedProduct: IProduct) => {
    console.log("Selected product: ", selectedProduct)
    setState({...state,  selectedProduct })
  }
  //#endregion

  return (
    <div>
      <Container>
        <Grid centered columns={3}>
          <Grid.Column>
            <Segment>
              <ProductList products={state.products} clickHandler={selectProduct} />

              <Rail position="left">
                <SideBar
                  currentCategory={state.category}
                  categories={state.categories ? state.categories : []}
                  selectCategory={selectCategory}
                  currentManufacturer={state.manufacturer}
                  manufacturers={state.manufacturers}
                  selectManufacturer={selectManufacturer}
                  updateFilter={updateFilter}
                  page={state.page}
                  pageCount={getCurrentPageCount()}
                  selectPage={selectPage}
                  loadingMessage={state.loadingMessage}
                />
              </Rail>

              <Rail position="right">
                {state.selectedProduct ? <ProductInfo product={state.selectedProduct} />
                  : <Message><Message.Content>Select a product for more information</Message.Content></Message>}
              </Rail>

            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  )
}

export default Listing