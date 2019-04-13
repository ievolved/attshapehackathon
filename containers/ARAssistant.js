import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { ARKit } from 'react-native-arkit';
export default class ARAssistant extends Component {
  state = {
    viewingCoffeeMaker: 'none'
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  };

  showMessage = () => {
    this.setState({
      viewingCoffeeMaker: 'flex'
    })
  }

  hideMessage = () => {
    this.setState({
      viewingCoffeeMaker: 'none'
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ARKit
          style={{ flex: 1 }}
          debug
          // enable plane detection (defaults to Horizontal)
          planeDetection={ARKit.ARPlaneDetection.Horizontal}

          // enable light estimation (defaults to true)
          lightEstimationEnabled
          // get the current lightEstimation (if enabled)
          // it fires rapidly, so better poll it from outside with
          // ARKit.getCurrentLightEstimation()
          onLightEstimation={e => console.log(e.nativeEvent)}

          // event listener for (horizontal) plane detection
          onPlaneDetected={anchor => console.log(anchor)}

          // event listener for plane update
          onPlaneUpdated={anchor => console.log(anchor)}

          // arkit sometimes removes detected planes
          onPlaneRemoved={anchor => console.log(anchor)}

          // event listeners for all anchors, see [Planes and Anchors](#planes-and-anchors)
          onAnchorDetected={anchor => this.showMessage()}
          onAnchorUpdated={anchor => this.showMessage()}
          onAnchorRemoved={anchor => this.hideMessage()}

          // you can detect images and will get an anchor for these images
          detectionImages={[{ resourceGroupName: 'CoffeeScans' }]}


          onARKitError={console.log} // if arkit could not be initialized (e.g. missing permissions), you will get notified here
        >
          <Text style={{color: '#ffffff', display: this.state.viewingCoffeeMaker}}>Coffee Maker Detected!</Text>
          <Text style={{color: '#ffffff'}}>Detection Images: {this.props.detectionImages}</Text>
        </ARKit>
      </View>
    );
  }
}
