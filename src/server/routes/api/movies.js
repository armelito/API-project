const express = require('express')
const Joi = require('joi')
const httpStatus = require('../../utils/httpStatus')
const Movie = require('../../classes/Movie')

let movies = []
let genres = []

moviesRoutes = () => 
{
  const router = express.Router()

  router.get('/', getMovies)
  router.post('/', postMovies)

  router.get('/movie/:id', getMovie)

  router.get('/genres', getGenres)
  router.post('/genres', postGenres)

  router.get('/genres/:genre', getGenre)

  return router
}

async function getMovies(req, res) 
{
  res.status(httpStatus.OK).send(movies)
}

async function postMovies(req, res) 
{
  const { error } = validateMovie(req.body)

  const post = new Promise((resolve, reject) => 
  {
    if(error)
    {
      reject(error.details[0].message)
    }
    else if(res.status(httpStatus.OK))
    { 
      const { movie } = new Movie(
        {
          id: movies.length + 1,
          title: req.body.title,
          description: req.body.description,
          duration: req.body.duration,
          genre: req.body.genre
        }
      )
      movies.push(movie)
      resolve(movies)
    }
  })

  post
  .then(result => { res.send(result) })
  .catch(err => { res.status(httpStatus.BAD_REQUEST).send(err) })
}

async function getMovie(req, res) 
{
  const movie = movies.find(element => element.id === parseInt(req.params.id))

  if(!movie) return res.status(httpStatus.NOT_FOUND).send('Movie not found')

  res.send(movie)
}

async function getGenres(req, res) 
{ 
  if(movies.length > 0) 
  {
    for(const movie of movies)
    {
      if(genres.lenght === 0) 
      {
        genres.push({ genre: movie.genre })
      }
      
      else
      {
        const genre = genres.find(element => movie.genre === element.genre)

        if(!genre) genres.push({ genre: movie.genre })
      }
    }
  }

  res.status(httpStatus.OK).send(genres)
}

async function postGenres(req, res) 
{  
  const { error } = validateGenre(req.body)

  const post = new Promise((resolve, reject) => 
  {
    if(error)
    {
      reject(error.details[0].message)
    }

    else if(res.status(httpStatus.OK))
    {
      const genre = genres.find(element => element.genre === req.body.genre)

      if(genre)
      {
        reject('Genre already exists')
      }

      else if(!genre)
      {
        genres.push({ genre: req.body.genre })
        resolve(genres)
      }
    }
  })

  post
  .then(result => { res.send(result) })
  .catch(err => { res.status(httpStatus.BAD_REQUEST).send(err) })
}

async function getGenre(req, res) 
{
  const genre = genres.find(element => element.genre === req.params.genre)

  if(!genre) return res.status(httpStatus.NOT_FOUND).send('Genre not found')

  else if(genre)
  {
    let elements = []

    for(const movie of movies)
    {
      if(movie.genre === req.params.genre) elements.push(movie)
    }

    if(elements.length === 0) return res.send('No movies')

    res.send(elements)
  }
}

function validateMovie(movie)
{
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    duration: Joi.string().min(4).required(),
    genre: Joi.string().min(3).required()
  })
  
  return schema.validate(movie)
}

function validateGenre(genre)
{
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  })
  
  return schema.validate(genre)
}

module.exports = moviesRoutes