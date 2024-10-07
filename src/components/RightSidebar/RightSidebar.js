import { Col } from "react-bootstrap";
import TopContributorsCard from "./Cards/TopContributorsCard";
import TopHelpersCard from "./Cards/TopHelpersCard";

const RightSidebar = () => {
  return (
    <Col lg={3} className="right-sidebar">
      {/* <TopContributorsCard /> */}
      <TopHelpersCard />
    </Col>
  );
};

export default RightSidebar;
