import * as XLSX from "xlsx";

export interface ImportRow {
  rowNumber: number;
  sku: string;
  nombre: string;
  precio: number | null;
  stock: number | null;
  category_id: number | null;
  descripcion: string;
}

const HEADER_ALIASES: Record<string, string[]> = {
  sku: ["sku", "codigo", "código", "code"],
  nombre: ["nombre", "name", "producto"],
  precio: ["precio", "price", "precio ($)", "precio(clp)", "precio clp", "precio de venta"],
  stock: ["stock", "cantidad", "existencias", "inventario"],
  category_id: ["category_id", "categoria_id", "categoria id", "id categoria", "categoria"],
  descripcion: ["descripcion", "description", "detalle"],
};

function normalizeHeader(value: string): string {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function matchField(header: string): string | null {
  const normalized = normalizeHeader(header);
  for (const [field, aliases] of Object.entries(HEADER_ALIASES)) {
    if (aliases.some((alias) => normalizeHeader(alias) === normalized)) return field;
  }
  return null;
}

function parseFlexibleNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return value;

  let str = String(value).trim().replace(/[^0-9.,-]/g, "");
  if (str === "" || str === "-") return null;

  const lastComma = str.lastIndexOf(",");
  const lastDot = str.lastIndexOf(".");

  if (lastComma > -1 && lastDot > -1) {
    if (lastComma > lastDot) {
      str = str.replace(/\./g, "").replace(",", ".");
    } else {
      str = str.replace(/,/g, "");
    }
  } else if (lastComma > -1) {
    str = str.replace(",", ".");
  }

  const num = parseFloat(str);
  return Number.isNaN(num) ? null : num;
}

function parseCsvText(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  const pushField = () => {
    row.push(field);
    field = "";
  };
  const pushRow = () => {
    pushField();
    rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === delimiter) {
      pushField();
    } else if (char === "\n") {
      pushRow();
    } else if (char === "\r") {
      // ignorar retorno de carro
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) pushRow();

  return rows;
}

function rowsFromCsv(text: string): Record<string, unknown>[] {
  const firstLine = text.split("\n")[0] ?? "";
  const semicolons = (firstLine.match(/;/g) || []).length;
  const commas = (firstLine.match(/,/g) || []).length;
  const delimiter = semicolons > commas ? ";" : ",";

  const lines = parseCsvText(text, delimiter).filter((line) => line.some((cell) => cell.trim() !== ""));
  if (lines.length === 0) return [];

  const headers = lines[0];
  return lines.slice(1).map((line) => {
    const row: Record<string, unknown> = {};
    headers.forEach((header, i) => {
      row[header] = line[i] ?? "";
    });
    return row;
  });
}

function toIntOrNull(value: number | null): number | null {
  if (value === null || Number.isNaN(value)) return null;
  return Math.trunc(value);
}

export async function parseInventoryFile(file: File): Promise<ImportRow[]> {
  const isCsv = file.name.toLowerCase().endsWith(".csv");
  let rawRows: Record<string, unknown>[];

  if (isCsv) {
    const text = await file.text();
    rawRows = rowsFromCsv(text);
  } else {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    rawRows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
  }

  return rawRows
    .map((raw, idx) => {
      const mapped: Record<string, unknown> = {};
      Object.entries(raw).forEach(([header, value]) => {
        const field = matchField(header);
        if (field) mapped[field] = value;
      });

      return {
        rowNumber: idx + 2,
        sku: String(mapped.sku ?? "").trim(),
        nombre: String(mapped.nombre ?? "").trim(),
        precio: parseFlexibleNumber(mapped.precio),
        stock: toIntOrNull(parseFlexibleNumber(mapped.stock)),
        category_id: toIntOrNull(parseFlexibleNumber(mapped.category_id)),
        descripcion: String(mapped.descripcion ?? "").trim(),
      };
    })
    .filter((row) => row.sku !== "" || row.nombre !== "");
}

export function buildInventoryTemplateCsv(): string {
  const header = "sku,nombre,precio,stock,category_id,descripcion";
  const example = "PFC-001,Pollo Frito Coreano,15990,50,1,Crujiente pollo bañado en salsa agridulce picante";
  return `${header}\n${example}\n`;
}
