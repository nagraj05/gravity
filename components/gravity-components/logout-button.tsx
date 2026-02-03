import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";

export default function LogoutButton() {
  const { signOut } = useClerk();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signOut({ redirectUrl: "/" })}
      className="text-destructive hover:text-destructive"
    >
      <LogOut className="w-4 h-4" />
    </Button>
  );
}
