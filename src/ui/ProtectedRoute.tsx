import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: any }) {
  const navigate = useNavigate();
  const { isAuth, isLoading } = useUser();

  useEffect(
    function () {
      if (!isAuth && !isLoading) navigate("/login");
    },
    [isAuth, isLoading, navigate]
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuth) return children;
}

export default ProtectedRoute;
