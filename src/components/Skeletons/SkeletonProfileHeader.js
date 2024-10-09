import Skeleton from "react-loading-skeleton";

const SkeletonProfileHeader = () => {
  return (
    <div className="profile-header">
      <div className="user-profile-meta d-flex align-items-center">
        <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={153} height={153} />
        <div className="user-info d-flex flex-column">
          <h4 className="user-name">
            <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`25%`} />
          </h4>
          <div className="user-bio">
            <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={`50%`} />
          </div>
          <div className="d-flex user-meta">
            <span className="user-id">
              <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={60} />
            </span>
            <span className="username">
              <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={80} />
            </span>
            <span className="user-website">
              <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={120} />
            </span>
          </div>
          <div className="user-actions">
            <Skeleton highlightColor="#432e8d" baseColor="#04001e"   width={120} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileHeader;
