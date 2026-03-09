export interface TransactionFee {
  value: string;
  asset: string;
}

export interface BankInstruction {
  bank_name: string;
  routing_number: string;
  account_holder: string;
  account_number: string;
  bic_code: string | null;
  address: string | null;
  transaction_fee: TransactionFee | null;
}

export interface WalletInstruction {
  wallet_address: string;
  minimum_deposit: string;
  contract_address_url: string;
}

export interface DepositInstruction {
  asset: string;
  network: string;
  bank_instruction: BankInstruction | null;
  wallet_instruction: WalletInstruction | null;
  transaction_action: string;
  created_at: string;
  modified_at: string;
}
