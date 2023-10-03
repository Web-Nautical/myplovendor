/* eslint-disable */
import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ApiService } from 'services/apiservices';
let apiServices = new ApiService();

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery,ButtonBase} from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useState } from 'react';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));


    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" style={{ color: '#114CC2' }} />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    const [notificationCount , setNotificationCount] = useState("")
    const [orderNotificationCount , setOrderNotificationCount] = useState([])
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
        const dataString = {};
        apiServices.unreadmessagenotification(dataString).then(res=>{
            if(res.data.status == "success"){
                setNotificationCount(res.data.data)
            }
        })
       
        apiServices.getnotificationdataGetRequest(dataString).then(res=>{
            if(res.data.status == "success"){
                setOrderNotificationCount(res.data.data) 
            }
        })
    }, []);
  
const orderstatuschange=()=>{
    console.log("hello")
    const dataString={
        
    }
    apiServices.orderstatus(dataString).then(res=>{
        if(res.data.status == "success"){
            
        }
    })
}
    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                   
                    <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit" onClick={item.title === 'Orders' ? orderstatuschange : null}>
                        {item.title}
                    </Typography>
                    }

                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
                        
                {                    item.title ==  "Message" 
                                      ?
                                      notificationCount > 0 ?  <ButtonBase sx={{ borderRadius: '12px' }} >          
                    <span className="MuiBadge-badge-177 MuiBadge-colorPrimary-177" style={{top: "2px",position: "absolute",fontSize: "0.75rem",width:"18px",borderRadius: "50%",backgroundColor:"#e71de1"}}>{notificationCount}</span>
                </ButtonBase>:"":""}
                                  
                {item.title === "Orders" && orderNotificationCount.length > 0 ? (
  <ButtonBase sx={{ borderRadius: '12px' }} >
    <span
      className="MuiBadge-badge-177 MuiBadge-colorPrimary-177"
      style={{
        top: "2px",
        position: "absolute",
        fontSize: "0.75rem",
        width: "18px",
        borderRadius: "50%",
        backgroundColor: "#e71de1"
      }}
      
    >
      {orderNotificationCount.length}
    </span>
  </ButtonBase>
) : null}

            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
