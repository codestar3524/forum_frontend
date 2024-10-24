import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Image
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import { MdAlternateEmail, MdWallet } from "react-icons/md";
import { SlWallet } from "react-icons/sl";
import { register, resetRegister } from "../redux/slices/authSlice";
import Web3 from "web3"; // Import Web3.js
import MetaMaskIcon from "../assets/images/SVG_MetaMask_Icon_Color.svg";


const Register = () => {
  useEffect(() => {
    document.title = `Register | ONetwork Forum`;
  }, []);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [walletAddress, setWalletAddress] = useState(""); // State to store wallet address
  const [web3, setWeb3] = useState(null); // State to store Web3 instance
  const [metaMaskError, setMetaMaskError] = useState(""); // State to store MetaMask error message
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth.register
  );

  // Function to initialize Web3 and connect MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Initialize Web3 with MetaMask's provider
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const wallet = accounts[0]; // Get the first account (wallet address)
        setWalletAddress(wallet); // Set wallet address state
        setMetaMaskError(""); // Clear error if connection is successful
        console.log(wallet);

        return wallet;
      } catch (err) {
        console.error("User denied account access or error:", err);
        setMetaMaskError("User denied MetaMask connection."); // Set error message for denied connection
        return null;
      }
    } else {
      console.error("MetaMask is not installed.");
      setMetaMaskError("MetaMask is not installed. Please install MetaMask to continue.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, walletAddress, firstName, lastName);
    if (!username || !walletAddress || !firstName || !lastName) return;

    const wallet = await connectMetaMask(); // Connect to MetaMask

    if (wallet) {
      try {

        // Dispatch register action with wallet address
        dispatch(register({ username, walletAddress, firstName, lastName }));
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    dispatch(resetRegister());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Row className="auth-form justify-content-end">
      <div className="bg-wrapper">
      </div>
      <Col className="d-flex align-items-center justify-content-end" lg={6}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {isLoading && <div className="loader"></div>}
              <h3 className="text-center">登 记</h3>
              <p className="text-center">
                欢迎来到我们的论坛
              </p>
              {message && (
                <div
                  className={`message ${isError ? "error" : ""} ${isSuccess ? "success" : ""
                    } ${isLoading ? "info" : ""}`}
                >
                  {message}
                </div>
              )}
              {metaMaskError && ( // Display MetaMask error
                <div className="alert alert-danger" role="alert">
                  {metaMaskError}
                </div>
              )}
              <Form.Group>
                <Form.Label htmlFor="firstName">名字：</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <HiOutlineUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="firstName"
                    id="firstName"
                    disabled={isLoading}
                    placeholder="输入名字"
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="lastName">姓氏：</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <HiOutlineUsers />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="lastName"
                    id="lastName"
                    disabled={isLoading}
                    required
                    placeholder="输入姓氏"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="username">昵称: </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <MdAlternateEmail />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    disabled={isLoading}
                    placeholder="输入昵称"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="wallet">钱包地址：</Form.Label>
                <InputGroup className="mb-3">
                {walletAddress ?
                    <Image src={MetaMaskIcon} width={50} height={50}/> :
                    <InputGroup.Text id="basic-addon1">
                      <SlWallet />
                    </InputGroup.Text>
                  }
                  <Form.Control
                    type="text"
                    name="wallet"
                    id="wallet"
                    disabled={true}
                    required
                    placeholder="0X.."
                    value={walletAddress}
                  />
                  <Button type="button" onClick={() => connectMetaMask()}>
                    <MdWallet />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Button
                className="auth-submit mb-4 w-100"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
