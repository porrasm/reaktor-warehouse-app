export interface IProduct {
  id: string,
  type: string,
  name: string,
  color: string[],
  price: number,
  manufacturer: string
}

export interface IAvailability {
  id: string,
  availability: string
}