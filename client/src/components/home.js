import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Alert,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

const Home = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:1881/api/data", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setData(res.data);
      } catch (err) {
        setErr(err);
      }
    };
    fetchData();
  }, [setData, setErr]);

  if (err) {return <Alert className="alert alert-danger">{err.message}</Alert>;}
  if (data.success === false) {return <Alert className='alert alert-danger'>Your token is expired!</Alert>;}
  if(data){
    return(
        <Container>
            {data.length > 0 ? (
        <ListGroup horizontal>
          <ListGroupItem>
            <ListGroupItemHeading tag="h4">First Name</ListGroupItemHeading>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading tag="h4">Last Name</ListGroupItemHeading>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading tag="h4">E-mail</ListGroupItemHeading>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading tag="h4">Gender</ListGroupItemHeading>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading tag="h4">IP Address</ListGroupItemHeading>
          </ListGroupItem>
        </ListGroup>
      ) : null}
            {data.length > 0
            ? data.map((d) => (
                <ListGroup horizontal key={d.id}>
                  <ListGroupItem>
                    <ListGroupItemText tag="p">{d.first_name}</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemText tag="p">{d.last_name}</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemText tag="p">{d.email}</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemText tag="p">{d.gender}</ListGroupItemText>
                  </ListGroupItem>
                  <ListGroupItem>
                    <ListGroupItemText tag="p">{d.ip_address}</ListGroupItemText>
                  </ListGroupItem>
                </ListGroup>
              ))
            : "Not found User"}
        </Container>
    );
  }
};
export default Home;
