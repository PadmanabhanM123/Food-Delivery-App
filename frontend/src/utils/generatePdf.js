// src/utils/generatePDF.js
import jsPDF from 'jspdf';

const generatePDF = (order) => {
  const doc = new jsPDF();

  // Define styles
  const titleFontSize = 20;
  const subtitleFontSize = 16;
  const textFontSize = 12;
  const margin = 20;

  // Set title
  doc.setFontSize(titleFontSize);
  doc.text('Foodyy~Buddyy', margin, margin);

  // Add spacing after title
  doc.setFontSize(subtitleFontSize);
  doc.text('Order Summary', margin, margin + 20);

  // Order details
  doc.setFontSize(textFontSize);
  doc.text(`Order ID: ${order.id}`, margin, margin + 30);
  doc.text(`Name: ${order.name}`, margin, margin + 40);
  doc.text(`Phone: ${order.phoneNumber}`, margin, margin + 50);
  doc.text(`Address: ${order.address}`, margin, margin + 60);
  doc.text(`Total Price: $${order.totalPrice.toFixed(2)}`, margin, margin + 70);

  // Add items section
  doc.text('Items:', margin, margin + 90);
  let yPosition = margin + 100;
  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name} - $${item.price.toFixed(2)}`, margin, yPosition);
    yPosition += 10;
  });

  // Add some footer text
  doc.setFontSize(textFontSize);
  doc.text('Thank you for your order!', margin, yPosition + 20);

  // Save the PDF
  doc.save(`order_${order.id}.pdf`);
};

export default generatePDF;
