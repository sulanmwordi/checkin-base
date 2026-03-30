import type { Metadata } from "next";

import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "CheckIn Base",
  description: "Daily streak mini app on Base",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://checkin-base-plum.vercel.app"),
  other: {
    "base:app_id": "69c9ed3254fba99e37410fe4",
    "base:builder_code": "0x62635f6671636d343038360b0080218021802180218021802180218021",
    "base:builder_code_string": "bc_fqcm4086",
    "base:code_encode_string": "bc_fqcm4086",
    "build:code": "0x62635f6671636d343038360b0080218021802180218021802180218021",
    "encoded:string": "bc_fqcm4086",
    "talentapp:project_verification":
      "5f1509bdc0688db1f24dbafb4a2e0d9349ed9055bf93f054be23dcdea53a44e8d4ee51a8699821d5cefb69f07209679e3c0884dc51fa6878047602c49d25327d",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-shell">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
