import { ApolloServer } from 'apollo-server';

import { createContext } from './context';
import { schema } from './schema';

export default new ApolloServer({
	schema,
	context: createContext,
	playground: true,
}).getMiddleware();
