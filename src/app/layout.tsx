import { metadata } from './client-layout'; // We will use metadata from a client-side component
import ClientLayout from './client-layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Layout rendered"); // Debugging log

  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
