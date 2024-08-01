# E-commerce
Creating Full-Stack E-commerce with MERN that includes authentication/authorization system, product management system (user interface and admin interface), shipping cart, checkout process, and product reviewing and rating system.

<br><hr><br> 

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


### Rating and Review Collection

``` json 
{
  "_id": "ObjectId",
  "productId": "ObjectId", 
  "userId": "ObjectId", 
  "rating": "number", 
  "review": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}

```

### Relations of Collections 

 - Users and Orders: A one-to-many relationship (one user can place many orders).
 - Users and Cart: A one-to-one relationship (one user has one cart).
 - Products and Orders: A many-to-many relationship (an order can have many products and a product can appear in many orders).
 - Products and Reviews: A one-to-many relationship (one product can have many reviews). 




