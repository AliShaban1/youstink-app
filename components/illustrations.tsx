"use client";

export const NoseHero = () => (
  <svg viewBox="0 0 120 140" width="120" height="140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto 32px" }}>
    <path d="M60 12 C58 12, 52 30, 48 58 C44 80, 36 96, 32 104 C28 112, 36 126, 52 126 C56 126, 58 124, 60 122 C62 124, 64 126, 68 126 C84 126, 92 112, 88 104 C84 96, 76 80, 72 58 C68 30, 62 12, 60 12Z"
      stroke="#1a1a18" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <ellipse cx="48" cy="110" rx="9" ry="6" stroke="#1a1a18" strokeWidth="2" fill="none" />
    <ellipse cx="72" cy="110" rx="9" ry="6" stroke="#1a1a18" strokeWidth="2" fill="none" />
    <path d="M26 50 C22 44, 18 50, 14 44" stroke="#c8c4bc" strokeWidth="1.8" strokeLinecap="round" fill="none">
      <animate attributeName="d" values="M26 50 C22 44, 18 50, 14 44;M26 46 C22 40, 18 46, 14 40;M26 50 C22 44, 18 50, 14 44" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
    </path>
    <path d="M94 50 C98 44, 102 50, 106 44" stroke="#c8c4bc" strokeWidth="1.8" strokeLinecap="round" fill="none">
      <animate attributeName="d" values="M94 50 C98 44, 102 50, 106 44;M94 46 C98 40, 102 46, 106 40;M94 50 C98 44, 102 50, 106 44" dur="3.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
    </path>
    <path d="M20 68 C16 62, 12 68, 8 62" stroke="#d8d4cc" strokeWidth="1.5" strokeLinecap="round" fill="none">
      <animate attributeName="d" values="M20 68 C16 62, 12 68, 8 62;M20 64 C16 58, 12 64, 8 58;M20 68 C16 62, 12 68, 8 62" dur="4s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
    </path>
    <path d="M100 68 C104 62, 108 68, 112 62" stroke="#d8d4cc" strokeWidth="1.5" strokeLinecap="round" fill="none">
      <animate attributeName="d" values="M100 68 C104 62, 108 68, 112 62;M100 64 C104 58, 108 64, 112 58;M100 68 C104 62, 108 68, 112 62" dur="3.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.8s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const NoseSmall = () => (
  <svg viewBox="0 0 60 70" width="28" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 6 C29 6, 26 15, 24 29 C22 40, 18 48, 16 52 C14 56, 18 63, 26 63 C28 63, 29 62, 30 61 C31 62, 32 63, 34 63 C42 63, 46 56, 44 52 C42 48, 38 40, 36 29 C34 15, 31 6, 30 6Z"
      stroke="#1a1a18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="24" cy="55" rx="4.5" ry="3" stroke="#1a1a18" strokeWidth="1.4" />
    <ellipse cx="36" cy="55" rx="4.5" ry="3" stroke="#1a1a18" strokeWidth="1.4" />
  </svg>
);

export const FunnyIcon = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="#1a1a18" strokeWidth="2" />
    <path d="M14 18 L18 21 L14 24" stroke="#1a1a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 18 L30 21 L34 24" stroke="#1a1a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 30 C18 37, 30 37, 33 30" stroke="#1a1a18" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M12 24 C11 27, 10 29, 11 30" stroke="#9e9a92" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const KindIcon = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40 C16 34, 4 26, 4 16 C4 10, 9 5, 14 5 C18 5, 21 7, 24 12 C27 7, 30 5, 34 5 C39 5, 44 10, 44 16 C44 26, 32 34, 24 40Z"
      stroke="#1a1a18" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 36 C18 31, 8 24, 8 16 C8 12, 11 8, 14 8"
      stroke="#d8d4cc" strokeWidth="1.2" strokeLinecap="round" fill="none" />
  </svg>
);

export const SendingNose = () => (
  <svg viewBox="0 0 80 90" width="72" height="82" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto 24px" }}>
    <path d="M40 6 C39 6, 35 18, 32 38 C30 52, 24 62, 22 68 C20 74, 24 84, 34 84 C37 84, 39 82, 40 80 C41 82, 43 84, 46 84 C56 84, 60 74, 58 68 C56 62, 50 52, 48 38 C46 18, 41 6, 40 6Z"
      stroke="#1a1a18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="32" cy="72" rx="6" ry="4" stroke="#1a1a18" strokeWidth="1.5" />
    <ellipse cx="48" cy="72" rx="6" ry="4" stroke="#1a1a18" strokeWidth="1.5" />
    <circle cx="12" cy="36" r="3" fill="none" stroke="#c8c4bc" strokeWidth="1.2">
      <animate attributeName="r" values="2;6;2" dur="1.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="68" cy="36" r="3" fill="none" stroke="#c8c4bc" strokeWidth="1.2">
      <animate attributeName="r" values="2;6;2" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;0;0.8" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
    </circle>
    <circle cx="8" cy="54" r="2" fill="none" stroke="#d8d4cc" strokeWidth="1">
      <animate attributeName="r" values="1;5;1" dur="2s" begin="0.6s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" begin="0.6s" repeatCount="indefinite" />
    </circle>
    <circle cx="72" cy="54" r="2" fill="none" stroke="#d8d4cc" strokeWidth="1">
      <animate attributeName="r" values="1;5;1" dur="2s" begin="0.9s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" begin="0.9s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export const CheckIcon = () => (
  <svg viewBox="0 0 72 72" width="72" height="72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", margin: "0 auto 28px" }}>
    <circle cx="36" cy="36" r="34" stroke="#1a1a18" strokeWidth="2" fill="#1a1a18" />
    <path d="M22 36 L32 46 L50 26" stroke="#FAFAF7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
