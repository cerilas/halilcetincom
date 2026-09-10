const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const translations = {
  "sac-ekimi-fiyatlari-2026": {
    en: {
      titleEn: "Hair Transplant Prices 2026: What Are the Cost Factors?",
      metaTitleEn: "2026 Hair Transplant Prices and Cost Factors | Halil Çetin",
      metaDescriptionEn: "Learn about the main factors determining hair transplant prices in 2026, the impact of methods used on costs, and price ranges in Turkey.",
      metaKeywordsEn: "hair transplant prices 2026, how much is hair transplant, fue prices, dhi hair transplant price, hair transplant cost",
      contentHtmlEn: `
        <h2>What Determines Hair Transplant Prices?</h2>
        <p>Hair transplant costs vary according to the needs of each patient and the facilities offered by the clinic. The most important factors determining hair transplant prices in 2026 are:</p>
        <ul>
          <li><strong>Technique Used:</strong> There are price differences between methods such as FUE, DHI or Sapphire FUE. DHI (Direct Hair Implantation) is generally more costly compared to the FUE method because special medical pens (Choi) are used.</li>
          <li><strong>Number of Grafts:</strong> The number of hair follicles (grafts) you need directly affects the duration of the operation and the effort spent. Therefore, costs may be higher in areas with wide gaps.</li>
          <li><strong>Expertise and Experience:</strong> Having the operation led by a doctor, the quality standards of the clinic and the experience of the team are the main elements determining the price.</li>
        </ul>
        <h3>The Importance of Quality and Success Rate</h3>
        <p>Focusing only on cost when researching hair transplant prices can lead to undesirable results. For a permanent, natural-looking and healthy result, choosing treatments applied with surgical precision by an expert team in the field is the best investment.</p>
        <p>As a clinic, we follow a transparent pricing policy to offer our patients the highest quality at the most affordable budget. You can learn your personal budget planning immediately by getting your free hair analysis.</p>
      `,
    },
    ar: {
      titleAr: "أسعار زراعة الشعر 2026: ما هي عوامل التكلفة؟",
      metaTitleAr: "أسعار زراعة الشعر 2026 وعوامل التكلفة | خليل شتين",
      metaDescriptionAr: "تعرف على العوامل الرئيسية التي تحدد أسعار زراعة الشعر في عام 2026، وتأثير الطرق المستخدمة على التكاليف، ونطاقات الأسعار في تركيا.",
      metaKeywordsAr: "أسعار زراعة الشعر 2026، كم تكلفة زراعة الشعر، أسعار FUE، سعر زراعة الشعر DHI، تكلفة زراعة الشعر",
      contentHtmlAr: `
        <h2>ما الذي يحدد أسعار زراعة الشعر؟</h2>
        <p>تختلف تكاليف زراعة الشعر وفقًا لاحتياجات كل مريض والمرافق التي تقدمها العيادة. أهم العوامل التي تحدد أسعار زراعة الشعر في عام 2026 هي:</p>
        <ul>
          <li><strong>التقنية المستخدمة:</strong> توجد اختلافات في الأسعار بين طرق مثل FUE أو DHI أو Sapphire FUE. تعتبر تقنية DHI (زراعة الشعر المباشرة) بشكل عام أكثر تكلفة مقارنة بتقنية FUE لأنه يتم استخدام أقلام طبية خاصة (Choi).</li>
          <li><strong>عدد البصيلات:</strong> يؤثر عدد بصيلات الشعر (الطعوم) التي تحتاجها بشكل مباشر على مدة العملية والجهد المبذول. لذلك، قد تكون التكاليف أعلى في المناطق ذات الفجوات الواسعة.</li>
          <li><strong>الخبرة والتجربة:</strong> قيادة العملية من قبل طبيب، ومعايير الجودة للعيادة وخبرة الفريق هي العناصر الرئيسية التي تحدد السعر.</li>
        </ul>
        <h3>أهمية الجودة ومعدل النجاح</h3>
        <p>التركيز فقط على التكلفة عند البحث عن أسعار زراعة الشعر يمكن أن يؤدي إلى نتائج غير مرغوب فيها. للحصول على نتيجة دائمة وطبيعية وصحية، فإن اختيار العلاجات المطبقة بدقة جراحية من قبل فريق خبير في هذا المجال هو أفضل استثمار.</p>
        <p>كعيادة، نتبع سياسة تسعير شفافة لتقديم أعلى جودة لمرضانا وبأنسب ميزانية. يمكنك معرفة تخطيط ميزانيتك الشخصية على الفور من خلال الحصول على تحليل مجاني للشعر.</p>
      `,
    }
  },
  "fue-vs-dhi-sac-ekimi-yontemleri": {
    en: {
      titleEn: "FUE or DHI? Which Hair Transplant Method is Better for You?",
      metaTitleEn: "FUE and DHI Hair Transplant Comparison - Which is Better?",
      metaDescriptionEn: "What are the differences between FUE and DHI hair transplant methods? Discover the most suitable technique for your own hair structure and hair loss type.",
      metaKeywordsEn: "fue or dhi, dhi hair transplant, fue hair transplant, hair transplant methods, sapphire fue difference",
      contentHtmlEn: `
        <h2>Main Differences Between FUE and DHI</h2>
        <p>The two most preferred hair transplant methods today are FUE (Follicular Unit Extraction) and DHI (Direct Hair Implantation) techniques. Both yield highly successful results, but their application methods are different.</p>
        <h3>FUE Method</h3>
        <p>In the FUE method, hair follicles are collected one by one from the donor area, then micro channels are opened in the area to be transplanted and these follicles are placed into the channels. It is very fast and effective in covering <strong>large areas</strong>. Sapphire FUE, which uses special tipped blades, further shortens the healing time.</p>
        <h3>DHI Method</h3>
        <p>In the DHI method, the channel opening and follicle placement process is done simultaneously with special medical pens called 'Choi Pen'. It is ideal for <strong>densification processes</strong> and <strong>unshaven hair transplant</strong>. It is very advantageous in a denser and more natural front line planning.</p>
        <p>Which method is right for you should be determined under the supervision of a doctor according to the sparseness of your hair, the thickness of your hair strands and your expectations.</p>
      `,
    },
    ar: {
      titleAr: "FUE أم DHI؟ أي طريقة لزراعة الشعر هي الأفضل لك؟",
      metaTitleAr: "مقارنة زراعة الشعر FUE و DHI - أيهما أفضل؟",
      metaDescriptionAr: "ما هي الاختلافات بين طرق زراعة الشعر FUE و DHI؟ اكتشف التقنية الأنسب لبنية شعرك ونوع تساقط الشعر لديك.",
      metaKeywordsAr: "FUE أم DHI، زراعة الشعر DHI، زراعة الشعر FUE، طرق زراعة الشعر، اختلاف Sapphire FUE",
      contentHtmlAr: `
        <h2>الاختلافات الرئيسية بين FUE و DHI</h2>
        <p>أكثر طريقتين لزراعة الشعر تفضيلاً اليوم هما تقنيات FUE (اقتطاف وحدة البصيلات) و DHI (زراعة الشعر المباشرة). كلاهما يعطي نتائج ناجحة للغاية، لكن طرق تطبيقهما مختلفة.</p>
        <h3>طريقة FUE</h3>
        <p>في طريقة FUE، يتم جمع بصيلات الشعر واحدة تلو الأخرى من المنطقة المانحة، ثم يتم فتح قنوات دقيقة في المنطقة المراد زراعتها ووضع هذه البصيلات في القنوات. إنه سريع جدا وفعال في تغطية <strong>المناطق الواسعة</strong>. تقنية Sapphire FUE، التي تستخدم شفرات ذات رؤوس خاصة، تقصر من وقت الشفاء.</p>
        <h3>طريقة DHI</h3>
        <p>في طريقة DHI، تتم عملية فتح القناة ووضع البصيلات في وقت واحد باستخدام أقلام طبية خاصة تسمى 'Choi Pen'. إنه مثالي <strong>لعمليات التكثيف</strong> و <strong>زراعة الشعر بدون حلاقة</strong>. إنه مفيد للغاية في تخطيط الخط الأمامي بشكل أكثر كثافة وطبيعية.</p>
        <p>الطريقة المناسبة لك يجب أن يتم تحديدها تحت إشراف طبيب وفقًا لترقق شعرك، وسماكة خصلات شعرك وتوقعاتك.</p>
      `,
    }
  },
  "sac-ekimi-sonrasi-iyilesme-sureci": {
    en: {
      titleEn: "Recovery Process After Hair Transplant: Step-by-Step Guide",
      metaTitleEn: "Recovery Process After Hair Transplant - Day-by-Day Care Guide",
      metaDescriptionEn: "The first wash, scab shedding, shock loss and the appearance of results after a hair transplant. Detailed post-hair transplant care guide.",
      metaKeywordsEn: "after hair transplant, shock loss, first wash, hair transplant recovery process, scab shedding",
      contentHtmlEn: `
        <h2>First 15 Days: Sensitive Period</h2>
        <p>The most critical phase of the recovery process after hair transplant is the first 15 days. Proper care is vital for the transplanted follicles to take hold.</p>
        <ul>
          <li><strong>Day 1-3:</strong> Mild redness and crusting begin in the transplanted area. The first wash is performed by experts at the clinic. Great attention should be paid to the sleeping position; you should sleep on your back.</li>
          <li><strong>Day 4-10:</strong> Daily washing continues as shown at the clinic. Around the 10th day, the 'scab shedding' process is carried out and the scalp breathes.</li>
        </ul>
        <h3>Shock Loss and Regrowth (Months 1-3)</h3>
        <p>3-4 weeks after the operation, the transplanted hair strands begin to fall out. This is called <em>shock loss</em> and is a completely normal, expected process. The follicles are safely under the skin.</p>
        <p>From the 3rd month onwards, your new, permanent hair strands begin to grow. At the 6th month, 60% of the results become visible. The process is completed between the <strong>12th and 15th months</strong> and you regain your final, natural appearance.</p>
      `,
    },
    ar: {
      titleAr: "عملية الشفاء بعد زراعة الشعر: دليل خطوة بخطوة",
      metaTitleAr: "عملية الشفاء بعد زراعة الشعر - دليل العناية يومًا بيوم",
      metaDescriptionAr: "الغسلة الأولى، تساقط القشور، تساقط الصدمة وظهور النتائج بعد زراعة الشعر. دليل مفصل للعناية بعد زراعة الشعر.",
      metaKeywordsAr: "بعد زراعة الشعر، تساقط الصدمة، الغسلة الأولى، عملية الشفاء من زراعة الشعر، تساقط القشور",
      contentHtmlAr: `
        <h2>أول 15 يومًا: فترة حساسة</h2>
        <p>أهم مرحلة في عملية الشفاء بعد زراعة الشعر هي أول 15 يومًا. الرعاية المناسبة أمر حيوي لكي تتماسك البصيلات المزروعة.</p>
        <ul>
          <li><strong>اليوم 1-3:</strong> يبدأ احمرار خفيف وقشور في المنطقة المزروعة. يتم إجراء الغسلة الأولى من قبل خبراء في العيادة. يجب إيلاء اهتمام كبير لوضعية النوم؛ يجب أن تنام على ظهرك.</li>
          <li><strong>اليوم 4-10:</strong> يستمر الغسيل اليومي كما هو موضح في العيادة. في حوالي اليوم العاشر، تتم عملية 'تساقط القشور' ويتنفس فروة الرأس.</li>
        </ul>
        <h3>تساقط الصدمة وإعادة النمو (الأشهر 1-3)</h3>
        <p>بعد 3-4 أسابيع من العملية، تبدأ خصلات الشعر المزروعة في التساقط. يُسمى هذا <em>تساقط الصدمة</em> وهو عملية طبيعية ومتوقعة تمامًا. البصيلات آمنة تحت الجلد.</p>
        <p>بدءًا من الشهر الثالث، تبدأ خصلات شعرك الجديدة والدائمة في النمو. في الشهر السادس، تصبح 60٪ من النتائج مرئية. تكتمل العملية بين <strong>الشهرين 12 و 15</strong> وتستعيد مظهرك النهائي والطبيعي.</p>
      `,
    }
  },
  "sac-ekimi-agrili-bir-islem-midir": {
    en: {
      titleEn: "Is Hair Transplant a Painful Procedure? Facts You Need to Know",
      metaTitleEn: "Does Hair Transplant Hurt? Painless Hair Transplant and Local Anesthesia",
      metaDescriptionEn: "Is pain felt during the hair transplant procedure? Everything about local anesthesia applications and painless hair transplant techniques.",
      metaKeywordsEn: "does hair transplant hurt, painless hair transplant, local anesthesia, needle-free hair transplant, pain in hair transplant",
      contentHtmlEn: `
        <h2>Painless Local Anesthesia Applications</h2>
        <p>One of the biggest questions in the minds of many patients while postponing their hair transplant decision is how much pain the procedure will cause. Thanks to developing medical technologies, the hair transplant procedure is completed in a <strong>highly comfortable and painless</strong> manner.</p>
        <p>Local anesthesia is applied to the scalp before the procedure. A slight ache may be felt during anesthesia, but afterwards, you will feel absolutely no pain during the 6-8 hour part of the operation. Our patients can read books, watch movies, or sleep during the procedure.</p>
        <h3>Is There Pain During the Recovery Period?</h3>
        <p>A slight tension or ache may be felt when the effect of the anesthesia wears off after the operation. This situation is easily brought under control with standard painkillers prescribed by your doctor and usually completely passes within 1-2 days.</p>
        <p>If you have concerns about pain, it is possible to get through the process much more comfortably with methods such as needle-free (dermojet) anesthesia devices.</p>
      `,
    },
    ar: {
      titleAr: "هل زراعة الشعر عملية مؤلمة؟ حقائق يجب أن تعرفها",
      metaTitleAr: "هل زراعة الشعر مؤلمة؟ زراعة شعر بدون ألم وتخدير موضعي",
      metaDescriptionAr: "هل يشعر بالألم أثناء عملية زراعة الشعر؟ كل ما يخص تطبيقات التخدير الموضعي وتقنيات زراعة الشعر بدون ألم.",
      metaKeywordsAr: "هل زراعة الشعر مؤلمة، زراعة شعر بدون ألم، تخدير موضعي، زراعة شعر بدون إبرة، الألم في زراعة الشعر",
      contentHtmlAr: `
        <h2>تطبيقات التخدير الموضعي بدون ألم</h2>
        <p>من أكبر الأسئلة في أذهان الكثير من المرضى أثناء تأجيل قرار زراعة الشعر هو مقدار الألم الذي ستسببه العملية. بفضل التقنيات الطبية المتطورة، تكتمل عملية زراعة الشعر بطريقة <strong>مريحة للغاية وبدون ألم</strong>.</p>
        <p>يتم تطبيق التخدير الموضعي على فروة الرأس قبل الإجراء. قد يشعر ببعض الوخز الطفيف أثناء التخدير، ولكن بعد ذلك، لن تشعر بأي ألم على الإطلاق خلال الجزء الذي يستغرق 6-8 ساعات من العملية. يمكن لمرضانا قراءة الكتب، مشاهدة الأفلام، أو النوم أثناء العملية.</p>
        <h3>هل يوجد ألم خلال فترة الشفاء؟</h3>
        <p>قد يشعر بتوتر طفيف أو ألم عند زوال تأثير التخدير بعد العملية. يتم السيطرة على هذا الوضع بسهولة بواسطة مسكنات الألم القياسية التي يصفها طبيبك وعادة ما يزول تمامًا في غضون يوم أو يومين.</p>
        <p>إذا كانت لديك مخاوف بشأن الألم، فمن الممكن تجاوز العملية براحة أكبر بكثير باستخدام طرق مثل أجهزة التخدير بدون إبرة (dermojet).</p>
      `,
    }
  },
  "ekilen-saclar-dokulur-mu": {
    en: {
      titleEn: "Do Transplanted Hairs Fall Out? Tips for Permanent Results",
      metaTitleEn: "Will Transplanted Hair Fall Out Later? Permanence and Care",
      metaDescriptionEn: "Are the results obtained after a hair transplant permanent? Scientific facts to consider so that transplanted hairs do not fall out.",
      metaKeywordsEn: "do transplanted hairs fall out, is hair transplant permanent, hairs taken from the nape, hair loss",
      contentHtmlEn: `
        <h2>Genetic Structure of Transplanted Roots</h2>
        <p>The biggest advantage of a hair transplant is that the results obtained are <strong>permanent for life</strong>. The secret of this permanence lies in the genetic structure of the 'donor area' where the hair follicles are taken from.</p>
        <p>The hair follicles in the nape area are genetically insensitive to the <em>DHT (Dihydrotestosterone)</em> hormone. That is, they are coded against falling out. When these strong roots are taken and transferred to the front or crown area, they continue to maintain their own genetic characteristics.</p>
        <h3>Points to Consider</h3>
        <ul>
          <li><strong>Loss of Natural Hairs:</strong> Even if the transplanted hairs do not fall out, your own weak hairs that are prone to shedding in the transplanted area may continue to fall out over time. Therefore, PRP or vitamin support treatments are recommended.</li>
          <li><strong>Healthy Living:</strong> Severe stress, severe vitamin deficiencies (Iron, B12, Vitamin D) and irregular nutrition can temporarily disrupt hair quality.</li>
        </ul>
        <p>As a result, roots taken from the right place with a professional transplant planning will stay with you on your scalp for life.</p>
      `,
    },
    ar: {
      titleAr: "هل يتساقط الشعر المزروع؟ نصائح للحصول على نتائج دائمة",
      metaTitleAr: "هل سيتساقط الشعر المزروع لاحقًا؟ الدوام والعناية",
      metaDescriptionAr: "هل النتائج التي يتم الحصول عليها بعد زراعة الشعر دائمة؟ حقائق علمية يجب مراعاتها حتى لا يتساقط الشعر المزروع.",
      metaKeywordsAr: "هل يتساقط الشعر المزروع، هل زراعة الشعر دائمة، الشعر المأخوذ من مؤخرة العنق، تساقط الشعر",
      contentHtmlAr: `
        <h2>البنية الجينية للجذور المزروعة</h2>
        <p>أكبر ميزة لزراعة الشعر هي أن النتائج التي يتم الحصول عليها <strong>دائمة مدى الحياة</strong>. يكمن سر هذا الدوام في البنية الجينية لـ 'المنطقة المانحة' التي تؤخذ منها بصيلات الشعر.</p>
        <p>بصيلات الشعر في منطقة مؤخرة الرأس غير حساسة وراثيًا لهرمون <em>DHT (ديهدروتستوستيرون)</em>. أي أنها مبرمجة ضد التساقط. عندما يتم أخذ هذه الجذور القوية ونقلها إلى المنطقة الأمامية أو التاج، فإنها تستمر في الحفاظ على خصائصها الجينية الخاصة.</p>
        <h3>نقاط يجب مراعاتها</h3>
        <ul>
          <li><strong>تساقط الشعر الطبيعي:</strong> حتى لو لم يتساقط الشعر المزروع، فإن شعرك الضعيف المعرض للتساقط في المنطقة المزروعة قد يستمر في التساقط بمرور الوقت. لذلك، يوصى بعلاجات دعم PRP أو الفيتامينات.</li>
          <li><strong>الحياة الصحية:</strong> الإجهاد الشديد ونقص الفيتامينات الحاد (الحديد و B12 وفيتامين D) وسوء التغذية يمكن أن يعطل جودة الشعر مؤقتًا.</li>
        </ul>
        <p>نتيجة لذلك، ستبقى الجذور المأخوذة من المكان الصحيح بتخطيط زراعة احترافي معك على فروة رأسك مدى الحياة.</p>
      `,
    }
  }
};

async function main() {
  console.log("Updating Articles with Translations...");

  for (const [slug, trans] of Object.entries(translations)) {
    try {
      await prisma.article.update({
        where: { slug },
        data: {
          ...trans.en,
          ...trans.ar
        }
      });
      console.log(`Updated translations for: ${slug}`);
    } catch (e) {
      console.log(`Failed to update ${slug}: ${e.message}`);
    }
  }
  console.log("Translation seed complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
