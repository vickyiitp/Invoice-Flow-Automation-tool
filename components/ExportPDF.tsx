"use client";

import { FileDown, RefreshCcw } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ExportPDFProps {
  elementId: string;
  invoiceNumber: string;
}

export default function ExportPDF({ elementId, invoiceNumber }: ExportPDFProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#000000",
      } as any);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = (pdf as any).getImageProperties(imgData);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoiceNumber}.pdf`);
    } catch (error) {
      console.error("PDF Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center space-x-2 bg-gold-500 text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-gold-600 transition disabled:opacity-50"
    >
      {isExporting ? <RefreshCcw className="animate-spin" size={16} /> : <FileDown size={16} />}
      <span>{isExporting ? "Exporting..." : "Export PDF"}</span>
    </button>
  );
}
