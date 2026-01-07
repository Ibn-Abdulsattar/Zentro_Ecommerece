import { StatusCodes } from "http-status-codes";
import NodeGeocoder from "node-geocoder";
import getHaversineDistance from "../services/getHaversineDistance.js";

export const findExtremes = async (req, res) => {
  const { address } = req.body;

  const geocoder = NodeGeocoder({ provider: "openstreetmap" });

  const results = await geocoder.geocode(address);
  if (!results.length)
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "Address not found" });

  const startPoint = { lat: results[0].latitude, lon: results[0].longitude };  //result[0] = target

  const locations = [
    { name: "Paris Office", lat: 48.8566, lon: 2.3522 },
    { name: "London Hub", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo Branch", lat: 35.6762, lon: 139.6503 },
  ];

  const calculated = locations.map((loc) => ({
    ...loc,
    disKm: getHaversineDistance(startPoint, { lat: loc.lat, lon: loc.lon }).toFixed(2),
  }));

  calculated.sort((a, b) => a.disKm - b.disKm);

  const totalDistance = { nearLoc: calculated[0], farLoc: calculated.at(-1) };

  return res
    .status(StatusCodes.OK)
    .json({ message: "Your Distance", totalDistance });
};
