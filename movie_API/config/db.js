const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://surjit:surjit@cluster0.0k5cr.mongodb.net/Project?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// mongoose.connect("mongodb://localhost:27017/project", { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     useFindAndModify: false, 
//     useCreateIndex: true
// })