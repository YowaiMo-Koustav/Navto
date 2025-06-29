'use client';
import Image from 'next/image';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/use-auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AccountModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: {
    name: string;
    email: string;
    photoURL: string;
  };
}

export default function AccountModal({ isOpen, setIsOpen, user }: AccountModalProps) {
  const { signOut } = useAuth();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-card p-6 rounded-2xl shadow-2xl w-full max-w-sm border-0">
        <DialogHeader className="flex flex-row justify-between items-center mb-6 space-y-0">
          <DialogTitle className="font-headline text-xl font-semibold text-foreground">Account</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center mb-6">
          <Image
            alt="User Photo"
            className="w-24 h-24 rounded-full mb-4 border-2 border-primary object-cover"
            width={96}
            height={96}
            src={user.photoURL}
            data-ai-hint="user avatar"
          />
          <p className="font-headline text-xl font-medium text-foreground">{user.name}</p>
          <p className="text-muted-foreground text-sm">{user.email}</p>
        </div>
        <Button
          onClick={signOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 h-auto rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </Button>
      </DialogContent>
    </Dialog>
  );
}
