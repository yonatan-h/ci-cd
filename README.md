# Weather App

A modern Weather App built with Next.js and jest that provides real-time weather updates for any location.  
This project uses a full CI/CD pipeline with SonarQube for continuous code quality analysis.

## Features

- 🌦️ Real-time weather information by city or geolocation
- ⚡ Built with Next.js for fast, server-rendered React apps
- 📱 Responsive design for mobile and desktop devices
- 🧪 Automated testing and code linting
- 🚀 CI/CD pipeline with GitHub Actions
- 📊 SonarQube integration for code quality and security analysis

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- [SonarQube](https://www.sonarqube.org/) server (for code analysis)
- (Optional) Weather API key (e.g., OpenWeatherMap)

### Installation

```bash
git clone https://github.com/yonatan-h/ci-cd.git
cd ci-cd
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file and add your weather API key:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

## CI/CD Pipeline

This project uses GitHub Actions for automated builds, tests, and deployments.

### SonarQube Code Analysis

SonarQube is integrated into the CI/CD pipeline to ensure code quality and security.

- Code is analyzed on every push and pull request.
- Quality gates must pass before merging to main.


## Testing

```bash
npm run test
# or
yarn test
```

## Deployment

Configure your preferred deployment service (Vercel, Netlify, etc.)  
The `main` branch is automatically deployed after passing CI/CD checks.

---

## License

MIT

---

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

