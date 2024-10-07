export interface IProduct {
  _id?: string
  name: string
  is_active?: boolean
  type: 'WHOLE' | 'MIXTURE'
  ingredients?: {
    _id: string
    name: string
  }[]
}

export interface IVariant {
  _id: string
  name: string
  is_active?: boolean
}