const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, PageNumber, LevelFormat } = require('docx');
const fs = require('fs');

const navy = "1B365D";
const teal = "0D7377";
const rust = "8B3A2A";
const gray = "555555";
const light = "F4F7FA";
const lightTeal = "E8F4F4";
const lightRust = "F8EEEA";

const thin = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const borders = { top: thin, bottom: thin, left: thin, right: thin };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: opts.line },
    alignment: opts.align,
    children: [new TextRun({ text, font: "Arial", size: opts.size ?? 22, bold: opts.bold, italics: opts.italics, color: opts.color ?? "222222" })],
  });
}

function runs(parts, paraOpts = {}) {
  return new Paragraph({
    spacing: { after: paraOpts.after ?? 120, before: paraOpts.before ?? 0 },
    alignment: paraOpts.align,
    children: parts.map((x) => new TextRun({
      text: x.text, font: "Arial", size: x.size ?? 22,
      bold: x.bold, italics: x.italics, color: x.color ?? "222222",
    })),
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 320, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: navy, space: 4 } },
    children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color: navy })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 100 },
    children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color: teal })],
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, font: "Arial", size: 22 })],
  });
}

function bulletRich(parts, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80 },
    children: parts.map((x) => new TextRun({
      text: x.text, font: "Arial", size: 22, bold: x.bold, italics: x.italics, color: x.color,
    })),
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.w, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: opts.fill || "FFFFFF" },
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    verticalAlign: VerticalAlign.CENTER,
    borders,
    children: [new Paragraph({
      children: [new TextRun({ text, font: "Arial", size: opts.size ?? 20, bold: opts.bold, color: opts.color || "222222" })],
    })],
  });
}

function headerFooter() {
  return {
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: "BIOL 1414  ·  Lecture 4  ·  Chemical Foundation of Life", font: "Arial", size: 16, color: gray, italics: true }),
          ],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Study Pack  ·  Page ", font: "Arial", size: 16, color: gray }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: gray }),
            new TextRun({ text: " of ", font: "Arial", size: 16, color: gray }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 16, color: gray }),
          ],
        })],
      }),
    },
  };
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: navy },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: teal },
        paragraph: { spacing: { before: 260, after: 100 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "terms", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "qnum", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
      },
    },
    ...headerFooter(),
    children: [
      p("BIOL 1414  ·  Intro to Cell and Molecular Biology", { size: 20, color: teal, bold: true, after: 40 }),
      p("Lecture 4 Study Pack", { size: 44, bold: true, color: navy, after: 40 }),
      p("Chemical Foundation of Life  ·  26/27 August 2026", { size: 22, italics: true, color: gray, after: 200 }),

      runs([
        { text: "How to use this pack. ", bold: true },
        { text: "Read the notes first. Then take the 20-question quiz without looking at the key. Check answers last and mark any missed items for review before the macromolecules lecture." },
      ], { after: 240 }),

      h1("1. Study Notes"),

      h2("Atoms"),
      bullet("An atom is the smallest unit of matter that still has all the chemical properties of an element."),
      bullet("Two regions: a nucleus (protons +, neutrons 0) and electrons (−) that occupy space around the nucleus."),
      bullet("Protons and neutrons contribute to mass. Only protons contribute to nuclear charge."),
      bullet("Electrons contribute to charge but have negligible mass (the lecture phrasing “not the weight”)."),
      bullet("A gold coin is simply a molded mass of gold atoms — same element, many atoms."),

      h2("Atomic Number, Mass Number, Atomic Mass, Isotopes"),
      bulletRich([{ text: "Atomic number: ", bold: true }, { text: "number of protons. This identifies the element." }]),
      bulletRich([{ text: "Mass number: ", bold: true }, { text: "protons + neutrons for one specific atom or isotope." }]),
      bulletRich([{ text: "Isotope: ", bold: true }, { text: "same number of protons, different number of neutrons. Example: carbon-13 vs. carbon-14." }]),
      bulletRich([{ text: "Atomic mass: ", bold: true }, { text: "weighted average (mean) of an element’s naturally occurring isotopes." }]),
      bullet("Chlorine example: atomic mass ≈ 35.45 because most Cl atoms are mass 35 (17p + 18n) and some are mass 37 (17p + 20n)."),

      h2("Chemical Stability, Molecules, and Reactions"),
      bullet("Atoms are most stable when the outermost electron shell is full."),
      bullet("Atoms that do not have a full outer shell form bonds because a full shell is more energetically favorable."),
      bulletRich([{ text: "Molecule: ", bold: true }, { text: "two or more atoms chemically bonded together." }]),
      bulletRich([{ text: "Compound: ", bold: true }, { text: "a molecule that contains atoms of more than one element." }]),
      bulletRich([{ text: "Chemical reaction: ", bold: true }, { text: "atoms bond to form molecules, or bonds break so molecules come apart." }]),
      bullet("Reactants are on the left of the arrow; products are on the right."),
      bullet("Equations must stay balanced (law of conservation of mass: mass is not created or destroyed)."),

      h2("Ions and Ionic Bonds"),
      bulletRich([{ text: "Ion: ", bold: true }, { text: "an atom that has gained or lost electrons so the outer shell is more stable." }]),
      bulletRich([{ text: "Cation: ", bold: true }, { text: "positive; lost electrons." }]),
      bulletRich([{ text: "Anion: ", bold: true }, { text: "negative; gained electrons. Anion names often end in “-ide” (chloride)." }]),
      bullet("Ionic bonds form between oppositely charged ions (magnet analogy: north and south poles)."),
      bullet("Classic example: Na+ (lost an electron) and Cl− (gained an electron) → sodium chloride, table salt."),
      bullet("Electrolytes (Na+, K+, Ca2+ salts) are required for nerve impulses and muscle contraction."),

      h2("Covalent Bonds"),
      bullet("Covalent bonds form when atoms share electrons to fill outer shells."),
      bullet("In living systems they are stronger and more common than ionic bonds."),
      bullet("Share 1 pair = single bond; 2 pairs = double; 3 pairs = triple. More shared pairs → stronger bond."),
      bullet("Water example: O has 6 valence electrons and needs 2 more; each H has 1. Two H atoms share with O → H2O."),
      bulletRich([{ text: "Polar covalent: ", bold: true }, { text: "unequal sharing. Electrons spend more time nearer one atom. Water is the lecture’s main example." }]),
      bulletRich([{ text: "Nonpolar covalent: ", bold: true }, { text: "equal sharing. Example: molecular oxygen, O2." }]),
      runs([
        { text: "Lecture question. ", bold: true, color: rust },
        { text: "Nitrogen is 78.1% of the atmosphere, yet it is often limiting in nature. N2 has a very strong triple covalent bond, so most organisms cannot use atmospheric N2 until it is “fixed” into more reactive forms (ammonia, nitrate)." },
      ], { after: 160 }),

      h2("Hydrogen Bonds"),
      bullet("A hydrogen bond is an attraction between a slightly positive H (already covalently bonded in one molecule) and a slightly negative region of another molecule."),
      bullet("This bonds molecules to one another, not atoms into a new compound."),
      bullet("Weak and easily broken compared with covalent bonds. Water–water H-bonds are the standard example."),
      bullet("Career note from lecture: pharmaceutical chemists work with natural-product chemistry — Taxol (anticancer, Pacific yew) and aspirin (acetylsalicylic acid, willow)."),

      h2("Why Water Rules"),
      bullet("Water is polar but has no net charge: H slightly +, O slightly −."),
      bullet("Water molecules attract other water molecules and other polar molecules via hydrogen bonds."),
      bulletRich([{ text: "Hydrophilic: ", bold: true }, { text: "“water-loving”; polar substances that dissolve readily in water." }]),
      bulletRich([{ text: "Hydrophobic: ", bold: true }, { text: "“water-fearing”; nonpolar substances that do not dissolve (oil in salad dressing)." }]),
      bullet("Three states of water are controlled by H-bonding and kinetic energy (motion/heat):"),
      bullet("Liquid — H-bonds break and reform quickly."),
      bullet("Gas — enough kinetic energy that H-bonds break permanently."),
      bullet("Solid — not enough kinetic energy to break H-bonds; a crystalline lattice forms. Molecules are farther apart than in liquid water, so ice is less dense and floats."),

      new Paragraph({
        spacing: { before: 160, after: 80 },
        children: [new TextRun({ text: "Key water properties (the lecture’s “why important” list)", font: "Arial", size: 22, bold: true, color: navy })],
      }),

      new Table({
        columnWidths: [2800, 6560],
        width: { size: 9360, type: WidthType.DXA },
        rows: [
          new TableRow({ children: [
            cell("Property", { w: 2800, bold: true, color: "FFFFFF", fill: navy }),
            cell("Why it matters / definition", { w: 6560, bold: true, color: "FFFFFF", fill: navy }),
          ]}),
          new TableRow({ children: [
            cell("High specific heat", { w: 2800, bold: true, fill: light }),
            cell("Energy to raise 1 g by 1 °C. Highest of any liquid because of H-bonds. Stabilizes temperature of cells and climate.", { w: 6560, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("High heat of vaporization", { w: 2800, bold: true, fill: "FFFFFF" }),
            cell("Energy to turn 1 g liquid into gas. H-bonds must be broken to make steam (100 °C / 212 °F). Enables evaporative cooling (sweat).", { w: 6560 }),
          ]}),
          new TableRow({ children: [
            cell("Universal solvent", { w: 2800, bold: true, fill: light }),
            cell("Dissolves polar molecules and ionic compounds. Ions/polar solutes become surrounded by a sphere of hydration. Most biochemistry happens in water.", { w: 6560, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("Cohesion", { w: 2800, bold: true, fill: "FFFFFF" }),
            cell("Water sticks to water (H-bonds). Produces high surface tension — drops form; a glass can be filled “above” the rim.", { w: 6560 }),
          ]}),
          new TableRow({ children: [
            cell("Adhesion", { w: 2800, bold: true, fill: light }),
            cell("Water sticks to other surfaces. Capillary action: water climbs a glass wall because it is more attracted to charged glass than to itself.", { w: 6560, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("Unique density", { w: 2800, bold: true, fill: "FFFFFF" }),
            cell("Solid water is less dense than liquid water. Ice floats, insulating lakes and allowing aquatic life to survive winter.", { w: 6560 }),
          ]}),
        ],
      }),

      h2("pH, Acids, Bases, and Buffers"),
      bullet("pH measures hydrogen-ion (H+) concentration. Scale 0–14."),
      bullet("7 = neutral. Below 7 = acidic (more H+). Above 7 = basic (more OH− or other anions that bind free H+)."),
      bullet("Stronger acids/bases donate or accept those ions more readily."),
      bullet("Body examples: blood ≈ 7.4; cell interior ≈ 6.8; stomach ≈ 1–2."),
      bullet("Stomach lining cells do not “tough it out”; they are replaced. The lining turns over about every 7–10 days."),
      bulletRich([{ text: "Buffer: ", bold: true }, { text: "a substance that absorbs extra H+ or OH− and keeps pH in a narrow range. That is how a near-neutral body can drink orange juice (pH ≈ 3) and survive." }]),
      bullet("Lecture pair: bicarbonate (HCO3−) and carbonic acid (H2CO3). Same chemistry is also relevant to ocean acidification and coral reefs."),

      h2("Carbon — Backbone of Life"),
      bulletRich([{ text: "Organic / macromolecules: ", bold: true }, { text: "the lecture defines a macromolecule as a carbon-containing substance important to life (liquid, solid, or gas)." }]),
      bulletRich([{ text: "Hydrocarbons: ", bold: true }, { text: "organic molecules of only C and H. Methane (CH4) stores a lot of energy in four covalent bonds." }]),
      bullet("Carbon atomic number 6 → four valence electrons → four covalent bonds."),
      bullet("Carbon bonds to many atoms, including other carbons, and can form single, double, or triple bonds."),
      bullet("Examples: methane CH4; glucose C6H12O6."),
      bulletRich([{ text: "Isomer: ", bold: true }, { text: "same chemical formula, different arrangement of atoms or bonds — and therefore different properties. Butane (lighter fuel) vs. isobutane (refrigerant)." }]),
      bullet("Fatty-acid geometry from the lecture:"),
      bullet("Saturated fats — no C=C double bonds, “saturated” with hydrogens, pack tightly, usually solid, often animal origin."),
      bullet("Unsaturated fats — one or more double bonds, fewer hydrogens."),
      bullet("Cis double bonds kink the chain so molecules cannot pack tightly → liquid at room temperature."),
      bullet("Trans fats pack tightly, can be solid at room temperature, and are linked to higher cardiovascular risk."),

      h2("Functional Groups"),
      bullet("Clusters of atoms on a carbon backbone that give a molecule specific chemical properties."),
      bullet("Each class of macromolecule has a characteristic set of functional groups. Those groups drive assembly and function."),

      h2("Four Classes of Organic Molecules (preview)"),
      new Table({
        columnWidths: [2400, 6960],
        width: { size: 9360, type: WidthType.DXA },
        rows: [
          new TableRow({ children: [
            cell("Class", { w: 2400, bold: true, color: "FFFFFF", fill: teal }),
            cell("Lecture roles", { w: 6960, bold: true, color: "FFFFFF", fill: teal }),
          ]}),
          new TableRow({ children: [
            cell("Carbohydrates", { w: 2400, bold: true, fill: lightTeal }),
            cell("Short-term energy storage and structure.", { w: 6960, fill: lightTeal }),
          ]}),
          new TableRow({ children: [
            cell("Lipids", { w: 2400, bold: true, fill: "FFFFFF" }),
            cell("Long-term energy, membranes (insoluble in water), insulation.", { w: 6960 }),
          ]}),
          new TableRow({ children: [
            cell("Proteins", { w: 2400, bold: true, fill: lightTeal }),
            cell("Enzymes, structure, muscle contraction. 3-D shape is essential to function.", { w: 6960, fill: lightTeal }),
          ]}),
          new TableRow({ children: [
            cell("Nucleic acids", { w: 2400, bold: true, fill: "FFFFFF" }),
            cell("DNA and RNA encode how to make proteins. Helical structure is essential to function.", { w: 6960 }),
          ]}),
        ],
      }),

      p("Next lecture: biological macromolecules in detail.", { italics: true, color: gray, before: 160, after: 80 }),

      h2("Must-Know Comparisons"),
      new Table({
        columnWidths: [2200, 3580, 3580],
        width: { size: 9360, type: WidthType.DXA },
        rows: [
          new TableRow({ children: [
            cell("Pair", { w: 2200, bold: true, color: "FFFFFF", fill: navy }),
            cell("A", { w: 3580, bold: true, color: "FFFFFF", fill: navy }),
            cell("B", { w: 3580, bold: true, color: "FFFFFF", fill: navy }),
          ]}),
          new TableRow({ children: [
            cell("Mass number vs atomic mass", { w: 2200, bold: true, fill: light }),
            cell("Protons + neutrons of one isotope", { w: 3580, fill: light }),
            cell("Weighted average of all isotopes", { w: 3580, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("Ionic vs covalent", { w: 2200, bold: true }),
            cell("Electron transfer; ions attract", { w: 3580 }),
            cell("Electron sharing; dominant in living tissue", { w: 3580 }),
          ]}),
          new TableRow({ children: [
            cell("Polar vs nonpolar covalent", { w: 2200, bold: true, fill: light }),
            cell("Unequal share (H2O)", { w: 3580, fill: light }),
            cell("Equal share (O2)", { w: 3580, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("Covalent vs hydrogen bond", { w: 2200, bold: true }),
            cell("Shares electrons within a molecule; strong", { w: 3580 }),
            cell("Attracts neighboring molecules; weak", { w: 3580 }),
          ]}),
          new TableRow({ children: [
            cell("Hydrophilic vs hydrophobic", { w: 2200, bold: true, fill: light }),
            cell("Polar; dissolves in water", { w: 3580, fill: light }),
            cell("Nonpolar; does not dissolve", { w: 3580, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("Cohesion vs adhesion", { w: 2200, bold: true }),
            cell("Water–water; surface tension", { w: 3580 }),
            cell("Water–other surface; capillary action", { w: 3580 }),
          ]}),
          new TableRow({ children: [
            cell("Acid vs base", { w: 2200, bold: true, fill: light }),
            cell("Raises [H+]; pH < 7", { w: 3580, fill: light }),
            cell("Raises [OH−] or removes H+; pH > 7", { w: 3580, fill: light }),
          ]}),
          new TableRow({ children: [
            cell("Cis vs trans unsaturation", { w: 2200, bold: true }),
            cell("Kinked; liquid at room temp", { w: 3580 }),
            cell("Straighter; packs; CVD risk", { w: 3580 }),
          ]}),
        ],
      }),

      p("Lecture opener (context only, not a core exam definition): lecanemab-irmb is an FDA-approved antibody (July) that removes extracellular amyloid-β plaques and slowed cognitive decline about 30% over 18 months in trials. It does not stop Alzheimer disease.", { size: 20, italics: true, color: gray, before: 200 }),

      h1("2. Quiz — 20 Questions"),
      p("Work without notes. Circle or write answers. Mix of multiple choice, true/false, and short answer.", { italics: true, color: gray, after: 200 }),

      runs([{ text: "1. ", bold: true }, { text: "The atomic number of an element is determined by the number of:" }]),
      p("    A. Neutrons    B. Protons    C. Electrons    D. Protons + neutrons", { after: 160 }),

      runs([{ text: "2. ", bold: true }, { text: "Carbon-13 and carbon-14 are isotopes of each other because they have:" }]),
      p("    A. Different numbers of protons    B. The same number of neutrons    C. The same number of protons but different numbers of neutrons    D. Different atomic numbers", { after: 160 }),

      runs([{ text: "3. ", bold: true }, { text: "Chlorine’s atomic mass is about 35.45. The best explanation is:" }]),
      p("    A. Every chlorine atom has 18.45 neutrons    B. Atomic mass is protons only    C. Atomic mass is a weighted average of chlorine isotopes    D. Electrons add substantial mass", { after: 160 }),

      runs([{ text: "4. ", bold: true }, { text: "True or false: Electrons contribute substantially to an atom’s mass (weight) as well as to its charge." }], { after: 160 }),

      runs([{ text: "5. ", bold: true }, { text: "In a balanced chemical equation, reactants appear on the _____ of the arrow and products on the _____." }], { after: 160 }),

      runs([{ text: "6. ", bold: true }, { text: "A sodium atom that loses one electron becomes:" }]),
      p("    A. An anion    B. A cation    C. A neutron    D. A nonpolar molecule", { after: 160 }),

      runs([{ text: "7. ", bold: true }, { text: "Which statement about ionic bonds is most accurate?" }]),
      p("    A. They form when atoms share three electron pairs    B. They form between ions of opposite charge    C. They are the most common bonds inside living cells    D. They only occur in gases", { after: 160 }),

      runs([{ text: "8. ", bold: true }, { text: "Sharing two pairs of electrons produces a:" }]),
      p("    A. Hydrogen bond    B. Single covalent bond    C. Double covalent bond    D. Ionic lattice", { after: 160 }),

      runs([{ text: "9. ", bold: true }, { text: "Water is a polar covalent molecule because:" }]),
      p("    A. O and H share electrons equally    B. Electrons spend more time nearer oxygen than hydrogen    C. Water has a net charge of +1    D. The O–H bonds are ionic", { after: 160 }),

      runs([{ text: "10. ", bold: true }, { text: "Why is atmospheric nitrogen (about 78% of air) still “limiting” for many ecosystems? Answer in 2–3 sentences." }], { after: 200 }),

      runs([{ text: "11. ", bold: true }, { text: "A hydrogen bond is best described as:" }]),
      p("    A. Sharing of electrons between H and O inside one water molecule    B. Transfer of an electron from H to O    C. Attraction between a slightly positive H on one molecule and a slightly negative region on another    D. A triple covalent bond", { after: 160 }),

      runs([{ text: "12. ", bold: true }, { text: "Oil does not mix with vinegar because oil is _____ and vinegar is a polar (aqueous) solution." }], { after: 160 }),

      runs([{ text: "13. ", bold: true }, { text: "Ice floats because:" }]),
      p("    A. Ice molecules move faster than liquid water    B. Hydrogen bonds in ice hold molecules farther apart, so ice is less dense    C. Ice has more neutrons    D. Water loses mass when it freezes", { after: 160 }),

      runs([{ text: "14. ", bold: true }, { text: "Match the property to the definition. Write the letter." }]),
      p("    1. Cohesion          A. Water climbs a charged glass wall", { after: 40 }),
      p("    2. Adhesion          B. Energy to raise 1 g of substance by 1 °C", { after: 40 }),
      p("    3. Specific heat     C. Water molecules attract one another", { after: 40 }),
      p("    4. Heat of vaporization    D. Energy to convert 1 g of liquid to gas", { after: 160 }),

      runs([{ text: "15. ", bold: true }, { text: "True or false: Most chemical reactions of life occur in water because water is an excellent solvent for polar molecules and ionic compounds." }], { after: 160 }),

      runs([{ text: "16. ", bold: true }, { text: "Human blood is about pH 7.4. Orange juice is about pH 3. People survive drinking juice mainly because:" }]),
      p("    A. The stomach never contacts the juice    B. Buffers absorb extra H+ or OH− and hold body pH in a narrow range    C. pH 3 is basic    D. Juice contains no hydrogen ions", { after: 160 }),

      runs([{ text: "17. ", bold: true }, { text: "Stomach pH is about 1–2. How do stomach-lining cells persist in that environment, according to lecture?" }], { after: 160 }),

      runs([{ text: "18. ", bold: true }, { text: "Carbon is the backbone of biological molecules because it:" }]),
      p("    A. Forms only ionic bonds    B. Has four valence electrons and can form four covalent bonds, including to other carbons    C. Cannot form double or triple bonds    D. Has a full outer shell already", { after: 160 }),

      runs([{ text: "19. ", bold: true }, { text: "Butane and isobutane have the same formula but different structures. They are:" }]),
      p("    A. Isotopes    B. Ions    C. Isomers    D. Buffers", { after: 160 }),

      runs([{ text: "20. ", bold: true }, { text: "Which fat description matches the lecture?" }]),
      p("    A. Cis-unsaturated chains pack tightly and are solid at room temperature    B. Saturated fats lack C=C double bonds and are typically solid    C. Trans fats cannot pack and stay liquid    D. Unsaturated means “saturated with hydrogens”", { after: 240 }),

      h1("3. Answer Key"),

      bulletRich([{ text: "1. B. ", bold: true }, { text: "Protons determine atomic number." }], "terms"),
      bulletRich([{ text: "2. C. ", bold: true }, { text: "Isotopes share proton number (and therefore element identity) but differ in neutrons." }], "terms"),
      bulletRich([{ text: "3. C. ", bold: true }, { text: "Atomic mass is the mean of isotopes; Cl-35 is common, Cl-37 is present, average ≈ 35.45." }], "terms"),
      bulletRich([{ text: "4. False. ", bold: true }, { text: "Electrons affect charge, not appreciable mass. Protons and neutrons account for mass." }], "terms"),
      bulletRich([{ text: "5. Left; right. ", bold: true }, { text: "Reactants → products. Mass is conserved, so atom counts stay balanced." }], "terms"),
      bulletRich([{ text: "6. B. ", bold: true }, { text: "Loss of an electron leaves Na with more protons than electrons → cation (Na+)." }], "terms"),
      bulletRich([{ text: "7. B. ", bold: true }, { text: "Opposite charges attract. Covalent bonds, not ionic, dominate inside living tissue." }], "terms"),
      bulletRich([{ text: "8. C. ", bold: true }, { text: "Two shared pairs = double covalent bond." }], "terms"),
      bulletRich([{ text: "9. B. ", bold: true }, { text: "Unequal sharing makes O slightly negative and H slightly positive. The molecule still has no net charge." }], "terms"),
      bulletRich([{ text: "10. ", bold: true }, { text: "N2 is held by a very strong triple covalent bond. Most organisms cannot break that bond, so they cannot use the huge atmospheric pool until nitrogen is fixed into more reactive compounds." }], "terms"),
      bulletRich([{ text: "11. C. ", bold: true }, { text: "H-bonds are intermolecular attractions. The O–H connection inside one water molecule is a polar covalent bond." }], "terms"),
      bulletRich([{ text: "12. Hydrophobic (nonpolar). ", bold: true }, { text: "Oil does not dissolve in water/vinegar; shaking only temporarily mixes droplets." }], "terms"),
      bulletRich([{ text: "13. B. ", bold: true }, { text: "The ice lattice spaces molecules farther apart than in liquid water, lowering density." }], "terms"),
      bulletRich([{ text: "14. ", bold: true }, { text: "1–C, 2–A, 3–B, 4–D." }], "terms"),
      bulletRich([{ text: "15. True. ", bold: true }, { text: "Water surrounds polar molecules and dissociated ions with spheres of hydration." }], "terms"),
      bulletRich([{ text: "16. B. ", bold: true }, { text: "Buffers (including the bicarbonate / carbonic acid pair) prevent large pH swings." }], "terms"),
      bulletRich([{ text: "17. ", bold: true }, { text: "They do not survive indefinitely; the lining is continually replaced (about every 7–10 days)." }], "terms"),
      bulletRich([{ text: "18. B. ", bold: true }, { text: "Four covalent bonding sites let carbon build chains, rings, and branched skeletons." }], "terms"),
      bulletRich([{ text: "19. C. ", bold: true }, { text: "Same formula, different arrangement = isomers (different properties: fuel vs. refrigerant)." }], "terms"),
      bulletRich([{ text: "20. B. ", bold: true }, { text: "Saturated = no C=C, packed with H, usually solid. Cis-unsaturation kinks chains (liquid). Trans packs and is linked to cardiovascular risk." }], "terms"),

      p("End of Lecture 4 study pack. Next up: biological macromolecules.", { italics: true, color: gray, before: 280 }),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/home/workdir/artifacts/BIOL1414_Lecture4_Study_Pack.docx", buffer);
  console.log("Wrote study pack");
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
