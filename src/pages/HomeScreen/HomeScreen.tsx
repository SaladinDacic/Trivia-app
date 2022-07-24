import { GameStarter, HeaderQuote } from "../../components";

export function HomeScreen({
  headerQuote,
  homeBody,
}: {
  headerQuote: string;
  homeBody: string;
}) {
  const currentPage = "home";
  return (
    <div className="homeScreen">
      <HeaderQuote quote={headerQuote} />
      <h2>{homeBody}</h2>
      <h2 className="homeScreen__question">Can you score 100%</h2>
      <GameStarter currentPage={currentPage} />
    </div>
  );
}
