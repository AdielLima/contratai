import React, { useEffect } from "react";
import "./styles.css";

export default function IntegracaoMercadoPago({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const mp = new MercadoPago("TEST-96fd7ebe-46d2-43cd-a968-e03ecc005ee2");

    const cardForm = mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: { id: "form-checkout__cardNumber", placeholder: "Número do cartão" },
        expirationDate: { id: "form-checkout__expirationDate", placeholder: "MM/YY" },
        securityCode: { id: "form-checkout__securityCode", placeholder: "Código de segurança" },
        cardholderName: { id: "form-checkout__cardholderName", placeholder: "Titular do cartão" },
        issuer: { id: "form-checkout__issuer", placeholder: "Banco emissor" },
        installments: { id: "form-checkout__installments", placeholder: "Parcelas" },
        identificationType: { id: "form-checkout__identificationType", placeholder: "Tipo de documento" },
        identificationNumber: { id: "form-checkout__identificationNumber", placeholder: "Número do documento" },
        cardholderEmail: { id: "form-checkout__cardholderEmail", placeholder: "E-mail" },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) console.warn("Erro ao montar o formulário", error);
        },
        onSubmit: event => {
          event.preventDefault();
          const data = cardForm.getCardFormData();

          fetch("/process_payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: data.token,
              issuer_id: data.issuerId,
              payment_method_id: data.paymentMethodId,
              transaction_amount: Number(data.amount),
              installments: Number(data.installments),
              description: "Descrição do produto",
              payer: {
                email: data.cardholderEmail,
                identification: {
                  type: data.identificationType,
                  number: data.identificationNumber,
                },
              },
            }),
          });
        },
      },
    });
  }, [isOpen]);

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Pagamento</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form id="form-checkout">
            <div id="form-checkout__cardNumber" className="container"></div>
            <div id="form-checkout__expirationDate" className="container"></div>
            <div id="form-checkout__securityCode" className="container"></div>
            <input type="text" id="form-checkout__cardholderName" />
            <select id="form-checkout__issuer"></select>
            <select id="form-checkout__installments"></select>
            <select id="form-checkout__identificationType"></select>
            <input type="text" id="form-checkout__identificationNumber" />
            <input type="email" id="form-checkout__cardholderEmail" />

            <button type="submit" id="form-checkout__submit" className="button is-primary">
              Pagar
            </button>
            <progress value="0" className="progress-bar">
              Carregando...
            </progress>
          </form>
        </section>
      </div>
    </div>
  );
}