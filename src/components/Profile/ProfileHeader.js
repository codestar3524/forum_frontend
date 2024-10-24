import { useMemo, memo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Image, Nav } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import {
  RiBallPenFill
} from "react-icons/ri";
import { SiGooglemessages } from "react-icons/si";
import { TiGroup } from "react-icons/ti";
import { FaUserCheck, FaThumbsUp, FaBitcoin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/profileSlice";
import FollowButton from "./FollowButton";
import SkeletonProfileHeader from "../Skeletons/SkeletonProfileHeader";
import CountUp from "react-countup";

const ProfileHeader = memo(() => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { userProfile, profileIsLoading } = useSelector(
    (state) => state.profile
  );
  const loggedUser = JSON.parse(localStorage.getItem("user"))?._id;

  // useEffect(() => {
  //   if (username) document.title = `${username} Profile | ONetwork Forum`;
  // }, [username]);

  useMemo(() => {
    dispatch(getUserProfile(_id));
  }, [dispatch, _id]);

  // eslint-disable-next-line
  return useMemo(() => {
    if (profileIsLoading) {
      return <SkeletonProfileHeader />;
    }
    if (
      !profileIsLoading &&
      userProfile &&
      Object.entries(userProfile)?.length > 0
    ) {
      return (
        <div className="profile-header">
          <div
            className="user-profile-meta d-flex"
            style={{
              backgroundImage: `linear-gradient(rgb(0 3 152 / 33%), rgb(25 139 195 / 38%)), url(${userProfile?.cover?.url})`,
            }}
          >
            <Link
              to={`/user/${userProfile?._id}`}
              className="user-avatar d-flex"
            >
              <Image src={userProfile?.avatar?.url} />
            </Link>
            <div className="user-info d-flex flex-column">
              <h4 className="user-name">{`${userProfile?.firstName} ${userProfile?.lastName}`}</h4>
              {/* <div className="user-bio">{userProfile?.bio}</div> */}
              <div className="user-meta">
                {/* <span className="user-id">{userProfile?.username}</span> */}
                {/* <span className="username">{userProfile?.email}</span> */}
                {/* <span className="user-website">sphinxo.dev</span> */}
              </div>
              <div className="user-actions">
                {_id === loggedUser && (
                  <Link to={`/user/${userProfile?._id}/edit`}>
                    <Button className="edit d-inline-flex align-items-center">
                      <MdEdit />
                      Edit Profile
                    </Button>
                  </Link>
                )}
                <FollowButton passedUser={userProfile} />
              </div>
            </div>
            <div className="d-flex align-items-center token-number">
              <FaBitcoin />
              <CountUp
                className="account-balance"
                start={0}
                end={49500}
                duration={1}
                useEasing={true}
                separator=","
              />
            </div>
          </div>
          <div className="profile-header-section">

            <Nav as="ul" className="profile-menu">
              <Nav.Link
                as={Link}
                to={`/user/${userProfile?._id}/topics`}
                eventKey="topics"
                className="d-flex align-items-center"
              >
                <div className="d-flex icon-container">
                  <RiBallPenFill />
                </div>
                Topics Created
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/user/${userProfile?._id}/upvotes`}
                eventKey="upvotes"
                className="d-flex align-items-center"
              >
                <div className="d-flex icon-container">
                  <FaThumbsUp />
                </div>
                Upvoted Topics
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/user/${userProfile?._id}/comments`}
                eventKey="comments"
                className="d-flex align-items-center"
              >
                <div className="d-flex icon-container">
                  <SiGooglemessages />
                </div>
                Comments
              </Nav.Link>
              {/* <Nav.Link
                as={Link}
                to={`/user/${userProfile?._id}/following`}
                eventKey="following"
                className="d-flex align-items-center"
              >
                <div className="d-flex icon-container">
                  <FaUserCheck />
                </div>
                Following
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/user/${userProfile?._id}/followers`}
                eventKey="followers"
                className="d-flex align-items-center"
              >
                <div className="d-flex icon-container">
                  <TiGroup />
                </div>
                Followers
              </Nav.Link> */}
            </Nav>
          </div>
        </div>
      );
    }
    // eslint-disable-next-line
  }, [userProfile, profileIsLoading]);
});

export default ProfileHeader;
