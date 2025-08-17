import React from 'react';

// Component for the dynamic product table
const ProductTable = ({ products, onProductChange, onAddProduct, onRemoveProduct }) => {

  const handleInputChange = (id, field, value) => {
    // For numeric fields, convert to number but allow empty string
    if (field === 'qty' || field === 'unitPrice' || field === 'icms' || field === 'icmsSt') {
      const numValue = value === '' ? '' : parseFloat(value);
      if (!isNaN(numValue) || value === '') {
        onProductChange(id, field, numValue);
      }
    } else {
      onProductChange(id, field, value);
    }
  };

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Cód.</th>
            <th>Descrição do Produto</th>
            <th>NCM</th>
            <th>CFOP</th>
            <th>UN</th>
            <th>Qtd.</th>
            <th>Vl. Unit.</th>
            <th>Vl. Total</th>
            <th>ICMS %</th>
            <th>Vl. ICMS ST</th>
            <th className="no-print">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><input type="text" value={product.code} onChange={(e) => handleInputChange(product.id, 'code', e.target.value)} /></td>
              <td><input type="text" value={product.description} onChange={(e) => handleInputChange(product.id, 'description', e.target.value)} /></td>
              <td><input type="text" value={product.ncm} onChange={(e) => handleInputChange(product.id, 'ncm', e.target.value)} /></td>
              <td><input type="text" value={product.cfop} onChange={(e) => handleInputChange(product.id, 'cfop', e.target.value)} /></td>
              <td><input type="text" value={product.unit} onChange={(e) => handleInputChange(product.id, 'unit', e.target.value)} /></td>
              <td><input type="number" value={product.qty} onChange={(e) => handleInputChange(product.id, 'qty', e.target.value)} /></td>
              <td><input type="number" value={product.unitPrice} onChange={(e) => handleInputChange(product.id, 'unitPrice', e.target.value)} /></td>
              <td>{(product.qty * product.unitPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td><input type="number" value={product.icms} onChange={(e) => handleInputChange(product.id, 'icms', e.target.value)} /></td>
              <td><input type="number" value={product.icmsSt} onChange={(e) => handleInputChange(product.id, 'icmsSt', e.target.value)} /></td>
              <td className="no-print">
                <button onClick={() => onRemoveProduct(product.id)} className="remove-btn">
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddProduct} className="add-product-btn no-print">
        + Adicionar Produto
      </button>
    </div>
  );
};

export default ProductTable;
