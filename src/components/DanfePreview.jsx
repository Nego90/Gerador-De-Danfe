import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import ProductTable from './ProductTable'; // Import the ProductTable component

// Component to render the DANFE layout
const DanfePreview = ({
  logo, emitter, recipient, invoice, transport, products, totals, additionalInfo,
  onProductChange, onAddProduct, onRemoveProduct
}) => {
  const barcodeRef = useRef(null);

  // Effect to generate barcode when invoice key changes
  useEffect(() => {
    if (barcodeRef.current && invoice.key) {
      try {
        JsBarcode(barcodeRef.current, invoice.key, {
          format: 'CODE128',
          height: 50,
          displayValue: true,
          text: invoice.key.replace(/(\d{4})/g, '$1 ').trim(), // Format key with spaces
          fontOptions: 'bold',
          fontSize: 10,
          textMargin: 5,
        });
      } catch (e) {
        console.error('Invalid barcode value', e);
        // Clear barcode on error
        const context = barcodeRef.current.getContext('2d');
        context.clearRect(0, 0, barcodeRef.current.width, barcodeRef.current.height);
      }
    }
  }, [invoice.key]);

  // Helper to format currency
  const formatCurrency = (value) => {
    return (value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="danfe-container" id="danfe-preview">
      <div className="watermark">SEM VALOR FISCAL</div>
      
      {/* --- Header Section --- */}
      <header className="danfe-header">
        <div className="logo-container">
          {logo ? <img src={logo} alt="Company Logo" className="logo" /> : <div className="logo-placeholder">Logo</div>}
        </div>
        <div className="emitter-info">
          <strong className="text-lg">{emitter.name}</strong>
          <p>{emitter.address}</p>
          <p>CNPJ: {emitter.cnpj} | I.E: {emitter.ie}</p>
          <p>Telefone: {emitter.phone}</p>
        </div>
        <div className="danfe-title">
          <strong className="text-xl">DANFE</strong>
          <p>Documento Auxiliar da Nota Fiscal Eletrônica</p>
          <p>0 - ENTRADA</p>
          <p>1 - SAÍDA</p>
          <div className="invoice-number">
            <span>Nº. {invoice.number}</span>
            <span>SÉRIE: {invoice.series}</span>
          </div>
        </div>
      </header>

      {/* --- Barcode and Access Key Section --- */}
      <section className="barcode-section">
        <div className="key-info">
          <label>Chave de Acesso</label>
          <canvas ref={barcodeRef}></canvas>
        </div>
        <div className="consult-info">
          <p>Consulta de autenticidade no portal nacional da NF-e</p>
          <p>www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora</p>
        </div>
      </section>

      {/* --- Main Info Sections --- */}
      <section className="danfe-section">
        <div className="field w-2/3">
          <label>Natureza da Operação</label>
          <span>{invoice.operationNature}</span>
        </div>
        <div className="field w-1/3">
          <label>Protocolo de Autorização de Uso</label>
          <span>-</span>
        </div>
      </section>

      {/* --- Recipient Section --- */}
      <section className="danfe-section-title">DESTINATÁRIO / REMETENTE</section>
      <section className="danfe-section">
        <div className="field w-1/2">
          <label>Nome / Razão Social</label>
          <span>{recipient.name}</span>
        </div>
        <div className="field w-1/4">
          <label>CNPJ / CPF</label>
          <span>{recipient.cnpj}</span>
        </div>
        <div className="field w-1/4">
          <label>Data de Emissão</label>
          <span>{new Date(recipient.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
        </div>
      </section>
      <section className="danfe-section">
        <div className="field w-1/2">
          <label>Endereço</label>
          <span>{recipient.address}</span>
        </div>
        <div className="field w-1/4">
          <label>Inscrição Estadual</label>
          <span>{recipient.ie}</span>
        </div>
        <div className="field w-1/4">
          <label>Data de Saída/Entrada</label>
          <span>{new Date(recipient.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
        </div>
      </section>

      {/* --- Totals Section --- */}
      <section className="danfe-section-title">CÁLCULO DO IMPOSTO</section>
      <section className="danfe-section totals-grid">
        <div className="field"><label>Base de Cálculo ICMS</label><span>{formatCurrency(totals.totalProducts)}</span></div>
        <div className="field"><label>Valor do ICMS</label><span>{formatCurrency(totals.totalIcms)}</span></div>
        <div className="field"><label>Base de Cálculo ICMS ST</label><span>0,00</span></div>
        <div className="field"><label>Valor do ICMS ST</label><span>{formatCurrency(totals.totalIcmsSt)}</span></div>
        <div className="field"><label>Valor Total dos Produtos</label><span>{formatCurrency(totals.totalProducts)}</span></div>
        <div className="field"><label>Valor Total da Nota</label><strong>{formatCurrency(totals.totalInvoice)}</strong></div>
      </section>

      {/* --- Transport Section --- */}
      <section className="danfe-section-title">TRANSPORTADOR / VOLUMES TRANSPORTADOS</section>
      <section className="danfe-section transport-grid">
        <div className="field"><label>Nome / Razão Social</label><span>{transport.carrierName}</span></div>
        <div className="field"><label>Frete por Conta</label><span>{transport.freightType}</span></div>
        <div className="field"><label>Placa do Veículo</label><span>{transport.plate}</span></div>
        <div className="field"><label>Quantidade</label><span>{transport.quantity}</span></div>
        <div className="field"><label>Espécie</label><span>{transport.species}</span></div>
        <div className="field"><label>Peso Bruto</label><span>{transport.grossWeight}</span></div>
        <div className="field"><label>Peso Líquido</label><span>{transport.netWeight}</span></div>
      </section>

      {/* --- Products Section --- */}
      <section className="danfe-section-title">DADOS DOS PRODUTOS / SERVIÇOS</section>
      <ProductTable
        products={products}
        onProductChange={onProductChange}
        onAddProduct={onAddProduct}
        onRemoveProduct={onRemoveProduct}
      />
      
      {/* --- Additional Info Section --- */}
      <section className="danfe-section-title">DADOS ADICIONAIS</section>
      <section className="danfe-section">
        <div className="additional-info">
          <label>Informações Complementares</label>
          <p>{additionalInfo}</p>
        </div>
      </section>

      <footer className="danfe-footer">
        <p>Documento gerado para fins de estudo - SEM VALOR FISCAL</p>
      </footer>
    </div>
  );
};

export default DanfePreview;
