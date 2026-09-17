export type Difficulty = 0 | 1 | 2;

export interface Ingredient {
  fr: string;
  ar: string;
  percent: number | null; // null = qsp 100% (water)
  note?: { fr: string; ar: string };
  display?: { fr: string; ar: string }; // custom value label (e.g. cost in €)
}

export interface Course {
  slug: string;
  section: "menage" | "soin" | "business";
  icon:
    | "dish"
    | "soap"
    | "oven"
    | "bleach"
    | "laundry"
    | "floor"
    | "glass"
    | "bathroom"
    | "softener"
    | "scrub"
    | "soapbar"
    | "shampoo"
    | "body"
    | "chart"
    | "safety"
    | "label";
  title: { fr: string; ar: string };
  tagline: { fr: string; ar: string };
  difficulty: Difficulty;
  warnings: { fr: string; ar: string }[];
  tips: { fr: string; ar: string }[];
  ingredients: Ingredient[];
  steps: { fr: string; ar: string }[];
}

export const SECTIONS = [
  {
    id: "menage" as const,
    name: { fr: "Entretien maison", ar: "منظفات منزلية" },
    desc: {
      fr: "Détergents, désinfectants et nettoyants pour toute la maison.",
      ar: "منظفات ومعطرات ومزيلات الأوساخ لكل أرجاء المنزل.",
    },
    icon: "dish" as const,
  },
  {
    id: "soin" as const,
    name: { fr: "Soins & hygiène", ar: "العناية والنظافة" },
    desc: {
      fr: "Savons, shampoings et soins corporels doux pour la peau.",
      ar: "صابون، شامبو ومستحضرات عناية لطيفة على البشرة.",
    },
    icon: "soapbar" as const,
  },
  {
    id: "business" as const,
    name: { fr: "Business & qualité", ar: "الأعمال والجودة" },
    desc: {
      fr: "Coût de revient, sécurité, étiquetage et vente de vos produits.",
      ar: "تكلفة الإنتاج، السلامة، وضع الملصقات وبيع منتجاتك.",
    },
    icon: "chart" as const,
  },
];

export const COURSES: Course[] = [
  {
    slug: "vaisselle-eco",
    section: "menage",
    icon: "dish",
    title: { fr: "Liquide vaisselle (économique)", ar: "سائل غسل الأواني (اقتصادي)" },
    tagline: {
      fr: "La base indispensable, efficace et très rentable.",
      ar: "الأساس الضروري، فعّال ومربح جداً.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Porter des gants si la peau est sensible ; éviter le contact prolongé avec les yeux.",
        ar: "ارتدِ قفازات إذا كانت بشرتك حساسة؛ تجنّب ملامسة العينين لفترة طويلة.",
      },
    ],
    tips: [
      {
        fr: "Le sel épaissit : ajoutez-le petit à petit et laissez reposer 30 min avant d'ajuster.",
        ar: "الملح يزيد القوام: أضفه تدريجياً واترك المزيج 30 دقيقة قبل التعديل.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 7 },
      { fr: "Cocamide DEA", ar: "كواميد DEA", percent: 2 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 2 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans un récipient propre.", ar: "ضع كمية الماء في وعاء نظيف." },
      {
        fr: "Ajouter le SLES/Texapon en remuant constamment jusqu'à dissolution complète.",
        ar: "أضف SLES أو تيكسابون مع التحريك المستمر حتى الذوبان التام.",
      },
      { fr: "Ajouter le Cocamide DEA et bien mélanger.", ar: "أضف الكواميد DEA وحرّك جيداً." },
      {
        fr: "Ajouter le sel progressivement en remuant jusqu'à la consistance souhaitée.",
        ar: "أضف ملح الطعام تدريجياً مع التحريك حتى الحصول على القوام المطلوب.",
      },
      { fr: "Ajouter le Formol puis le parfum et la couleur (facultatif).", ar: "أضف الفورمول ثم العطر واللون (اختياري)." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger jusqu'à homogénéité.", ar: "أكمل الماء إلى 100% وحرّك حتى التجانس." },
      { fr: "Conditionner dans des flacons appropriés.", ar: "عبّئ في عبوات مناسبة." },
    ],
  },
  {
    slug: "vaisselle-premium",
    section: "menage",
    icon: "dish",
    title: { fr: "Liquide vaisselle (haute qualité)", ar: "سائل غسل الأواني (جودة أعلى)" },
    tagline: {
      fr: "Formule enrichie à la Bétaïne, mousse abondante et douceur.",
      ar: "صيغة مدعّمة بالبيتائين، رغوة وفيرة ونعومة أكبر.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Éviter tout mélange avec de l'eau de javel ou des acides.",
        ar: "تجنّب الخلط مع الجافيل أو الأحماض.",
      },
    ],
    tips: [
      {
        fr: "La Bétaïne stabilise la mousse à l'eau calcaire : idéale en région minérale.",
        ar: "البيتائين تثبّت الرغوة في الماء الكلسي: مثالية في المناطق ذات المياه العسرة.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 10 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 3 },
      { fr: "Cocamide DEA", ar: "كواميد DEA", percent: 2 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 1.5 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans un récipient propre.", ar: "ضع الماء في وعاء نظيف." },
      { fr: "Ajouter le SLES/Texapon en remuant sans cesse.", ar: "أضف SLES أو تيكسابون مع التحريك المستمر." },
      { fr: "Ajouter la Bétaïne puis le Cocamide DEA en remuant.", ar: "أضف البيتائين ثم الكواميد DEA مع التحريك." },
      {
        fr: "Ajouter le sel progressivement jusqu'à la viscosité voulue.",
        ar: "أضف ملح الطعام تدريجياً حتى الحصول على اللزوجة المطلوبة.",
      },
      { fr: "Ajouter le Formol puis le parfum et la couleur.", ar: "أضف الفورمول ثم العطر واللون." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et bien mélanger.", ar: "أكمل الماء إلى 100% وحرّك جيداً." },
      { fr: "Conditionner dans des flacons étanches.", ar: "عبّئ في عبوات محكمة." },
    ],
  },
  {
    slug: "savon-liquide-mains",
    section: "soin",
    icon: "soap",
    title: { fr: "Savon liquide pour les mains", ar: "صابون سائل لليدين" },
    tagline: {
      fr: "Doux pour la peau, parfait pour la maison et l'accueil.",
      ar: "لطيف على البشرة، مثالي للمنزل وأماكن الاستقبال.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Rincer abondamment en cas de contact avec les yeux.",
        ar: "اغسل العينين بماء وفير في حال ملامستهما.",
      },
    ],
    tips: [
      {
        fr: "Ajoutez 0,3 % de glycérine pour encore plus de douceur.",
        ar: "أضف 0.3% جلسرين لنعومة أكبر.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 8 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 2 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES/Texapon et remuer jusqu'à dissolution.", ar: "أضف SLES أو تيكسابون وحرّك حتى الذوبان." },
      { fr: "Ajouter la Bétaïne et bien remuer.", ar: "أضف البيتائين وحرّك جيداً." },
      { fr: "Ajouter le sel progressivement pour ajuster la viscosité.", ar: "أضف الملح تدريجياً لضبط اللزوجة." },
      { fr: "Ajouter le Formol puis le parfum et la couleur.", ar: "أضف الفورمول ثم العطر واللون." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger.", ar: "أكمل الماء إلى 100% وحرّك." },
      { fr: "Conditionner dans des flacons-pompes.", ar: "عبّئ في عبوات مضخة." },
    ],
  },
  {
    slug: "four-degraissant",
    section: "menage",
    icon: "oven",
    title: { fr: "Dégraissant four (alcalin puissant)", ar: "مزيل دهون الفرن" },
    tagline: {
      fr: "Formule alcaline redoutable sur les graisses cuites.",
      ar: "صيغة قلوية فعّالة ضد الدهون المحترقة.",
    },
    difficulty: 2,
    warnings: [
      {
        fr: "Porter gants et lunettes de protection ; ventiler la pièce.",
        ar: "تحذير: ارتدِ قفازات ونظارات واقية، وتأكد من التهوية الجيدة.",
      },
      {
        fr: "La dissolution du NaOH dégage de la chaleur : verser lentement dans l'eau, jamais l'inverse.",
        ar: "إذابة NaOH تنتج حرارة: اسكبها في الماء ببطء، وليس العكس أبداً.",
      },
      {
        fr: "Ne jamais utiliser sur l'aluminium ou les surfaces délicates.",
        ar: "لا تستعمله أبداً على الألمنيوم أو الأسطح الحساسة.",
      },
    ],
    tips: [
      {
        fr: "Laisser agir 15 à 30 minutes puis frotter avec une éponge abrasive.",
        ar: "اتركه يعمل من 15 إلى 30 دقيقة ثم فك بكرة إسفنجية خشنة.",
      },
    ],
    ingredients: [
      { fr: "Hydroxyde de sodium (NaOH)", ar: "هيدروكسيد الصوديوم (NaOH)", percent: 2 },
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 3 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 1 },
      { fr: "Butyl Glycol", ar: "بوتيل غليكول", percent: 2 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.2 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      {
        fr: "Équipement de protection et ventilation en place.",
        ar: "ارتدِ معدات الحماية وتأكد من التهوية.",
      },
      { fr: "Verser l'eau dans un récipient résistant aux alcalis.", ar: "ضع الماء في وعاء مقاوم للقلويات." },
      {
        fr: "Dissoudre le NaOH très précautionneusement (réaction exothermique).",
        ar: "أذب NaOH في الماء بحذر شديد (يحدث تفاعل طارد للحرارة).",
      },
      { fr: "Ajouter le SLES/Texapon en remuant.", ar: "أضف SLES أو تيكسابون مع التحريك." },
      { fr: "Ajouter la Bétaïne puis le Butyl Glycol.", ar: "أضف البيتائين ثم البوتيل غليكول." },
      { fr: "Ajouter le Formol puis le parfum.", ar: "أضف الفورمول ثم العطر." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger.", ar: "أكمل الماء إلى 100% وحرّك." },
      { fr: "Conditionner dans des flacons plastiques étanches.", ar: "عبّئ في عبوات بلاستيكية محكمة." },
    ],
  },
  {
    slug: "javel",
    section: "menage",
    icon: "bleach",
    title: { fr: "Eau de javel désinfectante", ar: "مبيض ومطهر (جافيل)" },
    tagline: {
      fr: "Blanchiment et désinfection à petit prix.",
      ar: "تبييض وتطهير بأقل التكاليف.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Ne jamais mélanger avec des acides ou des parfums (gaz toxiques).",
        ar: "تحذير: لا تخلط مع الأحماض أو العطور (غازات سامة).",
      },
      {
        fr: "Manipuler avec gants ; stocker à l'abri de la lumière et de la chaleur.",
        ar: "استعمله بقفازات؛ خزّنه بعيداً عن الضوء والحرارة.",
      },
    ],
    tips: [
      {
        fr: "Un flacon opaque ralentit fortement la dégradation du chlore actif.",
        ar: "العبوة المعتمة تبطئ بشكل كبير تحلّق الكلور النشط.",
      },
    ],
    ingredients: [
      {
        fr: "Hypochlorite de sodium (NaOCl 15-16 %)",
        ar: "هيبوكلوريت الصوديوم (NaOCl 15-16%)",
        percent: 16,
        note: {
          fr: "soit 2,4-2,6 % de chlore actif",
          ar: "أي 2.4-2.6% كلور نشط",
        },
      },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Ne jamais mélanger avec des acides ou des parfums.", ar: "تحذير: لا تخلط مع الأحماض أو العطور." },
      { fr: "Verser l'eau dans un récipient plastique.", ar: "ضع الماء في وعاء بلاستيكي." },
      { fr: "Ajouter le NaOCl progressivement en remuant doucement.", ar: "أضف NaOCl تدريجياً مع التحريك الهادئ." },
      { fr: "Compléter avec de l'eau jusqu'à 100 %.", ar: "أكمل الماء إلى 100%." },
      { fr: "Conditionner dans des flacons opaques bien fermés.", ar: "عبّئ في عبوات معتمة محكمة الإغلاق." },
      { fr: "Stocker à l'abri de la lumière et de la chaleur.", ar: "خزّن بعيداً عن الضوء والحرارة." },
    ],
  },
  {
    slug: "lessive-marseille",
    section: "menage",
    icon: "laundry",
    title: { fr: "Liquide lessive « Marseille »", ar: "سائل غسل الملابس (مرسيليا)" },
    tagline: {
      fr: "Un classique du linge, au parfum emblématique.",
      ar: "كلاسيكية الغسيل بعطر مرسيليا الشهير.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Tester d'abord sur un endroit caché du tissu délicat.",
        ar: "جرّبه أولاً على جزء خفي من النسيج الحساس.",
      },
    ],
    tips: [
      {
        fr: "Pour l'eau dure, ajoutez 0,5 % d'EDTA comme séquestrant.",
        ar: "في الماء العسر أضف 0.5% EDTA كعامل خالص.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 8 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 1.5 },
      { fr: "Cocamide DEA", ar: "كواميد DEA", percent: 1.5 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum Marseille", ar: "عطر مرسيليا", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES et remuer jusqu'à dissolution.", ar: "أضف SLES وحرّك حتى الذوبان." },
      { fr: "Ajouter la Bétaïne puis le Cocamide DEA en remuant.", ar: "أضف البيتائين ثم الكواميد DEA مع التحريك." },
      { fr: "Ajouter le sel progressivement pour la viscosité.", ar: "أضف الملح تدريجياً لضبط اللزوجة." },
      { fr: "Ajouter le Formol puis le parfum Marseille.", ar: "أضف الفورمول ثم عطر مرسيليا." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger.", ar: "أكمل الماء إلى 100% وحرّك." },
      { fr: "Conditionner dans des flacons.", ar: "عبّئ في عبوات." },
    ],
  },
  {
    slug: "sanibon",
    section: "menage",
    icon: "floor",
    title: { fr: "Parfumeur de sols « Sanibon »", ar: "معطر الأرضيات «صانيبو»" },
    tagline: {
      fr: "Sols propres et longuement parfumés, formule économique.",
      ar: "أرضيات نظيفة ومعطّرة طويلاً، صيغة اقتصادية.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Ne pas utiliser sur le parquet non traité ; diluer selon la salissure.",
        ar: "لا تستعمله على الباركيه غير المعالج؛ اخففه حسب درجة الوسخ.",
      },
    ],
    tips: [
      {
        fr: "Le parfum est ici le poste de coût principal : dosez-le bien.",
        ar: "العطر هو المكوّن الأغلى هنا: ضبط نسبته مهم.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 3 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 1 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.5 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES/Texapon et remuer.", ar: "أضف SLES أو تيكسابون وحرّك." },
      { fr: "Ajouter la Bétaïne et remuer.", ar: "أضف البيتائين وحرّك." },
      { fr: "Ajouter le sel progressivement.", ar: "أضف الملح تدريجياً." },
      { fr: "Ajouter le Formol puis le parfum.", ar: "أضف الفورمول ثم العطر." },
      { fr: "Compléter avec de l'eau jusqu'à 100 %.", ar: "أكمل الماء إلى 100%." },
      { fr: "Conditionner dans des flacons.", ar: "عبّئ في عبوات." },
    ],
  },
  {
    slug: "sol-multiusage",
    section: "menage",
    icon: "floor",
    title: { fr: "Nettoyant sols multi-usages", ar: "منظف الأرضيات متعدد الاستعمالات" },
    tagline: {
      fr: "Un seul produit pour toutes les surfaces lavables.",
      ar: "منتج واحد لكل الأسطح القابلة للغسل.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Ne pas mélanger avec l'eau de javel.",
        ar: "لا تخلطه مع الجافيل.",
      },
    ],
    tips: [
      {
        fr: "Le Butyl Glycol renforce le dégraissage sur les sols de cuisine.",
        ar: "البوتيل غليكول يعزز إزالة الدهون في مطابخ الأرضيات.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 6 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 1 },
      { fr: "Butyl Glycol", ar: "بوتيل غليكول", percent: 1 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 0.5 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES et remuer.", ar: "أضف SLES وحرّك." },
      { fr: "Ajouter la Bétaïne puis le Butyl Glycol.", ar: "أضف البيتائين ثم البوتيل غليكول." },
      { fr: "Ajouter le sel progressivement.", ar: "أضف الملح تدريجياً." },
      { fr: "Ajouter le Formol puis le parfum.", ar: "أضف الفورمول ثم العطر." },
      { fr: "Compléter avec de l'eau jusqu'à 100 %.", ar: "أكمل الماء إلى 100%." },
      { fr: "Conditionner dans des flacons.", ar: "عبّئ في عبوات." },
    ],
  },
  {
    slug: "vitres",
    section: "menage",
    icon: "glass",
    title: { fr: "Nettoyant vitres et miroirs", ar: "منظف الزجاج والمرايا" },
    tagline: {
      fr: "Sans traces, séchage rapide, formule alcoolisée.",
      ar: "بدون آثار، تجفيف سريع، صيغة كحولية.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Produit inflammable : loin des flammes, bien ventiler.",
        ar: "منتج قابل للاشتعال: بعيداً عن اللهب، مع تهوية جيدة.",
      },
    ],
    tips: [
      {
        fr: "Essuyer à la microfibre pour un fini sans traces garanti.",
        ar: "امسح بمسحة الميكروفايبر لنتيجة بدون آثار مضمونة.",
      },
    ],
    ingredients: [
      { fr: "Eau", ar: "ماء", percent: null },
      { fr: "Éthanol / isopropanol", ar: "إيثانول / إيزوبروبانول", percent: 15 },
      { fr: "SLES ou Bétaïne", ar: "SLES أو بيتائين", percent: 0.5 },
      { fr: "Butyl Glycol", ar: "بوتيل غليكول", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.2 },
      { fr: "Colorant", ar: "ملون", percent: 0.1 },
    ],
    steps: [
      { fr: "Mélanger l'eau et l'alcool dans un récipient.", ar: "اخلط الماء مع الكحول في وعاء." },
      { fr: "Ajouter le SLES ou la Bétaïne et remuer.", ar: "أضف SLES أو البيتائين وحرّك." },
      { fr: "Ajouter le Butyl Glycol.", ar: "أضف البوتيل غليكول." },
      { fr: "Ajouter le Formol puis le parfum et le colorant.", ar: "أضف الفورمول ثم العطر واللون." },
      { fr: "Compléter avec de l'eau jusqu'à 100 %.", ar: "أكمل الماء إلى 100%." },
      { fr: "Conditionner dans un flacon spray.", ar: "عبّئ في بخاخ." },
    ],
  },
  {
    slug: "wc-decalcifiant",
    section: "menage",
    icon: "bathroom",
    title: { fr: "Nettoyant WC détartrant", ar: "منظف الحمام والمراحيض (مزيل تكلسات)" },
    tagline: {
      fr: "Acide citrique : détartrage efficace et écologique.",
      ar: "حمض الستريك: إزالة الترسبات بكفاءة وصديقة للبيئة.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Ne jamais mélanger avec l'eau de javel ; porter des gants.",
        ar: "لا تخلطه أبداً مع الجافيل؛ ارتدِ قفازات.",
      },
    ],
    tips: [
      {
        fr: "Laisser agir 20 minutes sous le rebord pour dissoudre le tartre incrusté.",
        ar: "اتركه 20 دقيقة تحت الحافة لإذابة الترسبات المتراكمة.",
      },
    ],
    ingredients: [
      { fr: "Acide citrique", ar: "حمض الستريك", percent: 3 },
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 2 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 1 },
      { fr: "Butyl Glycol", ar: "بوتيل غليكول", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Dissoudre l'acide citrique en remuant jusqu'à dissolution complète.", ar: "أذب حمض الستريك مع التحريك حتى الذوبان التام." },
      { fr: "Ajouter le SLES/Texapon puis la Bétaïne en remuant doucement (mousse).", ar: "أضف SLES أو تيكسابون ثم البيتائين مع التحريك الهادئ (يتسبب في رغوة)." },
      { fr: "Ajouter le Butyl Glycol.", ar: "أضف البوتيل غليكول." },
      { fr: "Ajouter le Formol puis le parfum et la couleur.", ar: "أضف الفورمول ثم العطر واللون." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger doucement.", ar: "أكمل الماء إلى 100% وحرّك بهدوء." },
      { fr: "Conditionner dans un flacon à bec verseur.", ar: "عبّئ في عبوة بفوهة سكب." },
    ],
  },
  {
    slug: "adoucissant",
    section: "menage",
    icon: "softener",
    title: { fr: "Adoucissant parfumé", ar: "ملين الأقمشة المعطر" },
    tagline: {
      fr: "Linge doux et souple, parfum longue durée.",
      ar: "غسيل ناعم وطرّي، عطر يدوم طويلاً.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Ne pas verser directement sur le linge ; utiliser le bac dédié de la machine.",
        ar: "لا تصبه مباشرة على الغسيل؛ استعمل خانة الملين في الغسالة.",
      },
    ],
    tips: [
      {
        fr: "Dissoudre complètement la brique avant d'ajouter le parfum pour éviter la séparation.",
        ar: "أذب البريكت (البخور) جيداً قبل إضافة العطر لتفادي الانفصال.",
      },
    ],
    ingredients: [
      { fr: "Brique adoucissante (base)", ar: "أساس الملين (البخور)", percent: 12 },
      { fr: "Parfum", ar: "عطر", percent: 1 },
      { fr: "Colorant", ar: "ملون", percent: 0.1 },
      { fr: "Conservateur", ar: "مادة حافظة", percent: 0.1 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau tiède dans le récipient.", ar: "ضع الماء الفاتر في وعاء." },
      { fr: "Ajouter la brique adoucissante en remuant jusqu'à dissolution totale.", ar: "أضف أساس الملين مع التحريك حتى الذوبان التام." },
      { fr: "Ajouter le parfum et mélanger délicatement.", ar: "أضف العطر واخلط بلطف." },
      { fr: "Ajouter le colorant puis le conservateur.", ar: "أضف اللون ثم المادة الحافظة." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger doucement (pas de mousse).", ar: "أكمل الماء إلى 100% واخلط بلطف (بدون رغوة)." },
      { fr: "Laisser reposer 2 h puis conditionner.", ar: "اتركه ساعتين ثم عبّئ." },
    ],
  },
  {
    slug: "creme-a-recurer",
    section: "menage",
    icon: "scrub",
    title: { fr: "Crème à récurer (Cif)", ar: "كريم تنظيف (سيف)" },
    tagline: {
      fr: "Pâte abrasive douce pour évier, baignoire et carrelage.",
      ar: "معجون حامل لطيف للمغسلة وحوض الاستحمام والبلاط.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Éviter les surfaces laquées et l'inox brossé délicat.",
        ar: "تجنّب الأسطح المطلية والستانلس ستيل المفرّغ بدقة.",
      },
    ],
    tips: [
      {
        fr: "La craie épaissit la crème : ajustez la quantité selon la texture voulue.",
        ar: "الطبشور يزيّد كثافة الكريم: عدّل الكمية حسب القوام المطلوب.",
      },
    ],
    ingredients: [
      { fr: "Craie broyée (carbonate de calcium)", ar: "طبشور مطحون (كربونات الكالسيوم)", percent: 30 },
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 4 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES/Texapon et dissoudre complètement.", ar: "أضف SLES أو تيكسابون وأذبه بالكامل." },
      { fr: "Ajouter la Bétaïne.", ar: "أضف البيتائين." },
      {
        fr: "Incorporer la craie progressivement en fouettant pour éviter les grumeaux.",
        ar: "أضف الطبشور تدريجياً مع الخفق لتفادي التكتّل.",
      },
      { fr: "Ajouter le Formol puis le parfum.", ar: "أضف الفورمول ثم العطر." },
      { fr: "Ajuster avec de l'eau jusqu'à la texture crèmeuse (100 %).", ar: "عدّل بالماء حتى الحصول على قوام كريمي (100%)." },
      { fr: "Conditionner dans des pots ou tubes.", ar: "عبّئ في علب أو أنابيب." },
    ],
  },
  {
    slug: "savon-dur",
    section: "soin",
    icon: "soapbar",
    title: { fr: "Savon dur (méthode à froid)", ar: "صابون صلب (الطريقة الباردة)" },
    tagline: {
      fr: "La saponification : 76 % d'huile, 10 % de soude, 14 % d'eau.",
      ar: "التصبّن: 76% زيت، 10% صودا، 14% ماء.",
    },
    difficulty: 2,
    warnings: [
      {
        fr: "La soude caustique est très dangereuse : gants, lunettes, ventilation obligatoires.",
        ar: "الصودا الكاوية خطيرة جداً: قفازات، نظارات، وتهوية إلزامية.",
      },
      {
        fr: "Verser la soude dans l'eau froide lentement (jamais l'eau dans la soude).",
        ar: "اسكب الصودا في الماء البارد ببطء (لا تسكب الماء في الصودا أبداً).",
      },
      {
        fr: "Cure de 4 à 6 semaines avant utilisation.",
        ar: "فترة نضج من 4 إلى 6 أسابيع قبل الاستعمال.",
      },
    ],
    tips: [
      {
        fr: "Huile d'olive = pain doux ; coco = mousse généreuse. Ajustez le surgras à 5 %.",
        ar: "زيت الزيتون = صابون لطيف؛ جوز الهند = رغوة وفيرة. اضبط نسبة الزيت الزائد إلى 5%.",
      },
    ],
    ingredients: [
      { fr: "Huile d'olive", ar: "زيت الزيتون", percent: 50 },
      { fr: "Huile de coco", ar: "زيت جوز الهند", percent: 26 },
      { fr: "Hydroxyde de sodium (soude)", ar: "هيدروكسيد الصوديوم (صودا)", percent: 10 },
      { fr: "Eau", ar: "ماء", percent: 14 },
    ],
    steps: [
      { fr: "Porter gants et lunettes ; préparer les moules.", ar: "ارتدِ القفازات والنظارات؛ جهّز القوالب." },
      {
        fr: "Dissoudre la soude dans l'eau froide (exothermique) et laisser refroidir à 40 °C.",
        ar: "أذب الصودا في الماء البارد (تفاعل حراري) واتركه يبرد إلى 40 °م.",
      },
      { fr: "Faire fondre les huiles puis les refroidir à 40 °C également.", ar: "أذب الزيوت ثم اتركها تبرد إلى 40 °م أيضاً." },
      {
        fr: "Verser la lessive de soude dans les huiles en mélangeant au mixeur jusqu'au « trace ».",
        ar: "اسكب محلول الصودا في الزيوت مع الخفق بالمضرب حتى ظهور الأثر.",
      },
      { fr: "Ajouter le parfum ou les huiles essentielles (facultatif).", ar: "أضف العطر أو الزيوت العطرية (اختياري)." },
      { fr: "Couler dans les moules, isoler 24 h.", ar: "اسكب في القوالب وغلفها 24 ساعة." },
      { fr: "Démouler, découper et faire sécher 4 à 6 semaines.", ar: "أخرج من القالب، قطّعه، وجفّفه من 4 إلى 6 أسابيع." },
    ],
  },
  {
    slug: "shampooing-doux",
    section: "soin",
    icon: "shampoo",
    title: { fr: "Shampoing doux", ar: "شامبو لطيف" },
    tagline: {
      fr: "Base lavante très douce pour un usage fréquent.",
      ar: "قاعدة غسيل لطيفة جداً للاستعمال المتكرر.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Rincer abondamment ; éviter le contact avec les yeux.",
        ar: "اغسل بوفرة؛ تجنّب ملامسة العينين.",
      },
    ],
    tips: [
      {
        fr: "Ajoutez 0,2 % de panténol pour renforcer et brillant des cheveux.",
        ar: "أضف 0.2% بانثينول لتقوية الشعر وإضافة لمعانه.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 12 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 5 },
      { fr: "Cocamide DEA", ar: "كواميد DEA", percent: 2 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.3 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES/Texapon sans faire de mousse, remuer doucement.", ar: "أضف SLES أو تيكسابون بدون رغوة، حرّك بهدوء." },
      { fr: "Ajouter la Bétaïne puis le Cocamide DEA.", ar: "أضف البيتائين ثم الكواميد DEA." },
      { fr: "Ajuster la viscosité avec le sel progressivement.", ar: "اضبط اللزوجة بالملح تدريجياً." },
      { fr: "Ajouter le Formol puis le parfum.", ar: "أضف الفورمول ثم العطر." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et laisser décanter 1 h.", ar: "أكمل الماء إلى 100% واتركه يستقر ساعة." },
      { fr: "Conditionner dans des flacons-pompes.", ar: "عبّئ في عبوات مضخة." },
    ],
  },
  {
    slug: "gel-douche",
    section: "soin",
    icon: "body",
    title: { fr: "Gel douche creamy", ar: "جل استحمام كريمي" },
    tagline: {
      fr: "Mousse crémeuse et parfum gourmand.",
      ar: "رغوة كريمية وعطر شهي.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Vérifier la tolérance cutanée du parfum choisi (dosage max 0,5 %).",
        ar: "تحقق من تحمّل البشرة للعطر المختار (الحد الأقصى 0.5%).",
      },
    ],
    tips: [
      {
        fr: "Une pointe de glycérine (1 %) augmente la douceur perçue.",
        ar: "لمسة جلسرين (1%) تزيد الإحساس بالنعومة.",
      },
    ],
    ingredients: [
      { fr: "SLES / Texapon", ar: "SLES / تيكسابون", percent: 14 },
      { fr: "Bétaïne (CAPB)", ar: "بيتائين (CAPB)", percent: 4 },
      { fr: "Cocamide DEA", ar: "كواميد DEA", percent: 2 },
      { fr: "Sel alimentaire (NaCl)", ar: "ملح الطعام (NaCl)", percent: 1 },
      { fr: "Formol", ar: "فورمول", percent: 0.2 },
      { fr: "Parfum", ar: "عطر", percent: 0.5 },
      { fr: "Eau", ar: "ماء", percent: null },
    ],
    steps: [
      { fr: "Verser l'eau dans le récipient.", ar: "ضع الماء في وعاء." },
      { fr: "Ajouter le SLES/Texapon et dissoudre.", ar: "أضف SLES أو تيكسابون وأذبه." },
      { fr: "Ajouter la Bétaïne puis le Cocamide DEA.", ar: "أضف البيتائين ثم الكواميد DEA." },
      { fr: "Épaissir au sel selon la texture souhaitée.", ar: "زِد القوام بالملح حسب الملمس المطلوب." },
      { fr: "Ajouter le Formol puis le parfum.", ar: "أضف الفورمول ثم العطر." },
      { fr: "Compléter avec de l'eau jusqu'à 100 % et mélanger.", ar: "أكمل الماء إلى 100% واخلط." },
      { fr: "Conditionner dans des flacons transparents.", ar: "عبّئ في عبوات شفافة." },
    ],
  },
  {
    slug: "cout-matiere",
    section: "business",
    icon: "chart",
    title: { fr: "Calculer son coût matière", ar: "احسب تكلفة المواد" },
    tagline: {
      fr: "Prix de revient au litre et au flacon : la clé de la rentabilité.",
      ar: "تكلفة الإنتاج للتر وللعبوة: مفتاح الربحية.",
    },
    difficulty: 1,
    warnings: [],
    tips: [
      {
        fr: "Le SLES représente souvent 60 à 70 % du coût matière : négociez-le en priorité.",
        ar: "يشكّل SLES عادة 60 إلى 70% من تكلفة المواد: تفاوض عليه أولاً.",
      },
    ],
    ingredients: [
      {
        fr: "Exemple : 100 L de vaisselle éco",
        ar: "مثال: 100 لتر من سائل الأواني الاقتصادي",
        percent: null,
        display: { fr: "100 L", ar: "100 لتر" },
      },
      {
        fr: "SLES 7 % (7 kg) à 2 €/kg",
        ar: "SLES 7% (7 كغ) بـ 2 €/كغ",
        percent: null,
        display: { fr: "14 €", ar: "14 €" },
      },
      {
        fr: "Parfum 0,3 % (0,3 kg) à 20 €/kg",
        ar: "عطر 0.3% (0.3 كغ) بـ 20 €/كغ",
        percent: null,
        display: { fr: "6 €", ar: "6 €" },
      },
      {
        fr: "Formol + sel",
        ar: "فورمول + ملح",
        percent: null,
        display: { fr: "≈ 2 €", ar: "≈ 2 €" },
      },
      {
        fr: "Emballages : 100 flacons à 0,25 €",
        ar: "التعبئة: 100 عبوة بـ 0.25 €",
        percent: null,
        display: { fr: "25 €", ar: "25 €" },
      },
      {
        fr: "Étiquettes : 100 unités à 0,05 €",
        ar: "الملصقات: 100 قطعة بـ 0.05 €",
        percent: null,
        display: { fr: "5 €", ar: "5 €" },
      },
    ],
    steps: [
      { fr: "Lister chaque matière et son prix d'achat au kilo.", ar: "احسب كل مادة وسعر شرائها للكيلوغرام." },
      { fr: "Multiplier le pourcentage par la masse totale du lot.", ar: "اضرب النسبة المئوية في الوزن الإجمالي للدفعة." },
      { fr: "Additionner les coûts de matières, emballages et étiquettes.", ar: "اجمع تكاليف المواد والتعبئة والملصقات." },
      { fr: "Ajouter l'amortissement du matériel et de l'énergie.", ar: "أضف استهلاك المعدات والطاقة." },
      { fr: "Diviser par le nombre d'unités produites = coût de revient unitaire.", ar: "اقسم على عدد الوحدات المنتجة = تكلفة الوحدة الواحدة." },
      { fr: "Fixer le prix de vente (coût × 2 à × 3 selon le marché).", ar: "حدّد سعر البيع (التكلفة × 2 إلى × 3 حسب السوق)." },
    ],
  },
  {
    slug: "securite-atelier",
    section: "business",
    icon: "safety",
    title: { fr: "Sécurité à l'atelier", ar: "السلامة في الورشة" },
    tagline: {
      fr: "EPI, stockage et gestion des incidents : les réflexes vitaux.",
      ar: "معدات الحماية، التخزين وإدارة الحوادث: ردود الفعل الحيوية.",
    },
    difficulty: 0,
    warnings: [
      {
        fr: "Ne jamais mélanger javel et acide : vapeurs de chlore mortelles.",
        ar: "لا تخلط أبداً الجافيل مع الحمض: أبخرة الكلور قاتلة.",
      },
    ],
    tips: [
      {
        fr: "Affichez la fiche de chaque matière (pH, dangers, premiers secours) près du plan de travail.",
        ar: "علّق بطاقة كل مادة (الحموضة، الأخطار، الإسعافات الأولية) بجانب مكان العمل.",
      },
    ],
    ingredients: [
      { fr: "Gants nitrile + lunettes masque", ar: "قفازات نيتريل + نظارات واقية", percent: null },
      { fr: "Blouse et tablier", ar: "مئزر وغرد", percent: null },
      { fr: "Ventilation ou hotte", ar: "تهوية أو خزانة سحب", percent: null },
      { fr: "Extincteur classe ABC", ar: "طفاية حريق من نوع ABC", percent: null },
      { fr: "Trousse premiers secours + rinçage oculaire", ar: "حقيبة إسعافات + غسالة العين", percent: null },
      { fr: "Étiquetage CLP des matières", ar: "ملصقات CLP للمواد", percent: null },
    ],
    steps: [
      { fr: "Préparer l'espace : plan de travail dégagé, sol antidérapant.", ar: "جهّز المكان: طاولة عمل مرتبة، أرضية مانعة للانزلاق." },
      { fr: "Porter les EPI avant toute manipulation.", ar: "ارتدِ معدات الحماية قبل أي استخدام." },
      {
        fr: "Stocker les acides, les bases et le chlore dans des zones séparées.",
        ar: "خزّن الأحماض والقواعد والكلور في أماكن منفصلة.",
      },
      { fr: "Étiqueter chaque préparation (nom, date, lot, dangers).", ar: "ضع ملصقاً على كل خلطة (الاسم، التاريخ، الدفعة، الأخطار)." },
      {
        fr: "En cas de contact : rincer 15 min à l'eau claire et consulter.",
        ar: "في حالة الالتقاء: اغسل 15 دقيقة بماء نظيف واستشر الطبيب.",
      },
      { fr: "Tenir un registre des lots et des incidents.", ar: "احتفظ بسجل للدفعات والحالات الطارئة." },
    ],
  },
  {
    slug: "etiquetage-vente",
    section: "business",
    icon: "label",
    title: { fr: "Étiquetage & mise en vente", ar: "وضع الملصقات والبيع" },
    tagline: {
      fr: "Ce que la loi attend sur l'étiquette avant de vendre.",
      ar: "ما يطلبه القانون على الملصق قبل البيع.",
    },
    difficulty: 1,
    warnings: [
      {
        fr: "Les cosmétiques exigent une déclaration spécifique avant mise sur le marché.",
        ar: "تتطلب مستحضرات التجميل تصريحاً خاصاً قبل الطرح في السوق.",
      },
    ],
    tips: [
      {
        fr: "Bilingue FR/AR sur l'étiquette = accès à deux marchés simultanément.",
        ar: "الملصق ثنائي اللغة فرنسي/عربي = الوصول إلى سوقين في نفس الوقت.",
      },
    ],
    ingredients: [
      { fr: "Nom du produit + fonction", ar: "اسم المنتج + الوظيفة", percent: null },
      { fr: "Composition (INCI ou nomenclature)", ar: "المكونات (INCI أو التسمية)", percent: null },
      { fr: "Contenu net (volume ou masse)", ar: "المحتوى الصافي (حجم أو وزن)", percent: null },
      { fr: "Mentions de danger (pictogrammes CLP)", ar: "تحذيرات الخطر (رموز CLP)", percent: null },
      { fr: "Coordonnées du fabricant", ar: "بيانات المصنّع", percent: null },
      { fr: "DDL / PAO et n° de lot", ar: "تاريخ الانتهاء / رقم الدفعة", percent: null },
    ],
    steps: [
      { fr: "Vérifier le statut légal du produit (détergent ou cosmétique).", ar: "تحقق من الوضعية القانونية للمنتج (منظف أو تجميلي)." },
      { fr: "Faire la déclaration requise auprès de l'autorité compétente.", ar: "قدّم التصريح المطلوب لدى الجهة المختصة." },
      { fr: "Composer l'étiquette : mentions obligatoires lisibles et durables.", ar: "صمّم الملصق: عبارات إلزامية واضحة ومتينة." },
      { fr: "Imprimer les pictogrammes de danger si nécessaire.", ar: "اطبع رموز الخطر إذا لزم الأمر." },
      { fr: "Fixer un prix cohérent avec le coût de revient et le marché local.", ar: "حدّد سعراً متوافقاً مع تكلفة الإنتاج والسوق المحلي." },
      { fr: "Préparer les canaux de vente : boutiques, marchés, réseaux sociaux.", ar: "جهّز قنوات البيع: المتاجر، الأسواق، وسائل التواصل." },
    ],
  },
];

export const COURSE_INDEX: Record<string, Course> = Object.fromEntries(
  COURSES.map((c) => [c.slug, c]),
);

export function totalPercent(course: Course): number {
  return course.ingredients.reduce(
    (sum, ing) => sum + (ing.percent ?? 0),
    0,
  );
}
