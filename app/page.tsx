"use client";

import { useState } from "react";
import { 
  PlusCircle, 
  FileText, 
  Users, 
  Settings, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

import NewInvoiceModal from "@/components/NewInvoiceModal";


export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: "Total Invoiced", value: "₹2,45,000", icon: TrendingUp, color: "text-blue-500" },
    { label: "Pending Payments", value: "₹45,000", icon: Clock, color: "text-gold-500" },
    { label: "Paid Invoices", value: "8", icon: CheckCircle2, color: "text-green-500" },
    { label: "Active Clients", value: "5", icon: Users, color: "text-purple-500" },
  ];

  const recentInvoices = [
    { id: "INV-001", client: "Acme Corp", amount: "₹15,000", date: "2024-03-20", status: "PAID" },
    { id: "INV-002", client: "Globex Inc", amount: "₹25,000", date: "2024-03-22", status: "PENDING" },
    { id: "INV-003", client: "Stark Ind", amount: "₹35,000", date: "2024-03-24", status: "PENDING" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col p-6 space-y-8">
        <div className="flex items-center space-x-2 px-2">
          <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center font-bold text-black glow-gold">
            IF
          </div>
          <span className="text-xl font-bold tracking-tight">InvoiceFlow</span>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem icon={TrendingUp} label="Dashboard" active />
          <NavItem icon={FileText} label="Invoices" />
          <NavItem icon={Users} label="Clients" />
          <NavItem icon={Settings} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 space-y-10">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome, Developer</h1>
            <p className="text-muted-foreground mt-1">Here&apos;s a summary of your freelance business.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-white text-black px-4 py-2.5 rounded-xl font-semibold hover:bg-neutral-200 transition"
          >
            <PlusCircle size={18} />
            <span>New Invoice</span>
          </button>
        </header>

        <NewInvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card/50 hover:border-border/80 transition group">
              <div className="flex justify-between items-start">
                <stat.icon className={`${stat.color} mb-3`} size={20} />
                <ArrowUpRight className="text-muted-foreground opacity-0 group-hover:opacity-100 transition" size={16} />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h2 className="text-2xl font-bold mt-1 text-white">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Recent Invoices Table */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Invoices</h2>
            <button className="text-sm text-gold-500 hover:text-gold-600 font-medium">View all</button>
          </div>
          
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full text-left invoice-table">
              <thead className="bg-muted/50">
                <tr>
                  <th>Client</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/30 transition cursor-pointer">
                    <td className="font-semibold text-white">{invoice.client}</td>
                    <td className="text-white">{invoice.amount}</td>
                    <td className="text-muted-foreground">{invoice.date}</td>
                    <td>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        invoice.status === "PAID" 
                          ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                          : "bg-gold-500/10 text-gold-500 border border-gold-500/20"
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="text-right pr-6">
                      <button className="text-muted-foreground hover:text-gold-500 transition">
                        <FileText size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
      active ? "bg-white/5 text-gold-500" : "text-muted-foreground hover:bg-white/5 hover:text-white"
    }`}>
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </a>
  );
}
