// UserManage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Table, Button, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import { RiEdit2Fill, RiCheckFill, RiCloseCircleFill, RiDeleteBinFill, RiSave3Fill, RiArrowGoBackFill } from "react-icons/ri";
import Layout from "./Layout";
import {
    fetchUsers,
    setSearch,
    setCurrentPage,
    setEditForm,
    setEditingUserId,
    resetEditForm,
    updateUser,
    approveUser,
    rejectUser,
    deleteUser
} from '../../redux/slices/adminSlice';

// Import Notify component and functions
import Notify, { notifySuccess, notifyError } from '../../components/Notify';

const UserManage = () => {
    const dispatch = useDispatch();
    const { users, currentPage, totalPages, search, editingUserId, editForm, isLoading, error } = useSelector((state) => state.admin);
    const { _id } = useSelector((state) => state.auth.user || {});

    // Fetch users when the component mounts or when search/page changes
    useEffect(() => {
        dispatch(fetchUsers({ search, page: currentPage }));
    }, [search, currentPage, dispatch]);

    // Handle approve user
    const handleApproveUser = async (userId) => {
        const resultAction = await dispatch(approveUser({ userId }));
        if(approveUser.fulfilled.match(resultAction)) {
            notifySuccess("The user is approved and is given 10 tokens.")
        }
    };

    // Handle reject user
    const handleRejectUser = async (userId) => {
        const resultAction = dispatch(rejectUser({ userId }));
        if(rejectUser.fulfilled.match(resultAction)) {
            notifyError("User rejected!")
        }
    };

    // Handle delete user
    const handleDeleteUser = async (userId) => {
        const resultAction = await dispatch(deleteUser({ userId }));
        if (deleteUser.fulfilled.match(resultAction)) {
            notifySuccess('User is deleted successfully! His tokens have been confiscated.');
        } else {
            notifyError('Failed to delete user!');
        }
    };

    return (
        <Layout>
            <Notify />
            <Container>
                <Row className="mb-4">
                    <Col>
                        <h3 className="my-3">User Management</h3>
                    </Col>
                </Row>

                {/* Search Bar */}
                <Row className="mb-4">
                    <Col xs={6} md={4}>
                        <Form.Control
                            type="text"
                            className='search-control'
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => {
                                dispatch(setSearch(e.target.value));
                                dispatch(setCurrentPage(1)); // Reset to page 1 on new search
                            }}
                        />
                    </Col>
                </Row>
                {error && <Alert variant="danger">{error}</Alert>}

                {/* User Table */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <Table variant="dark" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                user._id !== _id && (
                                    <tr key={user._id}>
                                        <td>{editingUserId === user._id ? (
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={editForm.username}
                                                onChange={(e) => dispatch(setEditForm({ [e.target.name]: e.target.value }))}
                                            />
                                        ) : (
                                            user.username
                                        )}
                                        </td>
                                        <td>{editingUserId === user._id ? (
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={editForm.firstName}
                                                onChange={(e) => dispatch(setEditForm({ [e.target.name]: e.target.value }))}
                                            />
                                        ) : (
                                            user.firstName
                                        )}
                                        </td>
                                        <td>{editingUserId === user._id ? (
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={editForm.lastName}
                                                onChange={(e) => dispatch(setEditForm({ [e.target.name]: e.target.value }))}
                                            />
                                        ) : (
                                            user.lastName
                                        )}
                                        </td>
                                        <td>{user.approved ? 'Approved' : 'Pending'}</td>
                                        <td>
                                            {editingUserId === user._id ? (
                                                <>
                                                    <Button size='sm' variant="success" onClick={() => dispatch(updateUser({ userId: user._id, formData: editForm }))}>
                                                        <RiSave3Fill />
                                                    </Button>
                                                    <Button size='sm' variant="danger" onClick={() => dispatch(resetEditForm())}>
                                                        <RiArrowGoBackFill />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button size='sm' variant="primary" onClick={() => dispatch(setEditingUserId(user._id))}>
                                                        <RiEdit2Fill />
                                                    </Button>
                                                    {!user.approved ? (
                                                        <Button size='sm' variant="success" onClick={() => handleApproveUser(user._id)}>
                                                            <RiCheckFill />
                                                        </Button>
                                                    ) : (
                                                        <Button size='sm' variant="warning" onClick={() => handleRejectUser(user._id)}>
                                                            <RiCloseCircleFill />
                                                        </Button>
                                                    )}
                                                    <Button size='sm' variant="danger" onClick={() => handleDeleteUser(user._id)}>
                                                        <RiDeleteBinFill />
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <Pagination className="my-1">
                        <Pagination.First onClick={() => dispatch(setCurrentPage(1))} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => dispatch(setCurrentPage(currentPage - 1))} disabled={currentPage === 1} />
                        <input type="number" min={1} max={totalPages} value={currentPage} onChange={(e) => dispatch(setCurrentPage(Number(e.target.value)))} />
                        <Pagination.Next onClick={() => dispatch(setCurrentPage(currentPage + 1))} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => dispatch(setCurrentPage(totalPages))} disabled={currentPage === totalPages} />
                    </Pagination>
                )}

                {/* Error Handling */}
            </Container>
        </Layout>
    );
};

export default UserManage;
