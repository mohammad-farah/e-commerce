# Bamptee E-commerce

## overview 

<br/>

This is an e-commerce developed by (MERN stack)
- Front-End implemented by React.js-typescript and Material-UI
- Back-End implemented by Koa.js-typscript and Mongodb

Below you will find:
- Installation steps
  * Back-end Setup 
  * Front-end Setup
- Database Schemas
- API Endpoints
- Story how the front-end works 

<br/>

## Installation Steps

### Prerequisites 

- Node.js: Make sure you have Node.js (v20.16.0) installed on your machine.

- NPM: Ensure you have either npm (V9.8.1) for managing packages.

- Installed Mongodb


## Installation 

Clone the repositiory and install dependencies
```shell 
git clone https://github.com/mohammad-farah/e-commerce.git
```

## Setup Back-end
1 - Edit the `.envDev` to `.env` file to connect into mongodb by editing database configuration on `.env` the inforamtions below are necessary for this process. It's recommended to keep the name of the `DB_NAME` as default.

```shell
DB_USERNAME=
DB_PASSWORD=
DB_PORT=27017
DB_HOST=localhost
DB_NAME=e-commerce 
```
Also, their are other configuration on `.env` file like `token` and `password encryption` secret keys


<br/>

2 - It's recommended to `import` the `e-commerce.users` collection to mongodb database, This file exists on `./back-end/database` directory, This collection contains default user has administration permissions.

```shell
username=Admin
email=mhd.frh.bus@gmail.com
password=admin
```

otherwise, you have to register with any username, email and password then edit the `role` of the registered user from `user` to `admin` at the users collection on the database, then login again.


<br/>

3- Install dependencies for back-end

```shell
cd ./back-end 
npm install
npm run build
npm run start
```
<br/>

### Setup Front-End
1- Install the dependencies for front-end
```shell
cd ./front-end 
npm install
npm run dev
# OR 
npm run build # to deploy the GUI on web server
```

<br/><br/>

## Database Schemas (MongoDB)

### Users Collection 

```json
    {
    "_id": "ObjectId",
    "username": "string",
    "email": "string",
    "hashed_pwd": "string", 
    "role": "string", 
    "createdAt": "Date",
    "updatedAt": "Date"
    }
```

### Products Collection 

```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "image": "string", 
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Cart Collection

``` json 
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "products": [
    {
      "productId": "ObjectId", 
      "quantity": "number"
    }
  ],
  "totalPrice": "number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```


### Orders Collection

```json
    {
  "_id": "ObjectId",
  "userId": "ObjectId", 
  "products": [
    {
      "productId": "ObjectId",
      "quantity": "number"
    }
  ],
  "totalPrice": "number",
  "shippingDetails": {
    "received_by": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "status": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}

```

### Relations of Collections 

 - Users and Orders: A one-to-many relationship (one user can place many orders).
 - Users and Cart: A one-to-one relationship (one user has one cart).
 - Products and Orders: A many-to-many relationship (an order can have many products and a product can appear in many orders).


<br/> <br/><br/>

# API End-points 

<br/>

### Authentication Endpoints

<hr/>

 (public) <br/>
`POST` /user/register <br/>
{
  "password" : "",
  "email" : "",
  "username" : ""
}

<hr/>


(public)<br/>
`POST` /user/login <br/>
{
  "password" : "",
  "email" : ""
}

<hr/>


<br/> 

### Products & Categories Endpoints



<hr/>


(authenticated)<br/>
`POST` /products  <br/>
{   "name": "",
    "description": "",
    "price": number,
    "category": "",
    "image": ""
}

<hr/>


(public)<br/>
`GET` /products/categories <br/>


<hr/>


(public)<br/>
`GET` /products/categories/:categoryName <br/>

<hr/>


(Authorized only Admin)<br/>
`PUT` /products/:productId <br/>
{
  "name" : "",
  "category" : "",
  "price" : ,
  "image" : ""
}

<hr/>

(Authorized only Admin)<br/>
`DELETE` /products/:productId <br/>



<br/>

### Cart Endpoints


<hr/>

(Authenticated for owner user) <br/>
`POST` /cart <br/>
{
  "productId" : "",
  "quantity" : 
}

<hr/>

(Authenticated for owner user) <br/>
`DELETE` /product/productId

<hr/>

(Authenticated for owner user) <br/>
`DELETE` /product/cart

<hr/>

(Authenticated for owner user) <br/>
`GET` /cart


<br/>

### Orders Endpoints



<hr/>

(Authenticated for owner user) <br/>
`POST` /orders <br/>
{
  "cartId": "",
  "shippingDetails" : {
    "received_by" : ""
    "address": "",
    "city": "",
    "zipCode": "",
    "country": "",
    "phone" : ""
  }
}

<hr/>


(Authenticated for owner user) <br/>
`GET` /orders

<hr/>


(Authenticated for owner user) <br/>
`GET` /orders/orderId

<hr/>


(Authorized only Admin) <br/>
`DELETE` /order/orderId <br/>

<hr/>

(Authorized only Admin) <br/>
`PATCH`/order/orderId <br/>
{
  "status" : ""
}

<hr/>

<br/> <br/>


# Front-end Workflow like Story


- If you are an admin, after login will be diracted automatically to dashboard, on it you will find `orders` and `products` tabs, click on products and click on `Add new product` button. Add more then one product with filling the new category input which will be selected after the first input and so on . . . <br/> on the order tab you can change the `orders` status when an consumers yousers place  orders.

- If you are user ( also admins ave this ability ), brows the products on `Home Page` and filter them by categories on tab, then add some products to your `Cart`, after that visit you `Cart Page` to `controll the quantity` and `remove product from cart` if you changed your mind, also you will have some statistics will help you to tak the decision, after that checkout the `cart` and fill the shipping details on the `checkout page`, finally make the order and go to the `order page` where you can trace the status of your order 


<br/><br/>


