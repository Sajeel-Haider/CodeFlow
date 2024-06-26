import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { OpenAI } from "openai";
import { useSelector } from "react-redux";

const extensions = [javascript({ jsx: true })];

const ChallengeDetails = () => {
  const authUser = useSelector((state) => state.user);
  const location = useLocation();
  const { id } = location.state || {}; 

  const [codeDetails, setCodeDetails] = useState({});
  const [show, setShow] = useState(false);
  const [credits, setCredits] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResponse, setAIResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/code/${id}`)
      .then((response) => {
        setCodeDetails(response.data);
        setCode(response.data.function);
      })
      .catch((error) => {
        console.error("Error fetching code details:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setCode(e);
  };
  const getOutput = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/execute`,
        {
          code: code,
          codeId: id,
          email: authUser.email,
        }
      );
      setTestCases(response.data.testResults);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getAIHelp = async () => {
    setLoadingAI(true);
    setShowModal(true);
    console.log(process.env.REACT_APP_OPENAI_API_KEY);

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
     
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Explain the code for ${codeDetails.question} in python.`,
            },
          ],
        });
        setAIResponse(response.choices[0].message.content);
        console.log(response.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
   
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <Box m={6}>
      <Flex>
        {testCases?.map((testCase, i) => (
          <Box
            key={i}
            mr={4}
            color={testCase ? "green" : "red"}
            fontWeight="bold"
          >
            {testCase === true ? "✅ Test Case Passed" : "❌ Test Case Failed"}
          </Box>
        ))}
      </Flex>
      <br></br>
      <div style={{ display: "flex", gap: "30px" }}>
        <CodeMirror
          value={code}
          height="80vh"
          width="80vh"
          theme={okaidia}
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
          style={{ fontSize: "16px" }}
        />
        <div>
          {codeDetails ? (
            <div>
              <h3 style={{ fontWeight: "bold" }}> {codeDetails.question} </h3>
              <div>{codeDetails.description}</div>
              <br />
              <div
                style={{
                  padding: "10px",
                  borderRadius: "2px",
                  backgroundColor: "#003C43",
                }}
              >
                <div>Inputs: {codeDetails.input}</div>
                <div>Sample Output: {codeDetails.output}</div>
              </div>
              <br />

              <div>
                {show === true && credits === true ? (
                  <pre
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "10px",
                      borderRadius: "2px",
                      marginTop: "10px",
                    }}
                  >
                    {codeDetails.solution}
                  </pre>
                ) : show ? (
                  <div style={{ padding: "10px", borderRadius: "2px" }}>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      Oops! Seems like you are out of credits 🥴
                    </p>
                    <Button
                      size="sm"
                      _hover={{ bg: "green", color: "white" }}
                      colorScheme="red"
                    >
                      Buy Credits
                    </Button>
                  </div>
                ) : null}
              </div>

              <br />
              {authUser?.is_premium && (
                <Button
                  onClick={getAIHelp}
                  padding={10}
                  borderRadius={10}
                  _hover={{ bg: "black", color: "white" }}
                  bgColor="white"
                  color="black"
                  border="1px solid black"
                >
                  Try AI ✨
                </Button>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <br />
      <Button
        onClick={getOutput}
        _hover={{ bg: "black", color: "white" }}
        style={{ backgroundColor: "#003C43", padding: 10, borderRadius: 10 }}
        bgColor="black"
        color="white"
        isLoading={isLoading}
      >
        Evaluate Code
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="2xl">
        <ModalOverlay />
        <ModalContent backgroundColor={"white"}>
          <ModalHeader>Open AI ✨</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loadingAI ? (
              <p>Loading AI response...</p>
            ) : aiResponse ? (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  padding: "10px",
                  borderRadius: "2px",
                }}
              >
                {aiResponse}
              </pre>
            ) : (
              <p>No AI response available.</p>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChallengeDetails;
