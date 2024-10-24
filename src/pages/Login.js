import { useEffect, useState } from "react";
import {
  InputGroup,
  Row,
  Col,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SlWallet } from "react-icons/sl";
import { RiUserAddLine } from "react-icons/ri";
import { login, resetLogin } from "../redux/slices/authSlice";
import Web3 from "web3"; // Import Web3.js
import MetaMaskIcon from "../assets/images/SVG_MetaMask_Icon_Color.svg";
import Notify, { notifySuccess, notifyError } from '../components/Notify';


const Login = () => {
  const [username, setUsername] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [metaMaskError, setMetaMaskError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth.login
  );

  useEffect(() => {
    document.title = `Login | ONetwork Forum`;
  }, []);



  // Function to initialize Web3 and connect MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Initialize Web3 with MetaMask's provider
        const web3Instance = new Web3(window.ethereum);

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const wallet = accounts[0]; // Get the first account (wallet address)
        setWalletAddress(wallet); // Set wallet address state
        setMetaMaskError(""); // Clear error if connection is successful

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
    if (!username || !walletAddress) return;

    const wallet = await connectMetaMask(); // Connect to MetaMask

    if (wallet) {
      try {
        // Dispatch register action with wallet address
        const resultAction = dispatch(login({ username, walletAddress }));
        // if (login.fulfilled.match(resultAction)) {
        //   notifySuccess("Welcome to join!")
        // }
      } catch (err) {
        console.log(err.message);
      }
    }
  };




  useEffect(() => {
    dispatch(resetLogin());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Row className="auth-form justify-content-end">
      <div className="bg-wrapper"></div>
      <Col className="d-flex align-items-center justify-content-end" lg={6}>
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {isLoading && <div className="loader"></div>}
              <h3 className="text-center">Login</h3>
              <p className="text-center">Welcome to Forum</p>
              {message && (
                <div
                  className={`message ${isError ? "error" : ""} ${isSuccess ? "success" : ""
                    } ${isLoading ? "info" : ""}`}
                >
                  {`${message} `}
                  {message?.includes("must activate") && (
                    <Link to="/verify-email">Click here to activate it.</Link>
                  )}
                </div>
              )}
              {metaMaskError && (
                <div className="message error">
                  {metaMaskError}
                </div>
              )}
              <Form.Group>
                <Form.Label htmlFor="wallet">
                  昵称：
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <RiUserAddLine />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="wallet"
                    id="wallet"
                    disabled={isLoading}
                    placeholder="Jone3524"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="wallet">钱包地址:</Form.Label>
                <InputGroup className="mb-3">
                  {walletAddress ?
                    <Image src={MetaMaskIcon} width={50} height={50} /> :
                    <InputGroup.Text id="basic-addon1">
                      <SlWallet />
                    </InputGroup.Text>
                  }
                  <Form.Control
                    type="text"
                    name="wallet"
                    id="wallet"
                    disabled={true}
                    placeholder="***********"
                    value={walletAddress}
                  />
                  <Button type="button" onClick={() => connectMetaMask()}>
                    <SlWallet />
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* <div className="d-flex justify-content-between">
                <Form.Group controlId="rememberme">
                  <Form.Check
                    name="rememberme"
                    id="rememberme"
                    type="checkbox"
                    label="Remember Me"
                  ></Form.Check>
                </Form.Group>
                <Link className="forget-pwd" to="/forgot-password">
                  Forget password?
                </Link>
              </div> */}
              <Button
                className="auth-submit mb-4 w-100"
                type="submit"
              >
                {isLoading ? "Logging In..." : "Login"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
