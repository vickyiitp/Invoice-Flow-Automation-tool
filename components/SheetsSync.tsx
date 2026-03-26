"use client";

import { useState } from "react";
import { Link2, RefreshCcw, Table, Check } from "lucide-react";

interface SheetsSyncProps {
  onSync: (data: any) => void;
}

export default function SheetsSync({ onSync }: SheetsSyncProps) {
  const [url, setUrl] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [step, setStep] = useState(1); // 1: URL, 2: Mapping

  const handleSync = () => {
    setIsSyncing(true);
    // Simulate API call to fetch columns
    setTimeout(() => {
      setIsSyncing(false);
      setStep(2);
    }, 1500);
  };

  const [mapping, setMapping] = useState({
    client: "A",
    amount: "B",
    date: "C",
  });

  return (
    <div className="space-y-6">
      {step === 1 ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Google Sheet URL</label>
            <div className="relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleSync}
            disabled={!url || isSyncing}
            className="w-full flex items-center justify-center space-x-2 bg-gold-500 text-black font-bold py-3 rounded-xl hover:bg-gold-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSyncing ? <RefreshCcw className="animate-spin" size={18} /> : <Table size={18} />}
            <span>{isSyncing ? "Fetching Columns..." : "Connect Sheet"}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 gap-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Check className="text-green-500" size={16} />
              <span>Columns Identified</span>
            </h3>
            
            <MappingField 
              label="Client Name" 
              value={mapping.client} 
              onChange={(val) => setMapping({...mapping, client: val})} 
            />
            <MappingField 
              label="Amount" 
              value={mapping.amount} 
              onChange={(val) => setMapping({...mapping, amount: val})} 
            />
            <MappingField 
              label="Date" 
              value={mapping.date} 
              onChange={(val) => setMapping({...mapping, date: val})} 
            />
          </div>

          <button
            onClick={() => onSync(mapping)}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition"
          >
            Confirm & Import Data
          </button>
        </div>
      )}
    </div>
  );
}

function MappingField({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-zinc-800 text-white text-xs font-bold rounded-lg px-3 py-1.5 border border-zinc-700 focus:outline-none"
      >
        <option value="A">Col A (Client)</option>
        <option value="B">Col B (Values)</option>
        <option value="C">Col C (Date)</option>
        <option value="D">Col D (Email)</option>
      </select>
    </div>
  );
}
