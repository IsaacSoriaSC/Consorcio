const PDFDocument = require('pdfkit');

const generateProformaPDF = (proforma) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Añadir contenido al PDF
    doc.fontSize(18).text('Factura Proforma', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Propiedad: ${proforma.propertyTitle}`);
    doc.text(`Monto Total: $${proforma.totalAmount.toLocaleString()}`);
    doc.text(`Detalles: ${proforma.details}`);
    doc.text(`Estado: ${proforma.status}`);
    doc.text(`Fecha de Creación: ${new Date(proforma.createdAt).toLocaleDateString()}`);

    doc.end();
  });
};

module.exports = { generateProformaPDF };