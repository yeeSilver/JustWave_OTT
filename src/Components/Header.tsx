import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 150px;
  height: 25px;
  fill: ${(props) => props.theme.purple};
  &:hover {
    path {
      stroke: ${(props) => props.theme.purple};
    }
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  /* padding-right: 30px; */
  color: white;
  svg {
    height: 25px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.purple};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    // transition: {
    //   repeat: Infinity,
    // },
    strokeWidth: "20px",
  },
};

const navVariants = {
  up: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch: PathMatch<string> | null = useMatch("/");
  const tvMatch: PathMatch<string> | null = useMatch("tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"up"}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          animate="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M67.5312 229.125C55.7604 229.125 45.0833 226.312 35.5 220.688C26.0208 215.062 18.5208 207.302 13 197.406C7.58333 187.406 4.875 176.26 4.875 163.969V149.125C4.875 148.292 5.29167 147.875 6.125 147.875H42.375C43.2083 147.875 43.625 148.448 43.625 149.594V163.969C43.625 171.781 45.8646 178.188 50.3438 183.188C54.8229 188.083 60.5521 190.531 67.5312 190.531C73.9896 190.531 79.5625 187.875 84.25 182.562C88.9375 177.146 91.2812 170.948 91.2812 163.969V4.90625C91.2812 4.07292 91.6979 3.65625 92.5312 3.65625H128.469C129.302 3.65625 129.719 4.17708 129.719 5.21875L130.031 163.969C130.031 175.635 127.219 186.417 121.594 196.312C115.865 206.312 108.312 214.281 98.9375 220.219C89.5625 226.156 79.0938 229.125 67.5312 229.125ZM213 229.125C201.75 229.125 191.333 226.208 181.75 220.375C172.167 214.542 164.51 206.729 158.781 196.938C153.156 187.042 150.344 176.26 150.344 164.594L150.969 4.59375C150.969 3.76042 151.385 3.34375 152.219 3.34375H188.156C188.99 3.34375 189.406 3.76042 189.406 4.59375V164.594C189.406 171.781 191.698 177.927 196.281 183.031C200.865 188.031 206.438 190.531 213 190.531C219.875 190.531 225.604 188.031 230.188 183.031C234.771 177.927 237.062 171.781 237.062 164.594V4.59375C237.062 3.76042 237.479 3.34375 238.312 3.34375H274.25C275.083 3.34375 275.5 3.76042 275.5 4.59375L276.125 164.594C276.125 176.365 273.312 187.198 267.688 197.094C261.958 206.885 254.354 214.698 244.875 220.531C235.396 226.26 224.771 229.125 213 229.125ZM355.656 229.125C344.302 229.125 333.833 226.208 324.25 220.375C314.771 214.542 307.167 206.781 301.438 197.094C295.812 187.302 293 176.573 293 164.906V150.219C293 149.073 293.521 148.5 294.562 148.5H330.5C331.333 148.5 331.75 149.073 331.75 150.219V164.906C331.75 171.885 334.094 177.927 338.781 183.031C343.469 188.031 349.094 190.531 355.656 190.531C362.323 190.531 368 187.979 372.688 182.875C377.375 177.667 379.719 171.677 379.719 164.906C379.719 157.094 374.615 150.271 364.406 144.438C362.74 143.396 360.552 142.146 357.844 140.688C355.24 139.125 352.115 137.354 348.469 135.375C344.823 133.396 341.281 131.469 337.844 129.594C334.406 127.615 331.073 125.74 327.844 123.969C316.177 117.094 307.479 108.5 301.75 98.1875C296.125 87.7708 293.312 76.1042 293.312 63.1875C293.312 51.3125 296.229 40.5833 302.062 31C307.896 21.5208 315.5 14.0208 324.875 8.5C334.354 2.875 344.615 0.0625 355.656 0.0625C367.01 0.0625 377.427 2.875 386.906 8.5C396.385 14.2292 403.938 21.8333 409.562 31.3125C415.292 40.7917 418.156 51.4167 418.156 63.1875V89.4375C418.156 90.2708 417.74 90.6875 416.906 90.6875H380.969C380.135 90.6875 379.719 90.2708 379.719 89.4375L379.406 63.1875C379.406 55.6875 377.062 49.5938 372.375 44.9062C367.688 40.2188 362.115 37.875 355.656 37.875C349.094 37.875 343.469 40.375 338.781 45.375C334.094 50.375 331.75 56.3125 331.75 63.1875C331.75 70.1667 333.208 76 336.125 80.6875C339.146 85.375 344.615 89.8542 352.531 94.125C353.365 94.5417 355.292 95.5833 358.312 97.25C361.333 98.9167 364.667 100.792 368.312 102.875C372.062 104.854 375.448 106.677 378.469 108.344C381.49 109.906 383.312 110.844 383.938 111.156C394.562 117.094 402.948 124.385 409.094 133.031C415.344 141.677 418.469 152.302 418.469 164.906C418.469 177.094 415.656 188.031 410.031 197.719C404.302 207.406 396.698 215.062 387.219 220.688C377.74 226.312 367.219 229.125 355.656 229.125ZM502.375 226H466.281C465.344 226 464.875 225.479 464.875 224.438V41.9375H423.312C422.271 41.9375 421.75 41.4167 421.75 40.375L422.062 4.59375C422.062 3.76042 422.479 3.34375 423.312 3.34375H544.875C546.021 3.34375 546.594 3.76042 546.594 4.59375V40.375C546.594 41.4167 546.177 41.9375 545.344 41.9375H503.312L503.625 224.438C503.625 225.479 503.208 226 502.375 226ZM704.25 225.688L646.906 226C645.865 226 645.344 225.479 645.344 224.438L645.969 4.59375C645.969 3.76042 646.385 3.34375 647.219 3.34375L707.062 3.03125C718.938 2.71875 729.667 5.42708 739.25 11.1562C748.938 16.8854 756.646 24.6458 762.375 34.4375C768.208 44.125 771.125 54.8542 771.125 66.625V158.5C771.125 170.792 768.156 182.042 762.219 192.25C756.177 202.354 748.156 210.427 738.156 216.469C728.156 222.406 716.854 225.479 704.25 225.688ZM707.062 41.3125L684.719 41.625L684.406 186.625H704.25C712.167 186.625 718.833 183.865 724.25 178.344C729.667 172.823 732.375 166.208 732.375 158.5V66.3125C732.375 59.5417 729.875 53.6562 724.875 48.6562C719.875 43.5521 713.938 41.1042 707.062 41.3125ZM834.094 226H797.844C796.802 226 796.281 225.479 796.281 224.438L796.594 4.59375C796.594 3.76042 797.01 3.34375 797.844 3.34375H833.781C834.615 3.34375 835.031 3.76042 835.031 4.59375L835.344 224.438C835.344 225.479 834.927 226 834.094 226ZM938.156 226H899.406C898.469 226 897.948 225.479 897.844 224.438L853.625 4.59375C853.417 3.76042 853.833 3.34375 854.875 3.34375H891.125C891.958 3.34375 892.479 3.76042 892.688 4.59375L918.938 151.156L944.562 4.59375C944.771 3.76042 945.292 3.34375 946.125 3.34375H981.906C983.052 3.34375 983.469 3.76042 983.156 4.59375L939.719 224.438C939.615 225.479 939.094 226 938.156 226ZM1106.59 226H1003.16C1002.32 226 1001.91 225.479 1001.91 224.438L1002.22 4.59375C1002.22 3.76042 1002.64 3.34375 1003.47 3.34375H1106.28C1107.11 3.34375 1107.53 3.86458 1107.53 4.90625V40.6875C1107.53 41.5208 1107.11 41.9375 1106.28 41.9375H1040.66V91.9375H1106.28C1107.11 91.9375 1107.53 92.3542 1107.53 93.1875L1107.84 129.438C1107.84 130.271 1107.43 130.688 1106.59 130.688H1040.66V186.625H1106.59C1107.43 186.625 1107.84 187.146 1107.84 188.188V224.75C1107.84 225.583 1107.43 226 1106.59 226Z" />
        </Logo>

        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -210 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 1 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
