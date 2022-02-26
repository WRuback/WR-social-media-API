# Social Media Back-End API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Social Media Back-End API](#social-media-back-end-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Users](#users)
    - [Thoughts](#thoughts)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [License](#license)
  - [Questions](#questions)

## Description

This is a project for my bootcamp to create the back-end API for a social media website using MongoDB as the database. You can create new users, see all or one of the users, update there information, or delete them from the database. You can also do the same with their posts, called 'thoughts' for this example site (create, get, update, and delete them). You can also add and remove friends from user accounts, and add comments to thoughts, called 'reactions'.

## Installation

To install this project, download the repo, then in the terminal, on the folder this is in, use `npm install` to bring in the packages. After that, you can use `npm start` to start the server.

## Usage

You can do the following API calls once this is operational:
### Users
- `/api/users` - **GET** - Get all of the users.
- `/api/users/:id` - **GET** - Get one user by ID. This will include all there friends and thoughts as well.
- `/api/users` - **POST** - Create a new user. In the body, it must include `username` and `email`.
- `/api/users/:id` - **PUT** - Update one user by ID. In the body, include the properties you want updated.
- `/api/users/:id` - **DELETE** - Remove one user by their ID. This will also remove any thoughts that were linked to them.
- `/api/users/:userId/friends/:friendId` - **POST** - Adds the friend's ID to the list of the friends of the user (based on ID).
- `/api/users/:userId/friends/:friendId` - **DELETE** - Removes the friend's ID to the list of the friends of the user (based on ID).
### Thoughts
- `/api/thoughts` - **GET** - Get all of the thoughts.
- `/api/thoughts/:id` - **GET** - Get one thought by ID.
- `/api/thoughts` - **POST** - Create a new thought. In the body, it must include `thoughtText`, `username`, and `userId`.
- `/api/thoughts/:id` - **PUT** - Update one thought by ID. In the body, include the properties you want updated.
- `/api/thoughts/:id` - **DELETE** - Remove one thought by their ID.
- `/api/thoughts/:thoughtId/reactions` - **POST** - Adds a reaction to the list of reactions of the thought (based on ID). In the body, it must include `username`, and `reactionBody`.
- `/api/thoughts/:thoughtId/reactions` - **DELETE** - removes a reaction to the list of reactions of the thought (based on ID). In the body, it must include the `reactionId`.

[A video demonstration can be found here](https://drive.google.com/file/d/1-Be_g-EMaizacrj6gO4ZxXb08dTomf4Y/view?usp=sharing).

## Contributing

Anyone can fork this project and add features. However, all changes to the main section must be approved by the Admin.

## Tests

There are no testing procedures for this project.

## License

This project is licensed under a [MIT license](https://opensource.org/licenses/MIT).

## Questions

If you have any questions, please send them to [WRuback](https://github.com/WRuback) at wrubackdev@gmail.com with the heading "Social Media Back-End API Question".
