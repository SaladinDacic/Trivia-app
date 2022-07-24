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
  const resultNumber = resultBody.reduce((acc, objVal, i): number => {
    return (acc = objVal.success ? acc + 1 : acc + 0);
  }, 0);
  return (
    <div className="resultScreen">
      <HeaderQuote quote={headerQuote} />
      <h1>{resultNumber} of 10</h1>
      <AnswerList resultBody={resultBody} />
      <GameStarter currentPage={currentPage} startOver={startOver} />
    </div>
  );
}
