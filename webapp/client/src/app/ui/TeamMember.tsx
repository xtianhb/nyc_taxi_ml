import Image from 'next/image';
import React from 'react';

interface TeamMemberProps {
  name: string;
  profilePicture: string;
  githubUsername: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  profilePicture,
  githubUsername,
}) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md text-center'>
      <Image
        src={profilePicture}
        alt={name}
        width={24}
        height={24}
        className='object-cover mx-auto mb-4 rounded-full'
      />
      <h2 className='text-lg font-bold mb-2'>{name}</h2>
      <p>
        GitHub:
        <a
          href={`https://github.com/${githubUsername}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:underline'
        >
          {githubUsername}
        </a>
      </p>
    </div>
  );
};

export default TeamMember;
