import { promises as fs } from "fs";
import path from "path";
import type { Inquiry, SiteContent } from "@/lib/types";

const getPath = (locale: string) => path.join(process.cwd(), "data", `content.${locale}.json`);
const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");

export async function getContent(locale: string = "tr"): Promise<SiteContent> {
  const targetPath = getPath(locale);
  try {
    const raw = await fs.readFile(targetPath, "utf8");
    return JSON.parse(raw) as SiteContent;
  } catch (e) {
    // Fallback to tr if locale file doesn't exist
    const raw = await fs.readFile(getPath("tr"), "utf8");
    return JSON.parse(raw) as SiteContent;
  }
}

export async function saveContent(content: SiteContent, locale: string = "tr") {
  await fs.writeFile(getPath(locale), JSON.stringify(content, null, 2), "utf8");
}

export async function getInquiries(): Promise<Inquiry[]> {
  const raw = await fs.readFile(inquiriesPath, "utf8");
  return JSON.parse(raw) as Inquiry[];
}

export async function addInquiry(inquiry: Inquiry) {
  const list = await getInquiries();
  list.unshift(inquiry);
  await fs.writeFile(inquiriesPath, JSON.stringify(list, null, 2), "utf8");
}

export async function updateInquiry(id: string, updates: Partial<Inquiry>) {
  const list = await getInquiries();
  const index = list.findIndex(i => i.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...updates };
    await fs.writeFile(inquiriesPath, JSON.stringify(list, null, 2), "utf8");
  }
}

export async function deleteInquiry(id: string) {
  const list = await getInquiries();
  const filtered = list.filter(i => i.id !== id);
  await fs.writeFile(inquiriesPath, JSON.stringify(filtered, null, 2), "utf8");
}
