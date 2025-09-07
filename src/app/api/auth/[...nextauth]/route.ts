import NextAuth, {NextAuthOptions} from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions : NextAuthOptions ={

    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
            authorization:{
                params: {
                    prompt:"consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),

    ],
  

}
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}