import { IProduct } from '../services/productApi'
import { Item, List } from 'semantic-ui-react'

type ProductProps = {
  product: IProduct,
  availability: string
}

type ProductListProps = {
  products: ProductProps[],
  clickHandler: (product: IProduct) => void
}

type ProductListItemProps = {
  product: IProduct,
  availability: string,
  clickHandler: () => void
}


export const ProductInfo = ({ product, availability }: ProductProps) => <Item>
  <Item.Content>
    <Item.Header>{product.name}</Item.Header>
    <Item.Description>
      Availability: {availability}
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

export const ProductList = ({ products, clickHandler }: ProductListProps) => <List divided>
  {products.map(p => {
    return <List.Item key={p.product.id} onClick={() => clickHandler(p.product)}>
      <List.Content>
        <List.Header as='a'>{p.product.name}</List.Header>
        {p.availability == "" ? "" : <List.Description>Availability: {p.availability}</List.Description>}

        <List.Description>Price: {p.product.price}</List.Description>
      </List.Content>
    </List.Item>
  })}
</List>

export const ProductListItem = ({ product, availability, clickHandler }: ProductListItemProps) => <List.Item key={product.id} onClick={clickHandler}>
  <List.Content>
    <List.Header as='a'>{product.name}</List.Header>
    {availability == "" ? "" : <List.Description>Availability: {availability}</List.Description>}

    <List.Description>Price: {product.price}</List.Description>
  </List.Content>
</List.Item>