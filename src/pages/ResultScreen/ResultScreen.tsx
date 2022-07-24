import { AnswerList, GameStarter, HeaderQuote } from "../../components";

export function ResultScreen({
  headerQuote,
  resultBody,
  startOver,
}: {
  headerQuote: string;
  resultBody: { success: boolean; question: string }[];
  startOver?: () => void;
}) {
  const currentPage = "result";

  return (
    <div className="resultScreen">
      <HeaderQuote quote={headerQuote} />
      <h1>{"1"} of 10</h1>
      <AnswerList resultBody={resultBody} />
      <GameStarter currentPage={currentPage} startOver={startOver} />
    </div>
  );
}
