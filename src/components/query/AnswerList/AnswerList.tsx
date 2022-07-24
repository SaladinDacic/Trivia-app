export function AnswerList({
  resultBody,
}: {
  resultBody: { success: boolean; question: string }[];
}) {
  var list;
  list = resultBody.map(
    (result: { success: boolean; question: string }, i: number) => (
      <div className="answerList__container" key={i}>
        <p className="answerList__container--success">
          {result.success ? "+" : "-"}
        </p>
        <p className="answerList__container--answer" key={i}>
          {result.question}
        </p>
      </div>
    )
  );
  return <div className="answerList">{list}</div>;
}
