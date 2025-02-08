import DefaultLayout from '@/components/page/DefaultLayout';
import Text from '@/components/Text';

export default function Offline() {
  return (
    <DefaultLayout>
      <Text>You're offline. Some features may not be available.</Text>
      <Text>Connect to the internet to view the latest content.</Text>
    </DefaultLayout>
  );
} 