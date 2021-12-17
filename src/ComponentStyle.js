//###########  Graphical Components #############
//A
import Accordion from "./components/Components/Accordion/Accordion.js";
import AppBar from "@material-ui/core/AppBar";
//B
import Button from "./components/Components/CustomButtons/Button.js";
//C
import CardHeader from "./components/Components/Card/CardHeader.js";
import CardBody from "./components/Components/Card/CardBody.js";
import CardFooter from "./components/Components/Card/CardFooter.js";
import Card from "./components/Components/Card/Card";
import CustomInput from "./components/Components/CustomInput/CustomInput.js";
import CustomDropdown from "./components/Components/CustomDropdown/CustomDropdown.js";
import CustomLinearProgress from "./components/Components/CustomLinearProgress/CustomLinearProgress.js";
import Clearfix from "./components/Components/Clearfix/Clearfix.js";
import ContactSection from "./components/Sections/ContactSection.js";

//D
import Datetime from "react-datetime";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Drawer from "@material-ui/core/Drawer";
//F
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Footer from "./components/Components/Footer/Footer.js";
//G
import GridContainer from "./components/Components/Grid/GridContainer.js";
import GridItem from "./components/Components/Grid/GridItem.js";
//H
import Header from "./components/Components/Header/Header.js";
import HeaderLinks from "./components/Components/Header/HeaderLinks.js";
import { Hidden } from "@material-ui/core";

//I
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Info from "./components/Components/Typography/Info.js";
//L
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
//M
import makeStyles from "@material-ui/core/styles/makeStyles";
//N
import NavPills from "./components/Components/NavPills/NavPills.js";
//P
import Parallax from "./components/Components/Parallax/Parallax.js";
import Pagination from "./components/Components/Pagination/Pagination.js";
//S
import Slide from "@material-ui/core/Slide";
import SnackbarContent from "./components/Components/Snackbar/SnackbarContent.js";
import SectionCompletedExamples from "./components/Components/Sections/SectionCompletedExamples.js";
import Switch from "@material-ui/core/Switch";
//T
import Toolbar from "@material-ui/core/Toolbar";
import Table from "./components/Components/Table/Table.js";

// @material-ui/core components
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui icons
import {
  AddBox,
  Check,
  Close,
  PersonAddOutlined,
  Subject,
  Warning,
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  LockSharp,
  PeopleAltRounded,
  Email,
  Camera,
  Palette,
  Favorite,
  Mail,
  Menu,
  ShoppingCart,
  CheckOutlined,
  AddShoppingCart,
  Add,
  KeyboardArrowRight,
  Remove,
} from "@material-ui/icons";
import InfoIcon from "@material-ui/icons/Info";

//images
import event from "./assets/img/events.jpg";
import IconoTeamBuilding from "./assets/img/teambuilding.jpg";
import IconoEducacion from "./assets/img/educacion.jpg";
import IconoEventos from "./assets/img/eventos.jpg";

//styles
import stylesGridWithButton from "./assets/jss/material-kit-react/views/ecommerceSections/productsStyle.js";
import stylesEvents from "./assets/jss/material-kit-react/views/ecommerceSections/latestOffersStyle.js";
import stylesTeam from "./assets/jss/material-kit-react/views/landingPageSections/workStyle.js";
import stylesGridBlog from "./assets/jss/material-kit-react/views/ecommerceSections/blogStyle.js";
import stylesTeam2 from "./assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import stylesNavbar from "./assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import stylesLogin from "./assets/jss/material-kit-react/views/loginPage.js";
import styleCheckbox from "./assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import stylesProfile from "./assets/jss/material-kit-react/views/profilePage.js";
import stylesProfilePage from "./assets/jss/material-kit-react/views/profilePageStyle.js";
import stylesEvents2 from "./assets/jss/material-kit-react/views/ecommerceStyle.js";
import stylesLandingPage from "./assets/jss/material-kit-react/views/landingPage.js";
import stylesHeader from "./assets/jss/material-kit-react/components/headerStyle.js";
import stylesImages from "./assets/jss/material-kit-react/imagesStyles.js";
import stylesCards from "./assets/jss/material-kit-react/views/componentsSections/sectionCards.js";
import stylesModal from "./assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import shoppingCartStyle from "./assets/jss/material-kit-react/views/shoppingCartStyle.js";
import tooltipsStyle from "./assets/jss/material-kit-react/tooltipsStyle.js";

export {
  tooltipsStyle,
  shoppingCartStyle,
  stylesModal,
  Table,
  Remove,
  AddShoppingCart,
  InfoIcon,
  CheckOutlined,
  ShoppingCart,
  Info,
  stylesCards,
  stylesImages,
  Pagination,
  Menu,
  stylesHeader,
  Hidden,
  Drawer,
  Toolbar,
  AppBar,
  ContactSection,
  stylesLandingPage,
  stylesEvents2,
  HeaderLinks,
  Mail,
  Accordion,
  stylesProfilePage,
  Clearfix,
  stylesProfile,
  Parallax,
  Camera,
  Palette,
  Favorite,
  styleCheckbox,
  stylesLogin,
  CustomLinearProgress,
  Switch,
  FormControlLabel,
  SectionCompletedExamples,
  CustomDropdown,
  Email,
  LockSharp,
  PeopleAltRounded,
  Datetime,
  stylesTeam2,
  stylesNavbar,
  GridContainer,
  GridItem,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
  Button,
  makeStyles,
  Tooltip,
  AddBox,
  event,
  stylesEvents,
  IconoTeamBuilding,
  IconoEducacion,
  IconoEventos,
  CustomInput,
  SnackbarContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Warning,
  Check,
  Close,
  Slide,
  stylesTeam,
  stylesGridBlog,
  stylesGridWithButton,
  Subject,
  ListItem,
  List,
  PersonAddOutlined,
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  Header,
  Footer,
  InputAdornment,
  NavPills,
  Add,
  KeyboardArrowRight,
};
