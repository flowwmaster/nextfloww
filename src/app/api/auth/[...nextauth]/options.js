import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import connect from "@/utils/db";

export const options = {
  // secret: process.env.AUTH_SECRET,
  providers: [
    GitHubProvider({
      profile(profile) {
        let userRole = "GitHub User";
        if (profile?.email == "anirudh.bizfloww@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        let userRole = "Google User";
        if (profile?.email == "anirudh.bizfloww@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        await connect();
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();
          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("good pass");
              delete foundUser.password;
              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "github") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email })
            .lean()
            .exec();
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              verified: true,
              role: "User",
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.log("Error in saving user");
          return false;
        }
      }
      if (account?.provider === "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email })
            .lean()
            .exec();
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              verified: true,
              role: "User",
            });
            await newUser.save();
          }
          return true;
        } catch (err) {
          console.log("Error in saving user");
          return false;
        }
      }
    },
  },
};
