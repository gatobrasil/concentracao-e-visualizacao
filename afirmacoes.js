import { useState } from "react";
import jsPDF from "jspdf";

export default function Afirmacoes() {
  const [afirmacoes, setAfirmacoes] = useState(Array(10).fill(""));
  const [data, setData] = useState("");

  const atualizarAfirmacao = (index, valor) => {
    const novas = [...afirmacoes];
    novas[index] = valor;
    setAfirmacoes(novas);
  };

  const gerarPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text(`Afirmações – ${data || "Data não definida"}`, 20, 20);
    pdf.setFontSize(12);
    afirmacoes.forEach((afirmacao, index) => {
      if (afirmacao.trim() !== "") {
        pdf.text(`${index + 1}. ${afirmacao}`, 20, 40 + index * 10);
      }
    });
    pdf.save(`afirmacoes-${data || "sem-data"}.pdf`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>💬 Afirmações diárias</h1>
      <label>📅 Data: </label>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      {afirmacoes.map((a, i) => (
        <div key={i}>
          <label>{i + 1}.</label>
          <input
            type="text"
            value={a}
            onChange={(e) => atualizarAfirmacao(i, e.target.value)}
            placeholder="Escreva sua afirmação aqui"
          />
        </div>
      ))}
      <button onClick={gerarPDF} style={{ marginTop: 20 }}>📄 Gerar PDF</button>
    </div>
  );
}
