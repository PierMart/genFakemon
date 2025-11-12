import React from 'react';

export const PokeballIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 0-10 10h20a10 10 0 0 0-10-10z" fill="currentColor" />
    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none" />
    <path d="M2 12h2.5" />
    <path d="M19.5 12H22" />
  </svg>
);

export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3L9.5 8.5 4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" fill="currentColor" />
    <path d="M5 3l1.5 3L8 7.5 6.5 9 5 12l-1.5-3L2 7.5 3.5 6z" />
    <path d="M16 3l1.5 3L19 7.5 17.5 9 16 12l-1.5-3L13 7.5 14.5 6z" />
  </svg>
);


export const DnaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 14.5A3.5 3.5 0 0 1 7.5 11H10a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2.5A3.5 3.5 0 0 1 4 14.5Z"/>
        <path d="M20 9.5A3.5 3.5 0 0 0 16.5 6H14a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h2.5a3.5 3.5 0 0 0 3.5-3.5Z"/>
        <path d="M10 12v1"/>
        <path d="M14 8v1"/>
        <path d="M7.5 11h-1"/>
        <path d="M17.5 6h-1"/>
    </svg>
);

export const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
);

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor"/>
    </svg>
);