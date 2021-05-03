# Nile / Full-Stack E-Commerce App

## About

PERN Full-stack Application developed as part of the Full-Stack Engineer Course on Codecademy by Matthew Willis.

Nile is an online marketplace that takes inspiration from real-world online stores.

![alt text](https://github.com/MWillis10231/e-commerce-app/blob/master/client/public/nile.png "Live preview")

## Libraries/Frameworks/Runtimes
* PostgreSQL
* Express
* React
* Node
* Stripe
* Passport

## Features

List of features:

* Functioning e-commerce REST API using Express, Node.js and Postgres
* Front-end rendered through React application
* User registration and log-in via API
* Products & user information stored on PostgreSQL database
* CRUD operations on products
* CRUD operations on user accounts
* CRUD operations on user carts
* User orders & payment (using Stripe)
* User order history

## Brief

"For this project, you will continue building an e-commerce application using your knowledge of full-stack web development. E-commerce applications are ubiquitous online and make up the back-bone of online business, making the skills used to build them invaluable for any budding entrepreneur. This project requires that you build a fully-functioning e-commerce application that allows users to register an account, browse products for sale, and complete a purchase."

## Concept & Implementation

![alt text](https://github.com/MWillis10231/e-commerce-app/blob/master/client/public/nilePlan.png "Concept")

The idea was to create an Amazon-look-alike - from concept to execution. I also wanted to challenge myself to not actually use the colour blue - which is quite prominent in many places on the web(including Amazon). It's quite basic design-wise, especially when it comes to product information, but I didn't want to spend too much time on the UI at the expense of the actual functionality.

## General Thoughts

This was lots of fun. It really helped elucidate how the Front and Backends interact with each other. This was by no means an efficient execution - I had to redo a lot of my work because I'd not really understood how each of the parts of the machine would work together - which is the point of practical project work I guess. 

What I didn't enjoy was the Passport section - this was badly documented and confusing, but I got there in the end. 

## Known issues

* Orders section is super ugly.
* Filters only work on the search function (an issue with my routing)
* When you logout, it doesn't clear your cart (neither in express nor in the app)
* Editing your profile does nothing at present
* It's not at all optimised for mobile (just like real Amazon)
* Store isn't implemented properly using pg-connect-simple

## Planned Improvements:

* A logo (design in progress)
* A nicer looking rating system with stars
* More unique / personalised products (even if we use fewer)
* Better sign-up system - maybe with email verification
* Option to enter an "address" for delivery
* SWAGGER API documentation (partially implemented)

### Credits
