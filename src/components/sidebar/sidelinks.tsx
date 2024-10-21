import {
  IconLayoutDashboard,
  IconBusinessplan,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconStack2Filled,
  IconAddressBook,
  IconPackageImport,
  IconPackageExport,
  IconCreditCardPay,
  IconTruckDelivery,
  IconReceiptRefund,
  IconRotate3d,
  IconBrandDatabricks,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [

  // DASHBOARD
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },

  // STOCK
  {
    title: 'Stock',
    label: '',
    href: '',
    icon: <IconStack2Filled size={18} />,
    sub: [
      {
        title: 'Raw Materials',
        label: '',
        href: '/raw-materials-stock',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Packaging Materials',
        label: '',
        href: '/packaging-materials-stock',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Others',
        label: '',
        href: '/others-stock',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Ready Products',
        label: '',
        href: '/ready-products-stock',
        icon: <IconBusinessplan size={18} />,
      },
    ],
  },

  // TRANSACTION
  {
    title: 'Transactions',
    label: '',
    href: '',
    icon: <IconCreditCardPay size={18} />,
    sub: [
      {
        title: 'Purchase',
        label: '',
        href: '/purchase',
        icon: <IconReceiptRefund size={18} />,
      },
      {
        title: 'Sell',
        label: '',
        href: '/sell',
        icon: <IconTruckDelivery size={18} />,
      },
    ],
  },

  // IMPORTERS / EXPORTERS CONTACT
  {
    title: 'Contacts',
    label: '',
    href: '',
    icon: <IconAddressBook size={18} />,
    sub: [
      {
        title: 'Importers',
        label: '',
        href: '/import-contacts',
        icon: <IconPackageExport size={18} />,
      },
      {
        title: 'Exporters',
        label: '',
        href: '/export-contacts',
        icon: <IconPackageImport size={18} />,
      },
    ],
  },

  // ASSETS
  {
    title: 'Assets',
    label: '',
    href: '/assets',
    icon: <IconBrandDatabricks size={18} />,
  },

  // WASTAGE
  {
    title: 'Wastage',
    label: '',
    href: '/wastage',
    icon: <IconRotate3d size={18} />,
  },
]
