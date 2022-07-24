import axios from "axios";
export async function getQuestions() {
  const response = await axios.get(
    "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
  );
  return response.data;
}
