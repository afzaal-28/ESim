import React, { useEffect, useState, useCallback } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { tailwind } from 'react-native-tailwindcss';
import { simCompatibilityCheck } from '../utils/simCompatibilityCheck';
import { getDeviceInfo } from '../utils/getDeviceInfo';
import { useColorScheme } from 'react-native';

const Screen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isSupported, setIsSupported] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deviceInfo, setDeviceInfo] = useState({ brand: '', model: '', systemVersion: '' });
  const [loading, setLoading] = useState(true);

  const checkEsim = useCallback(() => {
    setLoading(true);
    setError(null);
    setIsSupported(null);
    simCompatibilityCheck()
      .then(setIsSupported)
      .catch(() => {
        setError('Error checking eSIM support.');
        setIsSupported(false);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setDeviceInfo(getDeviceInfo());
    checkEsim();
  }, [checkEsim]);

  let statusText = '';
  let statusColor = isDarkMode ? tailwind.textGray100 : tailwind.textGray700;
  if (error) {
    statusText = error;
    statusColor = tailwind.textRed600;
  } else if (isSupported === null) {
    statusText = 'Checking eSIM support...';
    statusColor = tailwind.textBlue600;
  } else if (isSupported) {
    statusText = '✅ eSIM is supported on this device!';
    statusColor = tailwind.textGreen600;
  } else {
    statusText = '❌ eSIM is NOT supported on this device.';
    statusColor = tailwind.textRed600;
  }

  const bgColor = isDarkMode ? tailwind.bgGray900 : tailwind.bgWhite;
  const cardBg = isDarkMode ? tailwind.bgGray800 : tailwind.bgWhite;
  const headingBg = isDarkMode ? tailwind.bgBlue900 : tailwind.bgBlue100;
  const headingText = isDarkMode ? tailwind.textBlue200 : tailwind.textBlue800;
  const shadow = isDarkMode ? tailwind.shadow : tailwind.shadowLg;

  return (
    <ScrollView contentContainerStyle={[
      tailwind.flexGrow,
      tailwind.justifyCenter,
      tailwind.itemsCenter,
      bgColor,
      tailwind.pY8,
      { minHeight: '100%' },
    ]}>
      <View style={[
        headingBg,
        shadow,
        tailwind.roundedL,
        tailwind.pY4,
        tailwind.pX8,
        tailwind.mB6,
        tailwind.itemsCenter,
        { minWidth: 280, maxWidth: 420 },
      ]}>
        <Text style={[
          tailwind.text4xl,
          tailwind.fontBlack,
          headingText,
          tailwind.textCenter,
          { letterSpacing: 2 },
        ]}>
          eSIM Checker
        </Text>
      </View>
      <Card cardBg={cardBg}>
        <Text style={[tailwind.textBase, tailwind.fontBold, tailwind.mB2, isDarkMode ? tailwind.textGray200 : tailwind.textGray800]}>Device Info</Text>
        <Text style={[tailwind.textSm, isDarkMode ? tailwind.textGray300 : tailwind.textGray700]}>Brand: {deviceInfo.brand}</Text>
        <Text style={[tailwind.textSm, isDarkMode ? tailwind.textGray300 : tailwind.textGray700]}>Model: {deviceInfo.model}</Text>
        <Text style={[tailwind.textSm, isDarkMode ? tailwind.textGray300 : tailwind.textGray700]}>System Version: {deviceInfo.systemVersion}</Text>
      </Card>
      <Text
        style={[
          tailwind.mT4,
          tailwind.textLg,
          tailwind.fontBold,
          statusColor,
          tailwind.textCenter,
          tailwind.pX8,
        ]}
      >
        {statusText}
      </Text>
      <TouchableOpacity
        style={[
          tailwind.mT6,
          tailwind.bgBlue600,
          tailwind.pY3,
          tailwind.pX8,
          tailwind.rounded,
          tailwind.shadow,
          loading ? tailwind.opacity50 : null,
          tailwind.flexRow,
          tailwind.itemsCenter,
          tailwind.justifyCenter,
        ]}
        onPress={checkEsim}
        disabled={loading}
      >
        {loading && !error ? (
          <View style={[tailwind.mR2, { width: 20, height: 20 }]}> 
            <LoaderDot />
          </View>
        ) : null}
        <Text style={[tailwind.textWhite, tailwind.textLg, tailwind.fontBold]}>{loading && !error ? 'Checking...' : 'Retry'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Card = ({ children, cardBg }: { children: React.ReactNode; cardBg: any }) => (
  <View style={[
    cardBg,
    tailwind.roundedLg,
    tailwind.shadowLg,
    tailwind.p4,
    tailwind.mB4,
    { minWidth: 320, maxWidth: 400 },
  ]}>
    {children}
  </View>
);

// Simple loader dot for button
const LoaderDot = () => (
  <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff', opacity: 0.7 }} />
  </View>
);

export default Screen;
