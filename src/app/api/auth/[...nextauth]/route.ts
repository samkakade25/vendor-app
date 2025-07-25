import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub; // Ensure user ID is added to the session
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.sub = profile?.sub || token.sub;
      }
      return token;
    },
  },
  debug: true, // Enable debug mode for detailed logs
};

// Use NextAuth with the authOptions
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
