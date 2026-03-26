"use client";

import { useState } from "react";

import { X, FileText, Layout, Zap, Share2 } from "lucide-react";
import SheetsSync from "./SheetsSync";
import InvoiceTemplate, { InvoiceTheme } from "./InvoiceTemplate";
import ShareWhatsApp from "./ShareWhatsApp";
import ExportPDF from "./ExportPDF";


interface NewInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewInvoiceModal({ isOpen, onClose }: NewInvoiceModalProps) {
  const [activeTab, setActiveTab] = useState<"MANUAL" | "SHEETS">("MANUAL");
  const [theme, setTheme] = useState<InvoiceTheme>("DEVELOPER");
  const [isPreview, setIsPreview] = useState(false);

  if (!isOpen) return null;

  const mockData = {
    number: "INV-2024-001",
    date: "Mar 26, 2024",
    dueDate: "Apr 05, 2024",
    businessName: "Devil Labs",
    clientName: "John Doe",
    clientEmail: "john@example.com",
    items: [
      { description: "Full-Stack Development (Next.js)", quantity: 1, rate: 45000, amount: 45000 },
      { description: "UI/UX Design Phase", quantity: 1, rate: 15000, amount: 15000 },
    ],
    total: 60000,
    upiId: "dev@upi",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <header className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab("MANUAL")}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition ${activeTab === "MANUAL" ? "bg-white text-black" : "text-muted-foreground hover:text-white"}`}
            >
              Manual Entry
            </button>
            <button 
              onClick={() => setActiveTab("SHEETS")}
              className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-xl transition ${activeTab === "SHEETS" ? "bg-white text-black" : "text-muted-foreground hover:text-white"}`}
            >
              Google Sheets Sync
            </button>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-white transition">
            <X size={24} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {!isPreview ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {activeTab === "MANUAL" ? (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center space-x-2">
                      <FileText className="text-gold-500" size={20} />
                      <span>Invoice Details</span>
                    </h2>
                    {/* Manual Form (Abbreviated for demo) */}
                    <div className="space-y-4">
                      <Input label="Client Name" placeholder="e.g. Acme Corp" />
                      <Input label="Total Amount (₹)" placeholder="0.00" type="number" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center space-x-2">
                       <Zap className="text-gold-500" size={20} />
                       <span>Automation Bridge</span>
                    </h2>
                    <SheetsSync onSync={() => setIsPreview(true)} />
                  </div>
                )}

                <div className="space-y-4">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Select Theme</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <ThemeButton label="Dev" active={theme === "DEVELOPER"} onClick={() => setTheme("DEVELOPER")} />
                    <ThemeButton label="Video" active={theme === "VIDEO_EDITOR"} onClick={() => setTheme("VIDEO_EDITOR")} />
                    <ThemeButton label="Studio" active={theme === "CREATIVE_STUDIO"} onClick={() => setTheme("CREATIVE_STUDIO")} />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800 p-8 flex flex-col items-center justify-center text-center space-y-4">
                <Layout className="text-muted-foreground" size={48} />
                <div>
                  <h3 className="font-bold">Live Preview</h3>
                  <p className="text-sm text-muted-foreground">Complete the details to see your premium invoice template.</p>
                </div>
                <button 
                  onClick={() => setIsPreview(true)}
                  className="px-6 py-2 rounded-xl bg-zinc-800 font-bold hover:bg-zinc-700 transition"
                >
                  Generate Draft
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setIsPreview(false)} className="text-sm font-bold text-muted-foreground hover:text-white transition">
                  ← Back to Editor
                </button>
                <div className="flex space-x-3">
                  <ShareWhatsApp invoice={{
                    clientPhone: "919876543210",
                    clientName: mockData.clientName,
                    number: mockData.number,
                    amount: mockData.total,
                    upiId: mockData.upiId
                  }}  />
                  <ExportPDF elementId="invoice-preview" invoiceNumber={mockData.number} />
                </div>
              </div>
              <div id="invoice-preview" className="scale-90 origin-top">
                <InvoiceTemplate theme={theme} data={mockData} />
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input 
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition text-sm"
        {...props}
      />
    </div>
  );
}

function ThemeButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition ${active ? "bg-gold-500 border-gold-500 text-black" : "bg-zinc-900 border-zinc-800 text-muted-foreground hover:border-zinc-700"}`}
    >
      {label}
    </button>
  );
}
