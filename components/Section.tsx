import React from 'react';
import { Section as SectionPrimitive, type SectionProps } from './ui/section';

const Section: React.FC<SectionProps> = (props) => {
  return <SectionPrimitive {...props} />;
};

export default Section;
