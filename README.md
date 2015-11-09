# README For The Plonk Exchange

## Background Information on Plonk.  Will be displayed on website
What is Plonk? Plonk is a non-specific and derogatory term used for wine.
The term is not always used in a wholly derogatory manner. It can indicate a degree of strange affection for the wine in question.

What is The Plonk Exchange? How many times have you had guests over that bring that obligatory bottle of gift wine?   Unless they know you well, chances are that bottle will end up orphaned in your basement somewhere.    It might see the light of day when you take that bottle over to a friends house to unload it, usually at a large party where noone will notice. Those days are gone!  Now The Plonk Exchange you can sell or trade that plonk and give that wine a loving home.  One person's plonk is another person's treasure.

## Users Stories:
### General usage User Stories
* As a user I want to create an account
* As a user I want to login with a secure login
* As a user I want to create a plonk ad
* As a user I want to list all my plank ads
* As a user I want to edit one of my plonk ads
* As a user I expect that no other user can edit an Ad I created
* As a user I want to delete a plonk ad
* As a user I want to indicate that I am willing to trade rather than sell my plonk

###User Stories related to Ads created by other users
* As a user I want to list plonk ads based on city
* As a user I want to list plonk ads based on wine type

###User Stories related to Messages
* As a user I want to contact the user who posted a plonk ad that I am interested in
* As a user I want view my messages in an order list, newest to oldest.  Messages I created will appear in the list
* As a user, when I view my message list I want to see the sender username,  the message text and time and date the message was created
* As a user I want to clear my messages
* As a user I want to respond to a message that another user sent to me

###Additional Stories for Phase II
* As a user I want to be able to retrieve information about my plonk on Wines.com
* As a user I want to be able to put a picture in my plonk ad
* As a user I want to be notified by email when I have a new message
* As a user I want to be able to search for plonk base on distance from my house
* As a user I want to be able to create a watch for getting notified if a kind of plonk is posted (could be an additional message from the system rather than another user)

## Table Definitions for Database
###Tables for User and User Authentication
These tables, models and routers originate from https://github.com/gaand/project2-api

###Table for Profile

| Column | Type |
| :----- | :--- |
| id | INTEGER |
| first_name | CHARACTER VARYING |
| last_name | CHARACTER VARYING |
| street_address | CHARACTER VARYING |
| city | CHARACTER VARYING |
| state| CHARACTER VARYING |
| zip_code| INTEGER |
| user_name | CHARACTER VARYING, must be unique|
| foreign key | Reference to User |
| updated_at | TIMESTAMP WITHOUT TIME ZONE |
| created_at | TIMESTAMP WITHOUT TIME ZONE |

####Validations and Constraints for Profile
* user_name, city and zip_code must be filled in
* user_name must be unique



###Table for Plonk

| Column | Type |
| :----- | :--- |
| id | INTEGER |
| vineyard | CHARACTER VARYING |
| variety | CHARACTER VARYING |
| year | INTEGER |
| number_of_bottles | INTEGER |
| city | CHARACTER VARYING |
| price | DECIMAL |
| will_trade | BOOLEAN |
| foreign key | Reference to User |
| updated_at | TIMESTAMP WITHOUT TIME ZONE |
| created_at | TIMESTAMP WITHOUT TIME ZONE |

####Validations and Constraints for
* vineyard, variety, year, number_of_bottles, city, price and will_trade must be filled in


###Table for Message

| Column | Type |
| :----- | :--- |
| id | INTEGER |
| sender_user_name | CHARACTER VARYING |
| receiver_user_name | CHARACTER VARYING |
| plonk_message| CHARACTER VARYING |
| foreign key | Reference to User |
| updated_at | TIMESTAMP WITHOUT TIME ZONE |
| created_at | TIMESTAMP WITHOUT TIME ZONE |

####Validations and Constraints for Message
* sender_user_name, receiver_user_name and  plonk_message must be filled in



###Associations
* User is the parent of Message.  User has many messages.   A message belongs to a User
* User is the parent of a Plonk Ad.  User has many Plonk Ads.   A Plonk Ad belongs to a User



###ActiveRecord operations
* Finding a particular user by user_name  user = User.find_by(user_name: 'mkutter72')
* Getting all messages for user     user.messages
* Creating a new message for user   user.message.create!()
* Clearing the list of messages - want to delete messages as well - how?
* Finding Plonk based on city   plonk_list = Plonk.find_by(city: 'Boston')
* Finding Plonk based on type  plonk_list = Plonk.find_by(type: 'Cabernet')
* Finding a User to send a message to based on Plonk ad    user = plonk.user.username

###Workflow Planning
* Define user stories
* Create Wireframe for Website
* Analysis of user stores for determining what data tables are present in the database
* Consider what queries will be needed to retieve and operate on data tables
* Create database and models and test with rails db and rails c
* Implement rounts and test with postman and curl
* Create Website with function controls but not final organization
* Create JavaScript for DOM manipulation and AJAX on the front-end
* Integrate front and back ends
* Make Website look nice
* Work on Phase II tasks


Authorization and Authentication
