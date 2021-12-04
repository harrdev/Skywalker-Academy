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
    6. Go to Heroku's sit for deployed app
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




