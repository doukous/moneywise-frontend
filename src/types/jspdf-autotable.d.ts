declare module "jspdf-autotable" {
  import "jspdf";

  interface AutoTableOptions {
    head?: string[][];
    body?: (string | number | boolean | null)[][];
    startY?: number;
    theme?: "striped" | "grid" | "plain";
  }

  declare module "jspdf" {
    interface jsPDF {
    autoTable: (options: any) => jsPDF;
    }
  }

  export default function autoTable(doc: jsPDF, options: AutoTableOptions): jsPDF;
}
