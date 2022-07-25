import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getQuestions } from "./api";
import { formatedQuestion, formatAnswers, isLastElement } from "./utilities";
import "./App.scss";
import { HomeScreen, QuizScreen, ResultScreen } from "./pages";

function App() {
  //application states
  const [recivedData, setRecivedData] = useState<any>();
  const [questionObj, setQuestionObj] = useState<any>();
  const [quizHeader, setQuizHeader] = useState(
    recivedData?.results[0].category
  );
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [result, setResult] = useState<
    { success: boolean; question: string }[]
  >([]);
  const [isEnd, setIsEnd] = useState(false);
  const [idx, setIdx] = useState(0);
  //============================

  //home page
  const homeHeader = "Welcome to the Trivia Challenge!";
  const homeBody = "You will be presented with 10 True or False questions.";
  //============================

  //quiz page
  const quizBody = questionObj?.question;
  function updateQuestion(): void {
    let question;
    const newIdx = idx + 1;

    question = recivedData?.results[newIdx]
      ? formatedQuestion(recivedData?.results[newIdx].question)
      : question;

    if (isLastElement(newIdx, recivedData?.results.length)) {
      setIsEnd(true);
    } else {
      setQuestionObj({ question, newIdx });
      setQuizHeader(recivedData?.results[newIdx].category);
      setIdx(newIdx);
    }
  }
  function setAnswer(newVal: boolean) {
    setAnswers((oldArr: boolean[]): boolean[] => {
      return [...oldArr, newVal];
    });
  }
  //============================

  //result page
  const resultHeader = "You scored!";
  function startOver() {
    const question = formatedQuestion(recivedData?.results[0].question);
    setIsEnd(false);
    setAnswers([]);
    setQuizHeader(question);
    setQuestionObj({ question, idx: 0 });
    setIdx(0);
  }
  //============================
  useEffect(() => {
    !recivedData
      ? getAndInitializeData(setRecivedData, setQuestionObj, setQuizHeader)
      : console.log("here is data");
    console.log(recivedData);
  }, [recivedData]);
  //============================
  useEffect(() => {
    console.log(answers);
    setResult(formatAnswers(answers, recivedData));
  }, [answers, recivedData]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={<HomeScreen headerQuote={homeHeader} homeBody={homeBody} />}
        />
        <Route
          path="/quiz"
          element={
            <QuizScreen
              headerQuote={quizHeader}
              quoteBody={quizBody}
              isEnd={isEnd}
              updateQuestion={updateQuestion}
              pageIdx={idx + 1}
              setAnswer={setAnswer}
            />
          }
        />
        <Route
          path="/result"
          element={
            <ResultScreen
              headerQuote={resultHeader}
              startOver={startOver}
              resultBody={result}
            />
          }
        />
      </Routes>
    </div>
  );
}

async function getAndInitializeData(
  setRecivedData: (value: any) => void,
  setQuestionObj: (value: any) => void,
  setQuizHeader: (value: any) => void
) {
  const recivedData = await getQuestions();
  const question = formatedQuestion(recivedData?.results[0].question);
  setRecivedData(recivedData);
  setQuestionObj({ question, idx: 0 });
  setQuizHeader(recivedData.results[0].category);
}

export default App;
