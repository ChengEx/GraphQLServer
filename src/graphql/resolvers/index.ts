import studentResolvers from './student';
import productResolvers from './product';
import categoryResolvers from './category';

const resolvers = {
    Query: {
        ...studentResolvers.Query,
        ...productResolvers.Query,
        ...categoryResolvers.Query
    },
    
    //,
    // Subscription:{
    //     ...postsResolvers.Subscription
    // }
}

export default resolvers;