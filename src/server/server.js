const app = require('./app')

const PORT = process.env.PORT || 3000
const ENV = process.env.NODE_ENV || "development"

new Promise(resolve => 
{
  const server = app.listen(PORT, () => 
  {
    console.log(`${ENV} Server running on port ${PORT}...`)

    const originalClose = server.close.bind(server)

    server.close = () => 
    {
      return new Promise(resolveClose => 
      {
        originalClose(resolveClose)
      })
    }
  })

  setupCloseOnExit(server)
  resolve(server)
})


function setupCloseOnExit(server)
{
  async function exitHandler(options = {}) 
  {
    await server
      .close()
      .then(() => 
      {
        console.log('Server successfully closed')
      })
      .catch(e => 
      {
        console.warn('Something went wrong closing the server', e.stack)
      })

    if (options.exit) process.exit()
  }

  process.on('exit', exitHandler)
  process.on('SIGINT', exitHandler.bind(null, {exit: true}))
  process.on('SIGUSR1', exitHandler.bind(null, {exit: true}))
  process.on('SIGUSR2', exitHandler.bind(null, {exit: true}))
  process.on('uncaughtException', exitHandler.bind(null, {exit: true}))
}

