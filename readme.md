# Skywalker Academy
Heroku Deployed: https://skywalkeracademy.herokuapp.com/
<br>
GitHub: https://github.com/harrdev/project2

## Login
    * Hashed password
    * Required login to access content/pages

## View existing, create, edit, and delete Star Wars Character and Planet Information

## Add to favorites list for easy access to information

<br><br>

# Deployment Instructions
    1. No API key needed
    2. Port 3000
    3. npm i (to install dependencies)
    4. npm i sequelize-cli (to install local version of sequelize-cli)
    5. Create Heroku app - heroku apps:create Skywalker Academy
    6. Commit and push to Heroku - git push heroku main
    7. Connect database with sequelize
        * heroku addons:create heroku-postgresql:hobby-dev
    8. Add and commit changes to git
    9. git push heroku main (push changes to Heroku)
    10. heroku config:set PGSSLMODE=no-verify (setup to not require SSL)
    11. Run migrations - sets up database on Heroku
        * heroku run sequelize db:migrate
    12. Open App - heroku open




