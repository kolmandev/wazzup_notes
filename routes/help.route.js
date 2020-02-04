module.exports = ( req, res ) => {
    res.status(200).json({ 
        '/help': {
            description: 'Page of api commands',
            example: 'curl -X GET localhost:3000/help'
        },
        'POST /api/auth/register': {
            description: 'Registering new user. Required JSON params: login, password.',
            example: 'curl -X POST -H "Content-Type: application/json" -d "{\"login\":\"newuser\", \"password\":\"password\"}" localhost:3000/api/auth/register'
        },
        'POST /api/auth/login': {
            description: 'Logging by registered user. Required JSON params: login, password.',
            example: 'curl -X POST -H "Content-Type: application/json" -d "{\"login\":\"newuser\", \"password\":\"password\"}" localhost:3000/api/auth/login'
        },
        'GET /api/auth/logout': {
            description: 'Logout of session. Required JWT token in Authorization header.',
            example: 'curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc" localhost:3000/api/auth/logout'
        },
        'GET /api/notes': {
            description: 'Show all your notes. Authorization is required',
            example: 'curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjd9LCJpYXQiOjE1ODA3OTQ3NzQsImV4cCI6MTU4MDc5ODM3NH0.XS9v6SrwWUFgGKSrqDZTd-nyDX0ZhvcTD-vM2x8coW0" localhost:3000/api/notes'
        },
        'POST /api/notes/create': {
            description: 'Creting new note. Authorization is required. Required JSON params: text and/or shared. Shared is false by default',
            example: 'curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc" -d "{\"text\":\"Hello, this is my new note\", \"shared\":\"true\"}" localhost:3000/api/notes/create'
        },
        'PUT /api/notes/edit/:id': {
            description: 'Change text or shared params for your note by id. Authorization is required. JSON params: text and/or shared',
            example: 'curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc" -d "{\"text\":\"Hello, this is my updated note\"}" localhost:3000/api/notes/edit/1'
        },
        'DELETE /api/notes/delete/:id': {
            description: 'Deleting note from database. Authorization is required.',
            example: 'curl -X DELETE -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOjh9LCJpYXQiOjE1ODA3OTczMTgsImV4cCI6MTU4MDgwMDkxOH0.vjPBpArgSyVvv27GJ_5d3bnlyWoqW32bwy4f0GcC0Rc"  localhost:3000/api/notes/delete/1'
        },
        'GET /api/notes/shared/:id': {
            description: 'Show text of shared note',
            example: 'curl -X GET localhost:3000/api/notes/shared/1'
        }
    })
}