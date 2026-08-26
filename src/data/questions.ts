export type Choice = { id: string; label: string };

export type Question =
  | {
      id: number;
      type: "choice";
      prompt: string;
      choices: Choice[];
    }
  | {
      id: number;
      type: "short";
      prompt: string;
      placeholder?: string;
    }
  | {
      id: number;
      type: "match";
      prompt: string;
      items: { key: string; label: string }[];
      options: Choice[];
    };

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "choice",
    prompt: "The atomic number of an element is determined by the number of:",
    choices: [
      { id: "A", label: "Neutrons" },
      { id: "B", label: "Protons" },
      { id: "C", label: "Electrons" },
      { id: "D", label: "Protons + neutrons" },
    ],
  },
  {
    id: 2,
    type: "choice",
    prompt: "Carbon-13 and carbon-14 are isotopes of each other because they have:",
    choices: [
      { id: "A", label: "Different numbers of protons" },
      { id: "B", label: "The same number of neutrons" },
      { id: "C", label: "The same number of protons but different numbers of neutrons" },
      { id: "D", label: "Different atomic numbers" },
    ],
  },
  {
    id: 3,
    type: "choice",
    prompt: "Chlorine’s atomic mass is about 35.45. The best explanation is:",
    choices: [
      { id: "A", label: "Every chlorine atom has 18.45 neutrons" },
      { id: "B", label: "Atomic mass is protons only" },
      { id: "C", label: "Atomic mass is a weighted average of chlorine isotopes" },
      { id: "D", label: "Electrons add substantial mass" },
    ],
  },
  {
    id: 4,
    type: "choice",
    prompt:
      "True or false: Electrons contribute substantially to an atom’s mass (weight) as well as to its charge.",
    choices: [
      { id: "A", label: "True" },
      { id: "B", label: "False" },
    ],
  },
  {
    id: 5,
    type: "short",
    prompt:
      "In a balanced chemical equation, reactants appear on the _____ of the arrow and products on the _____.",
    placeholder: "e.g. left; right",
  },
  {
    id: 6,
    type: "choice",
    prompt: "A sodium atom that loses one electron becomes:",
    choices: [
      { id: "A", label: "An anion" },
      { id: "B", label: "A cation" },
      { id: "C", label: "A neutron" },
      { id: "D", label: "A nonpolar molecule" },
    ],
  },
  {
    id: 7,
    type: "choice",
    prompt: "Which statement about ionic bonds is most accurate?",
    choices: [
      { id: "A", label: "They form when atoms share three electron pairs" },
      { id: "B", label: "They form between ions of opposite charge" },
      { id: "C", label: "They are the most common bonds inside living cells" },
      { id: "D", label: "They only occur in gases" },
    ],
  },
  {
    id: 8,
    type: "choice",
    prompt: "Sharing two pairs of electrons produces a:",
    choices: [
      { id: "A", label: "Hydrogen bond" },
      { id: "B", label: "Single covalent bond" },
      { id: "C", label: "Double covalent bond" },
      { id: "D", label: "Ionic lattice" },
    ],
  },
  {
    id: 9,
    type: "choice",
    prompt: "Water is a polar covalent molecule because:",
    choices: [
      { id: "A", label: "O and H share electrons equally" },
      { id: "B", label: "Electrons spend more time nearer oxygen than hydrogen" },
      { id: "C", label: "Water has a net charge of +1" },
      { id: "D", label: "The O–H bonds are ionic" },
    ],
  },
  {
    id: 10,
    type: "short",
    prompt:
      "Why is atmospheric nitrogen (about 78% of air) still “limiting” for many ecosystems?",
    placeholder: "2–3 sentences",
  },
  {
    id: 11,
    type: "choice",
    prompt: "A hydrogen bond is best described as:",
    choices: [
      { id: "A", label: "Sharing of electrons between H and O inside one water molecule" },
      { id: "B", label: "Transfer of an electron from H to O" },
      { id: "C", label: "Attraction between a slightly positive H on one molecule and a slightly negative region on another" },
      { id: "D", label: "A triple covalent bond" },
    ],
  },
  {
    id: 12,
    type: "short",
    prompt:
      "Oil does not mix with vinegar because oil is _____ and vinegar is a polar (aqueous) solution.",
    placeholder: "e.g. hydrophobic / nonpolar",
  },
  {
    id: 13,
    type: "choice",
    prompt: "Ice floats because:",
    choices: [
      { id: "A", label: "Ice molecules move faster than liquid water" },
      { id: "B", label: "Hydrogen bonds in ice hold molecules farther apart, so ice is less dense" },
      { id: "C", label: "Ice has more neutrons" },
      { id: "D", label: "Water loses mass when it freezes" },
    ],
  },
  {
    id: 14,
    type: "match",
    prompt: "Match the property to the definition.",
    items: [
      { key: "1", label: "Cohesion" },
      { key: "2", label: "Adhesion" },
      { key: "3", label: "Specific heat" },
      { key: "4", label: "Heat of vaporization" },
    ],
    options: [
      { id: "A", label: "Water climbs a charged glass wall" },
      { id: "B", label: "Energy to raise 1 g of substance by 1 °C" },
      { id: "C", label: "Water molecules attract one another" },
      { id: "D", label: "Energy to convert 1 g of liquid to gas" },
    ],
  },
  {
    id: 15,
    type: "choice",
    prompt:
      "True or false: Most chemical reactions of life occur in water because water is an excellent solvent for polar molecules and ionic compounds.",
    choices: [
      { id: "A", label: "True" },
      { id: "B", label: "False" },
    ],
  },
  {
    id: 16,
    type: "choice",
    prompt:
      "Human blood is about pH 7.4. Orange juice is about pH 3. People survive drinking juice mainly because:",
    choices: [
      { id: "A", label: "The stomach never contacts the juice" },
      { id: "B", label: "Buffers absorb extra H+ or OH− and hold body pH in a narrow range" },
      { id: "C", label: "pH 3 is basic" },
      { id: "D", label: "Juice contains no hydrogen ions" },
    ],
  },
  {
    id: 17,
    type: "short",
    prompt:
      "Stomach pH is about 1–2. How do stomach-lining cells persist in that environment, according to lecture?",
    placeholder: "Short answer",
  },
  {
    id: 18,
    type: "choice",
    prompt: "Carbon is the backbone of biological molecules because it:",
    choices: [
      { id: "A", label: "Forms only ionic bonds" },
      { id: "B", label: "Has four valence electrons and can form four covalent bonds, including to other carbons" },
      { id: "C", label: "Cannot form double or triple bonds" },
      { id: "D", label: "Has a full outer shell already" },
    ],
  },
  {
    id: 19,
    type: "choice",
    prompt: "Butane and isobutane have the same formula but different structures. They are:",
    choices: [
      { id: "A", label: "Isotopes" },
      { id: "B", label: "Ions" },
      { id: "C", label: "Isomers" },
      { id: "D", label: "Buffers" },
    ],
  },
  {
    id: 20,
    type: "choice",
    prompt: "Which fat description matches the lecture?",
    choices: [
      { id: "A", label: "Cis-unsaturated chains pack tightly and are solid at room temperature" },
      { id: "B", label: "Saturated fats lack C=C double bonds and are typically solid" },
      { id: "C", label: "Trans fats cannot pack and stay liquid" },
      { id: "D", label: "Unsaturated means “saturated with hydrogens”" },
    ],
  },
];

export function formatAnswer(q: Question, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return `${q.id} —`;
  return `${q.id} ${trimmed}`;
}
