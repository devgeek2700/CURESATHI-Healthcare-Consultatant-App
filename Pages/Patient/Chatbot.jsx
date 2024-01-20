import React from 'react';
import { WebView } from 'react-native-webview';

const Chatbot = () => {
  const botpressWebchatUrl = 'https://mediafiles.botpress.cloud/fa9b608b-825c-47d4-aaa9-466b2fd01527/webchat/index.html';

  return (
    <WebView
      source={{ uri: botpressWebchatUrl }}
      style={{ flex: 1 }}
      injectedJavaScript={`console.log("Botpress Webchat Loaded");`}
    />
  );
};

export default Chatbot;
