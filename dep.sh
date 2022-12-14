# use touch fname.sh to create
# use chmod +x fname.sh to give permissions
# run ./fname.sh to run script
git add .
git commit -m 'solved problem with: heroku config:set NPM_CONFIG_PRODUCTION=false, https://stackoverflow.com/questions/73693910/webpack-not-found-when-deploying-my-app-to-heroku'
git push
# next line auto done by line above
# git push heroku main 
exit