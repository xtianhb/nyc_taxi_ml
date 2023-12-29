/**
 * Calculates the distance between two addresses in miles.
 */
async function getDistanceInMiles(
  addressFrom: string,
  addressTo: string
): Promise<string> {
  // Google API key
  const apiKey: string = 'AIzaSyBAw4NhN1QsjPWlH1KNqJh2HeKwwM3Au0A';

  // Change address format
  const formattedAddrFrom: string = addressFrom.replace(/ /g, '+');
  const formattedAddrTo: string = addressTo.replace(/ /g, '+');

  // Geocoding API request with start address
  const geocodeFromResponse: Response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddrFrom}&sensor=false&key=${apiKey}`
  );
  const outputFrom = await geocodeFromResponse.json();

  // Geocoding API request with end address
  const geocodeToResponse: Response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddrTo}&sensor=false&key=${apiKey}`
  );
  const outputTo = await geocodeToResponse.json();

  // Check for geocoding errors
  if (!outputFrom.results || outputFrom.error_message) {
    throw new Error(
      outputFrom.error_message || 'Geocoding error for start address'
    );
  }

  if (!outputTo.results || outputTo.error_message) {
    throw new Error(
      outputTo.error_message || 'Geocoding error for end address'
    );
  }

  // Get latitude and longitude from the geodata
  const latitudeFrom: number = outputFrom.results[0].geometry.location.lat;
  const longitudeFrom: number = outputFrom.results[0].geometry.location.lng;
  const latitudeTo: number = outputTo.results[0].geometry.location.lat;
  const longitudeTo: number = outputTo.results[0].geometry.location.lng;

  // Calculate distance between latitude and longitude in miles
  const theta: number = longitudeFrom - longitudeTo;
  let dist: number =
    Math.sin(deg2rad(latitudeFrom)) * Math.sin(deg2rad(latitudeTo)) +
    Math.cos(deg2rad(latitudeFrom)) *
      Math.cos(deg2rad(latitudeTo)) *
      Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  const miles: number = dist * 60 * 1.1515;

  // Return distance in miles
  return `${miles.toFixed(2)} miles`;
}

// Example usage
const addressFrom: string = '350 Grand St, New York, NY 10002, USA';
const addressTo: string = '195 Graham Ave, Brooklyn, NY 11206, USA';

// Get distance in miles
getDistanceInMiles(addressFrom, addressTo)
  .then((distance) => console.log(distance))
  .catch((error) => console.error(error));

// Helper function to convert degrees to radians
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Helper function to convert radians to degrees
function rad2deg(rad: number): number {
  return rad * (180 / Math.PI);
}
