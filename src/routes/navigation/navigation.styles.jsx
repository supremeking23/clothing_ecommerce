import { Link } from "react-router-dom";
import styled from "styled-components";


/* styling html based element, ex: div, span, p */
export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

/* Styling existing component */
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;


export const NavLink = styled(Link)`
  padding: 10px 15px;         
  cursor: pointer;
`;

// .navigation {
//     height: 70px;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     margin-bottom: 25px;
  
//     .logo_container {
//       height: 100%;
//       width: 70px;
//       padding: 25px;
//     }
  
//     .nav_links_container {
//       width: 50%;
//       height: 100%;
//       display: flex;
//       align-items: center;
//       justify-content: flex-end;
  
//       .nav_link {
//         padding: 10px 15px;
//         cursor: pointer;
//       }
//     }
//   }