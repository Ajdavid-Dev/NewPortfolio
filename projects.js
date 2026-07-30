/* =================================================================
   YOUR PROJECTS  —  this is the only file you edit to change case studies.

   • To EDIT a project: change its text below.
   • To ADD a project: copy a whole { ... } block, paste it, give it a new
     key (e.g.  myproject: { ... }), edit the text, then in index.html
     point a project card link to   case.html?p=myproject
   • IMAGES: set "cover" and "gallery" filenames. Leave "" to keep the
     coloured placeholder. Upload the image files next to the HTML files.
   ================================================================= */
window.PROJECTS = {

  owiwi: {
    title: "Owiwi — lending, reimagined",
    category: "Fintech", role: "Lead Product Designer", year: "2024",
    timeline: "6 months", team: "PM, 2 engineers, me", platform: "iOS · Android · Web",
    cover: "", coverClass: "ph1",                 // e.g. cover: "owiwi-cover.jpg"
    summary: "A consumer lending app where trust was the whole product. I rebuilt onboarding and the loan flow from the ground up so first-time borrowers always knew what was happening and why.",
    challenge: "Users abandoned the loan application halfway through. The flow asked for too much, too early, explained too little, and felt risky at the exact moment people needed reassurance about their money.",
    approach: [
      "Mapped the full borrower journey and ran interviews to find the moments of doubt.",
      "Cut the application into smaller, explained steps with clear progress and plain language.",
      "Designed a reusable component system so every screen felt consistent and calm.",
      "Prototyped and tested two onboarding directions with real users before building."
    ],
    gallery: ["", ""], galleryClass: ["ph2","ph3"],   // e.g. ["owiwi-1.jpg","owiwi-2.jpg"]
    outcomes: [ {v:"+38%", l:"Application completion"}, {v:"-45%", l:"Drop-off rate"}, {v:"4.7★", l:"App store rating"} ],
    next: "agrichain"
  },

  agrichain: {
    title: "Agrichain — farm to ledger",
    category: "Supply chain", role: "Product Designer", year: "2023",
    timeline: "8 months", team: "PM, design partner, 3 engineers", platform: "Android · Web",
    cover: "", coverClass: "ph2",
    summary: "A traceability platform connecting smallholder farmers to buyers, built for low-bandwidth devices and people using a digital tool for the very first time.",
    challenge: "The people who needed the product most had the least reliable connectivity and the least familiarity with apps. Every interaction had to survive a dropped connection and be obvious without instructions.",
    approach: [
      "Designed offline-first flows that sync when a connection returns.",
      "Used large touch targets, icons, and local-language labels for first-time users.",
      "Simplified complex supply-chain data into a few glanceable cards.",
      "Tested in the field, not just the studio, and iterated on what actually broke."
    ],
    gallery: ["", ""], galleryClass: ["ph1","ph3"],
    outcomes: [ {v:"12k+", l:"Farmers onboarded"}, {v:"+60%", l:"Records logged"}, {v:"3 regions", l:"Rolled out"} ],
    next: "arc"
  },

  arc: {
    title: "Arc — a design system at scale",
    category: "SaaS", role: "Design Systems Lead", year: "2022",
    timeline: "Ongoing", team: "Design + frontend guild", platform: "Web",
    cover: "", coverClass: "ph3",
    summary: "A design system that turned a pile of inconsistent components into shared infrastructure — 120+ components, full theming, and documentation people actually use.",
    challenge: "Every team rebuilt the same buttons and forms slightly differently. Designers and engineers spoke different languages, and quality drifted with every new screen.",
    approach: [
      "Audited the product and consolidated dozens of one-off components into a core set.",
      "Defined design tokens for colour, type, and spacing shared by design and code.",
      "Wrote living documentation with usage examples and do/don't guidance.",
      "Ran adoption sessions so the system was something teams pulled toward, not pushed onto."
    ],
    gallery: ["", ""], galleryClass: ["ph1","ph2"],
    outcomes: [ {v:"120+", l:"Components"}, {v:"-50%", l:"Design-to-dev time"}, {v:"100%", l:"Theming coverage"} ],
    next: "owiwi"
  },

};
