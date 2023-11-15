module.exports = (mongoose) =>{
    const schema = mongoose.Schema(
        {
            userName: String,
            accountNumber: String,
            emailAddress: String,
            identityNumber: String
        },
        {
            timestamps: true
        }
    );
    

    //to change _id be id only, and make it easy (for look )
    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    


    //(database_name(table name), schema)
    // Create a Mongoose model for the "users" collection based on the schema
    const User = mongoose.model("users", schema);

    return User

    // Now, you can use the "User" model to interact with the "users" collection in MongoDB




    
    /***    mongoose: This is the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher-level abstraction for interacting with MongoDB.

    .model(): This is a method provided by Mongoose to create a model. A Mongoose model is a constructor function that has a pre-defined schema, and it represents a collection in the MongoDB database.

    "users": This is the name of the MongoDB collection. In MongoDB, a collection is similar to a table in relational databases. It's where documents (data) are stored.

    schema: This is the schema that defines the structure of the documents in the "users" collection. A schema in Mongoose specifies the fields, types, and other properties of the documents that can be stored in the collection. */
}