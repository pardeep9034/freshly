import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useCart } from "../../utils/GeneralContext";
import { calculateItemTotal, formatWeight, calculateTotal } from "../../utils/Functions";

const PrintableBill = ({name}) => {
  const componentRef = useRef();
  const { cartItems } = useCart();

  const billData = {
    billNo: "00123",
    date: new Date().toLocaleDateString(),
    customerName: name,
    items: cartItems,
  };
  const total = calculateTotal(cartItems);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Bill-Receipt",
  });

  return (
    <div style={{ fontFamily: "Courier, monospace", fontSize: "12px", lineHeight: "1.5" }}>
      <div ref={componentRef} style={{ maxWidth: "58mm", padding: "10px", wordWrap: "break-word" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <strong>Freshly pvt.ltd</strong>
          <br />
          123, Yamunanagar,Haryana,135001
          <br />
          Phone: +1 123 456 789
          <hr style={{ border: "1px dashed black", margin: "10px 0" }} />
        </div>

        {/* Bill Information */}
        <div style={{ marginBottom: "10px" }}>
          Bill No: {billData.billNo}
          <br />
          Date: {billData.date}
          <br />
          Customer: {billData.customerName}
        </div>

        {/* Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Item</th>
              <th style={{ textAlign: "right" }}>Qty</th>
              <th style={{ textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {billData.items.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "left" }}>
                  {item.name} {item.isPacket ? "(Packet)" : ""}
                 
                </td>
                <td style={{ textAlign: "right" }}>{item.isPacket ? item.quantity : formatWeight(item.weightInGrams)}</td>
                <td style={{ textAlign: "right" }}>₹{calculateItemTotal(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <hr style={{ border: "1px dashed black", margin: "10px 0" }} />
        <div style={{ textAlign: "right" }}>
          Total: ₹{total}
          <br />
          Discount: ₹0.00
          <br />
          Grand Total: ₹{total}
        </div>

        {/* Footer */}
        <hr style={{ border: "1px dashed black", margin: "10px 0" }} />
        <div style={{ textAlign: "center" }}>
          Thank you for shopping with us!
        </div>
      </div>

      {/* Print Button */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={handlePrint}
          style={{
            padding: "5px 10px",
            fontSize: "12px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Print Bill
        </button>
      </div>
    </div>
  );
};

export default PrintableBill;
