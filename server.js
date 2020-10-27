const express = require('express')
const app = express()

const { users, ROLE } = require('./data')
const projectRouter = require('./routes/projects')
const { authUser, authRole } = require('./basicAuth')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

// MIDDLEWARE
function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
)
