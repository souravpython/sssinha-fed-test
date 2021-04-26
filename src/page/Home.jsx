import React, { Component } from "react";
import styled from "styled-components";
import {
  FaCommentAlt,
  FaThumbsUp,
  FaRegEye,
  FaThinkPeaks,
} from "react-icons/fa";
import CustomCard from "../component/CustomCard";
import CustomHeader from "../component/CustomHeader";
import axios from "axios";

const StyledRoot = styled.div`
  padding: 50px 12px;
  margin-bottom: 30px;
`;
const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
`;

class HomePage extends Component {
  state = {
    error: null,
    isLoaded: false,
    persons: [],
  };

  componentDidMount() {
    axios.get(`https://randomuser.me/api/`).then(
      (res) => {
        const persons = res.data.results;
        this.setState({
          isLoaded: true,
          persons: persons,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    );
  }

  render() {
    const { error, isLoaded, persons } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <CustomHeader />
          <StyledRoot>
            <StyledContainer>
              <ul className="ul">
                {persons.map(person => (
                  <li key = {person.login.uuid}>
                    <CustomCard
                      gender={person.gender}
                      name={person.name}
                      location={person.location}
                      email={person.email}
                      login={person.login}
                      dateOfBirth={person.dob}
                      phone={person.phone}
                      picture={person.picture}/>
                  </li>
                ))}
              </ul>
            </StyledContainer>
          </StyledRoot>
        </div>
      );
    }
  }
}

export default HomePage;
