import styled, { css } from "styled-components";

interface RowProps {
  type?: string;
}

const Row = styled.div<RowProps>`
  display: flex;

  ${(props: any) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props: any) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
