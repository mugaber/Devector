import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../redux/profile/actions'

import Experience from './Experience'
import DashboardActions from './DashboardActions'
import Spinner from '../layout/Spinner'
import Education from './Education'

//

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  if (loading && profile === null) {
    return <Spinner />
  }

  return (
    <>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fa fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />

          {profile.profile && profile.profile.experience && (
            <Experience experience={profile.profile.experience} />
          )}

          {profile.profile && profile.profile.education && (
            <Education education={profile.profile.education} />
          )}

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fa fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p> You do not have a profile, please setup one</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
