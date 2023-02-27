import { useQuery } from "@tanstack/react-query";
import { fetchMovies, IFetchMoviesResult } from "../../api";
import { AnimatePresence, useScroll } from "framer-motion";
import { makeImgPath } from "../../utilities";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import {
  Banner,
  BigCover,
  BigMovie,
  BigOverview,
  Article,
  boxVariants,
  Info,
  infoVarinats,
  Loader,
  offset,
  Overlay,
  Overview,
  Row,
  rowVariants,
  Slider,
  Title,
  Wrapper,
  BigTitle,
} from "./home.style";

// interface IForm {
//   keyword: string;
// }
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
            {/* <Overview>{data?.results[0].overview}</Overview> */}
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
                    <Article
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
                    </Article>
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
// function useForm<T>(): { register: any; handleSubmit: any } {
//   throw new Error("Function not implemented.");
// }
