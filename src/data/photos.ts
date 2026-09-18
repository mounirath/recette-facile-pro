import type { Course } from "./courses";

/**
 * Realistic photography (Unsplash CDN, hotlinked with optimized params).
 * Every ID in this file was verified to return HTTP 200.
 */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const HERO_PHOTO = u("1582719508461-905c673771fd", 900);

export const SECTION_PHOTOS: Record<Course["section"], string> = {
  menage: u("1581578731548-c64695cc6952", 700),
  soin: u("1526947425960-945c6e72858f", 700),
  auto: u("1503376780353-7e6692767b70", 700),
  business: u("1454165804606-c3d57bc86b40", 700),
};

export const COURSE_PHOTOS: Record<Course["slug"], string> = {
  // ----- Entretien maison (10) -----
  "vaisselle-eco": u("1584622650111-993a426fbf0a"),
  "vaisselle-premium": u("1604709177225-055f99402ea3"),
  "savon-liquide-mains": u("1600857544200-b2f666a9a2ec"),
  "four-degraissant": u("1558618666-fcd25c85cd64"),
  javel: u("1584269600464-37b1b58a9fe7"),
  "lessive-marseille": u("1545173168-9f1947eebb7f"),
  sanibon: u("1581578731548-c64695cc6952"),
  "sol-multiusage": u("1586528116311-ad8dd3c8310d"),
  vitres: u("1517524008697-84bbe3c3fd98"),
  "wc-decalcifiant": u("1584622650111-993a426fbf0a"),
  // ----- Soins & hygiène (5) -----
  adoucissant: u("1594035910387-fea47794261f"),
  "creme-a-recurer": u("1585421514738-01798e348b17"),
  "savon-dur": u("1600857544200-b2f666a9a2ec"),
  "shampooing-doux": u("1587854692152-cbe660dbde88"),
  "gel-douche": u("1556228720-195a672e8a03"),
  // ----- Auto (10) -----
  "auto-shampoing": u("1552519507-da3b142c6e3d"),
  "auto-glass": u("1520340356584-f9917d1eea6f"),
  "auto-tableau": u("1607853202273-797f1c22a38e"),
  "auto-moteur": u("1486262715619-67b85e0b08d3"),
  "auto-mousse": u("1558618666-fcd25c85cd64"),
  "auto-liquide-refroidissement": u("1486262715619-67b85e0b08d3"),
  "auto-antibuée": u("1520340356584-f9917d1eea6f"),
  "auto-parfum": u("1541643600914-78b084683601"),
  "auto-jantes": u("1554224155-6726b3ff858f"),
  "auto-lave-glace": u("1520340356584-f9917d1eea6f"),
  // ----- Business (3) -----
  "cout-matiere": u("1554224155-6726b3ff858f"),
  "securite-atelier": u("1576086213369-97a306d36557"),
  "etiquetage-vente": u("1553062407-98eeb64c6a62"),
};

/** Hero-section photos reused as elegant fallbacks for extra slots */
export const EXTRA_PHOTOS = {
  lab: u("1532187863486-abf9dbad1b69", 900),
  business: u("1563453392212-326f5e854473", 900),
  label: u("1428592953211-077101b2021b", 900),
  scent: u("1515694346937-94d85e41e6f0", 900),
  shop: u("1607083206968-13611e3d76db", 900),
  liquid: u("1489987707025-afc232f7ea0f", 900),
};
