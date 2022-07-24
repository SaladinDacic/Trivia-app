import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getQuestions } from "./api";
import {
  incrementedIdx,
  formatedQuestion,
  formatAnswers,
  isLastElement,
} from "./utilities";
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
  //============================

  //home page
  const homeHeader = "Welcome to the Trivia Challenge!";
  const homeBody = "You will be presented with 10 True or False questions.";
  //============================

  //quiz page
  const quizBody = questionObj?.question;
  function updateQuestion(): void {
    const idx = incrementedIdx(questionObj?.idx);
    let question;

    question = recivedData?.results[idx]
      ? formatedQuestion(recivedData?.results[idx].question)
      : question;

    if (isLastElement(idx, recivedData?.results.length)) {
      setIsEnd(true);
      setResult(formatAnswers(answers, recivedData));
    } else {
      setQuestionObj({ question, idx });
      setQuizHeader(recivedData?.results[idx].category);
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
  }
  //============================
  useEffect(() => {
    !recivedData
      ? getAndInitializeData(setRecivedData, setQuestionObj, setQuizHeader)
      : console.log("here is data");
    console.log(recivedData);
  }, [recivedData]);
  //============================

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
              pageIdx={questionObj?.idx + 1}
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
