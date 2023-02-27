import { motion } from "framer-motion";
import styled from "styled-components";
export const Wrapper = styled.div`
  background-color: black;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

export const Banner = styled.div<{ $$bgImg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.$$bgImg});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  width: 50%;
  font-size: 1.5rem;
`;

export const Slider = styled.div`
  position: relative;
  top: -100px;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

export const Article = styled(motion.article)<{ $$bgImg: string }>`
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

export const Info = styled(motion.div)`
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

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
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

export const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
export const BigTitle = styled.h3`
  position: relative;
  padding: 15px;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
`;
export const BigOverview = styled.p`
  position: relative;
  top: -80px;
  padding: 15px;
  color: ${(props) => props.theme.white.lighter};
`;

export const rowVariants = {
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

export const boxVariants = {
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

export const infoVarinats = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.2,
      type: "tween", // 바운싱 없애기
    },
  },
};

export const offset = 6;
