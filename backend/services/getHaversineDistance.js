const getHaversineDistance = (p1, p2) => {
  const R = 6371;
  
  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLon = ((p2.lon - p1.lon) * Math.PI) / 180;

  const a = //  It takes the difference in latitude (dLat), divides it by 2, and finds the sine. Then it squares it (sin * sin).
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //  measures Horizontal Gap 
    Math.cos((p1.lat * Math.PI) / 180) *
      Math.cos((p2.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Ensure distance
  return R * c; 
};

export default getHaversineDistance;
