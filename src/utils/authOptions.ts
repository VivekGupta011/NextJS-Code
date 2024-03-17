import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { use } from 'react';

let users = [
  {
    id: 1,
    name: 'Jone Doe',
    email: 'mailto:info@codedthemes.com',
    password: '123456'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        // @Final code
        const email = credentials?.email;
        const password = credentials?.password;


        try {
          const user = await axios.post('http://localhost:5000/users/signin', {
            email: email,
            password: password
          });

          console.log("user:::");
          console.log(user);
          if (user) {
            return user
        }
        } catch (e: any) {
          return null;
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        // @ts-ignore
        token.name = token.name;
        token.id = token.sub;
        token.email= token.email;
        // token.accessToken = user.accessToken;
        // token.provider = account?.provider;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log('session');
      console.log(session);

      return session;
    }
  },
  session: {
    strategy: 'jwt'
    // maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  jwt: {
    secret: process.env.NEXT_APP_JWT_SECRET
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
