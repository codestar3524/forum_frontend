import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,     // Import the delete user action
} from '../../redux/slices/adminSlice';
import { Form, Table, Button, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import { RiEdit2Fill, RiCheckFill, RiCloseCircleFill, RiDeleteBinFill , RiSave3Fill, RiArrowGoBackFill } from "react-icons/ri";

import Layout from "./Layout";

const Dashboard = () => {
    const {
        users,
        currentPage,
        totalPages,
        search,
        editingUserId,
        editForm,
        isLoading,
        error,
    } = useSelector((state) => state.admin);

    return (
        <Layout>
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h3 className="my-3">Dashboard</h3>
                    </Col>
                </Row>
                 <Row>
                    <Col md={3} sm={6}>
                        <div className='d-flex align-items-center flex-column dashboard-item'>
                            <h1>{users.length}</h1>
                            <div>用户数量</div>
                        </div>
                    </Col>
                    <Col md={3} sm={6}>
                        <div className='d-flex align-items-center flex-column dashboard-item'>
                            <h1>{(users.filter(user=>!user.approved)).length}</h1>
                            <div>待处理的用户数量</div>
                        </div>
                    </Col>
                    <Col md={3} sm={6}>
                        <div className='d-flex align-items-center flex-column dashboard-item'>
                            <h1>123</h1>
                            <div>待处理的用户数量</div>
                        </div>
                    </Col>
                    <Col md={3} sm={6}>
                        <div className='d-flex align-items-center flex-column dashboard-item'>
                            <h1>123</h1>
                            <div>待处理的用户数量</div>
                        </div>
                    </Col>
                 </Row>
                
            </Container>
        </Layout>
    );
};

export default Dashboard;
