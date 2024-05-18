import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Box,
  Avatar,
  Text,
  Icon,
} from "@chakra-ui/react";
import Stars from "../../../components/Dashboard/UserDashboard/Stars";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AllCodes = () => {
  const [codeArray, setCodeArray] = useState([]);
  const authUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fetchCodes = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/allcodes`,
      {
        email: authUser.email,
      }
    );
    console.log(res.data);
    setCodeArray(res.data);
  };

  const saveUser = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/saveuser`,
      {
        username: authUser.username,
        email: authUser.email,
      }
    );
    localStorage.setItem("email", authUser.email);
  };

  useEffect(() => {
    const fetchData = async () => {
      // await saveUser();
      await fetchCodes();
    };
    if (!codeArray.length) {
      fetchData();
    }
  }, [codeArray]);

  const solvedQuestionsNumbers = {
    Numbers: codeArray.filter(
      (codeData) => codeData.label === "numbers" && codeData.stars !== -1
    ).length,
    Arrays: codeArray.filter(
      (codeData) => codeData.label === "arrays" && codeData.stars !== -1
    ).length,
    LinkedLists: codeArray.filter(
      (codeData) => codeData.label === "linked_lists" && codeData.stars !== -1
    ).length,
  };

  return (
    <Box marginX={20} marginTop={10} style={{ color: "black" }}>
      <div
        style={{
          position: "fixed",
          left: 2,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          background: "white",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Text fontWeight="bold">{authUser.name}</Text>
          <Icon as={FaSignOutAlt} w={6} h={6} ml={3} />
        </div>
      </div>

      <Tabs>
        <TabList>
          <Tab _selected={{ color: "white", bg: "black" }}>
            Numbers ({solvedQuestionsNumbers.Numbers}/
            {
              codeArray.filter((codeData) => codeData.label === "numbers")
                .length
            }
            )
          </Tab>
          <Tab _selected={{ color: "white", bg: "black" }}>
            Arrays ({solvedQuestionsNumbers.Arrays}/
            {codeArray.filter((codeData) => codeData.label === "arrays").length}
            )
          </Tab>
          <Tab _selected={{ color: "white", bg: "black" }}>
            Linked Lists ({solvedQuestionsNumbers.LinkedLists}/
            {
              codeArray.filter((codeData) => codeData.label === "linked_lists")
                .length
            }
            )
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ol>
              {codeArray.map(
                (codeData) =>
                  codeData.label === "numbers" && (
                    <Box
                      key={codeData._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginY={5}
                    >
                      <div>
                        <h3>{codeData.question}</h3>
                        <Stars stars={codeData.stars} />
                      </div>
                      <Button
                        _hover={{ bg: "black", color: "white" }}
                        bgColor="white"
                        color="black"
                        border="1px solid black"
                        onClick={() =>
                          navigate(`challengeDetails/${codeData._id}`, {
                            state: { id: codeData._id },
                          })
                        }
                      >
                        Open
                      </Button>
                    </Box>
                  )
              )}
              more questions coming soon..
            </ol>
          </TabPanel>
          <TabPanel>
            <ol>
              {codeArray.map(
                (codeData) =>
                  codeData.label === "arrays" && (
                    <Box
                      key={codeData._id}
                      p={4}
                      borderWidth="1px"
                      borderRadius="lg"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      marginY={5}
                    >
                      <div>
                        <h3>{codeData.question}</h3>
                        <Stars stars={codeData.stars} />
                      </div>
                      <Button
                        _hover={{ bg: "black", color: "white" }}
                        bgColor="white"
                        color="black"
                        border="1px solid black"
                        onClick={() =>
                          navigate(`challengeDetails/${codeData._id}`, {
                            state: { id: codeData._id },
                          })
                        }
                      >
                        Open
                      </Button>
                    </Box>
                  )
              )}
              <br />
              more questions coming soon..
            </ol>
          </TabPanel>
          <TabPanel>Coming Sooon...</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AllCodes;
