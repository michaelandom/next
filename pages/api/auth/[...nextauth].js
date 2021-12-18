import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    // ...add more providers here
  ],
  callbacks:{
      async session({session,token}){
          session.user.tag=session.user.name.split(" ")
          .join("")
          .toLocaleLowerCase();
          session.user.uid=token.sub;
          return session;
      }
  }
})