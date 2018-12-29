import React from 'react';
import App, { Container } from 'next/app';
import { Provider as UnstatedProvider } from 'unstated';
import 'bulma/bulma.sass';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <UnstatedProvider>
          <Component {...pageProps} />
        </UnstatedProvider>
      </Container>
    );
  }
}

export default MyApp;
