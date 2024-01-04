export interface ApiResponse {
  fare: number;
  duration: number;
}

export interface TeamMemberProps {
  name: string;
  profilePicture: string;
  githubUsername: string;
  linkedinUsername: string;
}

export interface PredictionProps {
  fare: number;
  duration: number;
}

export interface MapProps {
  center: { lat: number; lng: number };
  directionsResponse: google.maps.DirectionsResult | null;
}

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}
