const express = require('express');
const cors = require('cors');
const config =  require('./config.js');
const dbConnection = require('./database/db');
const middleware = require('./others/middleware');
const userRouter = require('./routes/user.route');
const appRouter = require('./routes/app.route');
const categoryRouter = require('./routes/category.route.js');
const resturantRouter = require('./routes/resturant.route.js');
const dashboardRouter = require('./routes/dashboard.route.js');
const charityRouter = require('./routes/charity.route.js');
const mealRouter = require('./routes/meal.route.js');
const Meal = require('./models/meal.js');
const Category = require('./models/category.js');
const Resturant = require('./models/resturant.js');
const User = require('./models/user.js');

const port = config.MYSQL_ADDON_PORT ?? 8080;
const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());



Category.hasMany(Meal);
Resturant.hasMany(Meal);
User.hasMany(Resturant);
Meal.belongsTo(Resturant);
Resturant.belongsTo(User);
Meal.belongsTo(Category);

app.use(middleware);
app.use(userRouter);
app.use(appRouter);
app.use(categoryRouter);
app.use(resturantRouter);
app.use(dashboardRouter);
app.use(charityRouter);
app.use(mealRouter);

app.listen(port,"0.0.0.0", async () => {
    await dbConnection.sync({alter: false});
    console.log(`Example app listening on port ${port}`)
})
