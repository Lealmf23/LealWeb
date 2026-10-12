export type SpecIcon =
  | 'cpu'
  | 'gpu'
  | 'ram'
  | 'board'
  | 'cooling'
  | 'ssd'
  | 'case'
  | 'monitor'
  | 'keyboard'
  | 'mouse'
  | 'webcam'
  | 'speaker'
  | 'mic'
  | 'headphones'

export interface Spec {
  icon: SpecIcon
  label: string
  value: string
}

export interface SpecGroup {
  eyebrow: string
  title: string
  specs: Spec[]
}

export const setup: SpecGroup[] = [
  {
    eyebrow: 'Torre / Hardware',
    title: 'Componentes de la PC',
    specs: [
      { icon: 'cpu', label: 'Procesador', value: 'AMD Ryzen 9 7900X' },
      { icon: 'gpu', label: 'Tarjeta gráfica', value: 'MSI GeForce RTX 5070 SHADOW 3X OC · 12 GB' },
      { icon: 'ram', label: 'Memoria RAM', value: 'Kingston Fury · 64 GB (2 × 32 GB) DDR5 5600 MHz' },
      { icon: 'board', label: 'Motherboard', value: 'Gigabyte B650 Gaming X · AM5 · DDR5' },
      { icon: 'cooling', label: 'Refrigeración', value: 'Gigabyte AORUS WATERFORCE X 280' },
      { icon: 'ssd', label: 'Almacenamiento', value: 'WD Black SN750 M.2 NVMe · 500 GB' },
      { icon: 'ssd', label: 'Almacenamiento', value: 'Kingston M.2 NVMe · 2 TB' },
      { icon: 'case', label: 'Gabinete', value: 'Aerocool Graphite · vidrio templado · 3 ventiladores ARGB de 14 cm' },
    ],
  },
  {
    eyebrow: 'Pantalla / Controles / Audio',
    title: 'Monitor y periféricos',
    specs: [
      { icon: 'monitor', label: 'Monitor', value: 'Samsung ViewFinity S5 · 34″ · 100 Hz' },
      { icon: 'keyboard', label: 'Teclado', value: 'HyperX Alloy Core RGB' },
      { icon: 'mouse', label: 'Mouse', value: 'HyperX Pulsefire Surge RGB' },
      { icon: 'webcam', label: 'Webcam', value: 'Logitech C922 Pro' },
      { icon: 'speaker', label: 'Parlantes', value: 'Logitech G560 RGB' },
      { icon: 'mic', label: 'Micrófono', value: 'HyperX QuadCast' },
      { icon: 'headphones', label: 'Auriculares', value: 'HyperX Cloud Stinger Core' },
    ],
  },
]
