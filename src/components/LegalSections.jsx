import React from 'react';
import { company } from '../data/company';

export default function LegalSections({ content }) {
  return (
    <>
      {content.intro && <p>{content.intro}</p>}
      {content.sections.map(([title, body]) => (
        <React.Fragment key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
      {content.contactTitle && (
        <>
          <h2>{content.contactTitle}</h2>
          <p>
            {content.contactLabel}: <a href={`mailto:${company.contacts.email}`}>{company.contacts.email}</a>
          </p>
        </>
      )}
    </>
  );
}
