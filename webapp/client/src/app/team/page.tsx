import React from 'react';
import TeamMember from '../ui/TeamMember';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Cristian Horacio Belussi',
      profilePicture: 'https://avatars.githubusercontent.com/u/20509133?v=4',
      githubUsername: 'xtianhb',
    },
    {
      name: 'Álvaro Ruiz',
      profilePicture: 'https://avatars.githubusercontent.com/u/58787603?v=4',
      githubUsername: 'alvarorf',
    },
    {
      name: 'Jhoan Najera',
      profilePicture: 'https://avatars.githubusercontent.com/u/128323811?v=4',
      githubUsername: 'jhoannajera11',
    },
    {
      name: 'Jorge Damian Bringas',
      profilePicture: 'https://avatars.githubusercontent.com/u/140633379?v=4',
      githubUsername: 'xtianhb',
    },
    {
      name: 'Jose David Nuñez',
      profilePicture: 'https://avatars.githubusercontent.com/u/78088827?v=4',
      githubUsername: 'josedavidnup',
    },
    {
      name: 'Luis Dotto',
      profilePicture: 'https://avatars.githubusercontent.com/u/93018629?v=4',
      githubUsername: 'Dotto-Luis',
    },
    {
      name: 'Sergio Buzzi',
      profilePicture: 'https://avatars.githubusercontent.com/u/12287751?v=4',
      githubUsername: 'Dotto-Luis',
    },
    // Add more team members as needed
  ];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4 text-center'>Our Team</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
