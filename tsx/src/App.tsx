
import Ajv from "ajv";
import data from "./data/data.json";
import { Post } from "./types";
import "./styles.css";

// 📌 Esquema de validación JSON Schema
const postSchema = {
  type: "object",
  properties: {
    month: { type: "string" },
    positive: { type: "number" },
    negative: { type: "number" },
    death: { type: "number" },
    hospitalized: { type: "number" },
    totalTestResults: { type: "number" }
  },
  required: ["month", "positive", "negative", "death", "hospitalized", "totalTestResults"]
};

// ✅ Valida los datos directamente antes de renderizar
const ajv = new Ajv();
const validate = ajv.compile(postSchema);
const validData: Post[] = (data as Post[]).filter((post) => validate(post));
const hasErrors = validData.length !== (data as Post[]).length;

const App = () => {
  return (
    <div className="container">
      <h2>📊 Datos de COVID-19</h2>
      {hasErrors && <p className="error">❌ Error: Algunos datos no son válidos según el esquema.</p>}
      <div className="cards-container">
        {validData.map((post, index) => (
          <div key={index} className="card">
            <h3>{post.month}</h3>
            <p><strong>Casos positivos:</strong> {post.positive}</p>
            <p><strong>Casos negativos:</strong> {post.negative}</p>
            <p><strong>Muertes:</strong> {post.death}</p>
            <p><strong>Hospitalizados:</strong> {post.hospitalized}</p>
            <p><strong>Total pruebas:</strong> {post.totalTestResults}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
