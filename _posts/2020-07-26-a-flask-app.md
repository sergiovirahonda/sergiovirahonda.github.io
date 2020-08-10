---
layout: post
title:  "A Flask web application to increase the A2 Softway's scope"
author: sergio
categories: [ Flask,Python,SQL ]
tags: []
image: assets/images/flask-app-post/flask-app.jpg
rating: 4.5
comments: false
---

Hi there. I'll introduce a very recent web application that I've been developing for a well known organization in Central America. I cannot reveal the name for obvious reasons but I promise I'll try to explain every single detail about this project here and within the code's link that you'll find at the end of this post.

Let's start from the very beginning: A2 Softway is a Venezuelan ERP software widely distributed and sold along the Americas. Its focus is to provide a complete administrative module but also flexible and very cheap compared, for example, with the SAP's ERP.

One of the A2 distributors of Central America reached out to me because a very particular need: expand the scope of this software for an important client. Essentially they were needing to interact with its database to modify some tables that cannot be modified from within the software and also query some information to be presented in this company's website.

A2 Softway is written in Borland Delphi and runs a DBISAM database. It's a very unusual architecture with an old fashioned database system, which makes the project task, let's say, complex. Said this, let's deep dive into the project.


# The project

Alright,

**The main requirement:** the client just launched their website and were needing to provide their customers' account status from there. To accomplish this task, they would need to query the A2 database hosted in a local server (on-premise), do some math and return a file to the Drupal website where the customer would be logged in.

**The collateral requirement:** modify some database's fields because A2 itself does not allow to. You may be asking why would this be a requirement and why the software does not do that by itself; the answer: As It's a Venezuelan software adapted to be sold around the world, it still has some software regulations imposed by the venezuelan laws. The distributor needed to break this boundary to be able to deploy the software in the client's ecosystem ASAP. Essentialy they were requiring to modify invoices' data to correct errors made by the billing staff but also consult information about the customers without having to access the A2 interface, through a fancy frontend.


# The road-blocks

As you may know, **DBISAM databases** are difficult to modify because not all SQL queries are accepted and you need a special software to do so. I found the DBISAM ODBC driver from Elevate Software, had to purchase the license and finally was able to query the DB engine.

They were needing an app that would allow to query the database from the outside (the website) so I concluded the best way to solve this problem would be a web application. I would go through this topic in the next lines:


# The web application

Once I was able to query the so restricted DB, it was time to code. I'm a Python fan (I think I don't have to explain why, it's pretty obvious) so decided to build the app based on it. This is the application core architecture (btw, I called the app **"A2 Workspace"**):

![App Architecture](/assets/images/flask-app-post/architecture.jpg)

The application is coded with Python, Flask, HTML, CSS, Bootstrap and runs in the same A2 local server. Essentially it renders several HTML pages for the internal services such as modify dates and documents, and returns a simple pdf file for the external service.

Before moving on, It's important to mention the interface is in Spanish, just FYI.


# The interface

This app has several pages, but the most importants are:


**The login page:**

This is how the login page for internal employees would look like.

![Login Page](/assets/images/flask-app-post/login.jpg)


**The index:**

This page is still to be defined. The client will need to present some business graphs but hasn't decided what to show yet.

![Index Page](/assets/images/flask-app-post/dashboard.jpg)


**The page to query internal customers:**

![Query affilliate](/assets/images/flask-app-post/query_affiliate.jpg)


**The page to query customers' account status:**

![Query account](/assets/images/flask-app-post/query_document.jpg)


**The page to modify invoice numbers:**

![Modify document](/assets/images/flask-app-post/modify_document.jpg)


**The page to modify invoices' dates:**

![Modify dates](/assets/images/flask-app-post/modify_date.jpg)


**A file example of what the external service would return through the website:**

Due to compliance reasons I removed some client's information, but that's essentially what the external service returns.

![File Example](/assets/images/flask-app-post/document.png)


# The whole project and code:

The whole project is available [Here](https://github.com/sergiovirahonda/A2Workspace) in case you want to deep dive into it. Feel free to contact me in case of any doubt/feedback.

I hope you have enjoyed this reading. See you around!