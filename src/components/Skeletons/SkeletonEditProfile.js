import { Row, Form, Container, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SkeletonEditProfile = () => {
  return (
    <main>
      <Container>
        <Row className="edit-profile">
          <Col lg={8}>
            <div className="right">
              <section>
                <h5 className="section-title">
                  <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={200} />
                </h5>
                <div className="section-content">
                  <Row className="mb-3">
                    <Form.Group className="form-group" as={Col}>
                      <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                    </Form.Group>
                    <Form.Group className="form-group" as={Col}>
                      <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                    </Form.Group>
                  </Row>
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                </div>
              </section>
              <section>
                <h5 className="section-title">
                  <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={200} />
                </h5>
                <div className="section-content">
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={100} />
                  </Form.Group>
                </div>
              </section>
              <section>
                <h5 className="section-title">
                  <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={200} />
                </h5>
                <div className="section-content">
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                </div>
              </section>
              <section>
                <h5 className="section-title">
                  <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={200} />
                </h5>
                <div className="section-content">
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                  <Form.Group className="form-group mb-3">
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   height={50} />
                  </Form.Group>
                </div>
              </section>
            </div>
          </Col>
          <Col lg={4}>
            <div className="left">
              <section className="profile">
                <h5 className="section-title">
                  <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={200} />
                </h5>
                <div className="section-content">
                  <div className="upload-avatar d-flex flex-column">
                    <div className="user-avatar d-flex">
                      <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={170} height={170} />
                    </div>
                    <div className="user-info">
                      <h5 className="user-name">
                        <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={150} />
                      </h5>
                      <span className="username">
                        <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={70} />
                      </span>
                    </div>
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`100%`} height={36} />
                    <span className="size-note">
                      <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`70%`} height={22} />
                    </span>
                  </div>
                  <div className="upload-header-cover d-flex flex-column">
                    <div className="user-cover">
                      <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`100%`} height={120} />
                    </div>
                    <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`100%`} height={36} />
                    <span className="size-note">
                      <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`70%`} height={22} />
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SkeletonEditProfile;
