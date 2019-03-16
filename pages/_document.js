import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';
import PropTypes from 'prop-types';
import flush from 'styled-jsx/server';

class MyDocument extends Document {
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
        const { pageContext } = this.props;

        return (
            <html>
                <Head>
                    <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
                    <script src="https://js.stripe.com/v3/"></script>
                    {/* Step 5: Output the styles in the head  */}
                    {this.props.styleTags}

                    <link href="https://fonts.googleapis.com/css?family=Allan|Baloo+Chettan|Changa+One|Delius|Emblema+One|Vast+Shadow|Roboto|Montserrat" rel="stylesheet" />
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                    <meta name="theme-color" content={pageContext ? pageContext.theme.palette.primary.main : null} />
                    <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
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

MyDocument.getInitialProps = ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    let pageContext;
    const page = ctx.renderPage(Component => {
        const WrappedComponent = props => {
            pageContext = props.pageContext;
            return <Component {...props} />;
        };

        WrappedComponent.propTypes = {
            pageContext: PropTypes.object.isRequired,
        };

        return WrappedComponent;
    });

    let css;
    // It might be undefined, e.g. after an error.
    if (pageContext) {
        css = pageContext.sheetsRegistry.toString();
    }

    return {
        ...page,
        pageContext,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: (
            <React.Fragment>
                <style
                    id="jss-server-side"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: css }}
                />
                {flush() || null}
            </React.Fragment>
        ),
    };
};

export default MyDocument;
