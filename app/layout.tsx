import "./globals.css";
import Nav from "./Nav";
import QueryWrapper from "./QueryWrapper";
import AuthContext from "./auth/AuthContext";

export const metadata = {
  title: "Chirp",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="mx-4 bg-gray-200 md:mx-48 xl:mx-96">
        <QueryWrapper>
          <AuthContext>
            {/* @ts-expect-error */}
            <Nav />
            {children}
          </AuthContext>
        </QueryWrapper>
      </body>
    </html>
  );
}
