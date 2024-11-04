interface BaseExpenseCategory {
  name: string
  is_active?: boolean
}

export interface IExpenseCategory extends BaseExpenseCategory {
  _id: string
}

export interface IAddExpenseCategory extends BaseExpenseCategory {}
export interface IUpdateExpenseCategory extends BaseExpenseCategory {
  _id: string
}

interface BaseExpense {
  remarks: string
  month: string
  year: number
  amount: number
}

export interface IExpense extends BaseExpense {
  _id: string
  category: {
    _id: string
    name: string
  }
}

export interface IAddExpense extends BaseExpense {
  category: string
}
export interface IUpdateExpense extends BaseExpense {
  _id: string
  category: string
}
