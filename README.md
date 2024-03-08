# SOEN 341 Group Project: Team 1

## Summary

* [About the project](#about-the-project)
* [Team Members](#team-members)
* [Technologies](#technologies)
* [Installation](#installation)
* [Prerequisite](#prerequisites)
* [Running](#running)
* [Utilisation](#utilisation)



## About the project

The project aims to develop a car rental web application leveraging a [Micro Service](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices) architecture. 
This web is designed to streamline the vehicle rental process for short durations, typically from a 
few hours to several weeks. It functions as an intermediary between customers seeking to rent vehicles and the car 
rental companies providing those services. The application enables users to explore a variety of vehicle models 
available for rent, complete with descriptions, photos, and detailed specifications for each vehicle. Additionally, 
it offers a range of services to both users and rental providers, enhancing the rental experience and simplifying the 
transaction process.

## Team Members and roles

- Asma Aimade: asmaaimade0@gmail.com - full stack for User story 3 (customer)
- Zineb Bamouh: zineb.bamouh@gmail.com - full stack for User story 2 (customer)
- Mohamed Gueye: mohamed.gueye88@gmail.com - full stack for User story 4 (customer/admin)
- Apolline Leboucher: apolline.leb@gmail.com - full stack for User story 6 (admin/user)
- Beaudelaire Tsoungui Nzodoumkouo: beaudelaire@tutamail.com - full stack for User story 1 (customer)
- Kaoutar El Azzab: kaoutar.elazzab@gmail.com - full stack for User story 5 (all users)

## Project Approach
[Link to the project's approach document](https://docs.google.com/document/d/1U6NiEDSAmT1NGRBFCFDgL9N2u6lD7lsj/edit)

## List of functionnalities/services that the app offers

#### Clients/Renters

This application implements different services for users and renters. The user can be a business or just a regular person looking to rent a vehicle(s):

* Sign-up page
  ![Status][s-todo]
* Login (not required to view the homepage)
  ![Status][s-todo]
* Homepage displaying the various models offered
  ![Status][s-todo]
* 10% discount for monthly payment (from one month onwards)
  ![Status][s-todo]
* Login required for renting
  ![Status][s-todo]
* Selection of a date range
  ![Status][s-todo] ![Role][s-customer]
* Option for indefinite monthly payment (renewal each month)
  ![Status][s-todo] ![Role][s-customer]
* Display of models available for rent according to entered dates
  ![Status][s-todo] ![Role][s-customer]
* Summary page of a rental
  ![Status][s-todo] ![Role][s-customer] ![Role][s-renter]
* Panel of all completed rentals
  ![Status][s-todo] ![Role][s-customer] ![Role][s-renter]
* Access to the invoice
  ![Status][s-todo] ![Role][s-renter]
* Management panel
  ![Status][s-todo] ![Role][s-renter]
* Display of income, bookings for the current month
  ![Status][s-todo] ![Role][s-renter]
* Display of the percentage of vehicles currently rented
  ![Status][s-todo] ![Role][s-renter]
* Display of customer count
  ![Status][s-todo] ![Role][s-renter]
* Table of the latest rentals
  ![Status][s-todo] ![Role][s-renter]
* Summary page of vehicles with the status of each vehicle
  ![Status][s-todo] ![Role][s-renter]
* Vehicle modification page (not rented), with the option to remove the vehicle from stock
  ![Status][s-todo] ![Role][s-renter]
* Form to add a new vehicle
  ![Status][s-todo] ![Role][s-renter]
* Page of all clients
  ![Status][s-todo] ![Role][s-renter]
* Calculation of invoices for each client of the current month
  ![Status][s-todo] ![Role][s-renter]

#### Customer Service Representatives
A customer service role is to:
* Creates a reservation fur customer who didn't make one
  ![Status][s-todo] ![Role][s-renter]
* Confirms the already made reservation 
  ![Status][s-todo] ![Role][s-renter]
* Process and review the rental agreement review
  ![Status][s-todo] ![Role][s-renter]
* Process the payment 
  ![Status][s-todo] ![Role][s-renter]
* Confirms the return
  ![Status][s-todo] ![Role][s-renter]

#### Administrator
An Administrator role is also implemented:
* Administration panel
  ![Status][s-todo] ![Role][s-admin]
* Display of user count
  ![Status][s-todo] ![Role][s-admin]
* Table of all registered users
  ![Status][s-todo] ![Role][s-admin]
* Option to delete an account
  ![Status][s-todo] ![Role][s-admin]
* Option to set a user account as a renter account
  ![Status][s-todo] ![Role][s-admin]
* Option to set a renter account as a user account
  ![Status][s-todo] ![Role][s-admin]

## Security Considerations
The application relies on a robust structure to ensure security:
* Secure authentication with login token
  ![Status][s-todo]
* Hashed password, with the option to rehash the password
  ![Status][s-todo]
* Access restrictions to certain URLs depending on the role
  ![Status][s-todo]
* Data stored in a database with secure access
  ![Status][s-todo]

## Technologies
This web application uses certain technologies and frameworks:

### Front-end
* [Tailwind CSS](https://tailwindcss.com)
* [SvelteKit](https://kit.svelte.dev)

### Back-end
* [Nestjs](https://nestjs.com)

<!-- Installation -->
## Installation

Here's how to set up the application in your development environment

### Prerequisites

[Node](https://nodejs.org/en/download)

After you install Node.js, verify NodeJs and NPM installation by writing the following command in terminal or command prompt.

```
node -v
npm -v
```

### Running

1. Clone the repository
```
git clone https://github.com/apollinelbcr/team_1-soen341projectW2024.git
cd team_1-soen341projectW2024
```

2. Install the frontend dependencies
```
cd frontend
npm i
```

3. Run de frontend
```
npm run dev
```
The frontend can then be access @  http://localhost:5173

4. Install the backend dependecies

   Yet to be implemented

5. Run the backend

  Yet to be implemented

  

### Extensions used

Work In Progress

<!-- USAGE EXAMPLES -->
## Utilisation

Documentation of the features offered by our application! (see the project wiki)![Status][s-todo]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[s-url]: (#roadmap)
[s-todo]: https://img.shields.io/static/v1?label=Statut&message=Todo&color=blue
[s-in-progress]: https://img.shields.io/static/v1?label=Statut&message=In%20progress&color=orange
[s-finished]: https://img.shields.io/static/v1?label=Statut&message=Finished&color=green
[s-customer]: https://img.shields.io/static/v1?label=Role&message=Customer&color=yellow
[s-renter]: https://img.shields.io/static/v1?label=Role&message=Renter&color=purple
[s-admin]: https://img.shields.io/static/v1?label=Role&message=Admin&color=red
[s-bug]: https://img.shields.io/static/v1?label=Statut&message=Bug&color=purple
[s-frontend]: https://img.shields.io/static/v1?label=Front-end&message=90%&color=green
[s-backend]: https://img.shields.io/static/v1?label=Back-end&message=40%&color=orange
