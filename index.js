if(process.env.NODE_ENV === 'production') 
  require('./dist')
  
else 
  require('./src/server/server')