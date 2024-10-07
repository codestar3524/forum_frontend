import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";
// import SpacesCard from "./Cards/SpacesCard";
import TopHelpersCard from "../RightSidebar/Cards/TopHelpersCard";
import TopContributorSwiper from "../TopContributorSwiper/TopContributorSwiper";
import TopContributorsCard from "../RightSidebar/Cards/TopContributorsCard";
const LeftSidebar = (props) => {
  return (
    <Col lg={3} md={12} className="left-sidebar">
      {/* <Nav className="flex-column">
        <h6>-TOP CONTRIBUTORS-</h6>
        <TopContributorSwiper className="full-width"/>
      </Nav> */}
      <Nav className="flex-column side-topics">
        <Nav.Link className="d-flex align-items-center" onClick={() => props.handleClick("all")}>
          <BsFillQuestionCircleFill />
          all topics
        </Nav.Link>
        <Nav.Link className="d-flex align-items-center" onClick={() => props.handleClick("my")}>
          <MdQuestionAnswer />
          my topics
        </Nav.Link>
        {/* <Nav.Link className="d-flex align-items-center" onClick={() => props.handleClick("my answer")}>
          <MdReplyAll />
          my answers
        </Nav.Link> */}
      </Nav>
      <TopContributorsCard />
      
      <TopHelpersCard />

      {/* <SpacesCard /> */}
    </Col>
  );
};

export default LeftSidebar;
