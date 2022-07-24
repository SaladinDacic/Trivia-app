export function incrementedIdx(idx: number): number {
  return ++idx;
}
export function isLastElement(idx: number, length: number): boolean {
  return idx > length - 1;
}
export function formatedQuestion(str: string): string {
  return str
    .replace(/&quot;/gi, "'")
    .replace(/&Aring;/gi, "Å ")
    .replace(/&#039;/gi, "'")
    .replace(/&ldquo;/gi, '"')
    .replace(/&ocirc;/gi, "ô")
    .replace(/&rdquo;/gi, '""');
}
export function formatAnswers(
  answers: boolean[],
  recivedData: any
): {
  success: boolean;
  question: string;
}[] {
  return answers
    .map((value: boolean, index: number) => {
      return value === (recivedData?.results[index].correct_answer === "True");
    })
    .map(
      (
        success: boolean,
        index: number
      ): { success: boolean; question: string } => {
        return { success, question: recivedData?.results[index].question };
      }
    );
}