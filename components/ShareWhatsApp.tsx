"use client";

import { Share2 } from "lucide-react";
import { generateWhatsAppLink, generateUPILink } from "@/lib/utils";

interface ShareWhatsAppProps {
  invoice: {
    clientPhone: string;
    clientName: string;
    number: string;
    amount: number;
    upiId: string;
  };
}

export default function ShareWhatsApp({ invoice }: ShareWhatsAppProps) {
  const upiLink = generateUPILink(
    invoice.upiId, 
    invoice.amount, 
    "Devil Labs", // Payee Name
    invoice.number
  );

  const message = `Hi ${invoice.clientName},\n\nYour invoice ${invoice.number} for ₹${invoice.amount.toLocaleString()} is ready.\n\nYou can pay via UPI here: ${upiLink}\n\nThank you!`;

  const handleShare = () => {
    const link = generateWhatsAppLink(invoice.clientPhone, message);
    window.open(link, "_blank");
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center space-x-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-4 py-2 rounded-xl text-sm font-bold hover:bg-[#25D366]/20 transition"
    >
      <Share2 size={16} />
      <span>WhatsApp</span>
    </button>
  );
}
