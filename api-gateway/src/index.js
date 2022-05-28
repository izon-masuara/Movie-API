import { ApolloServer, gql } from 'apollo-server';
import axios from "axios";
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

    type Image {
        _id : ID!,
        filename : String
    }

    type Movie {
        _id : ID!
        data : Data,
        image : [Image] ,
        like : [Int]
    }

    type Query {
        user : String,
        movies : [Movie]
    }
`;

let user = ""
let movie = null

const resolvers = {
    Query: {
        async user() {
            try {
                const { data } = await axios.post("http://localhost:3001/login", {
                    email: "test@gmail.com",
                    password: "test1234"
                })
                user = data.access_token
                return user
            } catch (error) {
                console.log(error)
            }
        },
        async movies() {
            try {
                const { data } = await axios.get("http://localhost:3000")
                movie = data
                return movie
            } catch (err) {
                console.log(err)
            }
        }
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});