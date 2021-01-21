cd backend
npm run tsc
cd ../frontend
npm run build
cd ..
git subtree push --prefix backend/ heroku master
