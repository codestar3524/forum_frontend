import { Col, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserFollowing } from "../../../redux/slices/profileSlice";
import { useMemo, useEffect } from "react";
import FollowButton from "../FollowButton";
import SkeletonFollowTab from "../../Skeletons/SkeletonFollowTab";

const FollowingTab = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { userFollowing, followIsLoading } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    dispatch(getUserFollowing(_id));
  }, [dispatch, _id]);

  return useMemo(() => {
    return (
      <>
        <Row className="profile-info">
          <Col>
            <div className="tab-ui">
              <h6 className="tab-title">Following</h6>
              <Row>
                {followIsLoading && <SkeletonFollowTab />}
                {!followIsLoading && userFollowing && userFollowing.length > 0 ? (
                  userFollowing.map((user) => (
                    <Col key={user?._id} lg={12}>
                      <div className="follow-brief d-flex align-items-center">
                        <Image src={user?.avatar?.url} />
                        <div className="user-meta d-flex flex-column">
                          <h5 className="user-name">
                            {user?.firstName} {user?.lastName}
                          </h5>
                          <span className="username">@{user?.username}</span>
                          <span className="user-bio">{user?.bio}</span>
                        </div>
                        <FollowButton passedUser={user} />
                      </div>
                    </Col>
                  ))
                ) : (
                  !followIsLoading && <p>No following users found</p>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </>
    );
  }, [userFollowing, followIsLoading]);
};

export default FollowingTab;
