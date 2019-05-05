import React from "react";
import { View, Text, Button } from "react-native";

import { AdMobBanner, AdMobRewarded } from "expo";
import { WebBrowser } from "expo";

const REWARDED_ID = "ca-app-pub-3940256099942544/1712485313";

AdMobRewarded.setAdUnitID(REWARDED_ID);
AdMobRewarded.setTestDeviceID("EMULATOR");

export default class AdScreen extends React.Component {
  static navigationOptions = {
    title: "Ads"
  };

  _openRewarded = async () => {
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
  };

  componentDidMount() {
    this._openRewarded();
  }

  render() {
    return (
      <View>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/2934735716"
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
        <Text>REWARDED AD</Text>
        <Button title="OPEN" color="green" onPress={this._openRewarded} />
      </View>
    );
  }
}
