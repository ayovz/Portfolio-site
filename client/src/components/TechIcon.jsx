import {
  SiReact, SiNodedotjs, SiMongodb, SiTypescript,
  SiFigma, SiGraphql, SiStripe, SiRedux, SiPython,
  SiFastapi, SiOpenai, SiPostgresql, SiExpress, SiExpo,
  SiDocker
} from 'react-icons/si';
import { FiCode, FiCloud } from 'react-icons/fi';

const iconMap = {
  'react': SiReact,
  'react native': SiReact,
  'react / next': SiReact,
  'node.js': SiNodedotjs,
  'mongodb': SiMongodb,
  'typescript': SiTypescript,
  'ui/ux design': SiFigma,
  'graphql': SiGraphql,
  'stripe': SiStripe,
  'redux': SiRedux,
  'python': SiPython,
  'fastapi': SiFastapi,
  'openai': SiOpenai,
  'postgresql': SiPostgresql,
  'express': SiExpress,
  'expo': SiExpo,
  'docker / cloud': SiDocker,
  'cloud': FiCloud
};

const TechIcon = ({ name, ...props }) => {
  const Icon = iconMap[name?.toLowerCase()] || FiCode;
  return <Icon {...props} />;
};

export default TechIcon;
