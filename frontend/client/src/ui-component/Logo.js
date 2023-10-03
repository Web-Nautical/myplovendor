// material-ui
import { useTheme } from '@mui/material/styles';
import logo from '../assets/images/image 2 (1).png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <div>
            <img src={logo} alt="logo" width="70px" className="logo-dektop" />
        </div>
    );
};

export default Logo;
