interface IBaseAsset {
  item_name: string;
  amount: number;
  invoice_no: string;
}

export interface IAddAsset extends IBaseAsset {}

export interface IAsset extends IBaseAsset {
  _id: string;
}

export interface IUpdateAsset extends IAsset {}
