import { Row, Col, Container, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
    return (
        <main>
            <Container>
                <Row>
                    <h4>Admin Panel</h4>
                </Row>
                <Row>
                    <Col md={3} sm={12} className="left-sidebar">
                        <Nav className="flex-column side-topics">
                            <Nav.Link className="d-flex align-items-center" as={Link} to={'/admin-panel'}>
                                <BsFillQuestionCircleFill />
                                Dashboard
                            </Nav.Link>
                            <Nav.Link className="d-flex align-items-center" as={Link} to={'/admin-panel/user-manage'}>
                                <MdQuestionAnswer />
                                UserManage
                            </Nav.Link>
                            <Nav.Link className="d-flex align-items-center" as={Link} to={'/admin-panel/handle'}>
                                <MdQuestionAnswer />
                                Activity
                            </Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={9} sm={12} className="main-content">
                        {children}
                    </Col>
                </Row>
            </Container>

        </main>
    )
}

export default Layout;