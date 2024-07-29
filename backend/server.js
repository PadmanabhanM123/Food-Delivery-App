const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {sequelize}=require('./models')

const restaurantRoutes=require("./routes/restaurantRoutes")
const userRoutes = require('./routes/user')
const foodItemsRoutes=require('./routes/foodItems')
const restaurantFoodRoutes=require('./routes/restaurantFoodRoutes')
const searchRoutes=require('./routes/searchRoutes')
const orderRoutes=require('./routes/orderRoutes')
const adminRoutes=require('./routes/adminRoutes')


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/images', express.static('images'))

// Routes;
app.use('/api/users', userRoutes);
app.use('/api/restaurants',restaurantRoutes)
app.use('/api/food-items',foodItemsRoutes)
app.use('/api/restaurantfood',restaurantFoodRoutes)
app.use('/api/search',searchRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/admin',adminRoutes)



// Sync database
sequelize.sync({alter:true}).then(() => {
  console.log('Database synchronized');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
