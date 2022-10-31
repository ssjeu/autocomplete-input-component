import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
`;

export const Button = styled.div`
  font-size: 18px;
  margin-left: 12px;
  padding: 8px 4px;
  color: #f8f9fa;
  width: 60px;
  border: 2px solid #f8f9fa;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    color: #61dafb;
  }
`;
