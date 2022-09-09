# Project-Pro Tracker
![project-management-](https://user-images.githubusercontent.com/88262913/176040535-d3870dd0-77d9-4abc-a1b0-7f1a53c8deb9.jpg)


## Description

This project is built in the end of phase-4 of Flatiron school to show my ability to build a full-stack project with a React frontend and a Rails backend together.

## Overview

In the Project Tracker app user will be able to:

- see list of projects, including information about associated client and employee 
- add, edit, delete, filter project.

- see list of employees and their assigned projects
- add new employee 
- delete an employee if he/she doesn't have any projects
- search for employee by name or title

- see list of clients and their projects
- add new client
- delete a client if they don't have any projects
- search for clients by name

## Requirements

- Ruby 2.7.4
- NodeJS (v16), and npm
- Postgresql

## Setup

1. Fork and clone this repository into your local environment. Navigate into its directory in the terminal, then run code . to open the files in Visual Studio Code.
2. run `bundle install`
3. run `rails db:create db:migrate db:seed`
4. run `npm install --prefix client`

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

## Video walkthrough

[https://youtu.be/FGiV7itvO40]