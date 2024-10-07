import { Row, Col, Container, Pagination, Form } from "react-bootstrap";
import TopicItem from "../components/Topic/TopicItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getAllTopics, getMyTopics } from "../redux/slices/topicSlice";
import { resetUserProfile } from "../redux/slices/profileSlice";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import SkeletonTopicItem from "../components/Skeletons/SkeletonTopicItem";
import { setSearchUser } from "../redux/slices/topicSlice";

import Topbar from "../components/Topbar";
import TopContributorSwiper from "../components/TopContributorSwiper/TopContributorSwiper";

const Home = () => {
  const dispatch = useDispatch();

  // Destructure necessary data from Redux state
  const { topics, getAllTopicsIsLoading, totalTopics } = useSelector((state) => state.topic);
  const { username, email } = useSelector((state) => state.auth.user);
  const { sortOption, searchQuery, searchUser } = useSelector((state) => state.topic);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 4;

  // Update document title on mount
  useEffect(() => {
    document.title = `Home | ONetwork Forum`;
  }, []);

  // Fetch topics whenever sortOption, searchQuery, or currentPage changes
  useEffect(() => {
    dispatch(resetUserProfile());
    dispatch(getAllTopics({ page: currentPage, limit: topicsPerPage, sortOption, searchQuery, searchUser }));
  }, [dispatch, sortOption, searchQuery, searchUser, currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClickSidebar = (params) => {


    if (params == 'my') {
      username ? dispatch(setSearchUser(username)) : alert("Please login.");
    } else {
      dispatch(setSearchUser(""));

    }
  }
  // Calculate total pages based on totalTopics
  const totalPages = Math.ceil((totalTopics || 0) / topicsPerPage);

  const paginationComponent =
    totalPages > 1 && (
      <Pagination className="my-1">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <input className="page-count" type="number" min={1} max={totalPages} value={currentPage} onChange={(e) => handlePageChange(e.target.value)} />
       
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );


  return (
    <>
      <main className="forum-container">
        <Container>
          <Topbar />
          <Row>
            <LeftSidebar handleClick={handleClickSidebar} />
            <Col lg={9} md={12} className="main-content">
        
              <div className="topics">
                {getAllTopicsIsLoading ? (
                  <>
                    <SkeletonTopicItem />
                    <SkeletonTopicItem />
                  </>
                ) : (
                  Array.isArray(topics) && topics.length > 0 ? (
                    topics.map((topic, idx) => (
                      <TopicItem key={idx} topic={topic} />
                    ))
                  ) : (
                    <p>No topics found</p> // Display a message if no topics are found
                  )
                )}
              </div>

              {/* Pagination Component */}
              {paginationComponent}
            </Col>
            {/* <RightSidebar /> */}
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Home;
