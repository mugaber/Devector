const express = require('express');
const router = express.Router();

const Profile = require('../models/Profile');
const User = require('../models/User');

const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');

const request = require('request');
const config = require('config');

//

// @route   GET api/profile/me
// @desc    to get one User
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avater']);
    // in the model the ref was - users - and should be user ?

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.status(200).json({ profile });
    //
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/
// @desc    Create & Update user profile
// @access  Private
router.post(
  '/',

  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      location,
      company,
      website,
      status,
      skills,
      bio,
      githubusername,
      instagram,
      facebook,
      linkedin,
      youtube,
      twitter
    } = req.body;

    // build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (githubusername) profileFields.githubusername = githubusername;
    if (location) profileFields.location = location;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;

    // check if the user exists
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(400).json({ msg: 'User Does not exist' });
      }
    } catch (err) {
      console.error(err.message);
      return res.send('Server Error');
    }

    // create or update the profile
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findByIdAndUpdate(
          profile.id,
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      await profile.save();

      res.json(profile);
      //
    } catch (error) {
      console.log(error.message);
      res.status(500).send('server error');
    }
  }
);

// TODO delete this route at production
// @route     GET api/profile/
// @desc      Get all profiles
// @access    Public
// router.get('/', async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate('user', ['name', 'avatar']);

//     res.status(200).json(profiles);
//     //
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route     GET api/profile/user/:user_id
// @desc      Get profile by user ID
// @access    Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avater']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route     DELETE /api/profile/user
// @desc      delete profile, user & posts
// @access    Private
router.delete('/user', auth, async (req, res) => {
  // check if the user exists
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ msg: 'User is already deleted' });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }

  // delete
  try {
    // delete posts

    // delete profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // delete user
    await User.findOneAndDelete({ _id: req.user.id });

    res.status(200).json({ msg: 'User Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExpr = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExpr);
      await profile.save();

      res.status(200).json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(400).send('Server Error');
    }
  }
);

// @route   DELETE api/profile/experience
// @desc    Delete experience from experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(400).json({ msg: 'profile not found' });
  }

  try {
    profile.experience = profile.experience.filter(
      exp => exp._id != req.params.exp_id
    );
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile/education
// @desc    Add profile education
// @access  Private
router.post(
  '/education',
  [
    auth,
    [
      check('school', 'School is requierd')
        .not()
        .isEmpty(),
      check('degree', 'Degree is requierd')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Fieldofstudy is requierd')
        .not()
        .isEmpty(),
      check('from', 'From date is requierd')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const newEdu = {
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        return res.status(400).json({ msg: 'Profile not found' });
      }

      profile.education.unshift(newEdu);
      await profile.save();

      res.status(200).json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send('Server Error');
    }
  }
);

// @route   DELETE/api/profile/education/:edu_id
// @desc    Delete education from education
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    return res.status(400).json({ msg: 'Profile not found' });
  }

  try {
    profile.education = profile.education.filter(
      edu => edu._id != req.params.edu_id
    );
    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
