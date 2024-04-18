import React from 'react';
import '../../Style/Profile.css'; // Fichier CSS pour styliser le composant
import image from '../../assets/imageProfile.jpg'
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const ProfileHeader = ({avatar}) => {
  return (
  
      <div className="profile-image-container">
        <Col xs={1} md={1}>
          <Image src={ avatar ?  avatar : image} roundedCircle alt='image' className='profile-image' />
        </Col>
      </div>
  );
};

export default ProfileHeader;
