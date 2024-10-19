// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";

// Fake users database for demonstration
const users = [];

export default NextAuth({
  providers: [
    // Google provider
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // GitHub provider
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Credentials provider for email/password
    Providers.Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        
        // Check if the user exists in your database
        const user = users.find((u) => u.email === email);
        if (!user) {
          throw new Error("No user found with this email.");
        }

        // Verify the password using bcryptjs
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid credentials.");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  // Redirect based on authentication success/failure
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login", // Redirect to login on error
  },
  session: {
    jwt: true, // Use JSON Web Tokens for session handling
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.id = token.id;
      return session;
    },
  },
});
