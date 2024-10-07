import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    setSearch,
    setCurrentPage,
    setEditForm,
    setEditingUserId,
    resetEditForm,
    updateUser,
    approveUser,    // Import the approve user action
    rejectUser,     // Import the reject user action
    deleteUser      // Import the delete user action
} from '../../redux/slices/adminSlice';
import { Form, Table, Button, Pagination, Container, Row, Col, Alert } from 'react-bootstrap';
import { RiEdit2Fill, RiCheckFill, RiCloseCircleFill, RiDeleteBinFill , RiSave3Fill, RiArrowGoBackFill } from "react-icons/ri";

import Layout from "./Layout";

const UserManage = () => {
    const dispatch = useDispatch();

    // Get the state from the Redux store
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

    // Fetch users when the component mounts or when search/page changes
    useEffect(() => {
        dispatch(fetchUsers({ search, page: currentPage }));
    }, [search, currentPage, dispatch]);

    // Handle search input
    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
        dispatch(setCurrentPage(1)); // Reset to page 1 on new search
    };

    // Handle page change
    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    // Handle edit button click
    const handleEditClick = (user) => {
        dispatch(setEditingUserId(user._id));
        dispatch(setEditForm({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        }));
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        dispatch(resetEditForm());
    };

    // Handle form input change
    const handleFormChange = (e) => {
        dispatch(setEditForm({ [e.target.name]: e.target.value }));
    };

    // Handle save user update
    const handleSaveUser = (userId) => {
        dispatch(updateUser({ userId, formData: editForm }));
    };

    // Handle approve user
    const handleApproveUser = (userId) => {
        dispatch(approveUser({ userId }));
    };

    // Handle reject user
    const handleRejectUser = (userId) => {
        dispatch(rejectUser({ userId }));
    };

    // Handle delete user
    const handleDeleteUser = (userId) => {
        dispatch(deleteUser({ userId }));
    };

    return (
        <Layout>
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
                            onChange={handleSearchChange}
                        />
                    </Col>
                </Row>

                {/* User Table */}
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <Table variant="dark" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Status</th> {/* New Approve Status column */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            {editingUserId === user._id ? (
                                                <Form.Control
                                                    type="text"
                                                    name="username"
                                                    value={editForm.username}
                                                    onChange={handleFormChange}
                                                />
                                            ) : (
                                                user.username
                                            )}
                                        </td>
                                        <td>
                                            {editingUserId === user._id ? (
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={editForm.email}
                                                    onChange={handleFormChange}
                                                />
                                            ) : (
                                                user.email
                                            )}
                                        </td>
                                        <td>
                                            {editingUserId === user._id ? (
                                                <Form.Control
                                                    type="text"
                                                    name="firstName"
                                                    value={editForm.firstName}
                                                    onChange={handleFormChange}
                                                />
                                            ) : (
                                                user.firstName
                                            )}
                                        </td>
                                        <td>
                                            {editingUserId === user._id ? (
                                                <Form.Control
                                                    type="text"
                                                    name="lastName"
                                                    value={editForm.lastName}
                                                    onChange={handleFormChange}
                                                />
                                            ) : (
                                                user.lastName
                                            )}
                                        </td>
                                        <td>
                                            {user.approved ? <div className='user-status approved'></div> : <div className="user-status pending"></div>}
                                        </td> {/* Display approve, reject, or pending */}
                                        <td>
                                            {editingUserId === user._id ? (
                                                <>
                                                    <Button variant="success" title='Save' onClick={() => handleSaveUser(user._id)}>
                                                        <RiSave3Fill />
                                                    </Button>{' '}
                                                    <Button variant="danger" title='Cancel' onClick={handleCancelEdit}>
                                                        <RiArrowGoBackFill />
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="primary" title='Edit' onClick={() => handleEditClick(user)}>
                                                        <RiEdit2Fill />
                                                    </Button>{' '}
                                                    {!user.approved ? (
                                                        <Button variant="success" title='approve' onClick={() => handleApproveUser(user._id)}>
                                                            <RiCheckFill />
                                                        </Button>) : (
                                                        <Button variant="warning" title='reject' onClick={() => handleRejectUser(user._id)}>
                                                            <RiCloseCircleFill />
                                                        </Button>
                                                    )}
                                                    <Button variant="danger" title='Delete' onClick={() => handleDeleteUser(user._id)}>
                                                        <RiDeleteBinFill />
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}

                {/* Pagination Controls */}
                {
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
                    )
                }

                {/* Error Handling */}
                {error && <Alert variant="danger">{error}</Alert>}
            </Container>
        </Layout>
    );
};

export default UserManage;
