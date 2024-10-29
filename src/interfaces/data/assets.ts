interface IBaseAsset {
  item_name: string
  amount: number
  invoice_no: string
}

export interface IAddAsset extends IBaseAsset {
  seller: string
}

export interface IAsset extends IBaseAsset {
  _id: string
  seller: {
    _id: string
    name: string
  }
}

export interface IUpdateAsset extends IAsset {
  seller: {
    _id: string
    name: string
  }
}
