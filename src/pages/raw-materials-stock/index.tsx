import EnhancedTable from '@/components/table'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createData, Data, headCells } from './schema'
import { useGetRawStocksQuery } from '@/store/actions/slices/rawStockSlice'
import { useAppSelector } from '@/store/hooks'
import { RootState } from '@/store'
import { IRawMaterialStock, TableDataFilters } from '@/interfaces'
import { PurchaseHistory } from './function'
import { useGetProductsQuery } from '@/store/actions/slices/productsSlice'

const RawMaterialStocks = () => {
  const { t } = useTranslation()

  const [search, setSearch] = useState<string>('')

  useGetProductsQuery({})
  const { products } = useAppSelector((state: RootState) => state.products)

  useGetRawStocksQuery({}, { refetchOnMountOrArgChange: true })
  const { rawMaterialStock } = useAppSelector(
    (state: RootState) => state.rawStocks
  )
  const [allRawMaterials, setAllRawMaterials] = useState<string[]>([])
  const [rawMaterialNeverPurchased, setRawMaterialNeverPurchased] = useState<
    IRawMaterialStock[]
  >([])

  const rows = useMemo(
    () =>
      rawMaterialStock
        ? [...rawMaterialStock, ...rawMaterialNeverPurchased].map((item) =>
            createData(
              item._id,
              item.category,
              item.product,
              item.qty,
              item.unit
            )
          )
        : [],
    [rawMaterialNeverPurchased, rawMaterialStock]
  )

  const dataFilters: TableDataFilters = useMemo(
    () => ({
      searchBy: {
        placeholderText: 'Search Raw Material...',
        actions: [search, setSearch],
      },
    }),
    [search]
  )

  useEffect(() => {
    if (rawMaterialStock) {
      const allRawMaterialPurchased = rawMaterialStock.map((i) => {
        return i.product._id
      })

      if (allRawMaterialPurchased.length > 0)
        setAllRawMaterials(allRawMaterialPurchased)
    }
  }, [rawMaterialStock])

  useEffect(() => {
    if (allRawMaterials.length > 0) {
        const allRawMaterialsSet = new Set(allRawMaterials);
        const newReadyStock = products.reduce<IRawMaterialStock[]>((acc, product) => {
            const productId = product._id;
            if (productId && !allRawMaterialsSet.has(productId)) {
                acc.push({
                    _id: '',
                    category: 'RAW_MATERIAL',
                    product: {
                        _id: productId,
                        name: product.name || '',
                    },
                    qty: 0,
                    unit: 'kg',
                });
            }
            return acc;
        }, []);

        setRawMaterialNeverPurchased(newReadyStock);
    }
}, [allRawMaterials, products]);


  return (
    <EnhancedTable<Data>
      data={rows}
      headCells={headCells}
      title={t('Raw Material')}
      dense
      rowHeight={65}
      // config={ImportContactsTableConfig}
      dataFilters={{ ...dataFilters }}
      ExpandedBody={PurchaseHistory}
    />
  )
}

export default RawMaterialStocks
