// /app/layout.tsx
import './styles/globals.css';  // Add any global styles here

export const metadata = {
    title: 'Travel Planner',
    description: 'Plan your dream trip!',
  };
  
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    console.log("Layout rendered"); // Debugging log
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  
