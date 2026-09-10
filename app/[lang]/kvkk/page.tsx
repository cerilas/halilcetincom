import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aydınlatma Metni ve KVKK | Halil Çetin",
  description: "Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aydınlatma metnimiz.",
};

export default function KvkkPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-display mb-8">Aydınlatma Metni ve KVKK</h1>
      <div className="prose prose-invert prose-gold max-w-none text-muted leading-relaxed">
        <p>
          Halil Çetin Saç Ekim Merkezi ("Klinik") olarak, kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu bilinçle, Kliniğimiz ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVK Kanunu")'na uygun olarak işlenerek, muhafaza edilmesine büyük önem atfetmekteyiz.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">1. Kişisel Verilerin Toplanması, İşlenmesi ve İşleme Amaçları</h2>
        <p>
          Kişisel verileriniz, Kliniğimiz tarafından sağlanan sağlık ve estetik hizmetleri (saç ekimi, sakal ekimi, medikal estetik vb.) ile ticari faaliyetlere bağlı olarak değişkenlik gösterebilmekle birlikte; otomatik ya da otomatik olmayan yöntemlerle, ofisler, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir. 
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">2. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
        <p>
          Toplanan kişisel verileriniz, KVK Kanunu'nun 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir. Kliniğimiz tıbbi teşhis, tedavi ve bakım hizmetlerinin yürütülmesi, randevu planlaması ve hizmet kalitesinin artırılması amacıyla verilerinizi işlemektedir.
        </p>
        
        <h2 className="text-xl text-foreground mt-8 mb-4">3. Kişisel Veri Sahibinin Hakları</h2>
        <p>
          Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi Kliniğimize iletmeniz durumunda, talebinizin niteliğine göre en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandırılacaktır. 
        </p>
      </div>
    </div>
  );
}
