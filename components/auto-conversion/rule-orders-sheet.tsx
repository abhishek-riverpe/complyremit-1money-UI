"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { useRuleOrders } from "@/hooks/use-rule-orders";

interface RuleOrdersSheetProps {
  ruleId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RuleOrdersSheet({
  ruleId,
  open,
  onOpenChange,
}: RuleOrdersSheetProps) {
  const { orders, loading, error } = useRuleOrders(open ? ruleId : null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Rule Orders</SheetTitle>
          <SheetDescription>
            Orders processed by this conversion rule.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-4">
          {loading ? (
            <div className="space-y-3 pt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <p className="py-8 text-center text-sm text-destructive">
              {error}
            </p>
          ) : orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No orders for this rule yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-mono text-xs">
                      {order.order_id.slice(0, 12)}...
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {order.sub_transactions?.length ?? 0} sub-txns
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
