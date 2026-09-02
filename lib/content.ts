import { promises as fs } from "fs";
import path from "path";
import type { Inquiry, SiteContent } from "@/lib/types";

const contentPath = path.join(process.cwd(), "data", "content.json");
const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");

export async function getContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveContent(content: SiteContent) {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), "utf8");
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
