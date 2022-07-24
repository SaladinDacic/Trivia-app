export function QuestionCard({ question }: { question: string }) {
  return (
    <div className="questionCard">
      <h2>{question}</h2>
    </div>
  );
}
