import React, { Component } from 'react';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function VoiceCallPage() {
  const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <ZegoUIKitPrebuiltCall
                appID={1071536851}
                appSign={"5e55d74ad561b5261859904ff29755b2fab5452c4643cece420e587b93dc076f"}
                userID={'1234'} 
                userName={'HeathcareCureSathi'}
                callID={'cure_sathi_01'} 

                config={{
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { navigation.navigate('HomePage') },
                    onHangUp: () => { navigation.navigate('HomePage') },
                }}
            />
        </View>
    );
}