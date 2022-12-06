import styled from 'styled-components';
import imagebg from '../../assets/image-bg.jpg';


const BannerImage = styled.figure`
  width: 60%;
  height: 100%;
  background-image: url(${imagebg});
  background-size: cover;
  background-position: center;

`;

export { BannerImage };

