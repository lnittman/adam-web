import DefaultLayout from '@/components/page/DefaultLayout';
import styles from '@/components/page/root.module.scss';
import BlockLoader from '@/components/BlockLoader';
import FooterNavigation from '@/components/FooterNavigation';
import Text from '@/components/Text';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ActionListItem from '@/components/ActionListItem';
import BarProgress from '@/components/BarProgress';

const projects = [
  {
    title: 'Project One',
    description: 'A mobile app for tracking daily habits and goals.',
    tech: ['Swift', 'SwiftUI', 'Core Data'],
    link: 'https://github.com/adelaney11/project-one',
    progress: 100,
  },
  {
    title: 'Project Two',
    description: 'Real-time chat application with end-to-end encryption.',
    tech: ['React Native', 'Firebase', 'TypeScript'],
    link: 'https://github.com/adelaney11/project-two',
    progress: 85,
  },
  {
    title: 'Project Three',
    description: 'Machine learning model for predicting user behavior.',
    tech: ['Python', 'TensorFlow', 'scikit-learn'],
    link: 'https://github.com/adelaney11/project-three',
    progress: 70,
  },
];

export default function Projects() {
  return (
    <DefaultLayout previewPixelSRC="/skate.png">
      {/* Header */}
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.header}>
            <h1>Projects</h1>
            <BlockLoader mode={3} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.row}>
        <div className={styles.column}>
          <Text>
            A collection of my recent projects, showcasing my work in iOS development,
            web technologies, and machine learning.
          </Text>

          {/* Projects Grid */}
          <div style={{ marginTop: '2rem' }}>
            {projects.map((project, index) => (
              <Card key={index} style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <Text>{project.title}</Text>
                  <Text>{project.description}</Text>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  {project.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <Text>Project Progress</Text>
                  <BarProgress progress={project.progress} />
                </div>

                <ActionListItem 
                  icon="⊹" 
                  href={project.link} 
                  target="_blank"
                >
                  View Project
                </ActionListItem>
              </Card>
            ))}
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