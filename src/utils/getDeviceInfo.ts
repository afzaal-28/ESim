import DeviceInfo from 'react-native-device-info';

export function getDeviceInfo() {
  return {
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    systemVersion: DeviceInfo.getSystemVersion(),
  };
} 