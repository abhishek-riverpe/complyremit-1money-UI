"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Landmark, ChevronRight } from "lucide-react";

const accountDetails = [
  { label: "Bank Name", value: "First National Bank" },
  { label: "Account Number", value: "1234567890" },
  { label: "IBAN", value: "US12 3456 7890 1234 5678 90" },
  { label: "SWIFT/BIC", value: "FNBKUS33" },
  { label: "Currency", value: "USD" },
];

export function FiatAccountCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="rounded-2xl">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-50 p-2 rounded-lg">
            <Landmark className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold">Fiat Account</h3>
            <p className="text-sm text-muted-foreground">
              Your linked bank account details
            </p>
          </div>
        </div>

        <Button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-green-400 hover:bg-green-500 text-white rounded-lg"
        >
          Get Account Details
          <ChevronRight
            className={`w-4 h-4 ml-auto transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </Button>

        <div
          className="grid transition-[grid-template-rows] duration-300 ease-in-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-2">
              {accountDetails.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
