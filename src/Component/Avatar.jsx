import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Avatar = ({ name }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get('https://ui-avatars.com/api/', {
          params: {
            name: name,
            size: '42',
            rounded: 'true',
            background: 'random',
            length:1
          },
        });
        setAvatarUrl(response.request.responseURL);
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    fetchAvatar();
  }, [name]);

  return <img src={avatarUrl} alt="Avatar" className='w-10 h-10' />;
};

export default Avatar;
