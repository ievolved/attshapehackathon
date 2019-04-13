import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topIconsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 35,
  },
  captureButton: {
    marginBottom: 30
  },
  detectionHeader: {
    color: 'white',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 21,
    marginTop: 40,
    textAlign: 'center'
  },
  checkmark: {
    marginBottom: 200
  },
  currentStep: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 18,
    color: 'white',
    width: 233
  },
  nextStep: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 18,
    color: '#dbdbdb',
    width: 233,
  },
  stepWrapper: {
    flexDirection: 'row',
    marginBottom: 20
  },
  stepLabel: {
    color: '#b7b7b7',
    fontSize: 16
  },
  labelWrapper: {
    height: 30,
    width: 77,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  nextButton: {
    width: 67,
    height: 67,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: 'HelveticaNeue-Medium',
  }
});

const maybeDisplaySteps = (currentAndNextStep) => {
  if (currentAndNextStep) {
    const currentStep = currentAndNextStep[0];
    const nextStep = currentAndNextStep[1];

    const nextStepText =  () => {
      const words = nextStep.text.split(" ");
      let returnText = "";
      let charCount = 0;
      words.forEach(word => {
        charCount += word.length + 1; 
        if (charCount < 25) {
          returnText = returnText + word + " ";
        }
      })
      return returnText.slice(0, -1) + "...";
    }

    return (
      <View style={{marginTop: 30, marginLeft: 20}}>
        <View style={styles.stepWrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.stepLabel}>{`Step ${currentStep.number}`}</Text>
          </View>
          <Text style={styles.currentStep}>{currentStep.text}</Text>
        </View>
        <View style={styles.stepWrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.stepLabel}>Next</Text>
          </View>
          <Text style={styles.nextStep}>{nextStepText()}</Text>
        </View>
      </View>

    )
  }

  return null;
}

maybeDisplayNextButton = (props) => {
  if (props.currentAndNextStep) {
    return (
      <TouchableOpacity style={styles.nextButton} onPress={props.onPressNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    )
    
  }
  return null;
}

export default (props) => (
  <View style={styles.container}>
    <View style={{width: '100%', backgroundColor: props.currentAndNextStep ? 'rgba(52, 52, 52, 0.3)' : null}}>
      <View style={styles.topIconsWrapper}>
        <TouchableOpacity onPress={props.onPressBack}>
          <Image source={require('../assets/ar-camera/left-arrow.png')} />
        </TouchableOpacity>
        <Image source={require('../assets/ar-camera/camera.png')} />
        <Image source={require('../assets/ar-camera/question-white.png')} />
      </View>
      {props.currentAndNextStep ? null : <Text style={styles.detectionHeader}>{props.detectionHeader}</Text>}
      {maybeDisplaySteps(props.currentAndNextStep)}
    </View>
    {props.displayCheckMark ?  <Image style={styles.checkmark} source={require('../assets/ar-camera/check.png')} /> : null }
    {maybeDisplayNextButton(props)}
  </View> 
);