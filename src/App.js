import React, { Component } from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { tween } from 'popmotion';

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

//  Group 1: Animate Children
const containerProps = {
  visible: {
    x: 0,
    staggerChildren: 100,
    delayChildren: 400,
  },
  hidden: {
    x: '200%',
    delay: 300,
  },
};

const boxProps = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        type: 'tween',
      },
      y: {
        type: 'spring',
        stiffness: 700,
        damping: 10,
      },
    },
  },
  hidden: {
    opacity: 0,
    y: 50,
  },
};

const Container = posed.div(containerProps);

const Box = posed.div(boxProps);

const StyledBox = styled(Box)`
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => (props.color ? props.color : '#fafafa')};
  box-shadow: 1px 1px 3px black;
  margin: 2rem;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  width: 60rem;
  height: 45rem;
  margin: 5rem 0;
  background: #58616a;
  flex-wrap: wrap;
`;

//  PosedGroup FLIP
const Item = posed.div({
  // flip: {
  //   transition: tween,
  // },
});

const StyledItem = styled(Item)`
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => (props.color ? props.color : '#fafafa')};
  box-shadow: 1px 1px 3px black;
  margin: 2rem;
`;

const ListContainer = StyledContainer.extend`
  min-width: 40rem;
  width: 20rem;
  margin-bottom: 1rem;
`;

//  General Page Layout Components

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  width: 100%;
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poseGroup: false,
      isVisible: false,
      items: [0, 1],
    };

    this.animateBoxes = () => {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    };

    this.shuffleBoxes = () => {
      this.setState({ items: shuffle(this.state.items) });
    };

    this.show = () => {
      this.setState({
        isVisible: !this.state.isVisible,
      });
    };

    this.showPoseGroup = () => {
      this.setState({ poseGroup: !this.state.poseGroup });
    };

    this.addItemToList = () => {
      const newItem = this.state.items.length;
      this.setState(prevState => ({ items: [newItem, ...prevState.items] }));
    };
  }

  render() {
    return (
      <PageWrapper>
        <Nav>
          <Button onClick={this.animateBoxes}>Animate Children</Button>
          <Button onClick={this.showPoseGroup}>PoseGroup FLIP</Button>
        </Nav>
        {this.state.poseGroup && (
          <React.Fragment>
            <ListContainer>
              <PoseGroup>
                {this.state.items.map(item => {
                  return <StyledItem width={'inherit'} height={'3rem'} color={'#84ffff'} key={item} />;
                })}
              </PoseGroup>
            </ListContainer>
            <div>
              <Button onClick={this.shuffleBoxes}>Shuffle</Button>
              <Button onClick={this.addItemToList}>Add</Button>
            </div>
          </React.Fragment>
        )}
        <StyledContainer pose={this.state.isVisible ? 'visible' : 'hidden'}>
          {[...Array(12)].map((e, i) => (
            <StyledBox width={'10rem'} height={'10rem'} color={'#536dfe'} key={`box${i + 1}`} />
          ))}
        </StyledContainer>
      </PageWrapper>
    );
  }
}

export default App;
