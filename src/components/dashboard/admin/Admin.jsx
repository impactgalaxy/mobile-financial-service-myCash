import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
export default function Admin() {
  const [user, setUser] = useState([]);

  const getData = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/users");
      console.log(resp.data);
      setUser(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleStatus = async (email, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/change-status?email=${email}&status=${status}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(email);
  };

  return (
    <Tabs>
      <TabList>
        <Tab>All Users</Tab>
        <Tab>New Request</Tab>
      </TabList>

      <TabPanel>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>User Email</Th>
                <Th>User Number</Th>
                <Th>User Type</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.map((u) => (
                <Tr key={u.user_email}>
                  <Td>{u.user_name}</Td>
                  <Td>{u.user_email}</Td>
                  <Td>{u.user_number}</Td>
                  <Td>{u.user_type}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>User Number</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                <Th>Accept</Th>
                <Th>Reject</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user.map((u) => (
                <Tr key={u.user_email}>
                  <Td>{u.user_name}</Td>
                  <Td>{u.user_number}</Td>
                  <Td>{u.user_type}</Td>
                  <Td className="text-orange-200">{u.status}</Td>
                  <Td
                    className="btn"
                    onClick={() => handleStatus(u.user_email, "Active")}>
                    {"Accept"}
                  </Td>
                  <Td onClick={() => handleStatus(u.user_email, "Reject")}>
                    <MdDelete className="text-2xl text-red-600 cursor-pointer hover:bg-red-100 rounded-lg" />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Tabs>
  );
}
