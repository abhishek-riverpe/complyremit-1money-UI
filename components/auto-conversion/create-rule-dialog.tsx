"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SelectFormField, TextFormField } from "@/components/onboarding/form-fields";
import {
  createAutoConversionRuleSchema,
  type CreateAutoConversionRuleFormValues,
} from "@/lib/schemas/auto-conversion";
import {
  SOURCE_ASSETS,
  DESTINATION_ASSETS,
  FIAT_NETWORKS,
  CRYPTO_NETWORKS,
} from "@/lib/constants/auto-conversion";
import { createAutoConversionRule } from "@/services/auto-conversion.service";
import { useState } from "react";

interface CreateRuleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateRuleDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateRuleDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<CreateAutoConversionRuleFormValues>({
    resolver: zodResolver(createAutoConversionRuleSchema),
    defaultValues: {
      source_asset: "",
      source_network: "",
      destination_asset: "",
      destination_network: "",
      wallet_address: "",
      external_account_id: "",
    },
  });

  async function onSubmit(values: CreateAutoConversionRuleFormValues) {
    setSubmitting(true);
    try {
      await createAutoConversionRule({
        source: {
          asset: values.source_asset,
          network: values.source_network,
        },
        destination: {
          asset: values.destination_asset,
          network: values.destination_network,
          ...(values.wallet_address && {
            wallet_address: values.wallet_address,
          }),
          ...(values.external_account_id && {
            external_account_id: values.external_account_id,
          }),
        },
      });
      toast.success("Rule created successfully");
      form.reset();
      onOpenChange(false);
      onSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create rule"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-y-auto max-h-[90vh] sm:max-w-md">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            Create Conversion Rule
          </DialogTitle>
          <DialogDescription>
            Set up an automatic conversion rule for incoming deposits.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-4 pb-4"
          >
            {/* Source Section — Fiat */}
            <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted text-primary-muted-foreground">
                  <ArrowDownToLine className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Source</h4>
                  <p className="text-xs text-muted-foreground">Incoming fiat currency</p>
                </div>
              </div>
              <SelectFormField
                control={form.control}
                name="source_asset"
                label="Currency"
                options={SOURCE_ASSETS}
                placeholder="Select fiat currency"
              />
              <SelectFormField
                control={form.control}
                name="source_network"
                label="Network"
                options={FIAT_NETWORKS}
                placeholder="Select network"
              />
            </div>

            {/* Connector Arrow */}
            <div className="flex justify-center -my-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Destination Section — Crypto */}
            <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-muted text-primary-muted-foreground">
                  <ArrowUpFromLine className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Destination</h4>
                  <p className="text-xs text-muted-foreground">Target crypto asset</p>
                </div>
              </div>
              <SelectFormField
                control={form.control}
                name="destination_asset"
                label="Asset"
                options={DESTINATION_ASSETS}
                placeholder="Select crypto asset"
              />
              <SelectFormField
                control={form.control}
                name="destination_network"
                label="Network"
                options={CRYPTO_NETWORKS}
                placeholder="Select network"
              />
              <TextFormField
                control={form.control}
                name="wallet_address"
                label="Wallet Address (optional)"
                placeholder="0x..."
              />
              <TextFormField
                control={form.control}
                name="external_account_id"
                label="External Account ID (optional)"
                placeholder="Account ID"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Rule"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
