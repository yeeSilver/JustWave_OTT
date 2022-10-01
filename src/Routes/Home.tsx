import { useQuery } from "@tanstack/react-query";
import { fetchMovies, IFetchMoviesResult } from "../api";
import styled from "styled-components";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { makeImgPath } from "../utilities";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Banner = styled.div<{ $$bgImg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.$$bgImg});
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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $$bgImg: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.$$bgImg});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left; // 첫번째 이미지는 호버시 오른쪽으로만 커지게 함
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  /* top: scrollY.get() + 100; */
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  position: relative;
  padding: 15px;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
`;
const BigOverview = styled.p`
  position: relative;
  top: -80px;
  padding: 15px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.3,
      type: "tween", // 바운싱 없애기
    },
  },
};

const infoVarinats = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.2,
      type: "tween", // 바운싱 없애기
    },
  },
};

const offset = 6;

interface IForm {
  keyword: string;
}

export default function Home() {
  const navigate = useNavigate();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IFetchMoviesResult>(
    ["movies", "nowPlaying"],
    fetchMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    //Box 클릭 시 url이동
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => {
    navigate("/");
  };
  const clickedMovie =
    moviePathMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === moviePathMatch.params.movieId
    );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩 중입니다. 조금만 기다려주세요</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            $$bgImg={makeImgPath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      $$bgImg={makeImgPath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVarinats}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {moviePathMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={moviePathMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImgPath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
