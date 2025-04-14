import React, { useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

interface CalendarEvent {
  title: string;
  date: Date;
  location?: string;
}

interface Quote {
  text: string;
  author: string;
}

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 72,
    condition: 'Sunny',
    location: 'San Francisco, CA'
  });

  const [nextEvent, setNextEvent] = useState<CalendarEvent>({
    title: 'Team Meeting',
    date: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
    location: 'Conference Room A'
  });

  const [quote, setQuote] = useState<Quote>({
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  });

  // Simulate data fetching
  useEffect(() => {
    // In a real app, you would fetch data here
    // This is just a placeholder for demonstration
    const timer = setInterval(() => {
      // Update time for next event to keep it current
      setNextEvent(prev => ({
        ...prev,
        date: new Date(prev.date.getTime())
      }));
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatEventTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatEventDate = (date: Date): string => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Personal Dashboard</h1>
      
      <div style={styles.dashboardGrid}>
        {/* Weather Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Current Weather</h2>
          <div style={styles.weatherContent}>
            <div style={styles.temperature}>{weather.temperature}°F</div>
            <div style={styles.weatherDetails}>
              <div style={styles.condition}>{weather.condition}</div>
              <div style={styles.location}>{weather.location}</div>
            </div>
          </div>
        </div>
        
        {/* Next Event Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Next Event</h2>
          <div style={styles.eventContent}>
            <div style={styles.eventTitle}>{nextEvent.title}</div>
            <div style={styles.eventTime}>
              {formatEventDate(nextEvent.date)} at {formatEventTime(nextEvent.date)}
            </div>
            {nextEvent.location && (
              <div style={styles.eventLocation}>{nextEvent.location}</div>
            )}
          </div>
        </div>
        
        {/* Inspirational Quote Card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Daily Inspiration</h2>
          <div style={styles.quoteContent}>
            <p style={styles.quoteText}>"{quote.text}"</p>
            <p style={styles.quoteAuthor}>— {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f7fa',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 500,
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease-in-out',
    cursor: 'default',
    height: '200px',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#555',
    marginTop: 0,
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  weatherContent: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  temperature: {
    fontSize: '48px',
    fontWeight: 300,
    color: '#333',
    marginRight: '20px',
  },
  weatherDetails: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
  },
  condition: {
    fontSize: '18px',
    fontWeight: 500,
    color: '#444',
    marginBottom: '5px',
  },
  location: {
    fontSize: '14px',
    color: '#666',
  },
  eventContent: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    height: '100%',
  },
  eventTitle: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#333',
    marginBottom: '10px',
  },
  eventTime: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '5px',
  },
  eventLocation: {
    fontSize: '14px',
    color: '#777',
  },
  quoteContent: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    height: '100%',
    padding: '0 10px',
  },
  quoteText: {
    fontSize: '18px',
    fontStyle: 'italic',
    color: '#444',
    marginBottom: '15px',
    lineHeight: 1.4,
  },
  quoteAuthor: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'right' as 'right',
    marginTop: 'auto',
  },
};

export default App;