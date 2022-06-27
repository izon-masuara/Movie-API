import { ApolloServer, gql } from 'apollo-server';
import axios from "axios";
import { Blob } from 'node:buffer'
import { URL } from 'node:url';
const typeDefs = gql`
    type Production {
        year : String,
        productionBy : String
    }

    type Data {
        title : String,
        description : String,
        production : Production,
        genre : [String]
    }

    type Video {
        _id : ID!,
        filename : String
    }

    type Movie {
        _id : ID!
        data : Data,
        video : [Video] ,
        like : [Int]
    }

    type User {
        email : String,
        password : String,
        status : String,
        expired : String,
        role : String
    }

    type User_Login {
        user_id : Int,
        role : String,
        status : String
    }
    
    type Query {
        user(email:String,password:String) : String
        movies : [Movie]
        movie(id:String,accessToken:String) : User_Login
    }

    type Mutation {
        addUser(
            email : String,
            password : String,
            status : String,
            expired : String,
            role : String
        ):User
    }
    
`;

const userUrl = "http://localhost:3001"
const moviesUrl = "http://localhost:3000"

const resolvers = {
    Query: {
        async movies() {
            try {
                const { data } = await axios.get(moviesUrl)
                return data
            } catch (err) {
                if (err.response === undefined) {
                    return Error('Internal Server Error')
                } else {
                    const { data } = err.response
                    return Error(data)
                }
            }
        },
        async movie(_, args) {
            const { id, accessToken } = args
            try {
                const { data: user } = await axios.get(`${userUrl}/login`, {
                    headers: {
                        accessToken
                    }
                })
                if (user) {
                    return user
                } else {
                    return 'Acess Danied'
                }
            } catch (err) {
                const { data } = err.response
                return data
            }
        },
        async user(_, args) {
            const payload = {
                email: args.email,
                password: args.password
            }
            try {
                const { data } = await axios.post(`${userUrl}/login`, payload)
                return data.access_token
            } catch (err) {
                if (err.response === undefined) {
                    return Error('Internal Server Error')
                } else {
                    const { data } = err.response
                    return Error(data)
                }
            }
        }
    },

    Mutation: {
        async addUser(_, args) {
            const payload = {
                email: args.email,
                password: args.password,
                status: args.status,
                expired: args.expired,
                role: args.role
            }

            try {
                const { data } = await axios.post(`${userUrl}/users`, payload)
                return data
            } catch (err) {
                const { data } = err.response
                return data
            }
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});