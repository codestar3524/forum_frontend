import { Nav, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsFillTagFill,BsBack } from "react-icons/bs";
import { GiPlayButton } from "react-icons/gi";
import { FaEye, FaThumbsUp, FaThumbsDown, FaBackward } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import {
  deleteTopic,
  toggleDownvoteTopic,
  toggleUpvoteTopic,
} from "../../redux/slices/topicSlice";
import { useDispatch, useSelector } from "react-redux";

const TopicContent = ({ topic, onDeleting }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const isAuth = localStorage.getItem("isLoggedIn") ? true : false;
  const { votingIsLoading, deleteTopicIsLoading } = useSelector(
    (state) => state.topic
  );

  const handleToggleUpvoteTopic = (id) => {
    dispatch(toggleUpvoteTopic(id));
  };

  const handleToggleDownvoteTopic = (id) => {
    dispatch(toggleDownvoteTopic(id));
  };

  return (
    <>

      <div className="topic-item-content">
        <Button onClick={()=>window.history.back()} className="top-content-back btn btn-sm btn-danger">
          <FaBackward /> Back to Forum</Button>
        <h4 className="topic-title">{topic?.title}</h4>
        <div className="topic-meta d-flex align-items-center">
          <div className="topic-writer d-flex align-items-center">
            {/* <Link
              className="d-flex align-items-center justify-content-center"
              to={`/user/${topic?.owner?.username}`}
            > */}
            <div
              className="d-flex align-items-center justify-content-center"
            >
              <Image src={topic?.owner?.avatar?.url} />
              <h5 className="writer">{`${topic?.owner?.firstName} ${topic?.owner?.lastName}`}</h5>
            </div>
            <p className="topic-date">
              Posted{" "}
              {moment
                .utc(topic?.createdAt)
                .local()
                .startOf("seconds")
                .fromNow()}
            </p>
          </div>
        </div>
        <p className="topic-summary">{topic?.content}</p>
        <div className="tags-container d-flex align-items-center">
          <span className="d-flex align-items-center">
            <BsFillTagFill />
            tags:
          </span>
          <Nav as="ul" className="tags">
            {topic?.tags?.length > 0 &&
              topic?.tags?.map((tag, i) => {
                return (
                  <Nav.Item key={i} as="li">
                    <Nav.Link>{tag?.name}</Nav.Link>
                  </Nav.Item>
                );
              })}
          </Nav>
        </div>
        <Nav className="thread-actions d-flex align-items-center">
          <div className="topic-vote d-flex align-items-center">
            <Button
              disabled={votingIsLoading}
              onClick={() => {
                if (!isAuth) navigate("/login");
                if (isAuth) handleToggleUpvoteTopic(topic._id);
              }}
              className={
                username && topic?.upvotes?.includes(username) ? "upvoted" : ""
              }
            >
              <div className="d-flex icon-container">
                <FaThumbsUp />
              </div>

            </Button>
            <span
              className={`votes ${username && topic?.upvotes?.includes(username) ? "upvoted" : ""
                }`}
            >
              {topic?.upvotes?.length}
            </span>
            <Button
              disabled={votingIsLoading}
              onClick={() => {
                if (!isAuth) navigate("/login");
                if (isAuth) handleToggleDownvoteTopic(topic._id);
              }}
              className={
                username && topic?.downvotes?.includes(username) ? "downvoted" : ""
              }
            >
              <div className="d-flex icon-container">
                <FaThumbsDown />
              </div>
            </Button>
            <span
              className={`${username && topic?.downvotes?.includes(username) ? "downvoted" : ""
                }`}
            >
              {topic?.downvotes?.length}
            </span>
          </div>
          <Nav.Link
            style={{ pointerEvents: `none` }}
            className="d-flex align-items-center"
          >
            <FaEye />
            {topic?.viewsCount} views
          </Nav.Link>
          {username && topic?.owner?.username === username && (
            <Nav.Link
              disabled={deleteTopicIsLoading}
              onClick={() => {
                if (!isAuth) {
                  navigate("/login");
                  return;
                }
                if (isAuth) {
                  dispatch(deleteTopic(topic?._id));
                  onDeleting();
                }
              }}
              className="d-flex align-items-center"
            >
              <MdDelete />
              delete this topic
            </Nav.Link>
          )}
        </Nav>
      </div>
    </>
  );
};

export default TopicContent;
