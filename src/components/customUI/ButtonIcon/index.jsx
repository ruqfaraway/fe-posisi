
import { Button } from "@/components/ui/button";
import { AiFillCloseCircle } from "react-icons/ai";

export function ButtonIcon({ onClick = () => {} }) {
  return (
    <Button variant="outline" size="icon" onClick={onClick} className="h-6 w-6">
      <AiFillCloseCircle className="h-4 w-4" />
    </Button>
  );
}
