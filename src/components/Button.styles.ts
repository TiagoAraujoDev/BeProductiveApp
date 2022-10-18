import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secundary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secundary: "orange",
  danger: "red",
  success: "green"
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 60px;
  border: none;
  border-radius: 2px;
  margin-right: 2px;

  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }}
`;
