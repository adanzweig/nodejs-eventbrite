# Eventbrite Integration Project

This project is a Node.js application that integrates with the Eventbrite API to manage events. It includes functionalities such as fetching organizations, creating events, creating ticket tiers, and assigning ticket tiers to events.

## Features

- Retrieve a list of organizations associated with the user.
- Create new events with specified details.
- Create ticket tiers for events.
- Assign ticket tiers to events.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)
- Eventbrite account and API key

### Installing

A step by step series of examples that tell you how to get a development env running:

1. Clone the repository:
   ```bash
   git clone https://github.com/adanzweig/nodejs-eventbrite.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nodejs-eventbrite
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your Eventbrite API key:
   ```
   API_KEY=your_eventbrite_api_key_here
   ```

5. Run the application:
   ```bash
   node index.js
   ```

## Usage

- To fetch organizations associated with your Eventbrite account, the application will execute the `getOrganizations` function.
- To create a new event, use the `createEvent` function with appropriate parameters.
- To create ticket tiers, use the `createTicketsTiers` function.
- To assign ticket tiers to events, use the `assignTicketTiersToEvent` function.