import type { File } from "./types";

const fileTypes = ["PDF", "XLSX", "JSON", "DOCX", "TXT", "CSV"];
const permissions = ["Leitura", "Leitura/Escrita", "Somente Leitura"];
const uploaders = [
  "João Silva",
  "Maria Santos",
  "Pedro Oliveira",
  "Ana Costa",
  "Lucas Almeida",
  "Beatriz Fernandes",
  "Marcos Pereira",
  "Carla Nascimento"
];

function formatSize(kb: number) {
  if (kb >= 1024) return `${(kb / 1024).toFixed(1)} MB`;
  return `${kb} KB`;
}

function pad(n: number, width = 4) {
  return String(n).padStart(width, "0");
}

function formatDate(day: number, month: number, year = 2026) {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}/${mm}/${year}`;
}

function generateFiles(count: number, startId = 1, archived = false): File[] {
  return Array.from({ length: count }).map((_, i) => {
    const id = startId + i;
    const type = fileTypes[id % fileTypes.length];
    const ext = type === "PDF" ? "pdf" : type.toLowerCase();
    const sizeKb = 50 + ((id * 37) % 5000); // deterministic pseudo-random size
    const namePrefix = archived ? "ARCHIVE" : "FILE";
    const name = `${namePrefix}_${pad(id)}.${ext}`;
    const uploadedBy = uploaders[id % uploaders.length];
    const day = (id % 28) + 1;
    const month = ((5 + (id % 12)) % 12) || 12; // spread months
    const date = formatDate(day, month);
    const permission = permissions[id % permissions.length];
    const shared = id % 3 === 0;

    return {
      id,
      name,
      size: formatSize(sizeKb),
      type,
      uploadedBy,
      date,
      permission,
      shared
    } as File;
  });
}

export const filesData: File[] = generateFiles(5000, 1, false);
export const archivedFilesData: File[] = generateFiles(100, 5001, true);
