'use client';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/icons/AppLogo';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

export default function Login() {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="relative flex size-full min-h-screen flex-col justify-between bg-background text-foreground">
      <header className="bg-background shadow-md">
        <div className="container mx-auto px-4 py-5 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <AppLogo />
            <h1 className="font-headline text-foreground text-3xl font-semibold tracking-tight">NavAI</h1>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 text-center">
        <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="font-headline text-foreground text-3xl font-medium mb-3">Welcome!</h2>
          <p className="text-muted-foreground text-base mb-10">Sign in to get started with your perfect journey.</p>
          <Button
            onClick={signInWithGoogle}
            className="w-full h-auto flex items-center justify-center gap-3 py-3.5 px-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-card transition-colors duration-200 ease-in-out shadow-md hover:shadow-lg"
          >
            <GoogleIcon />
            <span className="font-medium text-base tracking-wide">Sign in with Google</span>
          </Button>
          <p className="text-xs text-muted-foreground mt-8">
            By continuing, you agree to our <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
          </p>
        </div>
      </main>
      <footer className="py-6">
        <p className="text-center text-sm text-muted-foreground">
          NavAI © 2024
        </p>
      </footer>
    </div>
  );
}
