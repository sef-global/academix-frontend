import ReactGA from 'react-ga';

export const trackPageWithGoogleAnalytics = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};
