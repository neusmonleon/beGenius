import { container } from "../../../../../assets/jss/material-kit-react.js";
import background from "../../../../../assets/img/desktop.jpg";

const carouselStyle = {
  section: {
    //padding: "70px 0",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
  },
  h2:{
    color: "white",
    textShadow: "4px 4px black",
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
};

export default carouselStyle;
