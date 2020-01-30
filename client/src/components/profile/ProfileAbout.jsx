import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { user, bio, skills } }) => {
  return (
    <div class='profile-about bg-light p-2'>
      {bio && (
        <>
          <h2 class='text-primary'>{user.name.trim().split(' ')[0]}s bio</h2>
          <p>{bio && bio}</p>
        </>
      )}
      <div class='line'></div>

      <h2 class='text-primary'>Skill Set</h2>
      <div class='skills'>
        {skills.map((skill, index) => (
          <div class='p-1' key={index}>
            <i class='fa fa-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
