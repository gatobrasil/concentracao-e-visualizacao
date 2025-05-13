import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function QuadroDosSonhos() {
  const [sonhos, setSonhos] = useState([{ nome: "", imagem: null }]);

  const adicionarSonho = () => {
    if (sonhos.length < 5) {
      setSonhos([...sonhos, { nome: "", imagem: null }]);
    }
  };

  const atualizarSonho = (index, campo, valor) => {
    const novosSonhos = [...sonhos];
    novosSonhos[index][campo] = valor;
    setSonhos(novosSonhos);
  };

  const gerarPDF = async () => {
    const area = document.getElementById("quadroPDF");
    const canvas = await html2canvas(area);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("quadro-dos-sonhos.pdf");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎯 Quadro dos Sonhos</h1>
      {sonhos.map((s, i) => (
        <div key={i}>
          <input
            type="text"
            placeholder={`Nome do sonho ${i + 1}`}
            value={s.nome}
            onChange={(e) => atualizarSonho(i, "nome", e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              atualizarSonho(i, "imagem", URL.createObjectURL(e.target.files[0]))
            }
          />
        </div>
      ))}
      {sonhos.length < 5 && <button onClick={adicionarSonho}>+ Adicionar outro sonho</button>}

      <div id="quadroPDF" style={{ marginTop: 30, padding: 10, border: "1px solid #ccc" }}>
        <h2 style={{ textAlign: "center" }}>🖼️ Meu Quadro dos Sonhos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {sonhos.map((s, i) => (
            <div key={i} style={{ width: "45%", margin: 10, padding: 10, textAlign: "center" }}>
              {s.imagem && <img src={s.imagem} alt="imagem" style={{ width: "100%", maxHeight: 150 }} />}
              <p>{s.nome}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={gerarPDF} style={{ marginTop: 20 }}>📄 Criar PDF do Quadro</button>
    </div>
  );
}
