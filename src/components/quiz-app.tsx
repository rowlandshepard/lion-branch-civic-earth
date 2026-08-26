import { useMemo, useState } from "react";
import { ChevronLeft, ClipboardCopy, RotateCcw } from "lucide-react";
import { QUESTIONS, formatAnswer, type Question } from "@/data/questions";
import { cn } from "@/lib/cn";

type Answers = Record<number, string>;

type Stage = "start" | "quiz" | "done";

export function QuizApp() {
  const [stage, setStage] = useState<Stage>("start");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [copied, setCopied] = useState(false);

  const question = QUESTIONS[index];
  const progress = ((index + (stage === "done" ? 1 : 0)) / QUESTIONS.length) * 100;
  const currentValue = question ? (answers[question.id] ?? "") : "";
  const canAdvance = canSubmit(question, currentValue);

  const lines = useMemo(
    () => QUESTIONS.map((q) => formatAnswer(q, answers[q.id] ?? "")),
    [answers],
  );

  function setCurrent(value: string) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function next() {
    if (!canAdvance) return;
    if (index >= QUESTIONS.length - 1) {
      setStage("done");
      return;
    }
    setIndex((i) => i + 1);
  }

  function back() {
    if (index === 0) {
      setStage("start");
      return;
    }
    setIndex((i) => i - 1);
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setCopied(false);
    setStage("start");
  }

  async function copyList() {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="paper-grain min-h-dvh">
      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-teal uppercase">
              BIOL 1414
            </p>
            <h1 className="font-display text-2xl leading-tight font-medium tracking-tight text-navy sm:text-3xl">
              Lecture 4 Quiz
            </h1>
          </div>
          {stage !== "start" ? (
            <p className="font-mono text-sm text-muted tabular-nums">
              {stage === "done" ? "Done" : `${index + 1} / ${QUESTIONS.length}`}
            </p>
          ) : null}
        </header>

        {stage !== "start" ? (
          <div
            className="mb-6 h-1 overflow-hidden rounded-full bg-line"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-teal transition-[width] duration-200"
              style={{ width: `${stage === "done" ? 100 : progress}%` }}
            />
          </div>
        ) : null}

        {stage === "start" ? (
          <StartCard onStart={() => setStage("quiz")} />
        ) : stage === "done" ? (
          <ResultsCard
            lines={lines}
            copied={copied}
            onCopy={copyList}
            onRestart={restart}
          />
        ) : question ? (
          <QuestionCard
            question={question}
            value={currentValue}
            onChange={setCurrent}
            onBack={back}
            onNext={next}
            canAdvance={canAdvance}
            isLast={index === QUESTIONS.length - 1}
          />
        ) : null}
      </div>
    </div>
  );
}

function StartCard({ onStart }: { onStart: () => void }) {
  return (
    <section className="rounded-xl border border-line bg-surface p-6 shadow-[0_12px_40px_-24px_rgba(27,54,93,0.45)] sm:p-8">
      <p className="font-display text-xl text-navy">Chemical Foundation of Life</p>
      <p className="mt-3 max-w-prose text-muted">
        Twenty questions, one at a time. Your answers are kept on this page only.
        The last screen is a simple numbered list — <span className="font-mono text-ink">1 A</span>,{" "}
        <span className="font-mono text-ink">2 C</span>, and so on.
      </p>
      <ul className="mt-6 space-y-2 text-sm text-ink">
        <li>Multiple choice records the letter.</li>
        <li>True / false uses A = True, B = False.</li>
        <li>Short answers record the text you type.</li>
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 text-sm font-medium text-surface transition-opacity duration-150 hover:opacity-90"
      >
        Begin
      </button>
    </section>
  );
}

function ResultsCard({
  lines,
  copied,
  onCopy,
  onRestart,
}: {
  lines: string[];
  copied: boolean;
  onCopy: () => void;
  onRestart: () => void;
}) {
  return (
    <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-display text-2xl text-navy">Your answers</h2>
      <p className="mt-1 text-sm text-muted">Simple list — question number, then your answer.</p>
      <ol className="mt-6 space-y-1 font-mono text-base leading-relaxed text-ink">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-navy px-4 text-sm font-medium text-surface"
        >
          <ClipboardCopy className="size-4" strokeWidth={1.75} />
          {copied ? "Copied" : "Copy list"}
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-bg px-4 text-sm font-medium text-navy"
        >
          <RotateCcw className="size-4" strokeWidth={1.75} />
          Start over
        </button>
      </div>
    </section>
  );
}

function QuestionCard({
  question,
  value,
  onChange,
  onBack,
  onNext,
  canAdvance,
  isLast,
}: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
  canAdvance: boolean;
  isLast: boolean;
}) {
  return (
    <section className="flex flex-1 flex-col rounded-xl border border-line bg-surface p-5 sm:p-8">
      <p className="font-mono text-xs tracking-wide text-teal uppercase">
        Question {question.id}
      </p>
      <h2 className="mt-2 font-display text-xl leading-snug font-medium text-navy sm:text-2xl">
        {question.prompt}
      </h2>

      <div className="mt-6 flex-1">
        {question.type === "choice" ? (
          <ChoiceList
            name={`q-${question.id}`}
            choices={question.choices}
            value={value}
            onChange={onChange}
          />
        ) : null}
        {question.type === "short" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            rows={5}
            className="w-full resize-y rounded-md border border-line bg-bg px-3 py-3 text-base text-ink outline-none ring-teal/40 placeholder:text-muted focus:ring-2"
          />
        ) : null}
        {question.type === "match" ? (
          <MatchList question={question} value={value} onChange={onChange} />
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center gap-1 rounded-md px-2 text-sm font-medium text-muted hover:text-navy"
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} />
          Back
        </button>
        <button
          type="button"
          disabled={!canAdvance}
          onClick={onNext}
          className={cn(
            "inline-flex min-h-11 min-w-28 items-center justify-center rounded-md px-5 text-sm font-medium text-surface",
            canAdvance ? "bg-teal" : "bg-muted",
          )}
        >
          {isLast ? "Finish" : "Next"}
        </button>
      </div>
    </section>
  );
}

function ChoiceList({
  name,
  choices,
  value,
  onChange,
}: {
  name: string;
  choices: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-2" role="radiogroup" aria-label="Choices">
      {choices.map((choice) => {
        const selected = value === choice.id;
        return (
          <label
            key={choice.id}
            className={cn(
              "flex min-h-11 cursor-pointer items-start gap-3 rounded-md border px-3 py-3 transition-colors duration-150",
              selected
                ? "border-teal bg-[color-mix(in_oklab,var(--color-teal)_8%,white)]"
                : "border-line bg-bg hover:border-navy/30",
            )}
          >
            <input
              type="radio"
              name={name}
              value={choice.id}
              checked={selected}
              onChange={() => onChange(choice.id)}
              aria-label={`${choice.id}. ${choice.label}`}
              className="mt-1 size-4 accent-teal"
            />
            <span className="font-mono text-sm font-medium text-navy">{choice.id}.</span>
            <span className="text-sm leading-snug text-ink sm:text-base">{choice.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function MatchList({
  question,
  value,
  onChange,
}: {
  question: Extract<Question, { type: "match" }>;
  value: string;
  onChange: (value: string) => void;
}) {
  const parsed = parseMatch(value, question.items.map((i) => i.key));

  function update(key: string, letter: string) {
    const next = { ...parsed, [key]: letter };
    const compact = question.items
      .map((item) => `${item.key}${next[item.key] ?? ""}`)
      .filter((pair) => pair.length > 1)
      .join(",");
    onChange(compact);
  }

  return (
    <div className="space-y-4">
      {question.items.map((item) => (
        <div key={item.key} className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="text-sm text-ink">
            <span className="font-mono text-navy">{item.key}.</span> {item.label}
          </p>
          <select
            value={parsed[item.key] ?? ""}
            onChange={(e) => update(item.key, e.target.value)}
            className="min-h-11 rounded-md border border-line bg-bg px-3 text-sm text-ink outline-none ring-teal/40 focus:ring-2"
          >
            <option value="">Select</option>
            {question.options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.id}. {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

function parseMatch(value: string, keys: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of keys) out[key] = "";
  if (!value) return out;
  for (const chunk of value.split(",")) {
    const m = chunk.trim().match(/^(\d+)([A-D])$/i);
    if (m && m[1] && m[2]) out[m[1]] = m[2].toUpperCase();
  }
  return out;
}

function canSubmit(question: Question | undefined, value: string): boolean {
  if (!question) return false;
  if (question.type === "choice") return value.length > 0;
  if (question.type === "short") return value.trim().length > 0;
  const parsed = parseMatch(value, question.items.map((i) => i.key));
  return question.items.every((item) => Boolean(parsed[item.key]));
}
