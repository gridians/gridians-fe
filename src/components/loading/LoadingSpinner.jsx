import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <LoaderContainer>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ClimbingBoxLoader color="#738598" size={30} />
      </div>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
`;
