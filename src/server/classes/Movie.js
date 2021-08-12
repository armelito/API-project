class Movie 
{
  constructor(options = {})
  {
    this.movie = {}
    this.create(options)
  }
  
  create(options)
  {
    this.movie = options
  }

  update(options = {})
  {
    if(options.title) this.movie.title = options.title
    if(options.description) this.movie.description = options.description
    if(options.title) this.movie.genre = options.genre
    if(options.title) this.movie.duration = options.duration
  }

  delete()
  {
    
  }
}

module.exports = Movie