// Ensure you have installed lucide-react
// yarn add lucide-react
import React from 'react';
import { Loader2, LightbulbIcon, Moon, SunMedium, Twitter, Check, Chrome as Google, LucideProps } from 'lucide-react';

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <line x1="3.6" y1="9" x2="20.4" y2="9" />
      <line x1="3.6" y1="15" x2="20.4" y2="15" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
  ),
  spinner: Loader2,
  check: Check,
  google: Google,
};
