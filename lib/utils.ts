export function generateUPILink(pa: string, am: number, pn: string, tr: string) {
  // pa: UPI ID
  // am: Amount
  // pn: Payee Name
  // tr: Transaction Reference (Invoice No)
  const baseUrl = "upi://pay";
  const params = new URLSearchParams({
    pa,
    pn,
    am: am.toString(),
    tr,
    tn: `Invoice ${tr}`,
    cu: "INR",
  });
  return `${baseUrl}?${params.toString()}`;
}

export function generateWhatsAppLink(phone: string, message: string) {
  const baseUrl = "https://wa.me";
  const formattedPhone = phone.replace(/\D/g, "");
  return `${baseUrl}/${formattedPhone}?text=${encodeURIComponent(message)}`;
}
