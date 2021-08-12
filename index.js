if(process.env.NODE_ENV === 'production')
  require('./public')

else
  require('./src/server/server')
