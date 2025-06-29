# 🚇 NavAI - Transit Crisis Navigator

A mobile-first public transit web application built for Vibe-a-Thon 2.0, featuring real-time transit data, voice AI integration, and crisis navigation capabilities.

## 🌟 Features

### 🗺️ **Interactive Transit Map**
- Real-time transit stops from Firestore database
- User location detection and display
- Visual representation of bus and train routes
- Static map diagram for optimal performance

### 🎤 **Voice AI Integration**
- **OmniDimension AI Voice Agent** integration
- Natural language transit queries (e.g., "Is route 14 on time?")
- Voice-based issue reporting
- Seamless voice interaction via web widget

### 📊 **Real-Time Data**
- Live transit departures from Firestore
- Service alerts and notifications
- Real-time updates for Howrah, Asansol, and Dhanbad
- Dynamic data filtering and display

### 🔐 **Authentication & Security**
- Firebase Authentication with Google Sign-in
- Secure user account management
- Protected routes and data access

### 📱 **Mobile-First Design**
- Responsive design optimized for mobile devices
- Touch-friendly interface
- Dark theme with modern UI components
- Tailwind CSS for consistent styling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Material UI components
- **Backend**: Firebase (Auth, Firestore)
- **Voice AI**: OmniDimension AI Voice Agent
- **Maps**: Leaflet/OpenStreetMap (static implementation)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Python 3.9+ (for voice backend)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YowaiMo-Koustav/Navto.git
cd Navto
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OmniDimension Voice Agent
OMNIDIM_API_KEY=your_omnidimension_api_key
```

### 4. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Google Sign-in
3. Create a Firestore database
4. Add the following collections:
   - `transit_data` - Transit stops and routes
   - `transit_alerts` - Service alerts and notifications

### 5. Firestore Data Structure

#### Transit Data Collection
```json
{
  "id": "string",
  "type": "bus" | "train",
  "route": "string",
  "destination": "string",
  "time": "string",
  "status": "On Time" | "Delayed",
  "delay": "string",
  "lat": "number",
  "lng": "number",
  "city": "string"
}
```

#### Transit Alerts Collection
```json
{
  "id": "string",
  "severity": "warning" | "info",
  "title": "string",
  "message": "string",
  "timestamp": "timestamp"
}
```

### 6. OmniDimension Voice Agent Setup

1. Sign up at [OmniDimension](https://www.omnidim.io/)
2. Create a voice agent for transit queries
3. Get your API key from the dashboard
4. Add the web widget script to your app (already included)

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) to view the application.

## 🎯 Voice Backend Setup (Optional)

For advanced voice features, set up the Python backend:

### 1. Navigate to Voice Backend

```bash
cd voice-backend
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Environment Variables

```bash
export OMNIDIM_API_KEY="your_omnidimension_api_key"
export GOOGLE_APPLICATION_CREDENTIALS="path_to_your_service_account.json"
```

### 4. Run the Backend Server

```bash
uvicorn main:app --reload --port 8000
```

## 📱 Usage

### Basic Navigation
1. **Login**: Use Google Sign-in to access the app
2. **View Transit Data**: Browse real-time transit information
3. **Check Alerts**: Monitor service alerts and notifications
4. **Voice Interaction**: Use the OmniDimension widget for voice queries

### Voice Commands
- "Is route 14 on time today?"
- "What's the status of bus route 5?"
- "Report a delay on train line 3"
- "Show me nearby transit stops"

## 🏗️ Project Structure

```
Navto/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── ui/             # UI components
│   │   ├── MainScreen.tsx  # Main application screen
│   │   ├── MapView.tsx     # Map component
│   │   └── ...
│   ├── services/           # API services
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── lib/                # Utility libraries
├── voice-backend/          # Python voice backend
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🔧 Configuration

### Customizing Transit Data
- Update `src/services/firestoreService.ts` for data fetching logic
- Modify `src/types/index.ts` for data structure changes
- Adjust map display in `src/components/MapView.tsx`

### Voice Agent Customization
- Configure voice agent prompts in OmniDimension dashboard
- Update voice backend endpoints in `voice-backend/main.py`
- Customize voice widget appearance via CSS

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Commit History

### Recent Commits
- `Complete NavAI transit app with OmniDimension voice integration and Firestore data`
- `Remove sensitive credentials and update .gitignore`
- `Add voice assistant component and map integration`
- `Initial setup with Next.js and Firebase`

### Commit Guidelines
- Use descriptive commit messages
- Include issue numbers when applicable
- Follow conventional commit format

## 🐛 Troubleshooting

### Common Issues

**Map not loading**
- Check if Leaflet CSS is properly imported
- Verify browser console for errors
- Ensure all dependencies are installed

**Voice widget not appearing**
- Verify OmniDimension API key is set
- Check network connectivity
- Ensure widget script is loaded

**Firestore connection issues**
- Verify Firebase configuration
- Check Firestore rules
- Ensure proper authentication

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vibe-a-Thon 2.0** for the hackathon opportunity
- **OmniDimension** for voice AI integration
- **Firebase** for backend services
- **Next.js** team for the amazing framework

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs`

---

**Built with ❤️ for Vibe-a-Thon 2.0**

*NavAI - Making transit navigation smarter and more accessible*
