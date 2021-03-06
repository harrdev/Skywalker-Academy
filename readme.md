# Skywalker Academy
Heroku Deployed: https://skywalkeracademy.herokuapp.com/
<br>
GitHub: https://github.com/harrdev/project2

## Login
    * Hashed password
    * Required login to access content/pages
    * Create username and password (register)

## View existing, create, edit, and delete Star Wars Character and Planet Information
    * Select People or Planets for list of existing data
    * Click on Add Person or Add Planet to add a new entry
    * Select "Add to Favorites" to store specific person or planet's information
    * Option to delete from favorite by clicking on delete button
    * Option to edit person or planet with edit button

<br><br>

# Installation Instructions
    1. Fork and Clone from https://github.com/harrdev/project2
    2. Command: npm i
    3. Command: sequelize db:create
    4. Command: sequelize db:migrate
    5. In VSCode: create new file in parent folder (Project2), name that file .env
    6. Add this in the .env file: SUPER_SECRET_SECRET=secret
    
# Deployment Instructions
    1. No API key needed
    2. Port 3000
    3. npm i (to install dependencies)
    4. npm i sequelize-cli (to install local version of sequelize-cli)
    5. Create Heroku app - heroku apps:create Skywalker Academy
    6. Go to Heroku's site for deployed app
        * Select settings
        * Add into config var: SUPER_SECRET_SECRET with value of "secret"
    7. Commit and push to Heroku - git push heroku main
    8. Connect database with sequelize
        * heroku addons:create heroku-postgresql:hobby-dev
    9. Add and commit changes to git
    10. git push heroku main (push changes to Heroku)
    11. heroku config:set PGSSLMODE=no-verify (setup to not require SSL)
    12. Run migrations - sets up database on Heroku
        * heroku run sequelize db:migrate
    13. Open App - heroku open




