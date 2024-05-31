import {useNavigate} from "react-router-dom";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {SidNavItemInterface} from "../interfaces";
import {useDispatch, useSelector} from "react-redux";
import {
    setOpenBankCsv,
    setOpenExtraHourCsv,
    setOpenNominaPdf,
    setOpenPagoNomina
} from "../store/modules/administration";



export const SideNavItem = ({to, name, NavIcon}: SidNavItemInterface) => {

    const navigate = useNavigate();
    const sideNav = useSelector(state => state.sideNav);
    const dispatch = useDispatch();

    const onNavigate = () => {
        if (to.includes('bank-csv')) {
            dispatch(setOpenBankCsv({open: true}));
        }

        if (to.includes('extra-hour-pdf')) {
            dispatch(setOpenExtraHourCsv({open: true}));
        }

        if (to.includes('nomina-pdf')) {
            dispatch(setOpenNominaPdf({open: true}));
        }

        if (to.includes('pago-nomina')) {
            dispatch(setOpenPagoNomina({open: true}));
        }

        navigate(to);
    }

    return (
        <ListItemButton sx={{
            pl: 3,
            backgroundColor: 'rgb(255,255,255, 0.1)',
            borderRadius: 5,
            paddingLeft: `${sideNav.collapsed ? '8px' : '16px'}`,
            m: 1
        }} onClick={onNavigate} disableRipple>
            <ListItemIcon>
                <NavIcon sx={{color: 'primary.light'}}/>
            </ListItemIcon>
            <ListItemText hidden={sideNav.collapsed} sx={{color: 'primary.light'}} primary={name}/>
        </ListItemButton>
    );
}
