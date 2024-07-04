import SignInButtons from "@/components/sign-in/SignInButtons";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center w-full text-secondary">
        <h1>Step #1: Register</h1>
      <SignInButtons />
    </div>
  );
}
