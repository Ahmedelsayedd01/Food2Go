import React from "react";
import styled from "styled-components";

const Switch = ({ handleClick, checked }) => {
       return (
              <StyledWrapper>
                     <label className="switch">
                            <input type="checkbox" onClick={handleClick} checked={checked} readOnly />
                            <span className="slider" />
                     </label>
              </StyledWrapper>
       );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 10px;
    position: relative;
    display: inline-block;
    width: 64px;
    height: 32px;
  }

  .switch input {
    opacity: 0; 
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #9D9D9D;
    transition: 0.4s;
    border-radius: 30px;
    border: 1px solid transparent;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 25px; 
    width: 25px;  
    border-radius: 16px;
    left: 4px; 
    top: 3px; 
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #9E090F;
  }
  
  input:checked + .slider:before {
       transform: translateX(32px); 
       left: 2px; 
  }
`;

export default Switch;
