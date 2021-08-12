
const mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.set("useNewUrlParser", true)
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)
mongoose.set("useUnifiedTopology", true)
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => { console.log("Establish new connection with url", process.env.DB_CONNECTION) })
  .catch(err => { console.error(err) })

