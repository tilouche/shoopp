export function sendToWhatsApp(cart, total) {
  const phone = "21624483194"; // بدّل رقمك

  let message = "🛍 New Order:\n\n";

  cart.forEach((item) => {
    message += `* ${item.name}\n`;
    message += `   Size: ${item.selectedSize}\n`;
    message += `   Color: ${item.selectedColor}\n`;
    message += `   Qty: ${item.quantity}\n`;
    message += `   Price: ${item.price} DT\n\n`;
  });

  message += `💰 Total: ${total.toFixed(2)} DT`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}