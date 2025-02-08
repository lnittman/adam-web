import DefaultMetaTags from '@components/DefaultMetaTags';

interface HeadProps {
  params: Record<string, string>;
}

export default async function Head({ params }: HeadProps) {
  return (
    <>
      <DefaultMetaTags />
    </>
  );
}
