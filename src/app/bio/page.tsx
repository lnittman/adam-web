import DefaultLayout from '@/components/page/DefaultLayout';
import styles from '@/components/page/root.module.scss';
import BlockLoader from '@/components/BlockLoader';
import FooterNavigation from '@/components/FooterNavigation';
import Text from '@/components/Text';
import Accordion from '@/components/Accordion';
import Badge from '@/components/Badge';

export default function Bio() {
  return (
    <DefaultLayout previewPixelSRC="/skate.png">
      {/* Header */}
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.header}>
            <h1>Bio</h1>
            <BlockLoader mode={1} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.row}>
        <div className={styles.column}>
          {/* Introduction */}
          <Text>
            iOS Developer with a passion for creating elegant, user-centric mobile experiences.
            Currently based in Los Angeles, working on innovative projects that push the boundaries
            of what's possible on iOS.
          </Text>

          {/* Skills */}
          <div style={{ marginTop: '2rem' }}>
            <Text>Technical Skills</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {[
                'iOS Development', 'Swift', 'SwiftUI', 'UIKit',
                'React', 'TypeScript', 'Node.js', 'Python',
                'Git', 'CI/CD', 'AWS', 'Docker'
              ].map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginTop: '2rem' }}>
            <Accordion title="Work Experience">
              <Text>
                Senior iOS Developer @ Company (2020-Present)
                {'\n'}• Led development of flagship iOS application
                {'\n'}• Implemented CI/CD pipeline reducing deploy time by 50%
                {'\n'}• Mentored junior developers and led code reviews
              </Text>
              <Text>
                iOS Developer @ Previous Company (2018-2020)
                {'\n'}• Developed and maintained multiple iOS applications
                {'\n'}• Collaborated with design team on UX improvements
                {'\n'}• Implemented key features leading to 40% user growth
              </Text>
            </Accordion>

            <Accordion title="Personal Projects">
              <Text>
                {'\n'}• Published multiple apps with 100k+ downloads
                {'\n'}• Created open source iOS frameworks
                {'\n'}• Speaker at SwiftConf 2023
                {'\n'}• Regular contributor to iOS development community
              </Text>
            </Accordion>

            <Accordion title="Education">
              <Text>
                Computer Science, University Name
                {'\n'}• Focus on Mobile Development and Software Architecture
                {'\n'}• Led student iOS development group
                {'\n'}• Graduated with honors
              </Text>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <FooterNavigation />
        <div className={styles.footerContact}>
          <Text>
            <a href="mailto:adam.delaney11@gmail.com">📧 adam.delaney11@gmail.com</a>
          </Text>
          <Text>
            <a href="tel:2489283888">📱 (248) 928-3888</a>
          </Text>
          <Text>
            <a href="https://github.com/adelaney11" target="_blank">🐙 github.com/adelaney11</a>
          </Text>
        </div>
      </div>
    </DefaultLayout>
  );
} 