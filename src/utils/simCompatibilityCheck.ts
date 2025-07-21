import SimCardsManagerModule from 'react-native-sim-cards-manager';
import EsimManager from 'react-native-esim';

export const simCompatibilityCheck = async (): Promise<boolean> => {
  try {
    const isSupported: boolean = await SimCardsManagerModule.isEsimSupported();

    if (isSupported) {
      console.log('Device supports eSIM.');
      return true;
    } else {
      console.log('Device does not support eSIM.');
      return false;
    }
  } catch (error) {
    console.error('Error checking SIM compatibility:', error);
    return false;
  }
};

export async function isEsimSupported() {
  try {
    const supported = await EsimManager.isEsimSupported();
    return supported;
  } catch (error) {
    console.error('Error checking eSIM support:', error);
    return false; 
  }
}

export async function getSimCardsInfo() {
  try {
    const simCards = await SimCardsManagerModule.getSimCards({
      title: 'SIM Info Permission',
      message: 'This app needs access to your SIM card information.',
      buttonNeutral: 'Not now',
      buttonNegative: 'Not OK',
      buttonPositive: 'OK',
    });
    return simCards;
  } catch (error) {
    console.error('Error fetching SIM cards info:', error);
    return [];
  }
} 