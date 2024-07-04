import SignInButtons from "@/components/sign-in/SignInButtons";

export default function SignIn() {
  return (
    <div className="flex min-h-[650px] flex-col justify-center text-secondary">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1>Hello, Vendor!</h1>
        <h3 className="w-3/4 text-center">
          Before you can start making your own posts, you must sign in with a
          Google account. If this is your first time, you&apos;ll proceed to completing a qualification form.
        </h3>
        <p className="w-3/4 text-center">
          After logging in with Google, you will be asked to complete a form,
          where you will enter your company name, address, and more. Stone
          Clearance is a place for stone suppliers to showcase their clearance
          section and not everybody is eligible.
        </p>
        <div className="">
          <SignInButtons />
        </div>
      </div>
    </div>
  );
}
