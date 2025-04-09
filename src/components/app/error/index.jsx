import PropTypes from "prop-types";
import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // If the error is about a failed module fetch, set hasError to true
    if (error.message.includes("Failed to fetch dynamically imported module")) {
      return { hasError: true };
    }
    return { hasError: false }; // Let other errors bubble up
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex justify-center items-center h-screen'>
          <h1 className='text-2xl text-red-500'>
            Server is down. Please start the server and try again.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
