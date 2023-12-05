# Final Project 423

This application is an e-commerce website that allows users to buy and sell with user created shops.

Web4 Link: https://in-info-web4.informatics.iupui.edu/~jmtychek/n423-final/dist/

## Project Overview:

This project will be an online ecommerce website that allows users to set up their own shops and sell items. This website will implement a firebase database to store, retrieve, and edit data for the website including user information, shop details, product details, and buying history.

#### Users:

This site will consist of three different user types: sellers, shoppers, and admins. Sellers will be able to set up their own storefront on the website and add products for others to buy. They will be able to customize and edit details of their own shop and also browse other seller’s shops. Shoppers will only be able to browse shops and not have their own unless they sign up as a seller. They will be able to select items from shops and checkout with them or add them to favorites. Admins will be able to oversee all shop and account information and edit or delete it if necessary.

#### Features:

Upon opening the site, users will be greeted by a sign in page where they can login with an existing account or sign up for a new one. When creating an account users will provide a username, email, and password which will be stored in the database. If users want to open their own shop, they will do this after creating an account from the account page (more details below).

Once signed in, users will be greeted with a home page that will display an assortment of products and shops for shoppers to explore. From here, users can choose to see more detailed information about products, shops, or view their account information.

On the account page, users will be able to edit their user information. If a user wants to become a seller and open their own shop, they can do so by clicking the button on this page. Signing up to be a seller will require more information than signing up as a shopper. Sellers will be asked to create a name for their shop, add a shop profile picture, a banner at the top of their page, a description, and contact information. Once a shop is set up, the seller will be able to go back and edit the customization and add items (more details below). On a shopper’s account page, along with profile information, they will be able to see previous purchases and a list of their favorited items. Favorited items may be removed from the favorite page if no longer wanted. Checking the previous purchases will let the shopper go directly to the product page of the items.

On a seller’s shop page, they will be able to to edit the appearance of the shop by adding or changing their profile picture, banner, shop description, and contact information. From here, they will be able to add new items to their shop for purchase. When adding a new item, they will be able to set the title, description, categories, price, quantity, and images of the product. All of these details will be editable by the seller and any item may be deleted from the shop entirely.

When a shopper is exploring a shop, they may add items to their cart for purchase. Here the shopper will review their items before moving onto the payment page. Unwanted items may be deleted from the cart. After entering payment information, the item will be checked out and the quantity of the purchased items will be reduced on the seller’s pages. Once an item’s quantity reaches zero the item will no longer be purchasable but will remain on the seller’s store for the seller to restock or remove.

After a purchase is completed, shoppers may add a review to the purchased items. Reviews will be displayed at the bottom of the product page for each item. The shopper will be asked to give a star rating and a description of why the product was good or bad. Completed review may be edited or deleted from the product page by the shopper.
