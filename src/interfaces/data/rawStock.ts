interface IStock {
  _id: string;
  category: 'RAW_MATERIAL' | 'PACKAGING_PRODUCT' | 'OTHER';
  qty: number;
  unit: string;
}

export interface IRawMaterialStock extends IStock {
  product: {
    _id: string;
    name: string;
  }
}
export interface IPackagingProductStock extends IStock {
  product: {
    _id: string;
    name: string;
  }
  variant: {
    _id: string;
    name: string;
  }
  count: number
}

export interface IOtherStock extends IStock {
  material: {
    _id: string;
    name: string;
  }
}
