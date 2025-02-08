// Update these imports to point to your actual component and stylesheet locations
import DefaultLayout from '../components/page/DefaultLayout'; 
import styles from '../components/page/root.module.scss';
import AsciiText from '../components/examples/AsciiText';

export default function Home() {
  return (
    <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
      <div className={styles.row}>
        <div className={styles.column}>
          <AsciiText text="🛹" />
        </div>
      </div>
    </DefaultLayout>
  );
}
