"use client";

import { useState, useRef } from "react";
import type { Article } from "@prisma/client";
import { Plus, Edit2, Trash2, X, FileText, Image as ImageIcon, Upload } from "lucide-react";
import { GlareButton } from "@/components/ui/glare-button";
import { createArticle, updateArticle, deleteArticle } from "../../actions";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { toast } from "sonner";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

type TabType = "TR" | "EN";

const quillModules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered'}, { list: 'bullet' }],
    ['link', 'clean']
  ],
};

export function CmsView({ initialArticles }: { initialArticles: Article[] }) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("TR");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    author: "Saç Ekim Uzmanı Halil Çetin",
    coverImage: "",
    coverImageAlt: "",
    contentHtml: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    
    // English fields
    titleEn: "",
    coverImageAltEn: "",
    contentHtmlEn: "",
    metaTitleEn: "",
    metaDescriptionEn: "",
    metaKeywordsEn: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      author: "Saç Ekim Uzmanı Halil Çetin",
      coverImage: "",
      coverImageAlt: "",
      contentHtml: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      titleEn: "",
      coverImageAltEn: "",
      contentHtmlEn: "",
      metaTitleEn: "",
      metaDescriptionEn: "",
      metaKeywordsEn: "",
    });
    setEditingId(null);
    setActiveTab("TR");
  };

  const handleOpenNew = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (article: Article) => {
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category,
      author: article.author || "Saç Ekim Uzmanı Halil Çetin",
      coverImage: article.coverImage || "",
      coverImageAlt: article.coverImageAlt || "",
      contentHtml: article.contentHtml,
      metaTitle: article.metaTitle || "",
      metaDescription: article.metaDescription || "",
      metaKeywords: article.metaKeywords || "",
      titleEn: article.titleEn || "",
      coverImageAltEn: article.coverImageAltEn || "",
      contentHtmlEn: article.contentHtmlEn || "",
      metaTitleEn: article.metaTitleEn || "",
      metaDescriptionEn: article.metaDescriptionEn || "",
      metaKeywordsEn: article.metaKeywordsEn || "",
    });
    setEditingId(article.id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    toast("Bu makaleyi silmek istediğinize emin misiniz?", {
      action: {
        label: "Evet, Sil",
        onClick: async () => {
          setArticles((prev) => prev.filter((a) => a.id !== id));
          await deleteArticle(id);
          toast.success("Makale başarıyla silindi.");
        },
      },
      cancel: { label: "İptal", onClick: () => {} },
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/yonetim/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      
      if (res.ok && result.url) {
        setFormData(prev => ({ ...prev, coverImage: result.url }));
        toast.success("Görsel başarıyla yüklendi.");
      } else {
        toast.error("Görsel yüklenemedi: " + (result.error || "Bilinmeyen hata"));
      }
    } catch (error) {
      toast.error("Yükleme sırasında bir hata oluştu.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.title || !formData.contentHtml || !formData.category) {
      toast.error("Lütfen Türkçe başlık, kategori ve içerik alanlarını doldurun.");
      return;
    }
    
    setIsLoading(true);

    const dataPayload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: formData.category,
      author: formData.author,
      coverImage: formData.coverImage || null,
      coverImageAlt: formData.coverImageAlt || null,
      contentHtml: formData.contentHtml,
      metaTitle: formData.metaTitle || null,
      metaDescription: formData.metaDescription || null,
      metaKeywords: formData.metaKeywords || null,
      
      titleEn: formData.titleEn || null,
      coverImageAltEn: formData.coverImageAltEn || null,
      contentHtmlEn: formData.contentHtmlEn || null,
      metaTitleEn: formData.metaTitleEn || null,
      metaDescriptionEn: formData.metaDescriptionEn || null,
      metaKeywordsEn: formData.metaKeywordsEn || null,
    };

    try {
      if (editingId) {
        const updated = await updateArticle(editingId, dataPayload);
        setArticles((prev) => prev.map((a) => (a.id === editingId ? (updated as any) : a)));
        toast.success("Makale başarıyla güncellendi.");
      } else {
        const created = await createArticle(dataPayload);
        setArticles((prev) => [created as any, ...prev]);
        toast.success("Yeni makale başarıyla oluşturuldu.");
      }
      setIsFormOpen(false);
      resetForm();
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error("Kaydetme hatası: " + (error.message || "Bilinmeyen hata"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isFormOpen) {
    return (
      <div className="flex-1 border border-line rounded-3xl bg-card overflow-hidden flex flex-col h-full">
        {/* Form Header */}
        <div className="flex items-center justify-between p-4 border-b border-line bg-background/50">
          <h2 className="font-medium">{editingId ? "Makaleyi Düzenle" : "Yeni Makale Ekle"}</h2>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-xl border border-line text-sm hover:bg-line/20">İptal</button>
            <GlareButton type="button" onClick={handleSubmit} className="bg-gold text-white font-bold dark:text-black dark:font-medium">
              {isLoading ? "Kaydediliyor..." : "Kaydet"}
            </GlareButton>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-line bg-background/30">
          <button 
            onClick={() => setActiveTab("TR")}
            className={cn("px-8 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "TR" ? "border-gold text-gold" : "border-transparent text-muted hover:text-foreground")}
          >
            Türkçe (Ana)
          </button>
          <button 
            onClick={() => setActiveTab("EN")}
            className={cn("px-8 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "EN" ? "border-gold text-gold" : "border-transparent text-muted hover:text-foreground")}
          >
            English (İngilizce)
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column: Main Content */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* TR TAB */}
              <div className={cn("space-y-6", activeTab === "TR" ? "block" : "hidden")}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted mb-1">Başlık (TR) <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Slug (URL Uzantısı - Sadece TR için geçerlidir)</label>
                    <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Kategori (TR) <span className="text-red-500">*</span></label>
                    <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-2">Makale İçeriği (TR) <span className="text-red-500">*</span></label>
                  <div className="bg-background rounded-xl overflow-hidden border border-line text-foreground">
                    <ReactQuill theme="snow" modules={quillModules} value={formData.contentHtml} onChange={(val) => setFormData({...formData, contentHtml: val})} className="h-[400px]" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-line space-y-4">
                  <h3 className="text-sm font-medium">SEO Ayarları (TR)</h3>
                  <div>
                    <label className="block text-xs text-muted mb-1">SEO Title</label>
                    <input type="text" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">SEO Description</label>
                    <textarea rows={2} value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">SEO Keywords (Virgülle ayırın)</label>
                    <input type="text" value={formData.metaKeywords} onChange={e => setFormData({...formData, metaKeywords: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                </div>
              </div>

              {/* EN TAB */}
              <div className={cn("space-y-6", activeTab === "EN" ? "block" : "hidden")}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-muted mb-1">Başlık (EN)</label>
                    <input type="text" value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-muted mb-2">Makale İçeriği (EN)</label>
                  <div className="bg-background rounded-xl overflow-hidden border border-line text-foreground">
                    <ReactQuill theme="snow" modules={quillModules} value={formData.contentHtmlEn} onChange={(val) => setFormData({...formData, contentHtmlEn: val})} className="h-[400px]" />
                  </div>
                </div>
                
                <div className="pt-4 border-t border-line space-y-4">
                  <h3 className="text-sm font-medium">SEO Ayarları (EN)</h3>
                  <div>
                    <label className="block text-xs text-muted mb-1">SEO Title (EN)</label>
                    <input type="text" value={formData.metaTitleEn} onChange={e => setFormData({...formData, metaTitleEn: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">SEO Description (EN)</label>
                    <textarea rows={2} value={formData.metaDescriptionEn} onChange={e => setFormData({...formData, metaDescriptionEn: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">SEO Keywords (EN)</label>
                    <input type="text" value={formData.metaKeywordsEn} onChange={e => setFormData({...formData, metaKeywordsEn: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Settings & Media */}
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-background/50 border border-line space-y-4">
                <h3 className="text-sm font-medium flex items-center gap-2"><ImageIcon size={16}/> Kapak Görseli</h3>
                
                {formData.coverImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-line h-40 group">
                    <img src={formData.coverImage} alt="Kapak" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setFormData({...formData, coverImage: ""})} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-line rounded-xl h-40 flex flex-col items-center justify-center text-muted gap-2 bg-background/20">
                    <ImageIcon size={24} className="opacity-50" />
                    <span className="text-xs">Görsel Yüklenmedi</span>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="image/png, image/jpeg, image/webp" 
                  className="hidden" 
                />
                
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  disabled={isUploading}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gold/10 text-gold text-sm font-medium hover:bg-gold hover:text-black transition-colors disabled:opacity-50"
                >
                  <Upload size={16} />
                  {isUploading ? "Yükleniyor..." : (formData.coverImage ? "Görseli Değiştir" : "Bilgisayardan Yükle")}
                </button>
                
                <div className="pt-2">
                  <label className="block text-xs text-muted mb-1">Görsel URL (Manuel)</label>
                  <input type="text" value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} className="w-full rounded-xl border border-line bg-background px-3 py-1.5 text-xs outline-none focus:border-gold" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-background/50 border border-line space-y-4">
                <h3 className="text-sm font-medium">Yazar Bilgisi</h3>
                <div>
                  <label className="block text-xs text-muted mb-1">Yazar Adı</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-background/50 border border-line space-y-4">
                <h3 className="text-sm font-medium">Görsel SEO Alt Metinleri</h3>
                <div>
                  <label className="block text-xs text-muted mb-1">Alt Metin (TR)</label>
                  <input type="text" value={formData.coverImageAlt} onChange={e => setFormData({...formData, coverImageAlt: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Alt Text (EN)</label>
                  <input type="text" value={formData.coverImageAltEn} onChange={e => setFormData({...formData, coverImageAltEn: e.target.value})} className="w-full rounded-xl border border-line bg-background px-4 py-2 text-sm outline-none focus:border-gold" />
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col border border-line rounded-3xl bg-card overflow-hidden">
      <div className="p-4 border-b border-line bg-background/50 flex items-center justify-between">
        <h2 className="font-medium text-sm text-muted">Makaleler ({articles.length})</h2>
        <button 
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold/10 text-gold hover:bg-gold hover:text-black transition-colors text-sm font-medium"
        >
          <Plus size={16} /> Yeni Ekle
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {articles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted gap-4">
            <FileText size={48} className="opacity-20" />
            <p>Henüz hiç makale eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 rounded-2xl border border-line/50 bg-background/30 hover:bg-line/10 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium">{article.title}</span>
                  <div className="flex gap-3 text-xs text-muted mt-1">
                    <span className="px-2 py-0.5 rounded-md bg-card border border-line">{article.category}</span>
                    <span className="flex items-center">/{article.slug}</span>
                    <span className="flex items-center">{new Date(article.publishedAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(article)} className="p-2 text-muted hover:text-gold rounded-lg hover:bg-gold/10 transition-colors" title="Düzenle">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="p-2 text-muted hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="Sil">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
