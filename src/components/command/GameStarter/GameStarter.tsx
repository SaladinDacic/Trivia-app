import { Link } from "react-router-dom";
export function GameStarter({
  currentPage,
  startOver,
}: {
  currentPage: string;
  startOver?: () => void;
}) {
  let route;
  let buttonText;
  currentPage === "home" ? (route = "/quiz") : (route = "/");
  currentPage === "home" ? (buttonText = "begin") : (buttonText = "start over");

  return (
    <div className="gameStarter">
      <Link onClick={startOver} to={route}>
        {buttonText.toUpperCase()}
      </Link>
    </div>
  );
}
