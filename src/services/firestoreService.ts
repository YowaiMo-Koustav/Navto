import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import type { ServiceAlert, TransitDeparture } from '@/types';

/**
 * Listens for real-time updates to transit alerts.
 * @param callback Function to call with the updated alerts.
 * @returns Unsubscribe function.
 */
export const getRealtimeAlerts = (callback: (alerts: ServiceAlert[]) => void) => {
  const alertsCollection = collection(db, 'transit_alerts');
  const q = query(alertsCollection, orderBy('timestamp', 'desc'));

  return onSnapshot(q, (querySnapshot) => {
    const alerts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as ServiceAlert));
    callback(alerts);
  }, (error) => {
    console.error("Error fetching real-time alerts: ", error);
  });
};

/**
 * Adds a new transit alert to the database.
 * @param alertData The alert data to add.
 * @returns The ID of the newly created document, or null on error.
 */
export const addTransitAlert = async (alertData: Omit<ServiceAlert, 'id' | 'timestamp'>) => {
  try {
    const alertsCollection = collection(db, 'transit_alerts');
    const docRef = await addDoc(alertsCollection, {
        ...alertData,
        timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding transit alert: ", e);
    return null;
  }
};

/**
 * Fetches the list of transit departures from the 'transit_data' collection.
 * @returns A promise that resolves to an array of transit departures.
 */
export const getDepartures = async (): Promise<TransitDeparture[]> => {
  try {
    const dataCollection = collection(db, 'transit_data');
    const dataSnapshot = await getDocs(dataCollection);
    return dataSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as TransitDeparture));
  } catch (e) {
    console.error("Error fetching departures: ", e);
    return [];
  }
};
