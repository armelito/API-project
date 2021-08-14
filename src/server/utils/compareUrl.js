compareUrl = (req, url) =>
{
  if (req.originalUrl === url)
    return true

  else
    return false
}

module.exports = compareUrl
