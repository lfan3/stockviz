export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  stock?: number;
}

export interface YearMetrics {
  /**
   * Year
   * @description Year of the financial metrics
   */
  year: number;
  /**
   * Roe
   * @description Return on equity for the year
   * @default 0
   */
  roe: number;
  /**
   * Debtassetratio
   * @description Debt to asset ratio for the year
   * @default 0
   */
  debtAssetRatio: number;
  /**
   * Currentratio
   * @description Current ratio for the year
   * @default 0
   */
  currentRatio: number;
  /**
   * Quickratio
   * @description Quick ratio for the year
   * @default 0
   */
  quickRatio: number;
  /**
   * Operatingcashflowpershare
   * @description Operating cash flow per share for the year
   * @default 0
   */
  operatingCashFlowPerShare: number;
  /**
   * Liabilitiesassetratio
   * @description Liabilities to asset ratio for the year
   * @default 0
   */
  liabilitiesAssetRatio: number;
}

export interface MetricsCategory {
  time: number[];
  timeType: string;
  roe: number[];
  debtAssetRatio: number[];
  currentRatio: number[];
  quickRatio: number[];
  operatingCashFlowPerShare: number[];
  liabilitiesAssetRatio: number[];
}

export interface FundamentalMetrics {
  /**
   * Ticker
   * @description Stock ticker symbol
   */
  ticker: string;
  /**
   * Companyname
   * @description Name of the company
   */
  companyName: string;
  /**
   * Metrics
   * @description List of financial metrics for each year
   */
  metrics: YearMetrics[];
  metrics_cat: MetricsCategory;
}
