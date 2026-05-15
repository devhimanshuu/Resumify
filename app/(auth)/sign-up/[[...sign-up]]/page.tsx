import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4">
      <SignUp signInUrl="/sign-in" />
      <p className="text-sm text-muted-foreground mt-2">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
