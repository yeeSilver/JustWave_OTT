import { useQuery } from "@tanstack/react-query";
import { fetchMovies, IFetchMoviesResult } from "../api";
import styled from "styled-components";
import { makeImgPath } from "../utilities";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ bgImg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 30px;
`;

export default function Home() {
  const { data, isLoading } = useQuery<IFetchMoviesResult>(
    ["movies", "nowPlaying"],
    fetchMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩 중입니다. 조금만 기다려주세요</Loader>
      ) : (
        <>
          <Banner bgImg={makeImgPath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
