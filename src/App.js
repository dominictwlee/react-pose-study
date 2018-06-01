import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

const containerProps = {
  visible: { x: 0, delayChildren: 500, staggerChildren: 400 },
  hidden: { x: '200%', delay: 1000 },
};
const boxProps = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        type: 'keyframes',
        duration: 400,
        values: [0, 0.7, 0.3, 1],
      },
      y: {
        type: 'spring',
        stiffness: 700,
        damping: 10,
      },
    },
  },
  hidden: { opacity: 0, y: 40 },
};

const Container = posed.div(containerProps);

const Box = posed.div(boxProps);

const StyledBox = styled(Box)`
  width: 10rem;
  height: 10rem;
  background: #3c74f7;
  box-shadow: 1px 1px 3px black;
  margin: 2rem;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  background-color: #263238;
`;

const Button = styled.button`
  background: #cfd8dc;
  color: black;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  margin-right: 1.5rem;
  text-transform: uppercase;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  width: 60rem;
  height: 45rem;
  margin: 5rem auto;
  background: #58616a;
  flex-wrap: wrap;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.animateBoxes = () => {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    };
  }

  componentDidMount() {
    this.timerID = setTimeout(() => this.animateBoxes(), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    const Toggles = ['Animation 1', 'Animation 2', 'Animation 3'];
    return (
      <PageWrapper>
        <Nav>{Toggles.map(toggle => <Button onClick={this.animateBoxes}>{toggle}</Button>)}</Nav>
        <StyledContainer pose={this.state.isVisible ? 'visible' : 'hidden'}>
          {[...Array(12)].map((e, i) => <StyledBox key={`box${i + 1}`} />)}
        </StyledContainer>
      </PageWrapper>
    );
  }
}

export default App;
