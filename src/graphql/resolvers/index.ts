import studentResolvers from './student';
import productResolvers from './product';
import categoryResolvers from './category';

const resolvers = {
    Query: {
        ...studentResolvers.Query,
        ...productResolvers.Query,
        ...categoryResolvers.Query
    },
    Mutation: {
        ...studentResolvers.Mutation
    }
}

export default resolvers;