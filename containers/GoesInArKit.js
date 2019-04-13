import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CameraOverlay from '../components/CameraOverlay';

const styles = StyleSheet.create({

});

const steps = [
  "Lift open Coffee Maker lid. Fill carafe with cold tap water and pour water into water reservoir at back of unit.",
  "Place empty carafe on the warming plate.",
  "Place permanent filter in removable filter holder. Measure 1 scoop of regular grind coffee for each desired cup.",
  "Lower the filter holder down into the housing. Close the lid.",
  "Plug the power cord and Press the BREW NOW/AUTO OFF button once; the light around BREW NOW/AUTO OFF button will be white to signal that appliance is working.",
  "When the brew cycle is complete, 3 audible beeps will be heard and TIME SINCE BREW icon will show on LCD display."
]

export default class GoesInArKit extends Component {
  state = {
    detectionHeader: "Focus your camera at an object.",
    displayCheckMark: false,
    //currentAndNextStep should be initialized to null
    //currentAndNextStep: null,
    currentAndNextStep: [ {number: 1 , text: steps[0] }, {number: 2, text: steps[1]} ]
  }
  static navigationOptions = () => {
    return {
      header: null
    }
  };

  onPressBack = () => {
    const { currentAndNextStep } = this.state;
    if (currentAndNextStep) {

    }

    //Go back to Home
    const { navigation } = this.props;
    navigation.goBack(null);
  }

  onPressNext = () => {
    const { currentAndNextStep } = this.state;
    const oldNextStep = currentAndNextStep[1];
    const newNextStepNumber = oldNextStep.number + 1;
    const newNextStepIndex = oldNextStep.number;
    this.setState({
      currentAndNextStep: [ oldNextStep, { number: newNextStepNumber, text: steps[newNextStepIndex] }]
    })

  }

  render() {
    const { detectionHeader, displayCheckMark, currentAndNextStep } = this.state;
    
    return (
      <CameraOverlay 
        detectionHeader={detectionHeader}
        displayCheckMark={displayCheckMark}
        onPressBack={this.onPressBack}
        currentAndNextStep={currentAndNextStep}
        onPressNext={this.onPressNext}
      />

    );
  }
}