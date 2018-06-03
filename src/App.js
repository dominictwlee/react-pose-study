import React, { Component } from 'react';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

const generateRandomNum = maxNum => Math.floor(Math.random() * Math.floor(maxNum));

const randomiseColor = () => {
  const red = generateRandomNum(256);
  const green = generateRandomNum(256);
  const blue = generateRandomNum(256);

  return `rgb(${red}, ${green}, ${blue})`;
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

//  2. PosedGroup FLIP
const Item = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const StyledItem = styled(Item)`
  flex: 1 1 5rem;
  font-size: 2rem;
  font-weight: bold;
  min-width: 4rem;
  min-height: ${props => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.color ? props.color : '#fafafa')};
  box-shadow: 1px 1px 3px black;
  margin: 2rem;
`;

const ListContainer = StyledContainer.extend`
  margin-bottom: 1rem;
  max-height: 40rem;
  /* min-width: 90%; */
  flex-direction: column;
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

    this.resetItemsState = () => [
      {
        num: 0,
        color: randomiseColor(),
      },
    ];

    this.state = {
      animateChildren: false,
      poseGroup: false,
      isVisible: false,
      items: this.resetItemsState(),
    };

    this.shuffleBoxes = () => {
      this.setState({ items: shuffle(this.state.items) });
    };

    this.animateBoxes = () => {
      this.setState({ animateChildren: true }, () => {
        this.setState({ isVisible: !this.state.isVisible });
      });
    };

    this.showPoseGroup = () => {
      this.setState({
        poseGroup: !this.state.poseGroup,
        items: this.resetItemsState(),
      });
    };

    this.addItemToList = () => {
      const newItem = this.state.items.length;
      this.setState(prevState => ({
        items: [
          {
            num: newItem,
            color: randomiseColor(),
          },
          ...prevState.items,
        ],
      }));
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
                  return (
                    <StyledItem height={'3rem'} key={item.num} color={item.color}>
                      {item.num + 1}
                    </StyledItem>
                  );
                })}
              </PoseGroup>
            </ListContainer>
            <div>
              <Button onClick={this.shuffleBoxes}>Shuffle</Button>
              <Button onClick={this.addItemToList}>Add</Button>
            </div>
          </React.Fragment>
        )}
        {this.state.animateChildren && (
          <StyledContainer pose={this.state.isVisible ? 'visible' : 'hidden'}>
            {[...Array(12)].map((e, i) => (
              <StyledBox width={'10rem'} height={'10rem'} color={'#536dfe'} key={`box${i + 1}`} />
            ))}
          </StyledContainer>
        )}
      </PageWrapper>
    );
  }
}

export default App;
