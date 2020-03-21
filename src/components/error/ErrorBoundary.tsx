import React from "react";
import {logger} from "../../utils/logger";

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  errorMessage?: string
}

export class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      errorMessage: undefined
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({errorMessage: error.message});
    logger.error(error.message, errorInfo);
  }

  render() {
    const {errorMessage} = this.state;

    return errorMessage ? (
      <>
        <div>Something wrong: {errorMessage}</div>
        <button onClick={() => location.href = '/'}>go to main page</button>
      </>
    ) : this.props.children;
  }
}
