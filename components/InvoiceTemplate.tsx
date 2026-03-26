"use client";

import { CheckCircle2 } from "lucide-react";

export type InvoiceTheme = "DEVELOPER" | "VIDEO_EDITOR" | "CREATIVE_STUDIO";

interface InvoiceProps {
  theme: InvoiceTheme;
  data: {
    number: string;
    date: string;
    dueDate: string;
    businessName: string;
    clientName: string;
    clientEmail: string;
    items: Array<{ description: string; quantity: number; rate: number; amount: number }>;
    total: number;
    upiId: string;
  };
}

export default function InvoiceTemplate({ theme, data }: InvoiceProps) {
  const themes = {
    DEVELOPER: {
      bg: "bg-zinc-950",
      accent: "text-cyan-400",
      border: "border-zinc-800",
      font: "font-mono text-sm",
      header: "DEVELOPER INVOICE",
    },
    VIDEO_EDITOR: {
      bg: "bg-neutral-950",
      accent: "text-fuchsia-500",
      border: "border-neutral-800",
      font: "font-sans",
      header: "DIRECTOR'S CUT INVOICE",
    },
    CREATIVE_STUDIO: {
      bg: "bg-black",
      accent: "text-gold-500",
      border: "border-gold-500/20",
      font: "font-serif",
      header: "CREATIVE STUDIO INVOICE",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div className={`w-full max-w-3xl mx-auto p-12 ${currentTheme.bg} ${currentTheme.font} text-white border ${currentTheme.border} rounded-3xl overflow-hidden relative shadow-2xl`}>
      {/* Glow Effect */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 opacity-20 blur-[120px] rounded-full ${currentTheme.accent.replace("text", "bg")}`} />

      <header className="flex justify-between items-start mb-16 relative">
        <div>
          <h1 className={`text-xs font-bold tracking-[0.3em] uppercase ${currentTheme.accent} mb-4`}>
            {currentTheme.header}
          </h1>
          <h2 className="text-4xl font-bold">{data.businessName}</h2>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Invoice Number</p>
          <p className="text-xl font-bold">{data.number}</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-12 mb-16 relative">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Billed To</p>
          <h3 className="text-xl font-bold mb-1">{data.clientName}</h3>
          <p className="text-muted-foreground">{data.clientEmail}</p>
        </div>
        <div className="text-right">
          <div className="mb-6">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Date Issued</p>
            <p className="font-semibold">{data.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Due Date</p>
            <p className="font-semibold">{data.dueDate}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-16 relative">
        <thead>
          <tr className={`border-b ${currentTheme.border}`}>
            <th className="text-left py-4 text-xs uppercase tracking-widest text-muted-foreground">Description</th>
            <th className="text-center py-4 text-xs uppercase tracking-widest text-muted-foreground">Qty</th>
            <th className="text-right py-4 text-xs uppercase tracking-widest text-muted-foreground">Rate</th>
            <th className="text-right py-4 text-xs uppercase tracking-widest text-muted-foreground">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={i} className={`border-b ${currentTheme.border} last:border-0`}>
              <td className="py-6 font-medium">{item.description}</td>
              <td className="py-6 text-center">{item.quantity}</td>
              <td className="py-6 text-right">₹{item.rate.toLocaleString()}</td>
              <td className="py-6 text-right font-bold">₹{item.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="pt-12 border-t border-dashed border-zinc-800 flex justify-between items-end relative">
        <div className="max-w-xs">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className={currentTheme.accent} size={16} />
            <p className="text-xs uppercase tracking-widest font-bold">Payment Information</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Please scan the UPI QR or use the ID below. Payments are secured via integrated UPI portal.
          </p>
          <div className={`mt-4 inline-block px-4 py-2 rounded-lg bg-white/5 border ${currentTheme.border}`}>
            <p className="text-[10px] text-muted-foreground uppercase mb-0.5">UPI ID</p>
            <p className="font-bold tracking-tight">{data.upiId}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-muted-foreground text-sm mb-2">Total Amount Due</p>
          <p className={`text-6xl font-black ${currentTheme.accent}`}>₹{data.total.toLocaleString()}</p>
        </div>
      </footer>
    </div>
  );
}
