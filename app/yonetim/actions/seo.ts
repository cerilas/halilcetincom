"use server";

import * as cheerio from "cheerio";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (session?.value !== "authenticated") {
    throw new Error("Unauthorized");
  }
}

export async function checkGoogleRanking(keyword: string, targetDomain: string) {
  await checkAuth();
  
  try {
    const query = encodeURIComponent(keyword);
    let rank = -1;
    let totalScanned = 0;
    const links: string[] = [];
    
    let currentCookie = "";

    for (let page = 0; page < 5; page++) {
      const startIndex = page * 10 + 1;
      const url = `https://www.bing.com/search?q=${query}&first=${startIndex}&cc=tr&setlang=tr-tr`;
      
      const response = await fetch(url, { 
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Cookie": currentCookie,
          "Accept-Language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7"
        },
        next: { revalidate: 0 } 
      });

      if (!response.ok) {
        if (page === 0) throw new Error("Arama motoru yanıt vermedi.");
        break; // Stop paginating if subsequent pages fail
      }

      // Save cookie for next requests
      const setCookie = response.headers.get('set-cookie');
      if (setCookie) currentCookie = setCookie;

      const html = await response.text();
      const $ = cheerio.load(html);

      let foundOnThisPage = 0;
      $("li.b_algo h2 a").each((i, el) => {
        let href = $(el).attr("href");
        if (href) {
          // Bing base64 encoding decode
          if (href.includes('bing.com/ck/a?!')) {
            const m = href.match(/&u=([^&]+)/);
            if (m) {
              let encoded = m[1];
              if (encoded.startsWith('a1')) encoded = encoded.substring(2);
              try {
                href = Buffer.from(encoded, 'base64').toString('utf8');
              } catch(e) {}
            }
          }
          
          if (href.startsWith("http") && !href.includes("bing.com")) {
            if (!links.includes(href)) {
              links.push(href);
              foundOnThisPage++;
              totalScanned++;
              
              if (href.toLowerCase().includes(targetDomain.toLowerCase()) && rank === -1) {
                rank = totalScanned;
              }
            }
          }
        }
      });

      if (rank !== -1) break; // Found it!
      if (totalScanned >= 50) break; // Reached 50 results limit
      if (foundOnThisPage === 0) break; // End of results
    }

    if (totalScanned === 0) {
      return { success: false, error: "Arama motorundan sonuç alınamadı." };
    }

    return { success: true, rank, totalScanned };
  } catch (error: any) {
    console.error("Rank Checker Error:", error);
    return { success: false, error: error.message || "Bilinmeyen bir hata oluştu" };
  }
}
