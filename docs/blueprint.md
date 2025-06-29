# **App Name**: TransitWise

## Core Features:

- User Authentication: Simple, clean login using Firebase Authentication (Google sign-in). Centered for mobile devices.
- Real-Time Transit Display: Real-time display of next available buses/trains, rendered as a touch-friendly list of transit options and urgent user alerts, showing the routes and arrival times nearest to the user’s location.
- Voice Interaction: AI-powered conversational tool, triggered via the AI icon, allowing the user to ask natural language questions about transit options, such as "Is route 14 on time today?", using the OmniDimension AI Voice Agent API to generate an appropriate and accurate answer.
- Interactive Map: Minimalist map using Leaflet/OpenStreetMap displaying user location and nearby transit stops for at-a-glance situational awareness. Note: Due to time constraints, a placeholder map is used in the demo. Clicking the map is a stub.
- Account Management: Modal/overlay that can appear after the user taps the account icon, showing Firebase Auth details and a logout button. For demonstration, the name, email, and user photo are configurable from inside the Javascript code.
- Relevant Alert Highlighting: Based on the user’s question, and the OmniDimension AI Voice Agent, suggest important service alerts related to the routes discussed, which are likely to impact the user’s transit plans. This involves the tool determining the user's likely intent and factoring transit alerts into the AI agent response, so that important and relevant alerts are sure to be highlighted to the user.

## Style Guidelines:

- Primary color: Moderate blue (#8ab4f8) for the primary interactive elements to align with the original design. Complementary to the dark theme.
- Background color: Dark gray (#1f1f1f) to maintain the dark mode aesthetic and ensure readability. Low saturation of the primary hue.
- Accent color: Green (#81c995) to highlight on-time departures and important UI elements; it should be analogous to the primary color in the blue-green spectrum. Higher brightness than the background, lower than the primary color.
- Font pairing: 'Inter' (sans-serif) for headlines and 'PT Sans' (sans-serif) for body text, prioritizing readability and modernity on mobile.
- Material Icons are used throughout, providing familiar, clear affordances. They reinforce touch-friendly design for mobile, for buses, trains, alerts, accounts, and more.
- Mobile-first approach. Elements centered and optimized for touch interaction. High contrast ensures readability on various mobile screens.
- Subtle transitions when opening the account modal and refreshing transit data, giving a polished and responsive feel without overwhelming the user.