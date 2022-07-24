import { HeaderQuote, QuestionCard } from "../../components";
import { Link } from "react-router-dom";

export function QuizScreen({
  headerQuote,
  quoteBody,
  updateQuestion,
  isEnd,
  pageIdx,
  setAnswer,
}: {
  headerQuote: string;
  quoteBody: string;
  updateQuestion: () => void;
  isEnd: boolean;
  pageIdx: number;
  setAnswer: (newVal: boolean) => void;
}) {
  return (
    <div className="quizScreen">
      <HeaderQuote quote={headerQuote} />
      <QuestionCard question={quoteBody} />
      <p>
        {isEnd ? (
          <Link to="/result">See Results</Link>
        ) : (
          <>
            <span
              onClick={() => {
                updateQuestion();
                setAnswer(true);
              }}
            >
              True
            </span>
            <span
              onClick={() => {
                updateQuestion();
                setAnswer(false);
              }}
            >
              False
            </span>
          </>
        )}
      </p>
      <h3>{pageIdx} of 10</h3>
    </div>
  );
}
