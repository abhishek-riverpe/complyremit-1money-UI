export interface CreateAutoConversionRuleRequest {
  source: {
    asset: string;
    network: string;
  };
  destination: {
    asset: string;
    network: string;
    wallet_address?: string;
    external_account_id?: string;
  };
}

export interface AutoConversionRuleResponse {
  auto_conversion_rule_id: string;
  status: string;
  source: {
    asset: string;
    network: string;
  };
  destination: {
    asset: string;
    network?: string;
  };
  nickname?: string;
  idempotency_key?: string;
  created_at: string;
  modified_at: string;
}

export interface AutoConversionRuleListResponse {
  items: AutoConversionRuleResponse[];
  total: number;
}

export interface AutoConversionOrderResponse {
  order_id: string;
  status: string;
  fee_receipt?: unknown;
  sub_transactions?: unknown[];
}

export interface AutoConversionOrderListResponse {
  orders: AutoConversionOrderResponse[];
  total: number;
}
