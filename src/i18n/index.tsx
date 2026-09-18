import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "ar";

const fr = {
  brand: "Savonnerie Pro",
  brandTag: "Académie de fabrication",
  nav: {
    courses: "Cours",
    recipes: "Recettes",
    pricing: "Formules",
    faq: "FAQ",
    dashboard: "Mon espace",
  },
  cta: {
    signIn: "Se connecter",
    getStarted: "Commencer gratuitement",
    explore: "Explorer les recettes",
    viewRecipe: "Voir la recette",
    back: "Retour aux cours",
    signOut: "Déconnexion",
  },
  hero: {
    badge: "Formation bilingue Français · العربية",
    title: "Fabriquez vos produits d'entretien et de soin comme un pro",
    subtitle:
      "Des recettes détaillées pas à pas, avec les pourcentages exacts, les méthodes de fabrication, les précautions et un calculateur de lots — en français et en arabe.",
    primaryCta: "Commencer la formation",
    secondaryCta: "Voir les recettes",
    stats: [
      { value: "28+", label: "Recettes complètes" },
      { value: "3", label: "Modules de formation" },
      { value: "FR·AR", label: "Bilingue intégral" },
      { value: "100%", label: "Méthodes détaillées" },
    ],
  },
  features: {
    kicker: "Pourquoi nous rejoindre",
    title: "Tout ce qu'il faut pour fabriquer sereinement",
    items: [
      {
        title: "Recettes détaillées",
        desc: "Chaque formule précise les pourcentages exacts, l'ordre d'incorporation et les points de vigilance.",
      },
      {
        title: "Calculateur de lots",
        desc: "Convertissez automatiquement les pourcentages en grammes pour la quantité que vous voulez produire.",
      },
      {
        title: "Méthodes pas à pas",
        desc: "Des étapes claires, numérotées et illustrées, de la pesée au conditionnement.",
      },
      {
        title: "Bilingue FR / AR",
        desc: "Tout le contenu est disponible en français et en arabe, avec interface RTL complète.",
      },
    ],
  },
  sections: {
    kicker: "Le programme",
    title: "Quatre modules, 28 recettes professionnelles",
    subtitle:
      "Des détergents maison aux soins corporels : chaque module couvre les matières premières, la sécurité et le conditionnement.",
  },
  sample: {
    kicker: "Aperçu gratuit",
    title: "Un extrait des recettes incluses",
    subtitle:
      "Chaque fiche contient les ingrédients, les pourcentages, la méthode complète et les avertissements de sécurité.",
    locked: "Débloquées après connexion",
  },
  pricing: {
    kicker: "Formules d'abonnement",
    title: "Des tarifs simples et détaillés",
    subtitle:
      "Commencez gratuitement, passez à la vitesse supérieure quand vous êtes prêt. Sans engagement.",
    perMonth: "/ mois",
    popular: "Le plus choisi",
    choose: "Choisir cette formule",
    current: "Commencer",
    plans: [
      {
        name: "Découverte",
        price: "0",
        desc: "Idéal pour tester la méthode",
        features: [
          "Accès aux 10 recettes d'entretien",
          "Calculateur de lots (5 L max)",
          "Version française",
          "Fiches téléchargeables basiques",
        ],
      },
      {
        name: "Artisan",
        price: "19",
        desc: "Pour produire et vendre en toute confiance",
        features: [
          "Les 28 recettes, tous modules",
          "Calculateur de lots illimité",
          "Contenu bilingue FR + AR",
          "Fiches techniques PDF complètes",
          "Suivi de progression et certificat",
        ],
      },
      {
        name: "Business",
        price: "49",
        desc: "Pour les ateliers et petites marques",
        features: [
          "Tout le plan Artisan",
          "Coût matière par lot et marges",
          "Conseils réglementation et étiquetage",
          "Support prioritaire par email",
        ],
      },
    ],
  },
  faq: {
    kicker: "Questions fréquentes",
    title: "Vous vous posez ces questions ?",
    items: [
      {
        q: "Faut-il une expérience en chimie pour suivre la formation ?",
        a: "Non. Chaque recette est expliquée étape par étape, avec les précautions d'usage. Les formules risquées (javellisant, dégraissant four) portent des avertissements clairs : gants, lunettes et ventilation.",
      },
      {
        q: "Où trouver les matières premières ?",
        a: "Les ingrédients (Texapon, Betaine, Cocamide DEA, acide citrique…) sont disponibles chez les fournisseurs de matières premières cosmétiques et détergentes, en ligne ou en grosserie.",
      },
      {
        q: "La formation est-elle vraiment bilingue ?",
        a: "Oui : chaque ingrédient, chaque étape et chaque avertissement existe en français et en arabe. Un bouton permet de basculer toute l'interface, y compris le sens de lecture RTL.",
      },
      {
        q: "Le calculateur de lots, comment ça marche ?",
        a: "Vous choisissez une recette et le volume souhaité (en litres ou en kilos) : l'outil convertit chaque pourcentage en grammes précis, prêts pour la pesée.",
      },
      {
        q: "Puis-je vendre les produits que je fabrique ?",
        a: "La vente de détergents et cosmétiques est encadrée (déclaration, étiquetage, normes locales). La formation vous donne la base technique ; renseignez-vous auprès des autorités de votre pays.",
      },
    ],
  },
  footer: {
    disclaimer:
      "Les recettes sont fournies à titre pédagogique. Respectez les consignes de sécurité, portez équipements de protection et conservez les produits hors de portée des enfants.",
    rights: "Tous droits réservés.",
  },
  auth: {
    signInTitle: "Bienvenue",
    signInDesc: "Entrez votre code d'accès à 8 caractères pour rejoindre la formation.",
    codeLogin: "Se connecter avec le code",
    codeChecking: "Vérification…",
    or: "ou",
    guest: "Continuer sans code (invité)",
    errGuest: "Échec de l'accès invité",
    errCodeInvalid: "Format de code invalide (8 caractères attendus).",
    errCodeNotFound: "Ce code n'existe pas. Vérifiez votre saisie.",
    errCodeUsed: "Ce code est déjà utilisé ou désactivé.",
    errCodeExpired: "Ce code a expiré.",
    errCodeUserAlready: "Vous avez déjà utilisé un code d'accès.",
    tabCode: "Code d'accès",
    tabEmail: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    passwordPlaceholder: "Mot de passe (8 caractères min.)",
    namePlaceholder: "Votre nom (optionnel)",
    inviteCodePlaceholder: "Code d'invitation (optionnel)",
    emailSignUp: "Créer mon compte",
    emailSignIn: "Se connecter",
    needAccount: "Pas encore de compte ?",
    haveAccount: "Vous avez déjà un compte ?",
    signUpLink: "S'inscrire",
    signInLink: "Se connecter",
    emailChecking: "Connexion…",
    errEmailInvalid: "Adresse e-mail invalide.",
    errPasswordShort: "Le mot de passe doit contenir au moins 8 caractères.",
    errEmailInUse: "Un compte existe déjà avec cet e-mail.",
    errEmailPassword: "E-mail ou mot de passe incorrect.",
    errInviteCode: "Code d'invitation invalide ou expiré.",
    codeRequiredNote:
      "L'accès à la formation nécessite un code d'accès (aucun essai automatique).",
    secured: "Connexion sécurisée",
  },
  dash: {
    kicker: "Espace de formation",
    welcome: "Bienvenue",
    subtitle: "Choisissez une recette, suivez la méthode, validez votre progression.",
    searchPlaceholder: "Rechercher une recette (nom ou ingrédient)…",
    allSections: "Tous les modules",
    progress: "Progression",
    completed: "terminée",
    recipesDone: "recettes terminées",
    startLesson: "Commencer la leçon",
    continueLesson: "Reprendre",
    review: "Revoir",
    ingredients: "Ingrédients",
    steps: "Méthode de fabrication",
    warnings: "Avertissements de sécurité",
    tips: "Conseils du formateur",
    batchTitle: "Calculateur de lot",
    batchDesc: "Choisissez le volume total à produire, les grammes sont calculés automatiquement.",
    liters: "Volume total",
    grams: "g",
    kg: "kg",
    markDone: "Marquer comme terminée",
    markedDone: "Leçon terminée",
    markUndone: "Annuler la validation",
    lessonOf: "Leçon",
    difficulty: "Difficulté",
    levels: ["Facile", "Intermédiaire", "Avancé"],
    yieldLabel: "Rendement",
    certTitle: "Certificat de fin de formation",
    certDesc: "Terminez les 28 recettes pour débloquer votre certificat.",
    certUnlocked: "Félicitations ! Formation complétée.",
    accessUntil: "Accès valide jusqu'au",
    lifetime: "Accès illimité",
    expiresSoon: "expire bientôt",
    expiredTitle: "Votre accès a expiré",
    expiredDesc:
      "La période d'accès à la formation est terminée. Contactez le formateur pour prolonger votre accès ou saisissez un nouveau code.",
    expiredGoAuth: "Utiliser un code d'accès",
    lockedTitle: "Accès requis",
    lockedDesc:
      "Votre compte n'a pas encore d'accès à la formation. Saisissez le code d'accès fourni par le formateur pour débloquer les recettes.",
    videoTitle: "Vidéo tutorielle",
    noResults: "Aucune recette ne correspond à votre recherche.",
    percents: "Pourcentages",
    sum: "Total",
    guestHint: "Mode invité : votre progression est stockée localement.",
    postsTitle: "Actualités de la formation",
  },
  notFound: {
    title: "Page introuvable",
    desc: "Cette page n'existe pas ou a été déplacée.",
    home: "Retour à l'accueil",
  },
  admin: {
    title: "Administration",
    subtitle: "Espace réservé — accès par mot de passe",
    passwordPlaceholder: "Mot de passe administrateur",
    enter: "Se connecter",
    verifying: "Vérification…",
    errPassword: "Mot de passe incorrect.",
    errNotConfigured: "ADMIN_PASSWORD n'est pas configuré sur ce déploiement.",
    hint: "Le mot de passe est défini dans les variables d'environnement du projet.",
    logout: "Quitter",
    backToDash: "Espace formation",
    overview: "Vue d'ensemble",
    totalUsers: "Utilisateurs",
    registered: "inscrits",
    guests: "invités",
    activeUsers: "Apprenants actifs",
    activeDesc: "ont terminé au moins une recette",
    totalCompletions: "Leçons terminées",
    last7: "7 j",
    last30: "30 j",
    guestUsers: "Part invités",
    weeklyTitle: "Inscriptions par semaine",
    weeklyDesc: "Nouveaux comptes sur les 6 dernières semaines.",
    loading: "Chargement des statistiques…",
    tabStats: "Statistiques",
    tabCodes: "Codes d'accès",
    genTitle: "Générateur de codes d'accès",
    genDesc: "Créez des codes à 8 caractères (chiffres et lettres) à distribuer à vos apprenants.",
    genCount: "Nombre",
    genLabel: "Étiquette (optionnelle)",
    genLabelPlaceholder: "Ex. : Groupe A, élève…",
    genButton: "Générer",
    genCreated: "{n} code(s) généré(s) :",
    copyAll: "Copier tout",
    copied: "Copié !",
    listTitle: "Codes existants",
    listCount: "{n} code(s) au total",
    listEmpty: "Aucun code pour l'instant. Générez votre premier code ci-dessus.",
    codeUsed: "Utilisé le",
    codeUnused: "Jamais utilisé",
    badgeUsed: "Utilisé",
    badgeActive: "Actif",
    badgeDisabled: "Désactivé",
    badgeExpired: "Expiré",
    genExpiry: "Expiration (jours)",
    genExpiryPlaceholder: "Vide = illimité",
    expiresLabel: "Expire le",
    neverExpires: "Illimité",
    tabUsers: "Utilisateurs",
    tabRecipes: "Recettes",
    recipesTitle: "Gestion des recettes",
    recipesDesc:
      "Modifiez les recettes existantes, créez-en de nouvelles et associez des vidéos YouTube.",
    recipeNew: "Nouvelle recette",
    recipeEditBase: "Modifier",
    recipeSaved: "Recette enregistrée ✔",
    recipeBadVideo: "Lien YouTube invalide.",
    recipeSlug: "Identifiant (slug)",
    recipeSlugHint: "Lettres, chiffres et tirets — ex. : gel-nettoyant",
    recipeSection: "Module",
    recipeTitleFr: "Titre (français)",
    recipeTitleAr: "Titre (arabe)",
    recipeTagFr: "Accroche (français)",
    recipeTagAr: "Accroche (arabe)",
    recipeDiff: "Difficulté (0 facile, 1 moyen, 2 avancé)",
    recipeWarnFr: "Avertissements FR (1 par ligne)",
    recipeWarnAr: "Avertissements AR (1 par ligne)",
    recipeTipsFr: "Conseils FR (1 par ligne)",
    recipeTipsAr: "Conseils AR (1 par ligne)",
    recipeIngredients:
      "Ingrédients — 1 par ligne : Français | العربية | % (vide = eau/qsp)",
    recipeStepsFr: "Étapes FR (1 par ligne)",
    recipeStepsAr: "Étapes AR (1 par ligne)",
    recipePhoto: "URL de la photo (optionnel)",
    recipeVideo: "Lien vidéo YouTube",
    recipeVideoHint:
      "Lien complet ou identifiant à 11 caractères — le titre est récupéré automatiquement.",
    recipeDelete: "Supprimer la recette personnalisée",
    recipeHidden: "masquée",
    recipeCustom: "personnalisée",
    recipeOverride: "modifiée",
    recipeHasVideo: "vidéo ✓",
    usersTitle: "Comptes e-mail",
    usersDesc: "Accordez, prolongez ou révoquez l'accès des comptes inscrits.",
    userHasAccess: "Accès actif",
    userExpired: "Expiré",
    userNoAccess: "Sans accès",
    userGrant: "Accorder / prolonger",
    userGrantDays: "Durée (jours)",
    userRevoke: "Révoquer",
    listEmptyUsers: "Aucun compte inscrit pour l'instant.",
    deleteCode: "Supprimer le code",
    tabPosts: "Publications",
    postsTitle: "Publications",
    postsDesc:
      "Annonces et actualités bilingues visibles par les apprenants sur leur tableau de bord.",
    postNew: "Nouvelle publication",
    postEdit: "Modifier",
    postTitleFr: "Titre (français)",
    postTitleAr: "Titre (arabe)",
    postBodyFr: "Contenu (français)",
    postBodyAr: "Contenu (arabe)",
    postVideo: "Lien vidéo YouTube (optionnel)",
    postPublished: "Publiée",
    postDraft: "Brouillon",
    postSaved: "Publication enregistrée ✔",
    postDelete: "Supprimer la publication",
    postsCount: "{n} publication(s)",
    postsEmpty: "Aucune publication pour l'instant. Créez la première.",
    dashPostsTitle: "Actualités de la formation",
    dashPostsEmpty: "",
  },
};

const ar: typeof fr = {
  brand: "صابونتي برو",
  brandTag: "أكاديمية التصنيع",
  nav: {
    courses: "الدورات",
    recipes: "الوصفات",
    pricing: "الصيغ",
    faq: "الأسئلة الشائعة",
    dashboard: "مساحتي",
  },
  cta: {
    signIn: "تسجيل الدخول",
    getStarted: "ابدأ مجاناً",
    explore: "استكشف الوصفات",
    viewRecipe: "عرض الوصفة",
    back: "العودة إلى الدورات",
    signOut: "تسجيل الخروج",
  },
  hero: {
    badge: "تكوين ثنائي اللغة Français · العربية",
    title: "اصنع منتجات التنظيف والعناية باحترافية",
    subtitle:
      "وصفات مفصلة خطوة بخطوة، مع النسب المئوية الدقيقة، طرق التصنيع، التحذيرات، وحاسبة الكميات — بالفرنسية والعربية.",
    primaryCta: "ابدأ التكوين",
    secondaryCta: "شاهد الوصفات",
    stats: [
      { value: "+28", label: "وصفة كاملة" },
      { value: "3", label: "وحدات تكوين" },
      { value: "FR·AR", label: "ثنائي اللغة" },
      { value: "100%", label: "طرق مفصلة" },
    ],
  },
  features: {
    kicker: "لماذا تنضم إلينا",
    title: "كل ما تحتاجه للتصنيع بأمان وثقة",
    items: [
      {
        title: "وصفات مفصلة",
        desc: "كل صيغة تحدد النسب المئوية الدقيقة، ترتيب الإضافة، ونقاط الانتباه.",
      },
      {
        title: "حاسبة الكميات",
        desc: "حوّل النسب المئوية تلقائياً إلى غرامات حسب الكمية التي تريد إنتاجها.",
      },
      {
        title: "طرق خطوة بخطوة",
        desc: "خطوات واضحة ومرقمة ومصوّرة، من الوزن إلى التعبئة.",
      },
      {
        title: "فرنسي / عربي",
        desc: "كل المحتوى متوفر بالفرنسية والعربية، مع واجهة كاملة من اليمين إلى اليسار.",
      },
    ],
  },
  sections: {
    kicker: "البرنامج",
    title: "أربع وحدات، 28 وصفة احترافية",
    subtitle:
      "من المنظفات المنزلية إلى مستحضرات العناية الشخصية: كل وحدة تغطي المواد الأولية والسلامة والتعبئة.",
  },
  sample: {
    kicker: "استعراض مجاني",
    title: "نموذج من الوصفات المضمّنة",
    subtitle:
      "كل بطاقة تحتوي على المكونات، النسب، الطريقة الكاملة، وتحذيرات السلامة.",
    locked: "تُفتح بعد تسجيل الدخول",
  },
  pricing: {
    kicker: "صيغ الاشتراك",
    title: "أسعار بسيطة ومفصلة",
    subtitle: "ابدأ مجاناً، وارتقِ عندما تكون جاهزاً. بدون التزام.",
    perMonth: "/ شهرياً",
    popular: "الأكثر اختياراً",
    choose: "اختر هذه الصيغة",
    current: "ابدأ",
    plans: [
      {
        name: "الاستكشاف",
        price: "0",
        desc: "مثالي لتجربة الطريقة",
        features: [
          "الوصول إلى 10 وصفات منزلية",
          "حاسبة كميات (حتى 5 لتر)",
          "النسخة الفرنسية",
          "بطاقات تحميل أساسية",
        ],
      },
      {
        name: "الحرفي",
        price: "19",
        desc: "للإنتاج والبيع بثقة",
        features: [
          "28 وصفة في كل الوحدات",
          "حاسبة كميات غير محدودة",
          "محتوى ثنائي اللغة فرنسي + عربي",
          "ملفات تقنية PDF كاملة",
          "تتبع التقدم والشهادة",
        ],
      },
      {
        name: "الأعمال",
        price: "49",
        desc: "للورشات والعلامات الصغيرة",
        features: [
          "كل مزايا خطة الحرفي",
          "تكلفة المواد لكل دفعة والهوامش",
          "نصائح التنظيم ووضع الملصقات",
          "دعم ذو أولوية عبر البريد",
        ],
      },
    ],
  },
  faq: {
    kicker: "أسئلة متكررة",
    title: "هل تخطر لك هذه الأسئلة؟",
    items: [
      {
        q: "هل أحتاج خبرة في الكيمياء لمتابعة التكوين؟",
        a: "لا. كل وصفة مشروحة خطوة بخطوة مع احتياطات الاستعمال. الصيغ الحساسة (الجافيل، مزيل دهون الفرن) تحمل تحذيرات واضحة: قفازات، نظارات واقية، وتهوية جيدة.",
      },
      {
        q: "أين أجد المواد الأولية؟",
        a: "المكونات (تيكسابون، بيتائين، كواميد DEA، حمض الستريك…) متوفرة لدى موردي المواد الأولية للتجميل والمنظفات، عبر الإنترنت أو من محلات الجملة.",
      },
      {
        q: "هل التكوين ثنائي اللغة فعلاً؟",
        a: "نعم: كل مكوّن وكل خطوة وكل تحذير موجود بالفرنسية والعربية. زر واحد يبدّل الواجهة بأكملها، بما في ذلك اتجاه القراءة من اليمين إلى اليسار.",
      },
      {
        q: "كيف تعمل حاسبة الكميات؟",
        a: "تختار وصفة والحجم المطلوب (باللترات أو الكيلوغرامات): تحوّل الأداة كل نسبة مئوية إلى غرامات دقيقة جاهزة للوزن.",
      },
      {
        q: "هل يمكنني بيع المنتجات التي أصنعها؟",
        a: "بيع المنظفات ومستحضرات التجميل خاضع للتنظيم (التصريح، وضع الملصقات، المعايير المحلية). التكوين يمنحك الأساس التقني؛ استشر السلطات المختصة في بلدك.",
      },
    ],
  },
  footer: {
    disclaimer:
      "الوصفات مقدمة لأغراض تعليمية. التزم بقواعد السلامة، استعمل معدات الحماية، واحفظ المنتجات بعيداً عن متناول الأطفال.",
    rights: "جميع الحقوق محفوظة.",
  },
  auth: {
    signInTitle: "أهلاً بك",
    signInDesc: "أدخل رمز الدخول المكوّن من 8 خانات للانضمام إلى التكوين.",
    codeLogin: "الدخول بالرمز",
    codeChecking: "جارٍ التحقق…",
    or: "أو",
    guest: "المتابعة بدون رمز (ضيف)",
    errGuest: "فشل الدخول كضيف",
    errCodeInvalid: "صيغة الرمز غير صحيحة (8 خانات مطلوبة).",
    errCodeNotFound: "هذا الرمز غير موجود. تحقق من الإدخال.",
    errCodeUsed: "هذا الرمز مستعمل أو معطّل بالفعل.",
    errCodeExpired: "هذا الرمز منتهي الصلاحية.",
    errCodeUserAlready: "لقد استعملت رمز دخول من قبل.",
    tabCode: "رمز الدخول",
    tabEmail: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "كلمة المرور (8 خانات على الأقل)",
    namePlaceholder: "اسمك (اختياري)",
    inviteCodePlaceholder: "رمز الدعوة (اختياري)",
    emailSignUp: "إنشاء حساب",
    emailSignIn: "تسجيل الدخول",
    needAccount: "ليس لديك حساب؟",
    haveAccount: "لديك حساب بالفعل؟",
    signUpLink: "سجّل الآن",
    signInLink: "تسجيل الدخول",
    emailChecking: "جارٍ الدخول…",
    errEmailInvalid: "البريد الإلكتروني غير صحيح.",
    errPasswordShort: "كلمة المرور يجب أن تتضمن 8 خانات على الأقل.",
    errEmailInUse: "هناك حساب مسجل بهذا البريد بالفعل.",
    errEmailPassword: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    errInviteCode: "رمز الدعوة غير صحيح أو منتهي الصلاحية.",
    codeRequiredNote:
      "الوصول إلى التكوين يتطلب رمز دخول (لا توجد تجربة تلقائية).",
    secured: "اتصال آمن",
  },
  dash: {
    kicker: "مساحة التكوين",
    welcome: "أهلاً",
    subtitle: "اختر وصفة، اتبع الطريقة، وسجّل تقدمك.",
    searchPlaceholder: "ابحث عن وصفة (اسم أو مكوّن)…",
    allSections: "كل الوحدات",
    progress: "التقدم",
    completed: "مكتملة",
    recipesDone: "وصفات مكتملة",
    startLesson: "ابدأ الدرس",
    continueLesson: "تابع",
    review: "مراجعة",
    ingredients: "المكونات",
    steps: "طريقة التحضير",
    warnings: "تحذيرات السلامة",
    tips: "نصائح المدرّب",
    batchTitle: "حاسبة الدفعة",
    batchDesc: "اختر الحجم الإجمالي للإنتاج، وتُحسب الغرامات تلقائياً.",
    liters: "الحجم الإجمالي",
    grams: "غ",
    kg: "كغ",
    markDone: "وضع علامة مكتملة",
    markedDone: "تم إكمال الدرس",
    markUndone: "إلغاء الإكمال",
    lessonOf: "درس",
    difficulty: "الصعوبة",
    levels: ["سهل", "متوسط", "متقدم"],
    yieldLabel: "الناتج",
    certTitle: "شهادة إتمام التكوين",
    certDesc: "أكمل الـ 28 وصفة لفتح شهادتك.",
    certUnlocked: "تهانينا! تم إكمال التكوين.",
    accessUntil: "الوصول صالح حتى",
    lifetime: "وصول غير محدود",
    expiresSoon: "ينتهي قريباً",
    expiredTitle: "انتهت صلاحية وصولك",
    expiredDesc:
      "انتهت فترة الوصول إلى التكوين. تواصل مع المدرب لتمديد صلاحية حسابك أو أدخل رمزاً جديداً.",
    expiredGoAuth: "استعمال رمز دخول",
    lockedTitle: "الوصول مطلوب",
    lockedDesc:
      "حسابك لا يملك وصولاً إلى التكوين بعد. أدخل رمز الدخول المقدّم من المدرب لفتح الوصفات.",
    videoTitle: "فيديو تعليمي",
    noResults: "لا توجد وصفة مطابقة لبحثك.",
    percents: "النسب المئوية",
    sum: "المجموع",
    guestHint: "وضع الضيف: يُحفظ تقدمك محلياً.",
    postsTitle: "أخبار التكوين",
  },
  notFound: {
    title: "الصفحة غير موجودة",
    desc: "هذه الصفحة غير موجودة أو تم نقلها.",
    home: "العودة إلى الرئيسية",
  },
  admin: {
    title: "الإدارة",
    subtitle: "مساحة محمية — الدخول بكلمة المرور",
    passwordPlaceholder: "كلمة مرور المدير",
    enter: "تسجيل الدخول",
    verifying: "جارٍ التحقق…",
    errPassword: "كلمة المرور غير صحيحة.",
    errNotConfigured: "متغير ADMIN_PASSWORD غير مُعد على هذا الخادم.",
    hint: "يتم تعيين كلمة المرور في متغيرات البيئة الخاصة بالمشروع.",
    logout: "خروج",
    backToDash: "مساحة التكوين",
    overview: "نظرة عامة",
    totalUsers: "المستخدمون",
    registered: "مسجلون",
    guests: "ضيوف",
    activeUsers: "المتعلمون النشطون",
    activeDesc: "أتمّوا وصفة واحدة على الأقل",
    totalCompletions: "الدروس المكتملة",
    last7: "7 أيام",
    last30: "30 يوماً",
    guestUsers: "نسبة الضيوف",
    weeklyTitle: "التسجيلات الأسبوعية",
    weeklyDesc: "الحسابات الجديدة خلال الأسابيع الستة الأخيرة.",
    loading: "جارٍ تحميل الإحصائيات…",
    tabStats: "الإحصائيات",
    tabCodes: "رموز الدخول",
    genTitle: "مولّد رموز الدخول",
    genDesc: "أنشئ رموزاً من 8 خانات (أرقام وحروف) لتوزيعها على المتعلمين.",
    genCount: "العدد",
    genLabel: "تسمية (اختياري)",
    genLabelPlaceholder: "مثال: المجموعة أ، تلميذ…",
    genButton: "توليد",
    genCreated: "تم إنشاء {n} رمز:",
    copyAll: "نسخ الكل",
    copied: "تم النسخ!",
    listTitle: "الرموز الموجودة",
    listCount: "المجموع: {n} رمز",
    listEmpty: "لا توجد رموز بعد. أنشئ أول رمز من الأعلى.",
    codeUsed: "استُعمل في",
    codeUnused: "لم يُستعمل بعد",
    badgeUsed: "مستعمل",
    badgeActive: "نشط",
    badgeDisabled: "معطّل",
    badgeExpired: "منتهي الصلاحية",
    genExpiry: "الصلاحية (أيام)",
    genExpiryPlaceholder: "فارغ = غير محدودة",
    expiresLabel: "تنتهي في",
    neverExpires: "غير محدودة",
    tabUsers: "المستخدمون",
    tabRecipes: "الوصفات",
    recipesTitle: "إدارة الوصفات",
    recipesDesc:
      "عدّل الوصفات الموجودة، أنشئ وصفات جديدة وأضف فيديوهات يوتيوب.",
    recipeNew: "وصفة جديدة",
    recipeEditBase: "تعديل",
    recipeSaved: "تم حفظ الوصفة ✔",
    recipeBadVideo: "رابط يوتيوب غير صحيح.",
    recipeSlug: "المعرّف (slug)",
    recipeSlugHint: "حروف وأرقام وشرطات — مثال: gel-nettoyant",
    recipeSection: "الوحدة",
    recipeTitleFr: "العنوان (بالفرنسية)",
    recipeTitleAr: "العنوان (بالعربية)",
    recipeTagFr: "الوصف المختصر (بالفرنسية)",
    recipeTagAr: "الوصف المختصر (بالعربية)",
    recipeDiff: "الصعوبة (0 سهل، 1 متوسط، 2 متقدم)",
    recipeWarnFr: "تحذيرات بالفرنسية (سطر لكل واحدة)",
    recipeWarnAr: "تحذيرات بالعربية (سطر لكل واحدة)",
    recipeTipsFr: "نصائح بالفرنسية (سطر لكل واحدة)",
    recipeTipsAr: "نصائح بالعربية (سطر لكل واحدة)",
    recipeIngredients:
      "المكونات — سطر لكل مكوّن: Français | العربية | % (فارغ = ماء/حسب الحاجة)",
    recipeStepsFr: "الخطوات بالفرنسية (سطر لكل خطوة)",
    recipeStepsAr: "الخطوات بالعربية (سطر لكل خطوة)",
    recipePhoto: "رابط الصورة (اختياري)",
    recipeVideo: "رابط فيديو يوتيوب",
    recipeVideoHint:
      "رابط كامل أو معرّف من 11 خانة — يتم جلب العنوان تلقائياً.",
    recipeDelete: "حذف الوصفة المخصصة",
    recipeHidden: "مخفية",
    recipeCustom: "مخصصة",
    recipeOverride: "معدّلة",
    recipeHasVideo: "فيديو ✓",
    usersTitle: "حسابات البريد الإلكتروني",
    usersDesc: "امنح أو مدّد أو ألغِ صلاحية وصول الحسابات المسجلة.",
    userHasAccess: "الوصول نشط",
    userExpired: "منتهي",
    userNoAccess: "بدون وصول",
    userGrant: "منح / تمديد",
    userGrantDays: "المدة (أيام)",
    userRevoke: "إلغاء",
    listEmptyUsers: "لا توجد حسابات مسجلة بعد.",
    deleteCode: "حذف الرمز",
    tabPosts: "الإعلانات",
    postsTitle: "الإعلانات والمستجدات",
    postsDesc:
      "إعلانات ثنائية اللغة تظهر للمتدربين في لوحة التحكم الخاصة بهم.",
    postNew: "إعلان جديد",
    postEdit: "تعديل",
    postTitleFr: "العنوان (بالفرنسية)",
    postTitleAr: "العنوان (بالعربية)",
    postBodyFr: "المحتوى (بالفرنسية)",
    postBodyAr: "المحتوى (بالعربية)",
    postVideo: "رابط فيديو يوتيوب (اختياري)",
    postPublished: "منشور",
    postDraft: "مسودة",
    postSaved: "تم حفظ الإعلان ✔",
    postDelete: "حذف الإعلان",
    postsCount: "{n} إعلان",
    postsEmpty: "لا توجد إعلانات بعد. أنشئ الأول.",
    dashPostsTitle: "أخبار التكوين",
    dashPostsEmpty: "",
  },
};

export const dictionaries = { fr, ar } as const;
export type Dict = typeof fr;

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LangCtx | null>(null);

const STORAGE_KEY = "savonnerie-lang";

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "ar") return stored;
  } catch {
    /* ignore */
  }
  return "fr";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<LangCtx>(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      dir: lang === "ar" ? "rtl" : "ltr",
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LangCtx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
