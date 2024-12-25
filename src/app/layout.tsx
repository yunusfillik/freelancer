"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4">
              <h1 className="text-2xl font-bold text-center">Freelancer Dashboard</h1>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4">{children}</main>

            {/* Footer */}
            <footer className="bg-blue-600 text-white text-center p-4">
              &copy; {new Date().getFullYear()} Freelancer Dashboard
            </footer>
          </div>
        </body>
      </html>
    </Provider>
  );
}