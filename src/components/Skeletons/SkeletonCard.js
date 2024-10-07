import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="top d-flex justify-content-around align-items-center">
      <Skeleton highlightColor="#a32204" baseColor="#5b111f"   circle width={45} height={45} />
      <h5 className="m-0 user">
        <Skeleton highlightColor="#a32204" baseColor="#5b111f"   width={100} />
      </h5>
      <span className="user-stats d-flex align-items-center">
        <Skeleton highlightColor="#a32204" baseColor="#5b111f"   width={15} />
      </span>
    </div>
  );
};

export default SkeletonCard;
