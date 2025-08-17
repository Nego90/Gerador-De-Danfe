import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Carregamento Dinâmico de Bibliotecas ---
// Para resolver erros de compilação em alguns ambientes, as bibliotecas são carregadas
// dinamicamente quando o componente é montado, em vez de usar 'import' estático.

// --- Componente de Estilos Globais ---
const GlobalStyles = () => (
  <style>{`
    /* Layout Geral da Aplicação & Estilos da Barra Lateral */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+39+Text&display=swap');

    :root {
      --border-color: #000;
      --label-color: #333;
      --bg-color: #f4f4f9;
      --sidebar-bg: #ffffff;
      --primary-color: #4a90e2;
      --secondary-color: #50e3c2;
      --danger-color: #d0021b;
    }

    body {
      font-family: 'Roboto', sans-serif;
      background-color: var(--bg-color);
      margin: 0;
      color: #333;
    }

    .app-container {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 450px;
      min-width: 400px;
      padding: 2rem;
      background-color: var(--sidebar-bg);
      overflow-y: auto;
      box-shadow: 2px 0 10px rgba(0,0,0,0.05);
      border-right: 1px solid #e0e0e0;
    }

    .main-content {
      flex-grow: 1;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    /* Estilos do Formulário */
    .form-section {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      background-color: #fdfdfd;
      margin-bottom: 1rem;
    }
    .form-section summary {
      font-weight: 700;
      cursor: pointer;
      color: var(--primary-color);
    }
    .form-section label {
      display: block;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--label-color);
      margin-bottom: 4px;
    }
    .form-section input, .form-section textarea, .form-section select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .form-section input:focus, .form-section textarea:focus, .form-section select:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
    .form-section input[type="file"] {
        padding: 4px;
    }
    .form-section .grid {
        display: grid;
        gap: 1rem;
        margin-top: 1rem;
    }
    .grid-2-cols { grid-template-columns: repeat(2, 1fr); }

    /* Botões de Ação */
    .action-button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .action-button:hover { opacity: 0.9; }
    .action-button.primary { background-color: var(--primary-color); }
    .action-button.secondary { background-color: var(--secondary-color); }
    .remove-btn-small { 
        background-color: #fee2e2; color: var(--danger-color); border: 1px solid var(--danger-color);
        border-radius: 4px; padding: 2px 8px; font-size: 0.8rem; cursor: pointer;
    }
    .add-product-btn {
      width: 100%;
      padding: 8px;
      background-color: #e8f5e9;
      border: 1px solid var(--border-color);
      border-top: none;
      cursor: pointer;
      font-weight: bold;
      color: #2e7d32;
      transition: background-color 0.2s;
    }
    .add-product-btn:hover { background-color: #dcedc8; }

    /* Estilos da Pré-visualização do DANFE */
    .danfe-container {
      width: 210mm;
      min-height: 297mm;
      padding: 5mm;
      background-color: white;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
      box-sizing: border-box;
      font-size: 8pt;
      color: #000;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .danfe-header {
      border: 1px solid var(--border-color);
      display: flex;
      height: 110px;
    }
    .header-left {
      width: 40%;
      padding: 5px;
      text-align: center;
    }
    .header-center {
      width: 25%;
      border-left: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
    .header-right {
      width: 35%;
      display: flex;
      flex-direction: column;
    }
    
    .barcode-container {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      border-top: 1px solid var(--border-color);
    }
    .barcode-container canvas { width: 100%; height: 40px; }
    
    .danfe-section {
      border: 1px solid var(--border-color);
      display: flex;
      flex-wrap: wrap;
    }
    .danfe-section-title {
      font-weight: bold;
      text-align: center;
      padding: 2px;
      background-color: #f0f0f0;
      border: 1px solid var(--border-color);
      border-bottom: none;
    }
    .field {
      padding: 2px 4px;
      border-left: 1px solid var(--border-color);
      border-top: 1px solid var(--border-color);
      flex-grow: 1;
      min-height: 30px;
      box-sizing: border-box;
    }
    .field:first-child { border-left: none; }
    .field.no-top-border { border-top: none; }
    .field label {
      display: block;
      font-size: 6pt;
      color: var(--label-color);
      text-transform: uppercase;
    }
    .field span, .field p { font-size: 9pt; font-weight: bold; word-wrap: break-word; margin: 0; }
    .field-group { display: flex; width: 100%; }
    .field-group .field { border-top: none; }
    
    .w-100 { width: 100%; } .w-70 { width: 70%; } .w-65 { width: 65%; } .w-60 { width: 60%; }
    .w-50 { width: 50%; } .w-40 { width: 40%; } .w-35 { width: 35%; } .w-30 { width: 30%; }
    .w-25 { width: 25%; } .w-20 { width: 20%; } .w-15 { width: 15%; } .w-10 { width: 10%; }

    .fatura-table { width: 100%; border-collapse: collapse; }
    .fatura-table td { border-top: 1px solid var(--border-color); padding: 2px; text-align: center; }
    .fatura-table td:not(:first-child) { border-left: 1px solid var(--border-color); }

    .product-table { width: 100%; border-collapse: collapse; }
    .product-table th, .product-table td {
      border: 1px solid var(--border-color);
      padding: 2px;
      text-align: center;
      font-size: 7pt;
    }
    .product-table th { background-color: #f0f0f0; }
    .product-table td:nth-child(2) { text-align: left; }
    .product-table input {
      width: 100%; border: 1px solid transparent; padding: 2px; font-size: 7pt;
      background-color: #f9f9f9; box-sizing: border-box;
    }
    .product-table input:focus { outline: none; border-color: var(--primary-color); background-color: white; }
    .product-table .empty-row td { height: 25px; } /* Altura fixa para linhas vazias */
    
    .danfe-footer { text-align: center; font-size: 7pt; margin-top: 10px; color: #777; }

    /* Estilos de Impressão */
    @media print {
      body { background-color: white; }
      .no-print { display: none; }
      .main-content { padding: 0; }
      .danfe-container { box-shadow: none; margin: 0; width: 100%; min-height: 0; padding: 0; }
      .product-table input { border: none; background-color: transparent; pointer-events: none; }
    }
    @media (max-width: 1200px) {
      .app-container { flex-direction: column; }
      .sidebar { width: 100%; min-width: unset; height: auto; max-height: 50vh; border-right: none; border-bottom: 1px solid #e0e0e0; }
      .main-content { padding: 1rem; }
      .danfe-container { transform: scale(0.8); transform-origin: top center; margin-top: -50mm; }
    }
    @media (max-width: 768px) {
      .danfe-container { transform: scale(0.6); margin-top: -100mm; }
    }
  `}</style>
);

// --- Componentes Internos (Tabelas) ---
const ProductTable = ({ products, onProductChange, onRemoveProduct }) => {
    const MIN_ROWS = 15;
    const emptyRowsCount = MIN_ROWS - products.length;

    return (
        <table className="product-table">
            <thead>
            <tr>
                <th>CÓD. PRODUTO</th><th>DESCRIÇÃO</th><th>NCM/SH</th><th>CST</th><th>CFOP</th><th>UN.</th>
                <th>QTD.</th><th>V. UNIT.</th><th>V. TOTAL</th><th>B. CÁLC. ICMS</th><th>V. ICMS</th>
                <th>V. IPI</th><th>ALÍQ. ICMS</th><th>ALÍQ. IPI</th><th className="no-print">AÇÕES</th>
            </tr>
            </thead>
            <tbody>
            {products.map((p) => (
                <tr key={p.id}>
                <td><input type="text" value={p.code} onChange={e => onProductChange(p.id, 'code', e.target.value)} /></td>
                <td><input type="text" value={p.description} onChange={e => onProductChange(p.id, 'description', e.target.value)} /></td>
                <td><input type="text" value={p.ncm} onChange={e => onProductChange(p.id, 'ncm', e.target.value)} /></td>
                <td><input type="text" value={p.cst} onChange={e => onProductChange(p.id, 'cst', e.target.value)} /></td>
                <td><input type="text" value={p.cfop} onChange={e => onProductChange(p.id, 'cfop', e.target.value)} /></td>
                <td><input type="text" value={p.unit} onChange={e => onProductChange(p.id, 'unit', e.target.value)} /></td>
                <td><input type="number" value={p.qty} onChange={e => onProductChange(p.id, 'qty', e.target.value)} /></td>
                <td><input type="number" value={p.unitPrice} onChange={e => onProductChange(p.id, 'unitPrice', e.target.value)} /></td>
                <td>{((p.qty || 0) * (p.unitPrice || 0)).toFixed(2)}</td>
                <td>{((p.qty || 0) * (p.unitPrice || 0)).toFixed(2)}</td>
                <td>{(((p.qty || 0) * (p.unitPrice || 0)) * ((p.aliqIcms || 0) / 100)).toFixed(2)}</td>
                <td>{(((p.qty || 0) * (p.unitPrice || 0)) * ((p.aliqIpi || 0) / 100)).toFixed(2)}</td>
                <td><input type="number" value={p.aliqIcms} onChange={e => onProductChange(p.id, 'aliqIcms', e.target.value)} /></td>
                <td><input type="number" value={p.aliqIpi} onChange={e => onProductChange(p.id, 'aliqIpi', e.target.value)} /></td>
                <td className="no-print"><button onClick={() => onRemoveProduct(p.id)} className="remove-btn-small">X</button></td>
                </tr>
            ))}
            {emptyRowsCount > 0 && Array.from({ length: emptyRowsCount }).map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                    <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>
                    <td></td><td></td><td></td><td></td><td></td><td></td>
                    <td></td><td></td><td className="no-print"></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const FaturaTable = ({ faturas }) => (
    <div className="field-group no-top-border">
        {faturas.length > 0 ? (
            <table className="fatura-table">
                <tbody>
                    <tr>
                        {faturas.map((f, i) => <td key={i}><label>NUM.</label><span>{f.numero}</span></td>)}
                    </tr>
                    <tr>
                        {faturas.map((f, i) => <td key={i}><label>VENC.</label><span>{f.vencimento}</span></td>)}
                    </tr>
                    <tr>
                        {faturas.map((f, i) => <td key={i}><label>VALOR</label><span>{f.valor}</span></td>)}
                    </tr>
                </tbody>
            </table>
        ) : <span></span>}
    </div>
);


// --- Componente de Pré-visualização do DANFE ---
const DanfePreview = ({ data, libs }) => {
  const { 
    logo, emitter, recipient, invoice, transport, products, faturas, 
    invoiceDetails, totals, additionalInfo, onProductChange, onAddProduct, onRemoveProduct
  } = data;
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current && invoice.key && libs.JsBarcode) {
      try {
        libs.JsBarcode(barcodeRef.current, invoice.key, {
          format: 'CODE128', height: 40, displayValue: false, margin: 0
        });
      } catch (e) { console.error('Barcode error:', e); }
    }
  }, [invoice.key, libs.JsBarcode]);

  const formatCurrency = (value) => (value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formatDate = (dateStr) => dateStr ? new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR') : '';

  return (
    <div className="danfe-container" id="danfe-preview">
      {/* CABEÇALHO */}
      <header className="danfe-header">
        <div className="header-left">
          {logo && <img src={logo} alt="Logo da Empresa" style={{maxWidth: '80%', maxHeight: '50px', marginBottom: '5px'}} />}
          <strong>{emitter.name}</strong>
          <p style={{fontSize: '7pt', margin: '2px 0'}}>{emitter.address}, {emitter.bairro} - {emitter.cep} {emitter.municipio}/{emitter.uf} Fone: {emitter.phone}</p>
        </div>
        <div className="header-center">
          <strong style={{fontSize: '1.5rem'}}>DANFE</strong>
          <p style={{fontSize: '7pt', margin: 0, textAlign: 'center' }}>Documento Auxiliar da Nota Fiscal Eletrônica</p>
          <div style={{textAlign: 'center', fontSize: '8pt', margin: '5px 0'}}>
            <label><input type="checkbox" readOnly checked={invoice.tipo === '0'}/> 0-ENTRADA</label>
            <label><input type="checkbox" readOnly checked={invoice.tipo === '1'}/> 1-SAÍDA</label>
          </div>
          <p style={{margin: '2px 0'}}><strong>Nº:</strong> {invoice.number}</p>
          <p style={{margin: '2px 0'}}><strong>SÉRIE:</strong> {invoice.series}</p>
        </div>
        <div className="header-right">
          <div className="field no-top-border" style={{textAlign: 'center'}}>
            <label>CHAVE DE ACESSO</label>
            <span style={{fontSize: '8pt', letterSpacing: '1px'}}>{invoice.key.replace(/(\d{4})/g, '$1 ').trim()}</span>
          </div>
          <div className="barcode-container">
            <canvas ref={barcodeRef}></canvas>
          </div>
          <div className="field" style={{textAlign: 'center'}}>
            <label>Consulta de autenticidade no portal nacional da NF-e www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora</label>
          </div>
        </div>
      </header>

      {/* NATUREZA E PROTOCOLO */}
      <div className="danfe-section">
        <div className="field w-60 no-top-border"><label>NATUREZA DA OPERAÇÃO</label><span>{invoice.operationNature}</span></div>
        <div className="field w-40 no-top-border"><label>PROTOCOLO DE AUTORIZAÇÃO DE USO</label><span>{invoice.protocolo}</span></div>
      </div>

      {/* INSCRIÇÃO ESTADUAL */}
      <div className="danfe-section">
        <div className="field w-60 no-top-border"><label>INSCRIÇÃO ESTADUAL</label><span>{emitter.ie}</span></div>
        <div className="field w-40 no-top-border"><label>INSCRIÇÃO ESTADUAL DO SUBST. TRIBUT.</label><span>{emitter.ieSt}</span></div>
      </div>
       <div className="danfe-section">
        <div className="field w-100 no-top-border"><label>CNPJ</label><span>{emitter.cnpj}</span></div>
      </div>

      {/* DESTINATÁRIO */}
      <div className="danfe-section-title">DESTINATÁRIO / REMETENTE</div>
      <div className="danfe-section">
        <div className="field w-60 no-top-border"><label>NOME / RAZÃO SOCIAL</label><span>{recipient.name}</span></div>
        <div className="field w-40 no-top-border"><label>CNPJ / CPF</label><span>{recipient.cnpj}</span></div>
      </div>
      <div className="danfe-section">
        <div className="field w-65 no-top-border"><label>ENDEREÇO</label><span>{recipient.address}</span></div>
        <div className="field w-35 no-top-border"><label>BAIRRO / DISTRITO</label><span>{recipient.bairro}</span></div>
      </div>
      <div className="danfe-section">
        <div className="field w-25 no-top-border"><label>CEP</label><span>{recipient.cep}</span></div>
        <div className="field w-40 no-top-border"><label>MUNICÍPIO</label><span>{recipient.municipio}</span></div>
        <div className="field w-20 no-top-border"><label>FONE / FAX</label><span>{recipient.phone}</span></div>
        <div className="field w-15 no-top-border"><label>UF</label><span>{recipient.uf}</span></div>
      </div>
      <div className="danfe-section">
        <div className="field w-25 no-top-border"><label>DATA DA EMISSÃO</label><span>{formatDate(invoice.dataEmissao)}</span></div>
        <div className="field w-40 no-top-border"><label>INSCRIÇÃO ESTADUAL</label><span>{recipient.ie}</span></div>
        <div className="field w-20 no-top-border"><label>DATA DA SAÍDA</label><span>{formatDate(invoice.dataSaida)}</span></div>
        <div className="field w-15 no-top-border"><label>HORA DA SAÍDA</label><span>{invoice.horaSaida}</span></div>
      </div>

      {/* FATURAS */}
      <div className="danfe-section-title">FATURA / DUPLICATA</div>
      <div className="danfe-section"><FaturaTable faturas={faturas} /></div>

      {/* CÁLCULO DO IMPOSTO */}
      <div className="danfe-section-title">CÁLCULO DO IMPOSTO</div>
      <div className="danfe-section">
        <div className="field w-20 no-top-border"><label>BASE DE CÁLCULO DE ICMS</label><span>{formatCurrency(totals.baseIcms)}</span></div>
        <div className="field w-15 no-top-border"><label>VALOR DO ICMS</label><span>{formatCurrency(totals.valorIcms)}</span></div>
        <div className="field w-20 no-top-border"><label>BASE DE CÁLC. ICMS S.T.</label><span>{formatCurrency(totals.baseIcmsSt)}</span></div>
        <div className="field w-15 no-top-border"><label>VALOR DO ICMS S.T.</label><span>{formatCurrency(totals.valorIcmsSt)}</span></div>
        <div className="field w-30 no-top-border"><label>VALOR TOTAL DOS PRODUTOS</label><span>{formatCurrency(totals.totalProdutos)}</span></div>
      </div>
      <div className="danfe-section">
        <div className="field w-20 no-top-border"><label>VALOR DO FRETE</label><span>{formatCurrency(invoiceDetails.frete)}</span></div>
        <div className="field w-15 no-top-border"><label>VALOR DO SEGURO</label><span>{formatCurrency(invoiceDetails.seguro)}</span></div>
        <div className="field w-15 no-top-border"><label>DESCONTO</label><span>{formatCurrency(invoiceDetails.desconto)}</span></div>
        <div className="field w-20 no-top-border"><label>OUTRAS DESPESAS</label><span>{formatCurrency(invoiceDetails.outrasDespesas)}</span></div>
        <div className="field w-15 no-top-border"><label>VALOR TOTAL DO IPI</label><span>{formatCurrency(totals.totalIpi)}</span></div>
        <div className="field w-15 no-top-border"><label>VALOR TOTAL DA NOTA</label><strong>{formatCurrency(totals.totalNota)}</strong></div>
      </div>

      {/* TRANSPORTADOR */}
      <div className="danfe-section-title">TRANSPORTADOR / VOLUMES TRANSPORTADOS</div>
      <div className="danfe-section">
        <div className="field w-40 no-top-border"><label>NOME / RAZÃO SOCIAL</label><span>{transport.carrierName}</span></div>
        <div className="field w-20 no-top-border"><label>FRETE POR CONTA</label><span>{transport.freightType}</span></div>
        <div className="field w-20 no-top-border"><label>CÓDIGO ANTT</label><span>{transport.codigoANTT}</span></div>
        <div className="field w-20 no-top-border"><label>PLACA DO VEÍCULO</label><span>{transport.plate}</span></div>
      </div>
      <div className="danfe-section">
        <div className="field w-30 no-top-border"><label>CNPJ / CPF</label><span>{transport.cnpj}</span></div>
        <div className="field w-40 no-top-border"><label>ENDEREÇO</label><span>{transport.address}</span></div>
        <div className="field w-20 no-top-border"><label>MUNICÍPIO</label><span>{transport.municipio}</span></div>
        <div className="field w-10 no-top-border"><label>UF</label><span>{transport.uf}</span></div>
      </div>
      <div className="danfe-section">
        <div className="field w-20 no-top-border"><label>QUANTIDADE</label><span>{transport.quantity}</span></div>
        <div className="field w-20 no-top-border"><label>ESPÉCIE</label><span>{transport.species}</span></div>
        <div className="field w-20 no-top-border"><label>MARCA</label><span>{transport.marca}</span></div>
        <div className="field w-20 no-top-border"><label>NUMERAÇÃO</label><span>{transport.numeracao}</span></div>
        <div className="field w-10 no-top-border"><label>PESO BRUTO</label><span>{transport.grossWeight}</span></div>
        <div className="field w-10 no-top-border"><label>PESO LÍQUIDO</label><span>{transport.netWeight}</span></div>
      </div>

      {/* PRODUTOS */}
      <div className="danfe-section-title">DADOS DOS PRODUTOS / SERVIÇOS</div>
      <div className="danfe-section no-top-border">
        <ProductTable products={products} onProductChange={onProductChange} onRemoveProduct={onRemoveProduct} />
      </div>
      <button onClick={onAddProduct} className="add-product-btn no-print">+ Adicionar Produto</button>
      
      {/* DADOS ADICIONAIS */}
      <div className="danfe-section-title">DADOS ADICIONAIS</div>
      <div className="danfe-section">
        <div className="field w-65 no-top-border"><label>INFORMAÇÕES COMPLEMENTARES</label><p>{additionalInfo}</p></div>
        <div className="field w-35 no-top-border"><label>RESERVADO AO FISCO</label></div>
      </div>

      <footer className="danfe-footer">
        <p>Documento gerado para fins de estudo</p>
      </footer>
    </div>
  );
};


// --- Componente Principal da Aplicação ---
function App() {
  const [libs, setLibs] = useState({ jsPDF: null, html2canvas: null, JsBarcode: null });
  
  useEffect(() => {
    const loadLibs = async () => {
      try {
        const jsPDFModule = await import('jspdf');
        const html2canvasModule = await import('html2canvas');
        const JsBarcodeModule = await import('jsbarcode');
        setLibs({
          jsPDF: jsPDFModule.default,
          html2canvas: html2canvasModule.default,
          JsBarcode: JsBarcodeModule.default,
        });
      } catch (error) { console.error("Falha ao carregar bibliotecas:", error); }
    };
    loadLibs();
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const [logo, setLogo] = useState(null);
  const [emitter, setEmitter] = useState({
    name: 'SUA EMPRESA LTDA', cnpj: '00.000.000/0001-00', ie: '000.000.000.000', ieSt: '',
    address: 'RUA EXEMPLO, 123', bairro: 'BAIRRO', cep: '12345-678', municipio: 'CIDADE', uf: 'UF', phone: '(00) 1234-5678',
  });
  const [recipient, setRecipient] = useState({
    name: 'NOME DO DESTINATÁRIO', cnpj: '11.111.111/0001-11', ie: '111.111.111.111',
    address: 'AV. DESTINO, 456', bairro: 'CENTRO', cep: '87654-321', municipio: 'OUTRA CIDADE', uf: 'UF', phone: '(11) 98765-4321',
  });
  const [invoice, setInvoice] = useState({
    operationNature: 'VENDA DE MERCADORIA', number: '000.001', series: '1', tipo: '1',
    key: '12345678901234567890123456789012345678901234',
    protocolo: '123456789012345', dataEmissao: today, dataSaida: today, horaSaida: '17:00:00'
  });
  const [invoiceDetails, setInvoiceDetails] = useState({ frete: 0, seguro: 0, desconto: 0, outrasDespesas: 0 });
  const [transport, setTransport] = useState({
    carrierName: 'TRANSPORTADORA EXEMPLO LTDA', freightType: '1 - EMITENTE', codigoANTT: '', plate: 'ABC-1234',
    cnpj: '22.222.222/0001-22', address: 'RUA DA TRANSPORTADORA, 789', municipio: 'CIDADE', uf: 'UF',
    quantity: '1', species: 'CAIXA', marca: '', numeracao: '', grossWeight: '10.500', netWeight: '10.000',
  });
  const [products, setProducts] = useState([
    { id: 1, code: 'P001', description: 'PRODUTO DE EXEMPLO 1', ncm: '1234.56.78', cst: '000', cfop: '5102', unit: 'UN', qty: 2, unitPrice: 50.00, aliqIcms: 18, aliqIpi: 5 },
    { id: 2, code: 'P002', description: 'PRODUTO DE EXEMPLO 2', ncm: '8765.43.21', cst: '000', cfop: '5102', unit: 'PC', qty: 5, unitPrice: 25.50, aliqIcms: 18, aliqIpi: 0 },
  ]);
  const [faturas, setFaturas] = useState([{ numero: '001', vencimento: today, valor: '308.88' }]);
  const [additionalInfo, setAdditionalInfo] = useState('Informações complementares de interesse do contribuinte.');

  const danfePreviewRef = useRef(null);

  const handleLogoChange = (e) => { if (e.target.files && e.target.files[0]) setLogo(URL.createObjectURL(e.target.files[0])); };
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };
  const handleProductChange = (id, field, value) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const addProduct = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, code: '', description: '', ncm: '', cst: '', cfop: '', unit: '', qty: 1, unitPrice: 0, aliqIcms: 0, aliqIpi: 0 }]);
  };
  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };
  const handleFaturaChange = (index, field, value) => {
    const newFaturas = [...faturas];
    newFaturas[index][field] = value;
    setFaturas(newFaturas);
  };
  const addFatura = () => setFaturas([...faturas, { numero: '', vencimento: '', valor: '' }]);
  const removeFatura = (index) => setFaturas(faturas.filter((_, i) => i !== index));

  const calculateTotals = useCallback(() => {
    const totalProdutos = products.reduce((acc, p) => acc + ((p.qty || 0) * (p.unitPrice || 0)), 0);
    const valorIcms = products.reduce((acc, p) => acc + (((p.qty || 0) * (p.unitPrice || 0)) * ((p.aliqIcms || 0) / 100)), 0);
    const totalIpi = products.reduce((acc, p) => acc + (((p.qty || 0) * (p.unitPrice || 0)) * ((p.aliqIpi || 0) / 100)), 0);
    const totalNota = totalProdutos + totalIpi + (parseFloat(invoiceDetails.frete) || 0) + (parseFloat(invoiceDetails.seguro) || 0) + (parseFloat(invoiceDetails.outrasDespesas) || 0) - (parseFloat(invoiceDetails.desconto) || 0);
    return {
      baseIcms: totalProdutos, valorIcms, baseIcmsSt: 0, valorIcmsSt: 0, totalProdutos, totalIpi, totalNota,
    };
  }, [products, invoiceDetails]);

  const totals = calculateTotals();
  
  const handleExportPdf = () => {
    const { jsPDF, html2canvas } = libs;
    if (!jsPDF || !html2canvas) return console.error("Bibliotecas não carregadas.");
    const input = danfePreviewRef.current;
    if (!input) return;
    html2canvas(input, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
      pdf.save(`danfe-${invoice.number}.pdf`);
    });
  };

  const data = {
    logo, emitter, recipient, invoice, transport, products, faturas, 
    invoiceDetails, totals, additionalInfo, 
    onProductChange: handleProductChange,
    onAddProduct: addProduct,
    onRemoveProduct: removeProduct
  };

  return (
    <>
      <GlobalStyles />
      <div className="app-container">
        <aside className="sidebar no-print">
          <h1>Gerador de DANFE</h1>
          <details className="form-section" open><summary>Emitente</summary>
            <div className="grid">
              <label>Logo: <input type="file" accept="image/*" onChange={handleLogoChange} /></label>
              <input name="name" value={emitter.name} onChange={handleInputChange(setEmitter)} placeholder="Nome/Razão Social" />
              <input name="cnpj" value={emitter.cnpj} onChange={handleInputChange(setEmitter)} placeholder="CNPJ" />
              <div className="grid grid-2-cols">
                <input name="ie" value={emitter.ie} onChange={handleInputChange(setEmitter)} placeholder="Inscrição Estadual" />
                <input name="ieSt" value={emitter.ieSt} onChange={handleInputChange(setEmitter)} placeholder="IE Subst. Trib." />
              </div>
              <input name="address" value={emitter.address} onChange={handleInputChange(setEmitter)} placeholder="Endereço" />
              <div className="grid grid-2-cols">
                <input name="bairro" value={emitter.bairro} onChange={handleInputChange(setEmitter)} placeholder="Bairro" />
                <input name="cep" value={emitter.cep} onChange={handleInputChange(setEmitter)} placeholder="CEP" />
              </div>
              <div className="grid grid-2-cols">
                <input name="municipio" value={emitter.municipio} onChange={handleInputChange(setEmitter)} placeholder="Município" />
                <input name="uf" value={emitter.uf} onChange={handleInputChange(setEmitter)} placeholder="UF" />
              </div>
              <input name="phone" value={emitter.phone} onChange={handleInputChange(setEmitter)} placeholder="Telefone" />
            </div>
          </details>
          <details className="form-section"><summary>Dados da Nota</summary>
             <div className="grid">
                <input name="operationNature" value={invoice.operationNature} onChange={handleInputChange(setInvoice)} placeholder="Natureza da Operação" />
                <div className="grid grid-2-cols">
                  <input name="number" value={invoice.number} onChange={handleInputChange(setInvoice)} placeholder="Número" />
                  <input name="series" value={invoice.series} onChange={handleInputChange(setInvoice)} placeholder="Série" />
                </div>
                 <select name="tipo" value={invoice.tipo} onChange={handleInputChange(setInvoice)}>
                    <option value="0">0 - Entrada</option>
                    <option value="1">1 - Saída</option>
                 </select>
                <textarea name="key" value={invoice.key} onChange={handleInputChange(setInvoice)} placeholder="Chave de Acesso" rows="2"></textarea>
                <input name="protocolo" value={invoice.protocolo} onChange={handleInputChange(setInvoice)} placeholder="Protocolo" />
                <div className="grid grid-2-cols">
                    <label>Data Emissão: <input type="date" name="dataEmissao" value={invoice.dataEmissao} onChange={handleInputChange(setInvoice)} /></label>
                    <label>Data Saída: <input type="date" name="dataSaida" value={invoice.dataSaida} onChange={handleInputChange(setInvoice)} /></label>
                </div>
                <label>Hora Saída: <input type="time" name="horaSaida" value={invoice.horaSaida} onChange={handleInputChange(setInvoice)} /></label>
             </div>
          </details>
          <details className="form-section"><summary>Valores da Nota</summary>
            <div className="grid grid-2-cols">
                <label>Frete: <input type="number" name="frete" value={invoiceDetails.frete} onChange={handleInputChange(setInvoiceDetails)} /></label>
                <label>Seguro: <input type="number" name="seguro" value={invoiceDetails.seguro} onChange={handleInputChange(setInvoiceDetails)} /></label>
                <label>Desconto: <input type="number" name="desconto" value={invoiceDetails.desconto} onChange={handleInputChange(setInvoiceDetails)} /></label>
                <label>Outras Desp.: <input type="number" name="outrasDespesas" value={invoiceDetails.outrasDespesas} onChange={handleInputChange(setInvoiceDetails)} /></label>
            </div>
          </details>
          <details className="form-section"><summary>Faturas</summary>
            {faturas.map((f, i) => (
                <div key={i} className="grid grid-2-cols" style={{alignItems: 'center', marginBottom: '10px'}}>
                    <input value={f.numero} onChange={e => handleFaturaChange(i, 'numero', e.target.value)} placeholder="Num."/>
                    <input type="date" value={f.vencimento} onChange={e => handleFaturaChange(i, 'vencimento', e.target.value)} />
                    <input value={f.valor} onChange={e => handleFaturaChange(i, 'valor', e.target.value)} placeholder="Valor"/>
                    <button onClick={() => removeFatura(i)} className="remove-btn-small">Remover</button>
                </div>
            ))}
            <button onClick={addFatura}>+ Adicionar Fatura</button>
          </details>
          <div style={{marginTop: '2rem', display: 'flex', gap: '1rem'}}>
            <button onClick={() => window.print()} className="action-button primary">Imprimir</button>
            <button onClick={handleExportPdf} className="action-button secondary" disabled={!libs.jsPDF}>Exportar PDF</button>
          </div>
        </aside>
        <main className="main-content">
          <div ref={danfePreviewRef}>
            <DanfePreview data={data} libs={libs} />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
