// Load environment variables from a .env file
require('dotenv').config();
// Import the Axios library for making HTTP requests
const axios = require('axios');

// Function to retrieve a list of organizations associated with the user
async function getOrganizations(){
    try {
        // Making a GET request to the Eventbrite API to fetch organizations
        const organizations = await axios.get(`https://www.eventbriteapi.com/v3/users/me/organizations`, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}` // Authorization header with API key
            }
        });
        return organizations.data; // Returning the response data
    } catch(error) {
        console.error('error', error); // Logging any errors encountered
    }
}

// Function to create a new event
async function createEvent(organizationId, eventName, startDate, endDate, currency){
    try {
        // Making a POST request to the Eventbrite API to create an event
        const event = await axios.post(`https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`, {
            event: {
                name: {
                    html: eventName
                },
                start: {
                    "timezone": "America/Los_Angeles",
                    "utc": startDate
                },
                end: {
                    "timezone": "America/Los_Angeles",
                    "utc": endDate
                },
                currency,
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}` // Authorization header with API key
            },
        });
        return event.data; // Returning the created event data
    } catch(error) {
        console.error('error', error); // Logging any errors encountered
    }
}

// Function to create ticket tiers for an event
async function createTicketsTiers(eventId){
    try {
        // Making a POST request to create a ticket tier
        const ticketsTier = await axios.post(`https://www.eventbriteapi.com/v3/events/${eventId}/inventory_tiers/`, {
            inventory_tier: {
                name: 'VIP',
                count_against_event_capacity: true,
                quantity_total: 30
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}` // Authorization header with API key
            }
        });
        return ticketsTier.data; // Returning the created tickets tier data
    } catch(error) {
        console.error('error', error); // Logging any errors encountered
    }
}

// Function to assign ticket tiers to an event
async function assignTicketTiersToEvent(eventId, ticketTierId){
    try {
        // Making a POST request to assign ticket tiers to an event
        const ticketsAssigned = await axios.post(`https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`, {
            ticket_class: {
                name: "Vip section",
                free: false,
                donation: false,
                cost: "USD,1000",
                inventory_tier_id: ticketTierId
            }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}` // Authorization header with API key
            }
        });
        return ticketsAssigned.data; // Returning the assigned ticket tier data
    } catch(error) {
        console.error('error', error); // Logging any errors encountered
    }
}

// Self-invoking async function to run the above functions
(async() => {
    const organizations = await getOrganizations(); // Fetching organizations
    // Uncomment the following lines to create an event and fetch its ID
    // const eventCreated = await createEvent(organizations.organizations[0].id, 'Coding With Ado MeetUP', new Date(new Date().getTime() + 15 * 60000).toISOString().replace(/\.\d{3}/, ''), new Date(new Date().getTime() + 30 * 60000).toISOString().replace(/\.\d{3}/, ''), 'USD');
    // console.log(eventCreated);

    // Hardcoded event and ticket tier IDs for demonstration
    const eventId = '772376728587'; // Replace with eventCreated.id for dynamic use
    // const ticketTierCreated = await createTicketsTiers(eventId);
    // console.log(ticketTierCreated);
    const ticketTierId = '54746669'; // Replace with ticketTierCreated.inventory_tier.id for dynamic use
    const ticketsAssigned = await assignTicketTiersToEvent(eventId, ticketTierId);
    console.log(ticketsAssigned); // Logging the result of ticket assignment
})();
