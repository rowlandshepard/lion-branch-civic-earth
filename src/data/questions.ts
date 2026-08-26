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

export type Lecture = {
  id: string;
  number: number;
  title: string;
  blurb: string;
  questions: Question[];
};

const LEC2: Question[] = [
  {
    id: 1,
    type: "choice",
    prompt: "Which of the following is required for a hypothesis to be scientific?",
    choices: [
      { id: "A", label: "It must be proven true" },
      { id: "B", label: "It must be testable and falsifiable" },
      { id: "C", label: "It must be based on a theory" },
      { id: "D", label: "It must use only quantitative data" },
    ],
  },
  {
    id: 2,
    type: "choice",
    prompt: "In an experiment testing fertilizer amount on plant growth, plant height is the:",
    choices: [
      { id: "A", label: "Independent variable" },
      { id: "B", label: "Dependent variable" },
      { id: "C", label: "Control variable" },
      { id: "D", label: "Hypothesis" },
    ],
  },
  {
    id: 3,
    type: "choice",
    prompt: "Science progresses primarily by:",
    choices: [
      { id: "A", label: "Accumulating more and more facts" },
      { id: "B", label: "Addressing what we do not yet know" },
      { id: "C", label: "Proving hypotheses beyond doubt" },
      { id: "D", label: "Relying only on serendipity" },
    ],
  },
  {
    id: 4,
    type: "choice",
    prompt: "A scientific theory is best described as:",
    choices: [
      { id: "A", label: "An educated guess" },
      { id: "B", label: "A single experiment’s result" },
      { id: "C", label: "A well-supported explanation based on repeated testing" },
      { id: "D", label: "A description of a natural pattern with no exceptions" },
    ],
  },
  {
    id: 5,
    type: "choice",
    prompt: "Which type of reasoning moves from specific observations to a general conclusion?",
    choices: [
      { id: "A", label: "Deductive" },
      { id: "B", label: "Inductive" },
      { id: "C", label: "Experimental" },
      { id: "D", label: "Theoretical" },
    ],
  },
  {
    id: 6,
    type: "choice",
    prompt: "Biology, from the lecture’s word roots, is the:",
    choices: [
      { id: "A", label: "Study of houses" },
      { id: "B", label: "Study of life" },
      { id: "C", label: "Study of atoms only" },
      { id: "D", label: "Culture of faith" },
    ],
  },
  {
    id: 7,
    type: "choice",
    prompt: "Ecology is the scientific study of:",
    choices: [
      { id: "A", label: "Only plants" },
      { id: "B", label: "Organisms and their environment (“the house”)" },
      { id: "C", label: "Fossils only" },
      { id: "D", label: "The nervous system" },
    ],
  },
  {
    id: 8,
    type: "choice",
    prompt: "Qualitative data are best described as:",
    choices: [
      { id: "A", label: "Numbers that can be measured" },
      { id: "B", label: "Descriptions that can be observed but not measured" },
      { id: "C", label: "Only temperatures and weights" },
      { id: "D", label: "Peer-reviewer comments" },
    ],
  },
  {
    id: 9,
    type: "choice",
    prompt: "The independent variable in an experiment is:",
    choices: [
      { id: "A", label: "What you measure" },
      { id: "B", label: "What you change or test" },
      { id: "C", label: "What you keep constant" },
      { id: "D", label: "The control group itself" },
    ],
  },
  {
    id: 10,
    type: "choice",
    prompt: "True or false: Science never proves anything; it can only support or reject hypotheses.",
    choices: [
      { id: "A", label: "True" },
      { id: "B", label: "False" },
    ],
  },
  {
    id: 11,
    type: "choice",
    prompt: "A control group:",
    choices: [
      { id: "A", label: "Receives every element of the experiment except the factor being tested" },
      { id: "B", label: "Is the only group that gets the independent variable" },
      { id: "C", label: "Must use qualitative data only" },
      { id: "D", label: "Proves the hypothesis" },
    ],
  },
  {
    id: 12,
    type: "choice",
    prompt: "A scientific law, as distinguished from a theory in lecture:",
    choices: [
      { id: "A", label: "Explains why a pattern occurs" },
      { id: "B", label: "Describes a consistent pattern but does not explain it" },
      { id: "C", label: "Is just a guess" },
      { id: "D", label: "Comes from a single experiment (a “principal”)" },
    ],
  },
  {
    id: 13,
    type: "choice",
    prompt: "Deductive reasoning is:",
    choices: [
      { id: "A", label: "Small observations → general conclusion" },
      { id: "B", label: "A general law or theory used to predict specific results (big → small)" },
      { id: "C", label: "Unfalsifiable belief" },
      { id: "D", label: "Serendipity" },
    ],
  },
  {
    id: 14,
    type: "choice",
    prompt: "Fleming’s discovery of penicillin is lecture’s example of:",
    choices: [
      { id: "A", label: "A law of gravity" },
      { id: "B", label: "Serendipity followed by scientific investigation" },
      { id: "C", label: "Deductive climate modeling" },
      { id: "D", label: "A hypothesis that cannot be tested" },
    ],
  },
  {
    id: 15,
    type: "choice",
    prompt: "The classroom hometown survey (77% “city”) failed as a test of the world-population claim mainly because:",
    choices: [
      { id: "A", label: "The hypothesis was not falsifiable" },
      { id: "B", label: "The sample is not representative of the world" },
      { id: "C", label: "No data were collected" },
      { id: "D", label: "Cities cannot be defined" },
    ],
  },
  {
    id: 16,
    type: "short",
    prompt: "Explain the difference between a scientific theory and a scientific law.",
    placeholder: "Theory explains; law describes…",
  },
  {
    id: 17,
    type: "short",
    prompt:
      "Why is “There is an invisible, heatless, incorporeal dragon in my office” not a scientific hypothesis?",
    placeholder: "Not testable / not falsifiable",
  },
  {
    id: 18,
    type: "short",
    prompt: "List the main steps of the scientific method in the order given in lecture.",
    placeholder: "Observation → question → …",
  },
  {
    id: 19,
    type: "short",
    prompt:
      "You notice front-row students tend to get higher grades. Write a testable hypothesis and name a possible independent variable, dependent variable, and one controlled variable.",
    placeholder: "Hypothesis; IV; DV; control",
  },
  {
    id: 20,
    type: "short",
    prompt:
      "Using the parable of the black sheep: why is “all sheep in Scotland are black” not good science, and how would a careful scientist phrase the conclusion?",
    placeholder: "Overgeneralization; limited claim",
  },
];

const LEC3: Question[] = [
  {
    id: 1,
    type: "choice",
    prompt: "According to lecture, the most reliable source of valid scientific information is:",
    choices: [
      { id: "A", label: "Wikipedia" },
      { id: "B", label: "Peer-reviewed journals" },
      { id: "C", label: "Social media" },
      { id: "D", label: "News talk radio" },
    ],
  },
  {
    id: 2,
    type: "choice",
    prompt: "About what fraction of submitted papers are typically rejected, per lecture?",
    choices: [
      { id: "A", label: "About 10%" },
      { id: "B", label: "About 70%" },
      { id: "C", label: "About 5%" },
      { id: "D", label: "None — all are accepted" },
    ],
  },
  {
    id: 3,
    type: "choice",
    prompt: "IMRaD stands for:",
    choices: [
      { id: "A", label: "Idea, Model, Review, and Data" },
      { id: "B", label: "Introduction, Methods, Results, and Discussion" },
      { id: "C", label: "Index, Methods, References, and Diagrams" },
      { id: "D", label: "Inquiry, Measurement, Results, and Deduction" },
    ],
  },
  {
    id: 4,
    type: "choice",
    prompt: "A review paper, unlike a typical research article:",
    choices: [
      { id: "A", label: "Always includes new original experiments" },
      { id: "B", label: "Does not follow IMRaD; it summarizes many papers on a topic" },
      { id: "C", label: "Has no abstract" },
      { id: "D", label: "Is never peer reviewed" },
    ],
  },
  {
    id: 5,
    type: "choice",
    prompt: "To count as alive in this course, an entity must meet:",
    choices: [
      { id: "A", label: "Any one of the eight criteria" },
      { id: "B", label: "All eight criteria for life" },
      { id: "C", label: "Only reproduction" },
      { id: "D", label: "Only evolution" },
    ],
  },
  {
    id: 6,
    type: "choice",
    prompt: "Homeostasis is:",
    choices: [
      { id: "A", label: "Response to stimuli (irritability)" },
      { id: "B", label: "Maintenance of internal constancy" },
      { id: "C", label: "Growth and development" },
      { id: "D", label: "The biosphere" },
    ],
  },
  {
    id: 7,
    type: "choice",
    prompt: "The biosphere is:",
    choices: [
      { id: "A", label: "One population of one species" },
      { id: "B", label: "The total area of Earth’s surface, subsurface, and atmosphere where living things exist" },
      { id: "C", label: "Only tropical rainforests" },
      { id: "D", label: "A single cell" },
    ],
  },
  {
    id: 8,
    type: "choice",
    prompt: "Scientists do not consider viruses living, according to lecture, because they:",
    choices: [
      { id: "A", label: "Have nuclei" },
      { id: "B", label: "Are not made of cells" },
      { id: "C", label: "Use energy" },
      { id: "D", label: "Evolve" },
    ],
  },
  {
    id: 9,
    type: "choice",
    prompt: "Prokaryotes:",
    choices: [
      { id: "A", label: "Have DNA in a nucleus and many membrane-bound organelles" },
      { id: "B", label: "Have no nucleus and no membrane-bound organelles" },
      { id: "C", label: "Are always 10–100 microns" },
      { id: "D", label: "Are viruses" },
    ],
  },
  {
    id: 10,
    type: "choice",
    prompt: "A community is:",
    choices: [
      { id: "A", label: "All individuals of one species in an area at a given time" },
      { id: "B", label: "All populations in an area at a given time (living components)" },
      { id: "C", label: "Biotic plus abiotic components" },
      { id: "D", label: "A single organ system" },
    ],
  },
  {
    id: 11,
    type: "choice",
    prompt: "An ecosystem includes:",
    choices: [
      { id: "A", label: "Only biotic components" },
      { id: "B", label: "All biotic and abiotic components of an environment" },
      { id: "C", label: "Only abiotic components" },
      { id: "D", label: "One organism" },
    ],
  },
  {
    id: 12,
    type: "choice",
    prompt: "Abiotic means:",
    choices: [
      { id: "A", label: "Living" },
      { id: "B", label: "Non-living" },
      { id: "C", label: "Cellular" },
      { id: "D", label: "Peer reviewed" },
    ],
  },
  {
    id: 13,
    type: "choice",
    prompt: "Evolution, as defined in lecture, is:",
    choices: [
      { id: "A", label: "Change in one organism during its lifetime" },
      { id: "B", label: "Gradual change in a population over time" },
      { id: "C", label: "The appearance of a phylogenetic tree" },
      { id: "D", label: "Only fossil collection" },
    ],
  },
  {
    id: 14,
    type: "choice",
    prompt: "Carl Woese’s RNA work in the 1970s showed:",
    choices: [
      { id: "A", label: "There are only two domains of life" },
      { id: "B", label: "There is a third domain of life" },
      { id: "C", label: "Viruses are cells" },
      { id: "D", label: "Atoms have no electrons" },
    ],
  },
  {
    id: 15,
    type: "choice",
    prompt: "The four elements highlighted as especially important to life are:",
    choices: [
      { id: "A", label: "Na, Cl, Fe, Au" },
      { id: "B", label: "O, C, H, N" },
      { id: "C", label: "He, Ne, Ar, Kr" },
      { id: "D", label: "Ca, P, K, S only" },
    ],
  },
  {
    id: 16,
    type: "choice",
    prompt: "Matter is:",
    choices: [
      { id: "A", label: "Energy with no mass" },
      { id: "B", label: "Any substance that has mass and takes up space" },
      { id: "C", label: "Only living tissue" },
      { id: "D", label: "A hypothesis" },
    ],
  },
  {
    id: 17,
    type: "choice",
    prompt: "The smallest unit of structure and function in living organisms is the:",
    choices: [
      { id: "A", label: "Atom" },
      { id: "B", label: "Organ" },
      { id: "C", label: "Cell" },
      { id: "D", label: "Biosphere" },
    ],
  },
  {
    id: 18,
    type: "choice",
    prompt: "In a phylogenetic tree, a node represents:",
    choices: [
      { id: "A", label: "A journal editor" },
      { id: "B", label: "A speciation event" },
      { id: "C", label: "An abiotic factor" },
      { id: "D", label: "A control group" },
    ],
  },
  {
    id: 19,
    type: "short",
    prompt:
      "Name the eight criteria for life given in lecture.",
    placeholder: "Organization, metabolism, homeostasis…",
  },
  {
    id: 20,
    type: "match",
    prompt: "Match the paper section to its job.",
    items: [
      { key: "1", label: "Abstract" },
      { key: "2", label: "Introduction" },
      { key: "3", label: "Methods" },
      { key: "4", label: "Results" },
    ],
    options: [
      { id: "A", label: "What they did — enough detail to replicate" },
      { id: "B", label: "Quick summary of the whole paper" },
      { id: "C", label: "What they found — numbers and stats" },
      { id: "D", label: "What’s the issue? Background narrowing to this study" },
    ],
  },
];

const LEC4: Question[] = [
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

export const LECTURES: Lecture[] = [
  {
    id: "lec2",
    number: 2,
    title: "Scientific Method & Experimental Design",
    blurb: "Hypothesis, variables, theory vs. law, and why science never “proves.”",
    questions: LEC2,
  },
  {
    id: "lec3",
    number: 3,
    title: "Reporting Science, Life & Organization",
    blurb: "Peer review, IMRaD, criteria for life, cells, and the biological hierarchy.",
    questions: LEC3,
  },
  {
    id: "lec4",
    number: 4,
    title: "Chemical Foundation of Life",
    blurb: "Atoms, bonds, water, pH, and carbon.",
    questions: LEC4,
  },
];

export function formatAnswer(q: Question, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return `${q.id} —`;
  return `${q.id} ${trimmed}`;
}
