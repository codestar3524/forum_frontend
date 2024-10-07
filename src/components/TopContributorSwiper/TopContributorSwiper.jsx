import { useEffect, useMemo } from "react";
import { Nav, Image } from "react-bootstrap";
// import { FaUserEdit } from "react-icons/fa";
import { RiBallPenFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getTopContributors } from "../../redux/slices/topicSlice";
import { Link } from "react-router-dom";
// import SkeletonCard from "../../Skeletons/SkeletonCard";

import { Navigation, Pagination as SwiperPagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const TopContributorSwiper = () => {
    const { topContributors, topContributorsIsLoading } = useSelector(
        (state) => state.topic
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopContributors());
    }, [dispatch]);
    return useMemo(() => {
        return (
            <Swiper
                modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {!topContributorsIsLoading &&
                    topContributors?.length > 0 &&
                    topContributors?.map((user, idx) => (
                        <SwiperSlide>
                            <Link
                                key={idx}
                                className="nav-link d-flex align-items-center flex-column"
                                to={`/user/${user?._id}`}
                            >
                                <Image src={user?.author?.avatar?.url} width={80} height={80} className="rounded" />
                                <div className="d-flex align-items-center">
                                    <h6 className="user" style={{margin:3}}>
                                        {user?.author?.firstName} {user?.author?.lastName}
                                    </h6>
                                    <span className="user-stats d-flex align-items-center">
                                        <RiBallPenFill />
                                        {user?.count}
                                    </span>

                                </div>
                            </Link>

                        </SwiperSlide>
                    ))}
            </Swiper>
            //   <Nav className="top flex-column">
            //     <Nav.Item>
            //       <div className="d-flex align-items-center">
            //         <FaUserEdit />
            //         top contributors
            //       </div>
            //       <p className="nav-description">people who started the most topics.</p>
            //     </Nav.Item>
            //     {topContributorsIsLoading && (
            //       <>
            //         <SkeletonCard />
            //         <SkeletonCard />
            //         <SkeletonCard />
            //       </>
            //     )}
            //     {!topContributorsIsLoading &&
            //       topContributors?.length > 0 &&
            //       topContributors?.map((user, idx) => (
            //         <Link
            //           key={idx}
            //           className="nav-link d-flex align-items-center"
            //           to={`/user/${user?._id}`}
            //         >
            //           <Image src={user?.author?.avatar?.url} />
            //           <h5 className="user">
            //             {user?.author?.firstName} {user?.author?.lastName}
            //           </h5>
            //           <span className="user-stats d-flex align-items-center">
            //             <RiBallPenFill />
            //             {user?.count}
            //           </span>
            //         </Link>
            //       ))}
            //   </Nav>
        );
    }, [topContributors, topContributorsIsLoading]);
};

export default TopContributorSwiper;
