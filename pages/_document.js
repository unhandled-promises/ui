import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>Fit2Work</title>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
          
            <link href="https://fonts.googleapis.com/css?family=Allan|Baloo+Chettan|Changa+One|Delius|Emblema+One|Vast+Shadow|Roboto|Montserrat" rel="stylesheet" />
          
        </Head>
        <style>{`body{ margin:0 }`}
        </style>
        <body>
          <script src="../static/jwt-decode.min.js"></script>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
