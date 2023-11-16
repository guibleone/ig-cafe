import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    Box, AppBar as MuiAppBar, Toolbar, IconButton, Typography,
    CssBaseline, Drawer, Divider, List, ListItem, ListItemIcon, Avatar, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
    TbMenu2, TbArrowNarrowLeft, TbArrowNarrowRight,
    TbSearch, TbHome2, TbUsers, TbNews, TbHome, TbMessage, TbFile, TbId, TbFiles, TbMap2
} from "react-icons/tb";
import { MdLiquor, MdOutlineLiquor } from "react-icons/md";
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice';
import ButtonChangeRole from '../ChangeRole/ButtonChangeRole';
import { AiOutlineUser } from 'react-icons/ai';
import { resetResume } from "../../features/resume/resumeSlice"
import { resetDocuments } from "../../features/documents/documentsSlice"
import { reset as resetAdmin } from "../../features/admin/adminSlice"
import { reset as resetProducts } from "../../features/products/productsSlice"
import { reset as resetSpreadsheet } from "../../features/spreadSheet/spreadSheetSlice"
import { resetPayments } from "../../features/payments/paymentsSlice"
import { IoDocumentsOutline } from "react-icons/io5";
import { BiUserPlus } from 'react-icons/bi';
import { useEffect } from 'react';

const drawerWidth = '65%';


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}))



function NavMenu() {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(resetResume())
        dispatch(logout())
        dispatch(reset())
        dispatch(resetDocuments())
        dispatch(resetAdmin())
        dispatch(resetProducts())
        dispatch(resetSpreadsheet())
        dispatch(resetPayments())

        navigate('/')
    }


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const path = useLocation();


    useEffect(() => {

        handleDrawerClose()

    }, [path]);



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                backgroundColor: '#2E2E2E'
            }}>
                <Toolbar>

                    <Link style={{ flexGrow: 1,marginTop:'10px',marginLeft:'10px' }} className="logo" to='/'>
                       <img src={require('../../imgs/logo_cafe_branco.png')} alt="logo" width="65px" />
                    </Link>


                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{ ...(open && { display: 'none' }) }}
                    >
                        <TbMenu2 />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                anchor="right"
                open={open}
                PaperProps={{
                    sx: {
                        backgroundColor: "#2E2E2E",
                        color: "#FAF8F8",
                    }
                }}
                onClose={handleDrawerClose}
            >
                <DrawerHeader sx={{
                    backgroundColor: '#2E2E2E',
                    color: '#FAF8F8',
                }}>
                    <IconButton style={{ color: '#FAF8F8', }} onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <TbArrowNarrowLeft /> : <TbArrowNarrowRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{
                    backgroundColor: '#2E2E2E',
                    color: '#FAF8F8',
                }}>
                    {user && (
                        <>
                            <ListItem >
                                <Box sx={{ display: 'flex', gap: '15px', alignItems: 'center' }}>

                                    <Link style={
                                        {
                                            color: 'inherit',
                                            textDecoration: 'none',

                                        }
                                    } to="/meu-perfil">

                                        <Avatar src={user.dados_pessoais ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"

                                            sx={{ width: 46, height: 46 }} />

                                    </Link>

                                    <Box sx={{ maxWidth: '55%' }}>
                                        <Link style={
                                            {
                                                color: 'inherit',
                                                textDecoration: 'none',

                                            }
                                        } to="/meu-perfil">

                                            <Typography noWrap variant="subtitle1" component="div" sx={{ color: '#FAF8F8' }}>
                                                {user.dados_pessoais.name}
                                            </Typography>

                                        </Link>

                                        <h5 style={{ color: '#FAF8F8', fontWeight: 300 }}>
                                            {user && user.role === 'produtor associado' ? 'produtor associado' : user.role}
                                        </h5>

                                    </Box>



                                </Box>

                            </ListItem>
                        </>)}


                    {/* sem login */}

                    {(!user || (user && !user.role)) && (<>
                        <ListItem >

                            <ListItemIcon>
                                <TbHome2 style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }
                            } to="/">Início</Link>
                        </ListItem>

                        <ListItem >
                            <ListItemIcon>
                                <TbSearch style={{ color: "#FAF8F8" }} h />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }
                            } to="/rastreabilidade">Rastreabilidade</Link>
                        </ListItem>
                          
                        <ListItem >
                            <ListItemIcon>
                                <IoDocumentsOutline style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',

                                }
                            } to="/documentos">Documentos</Link>
                        </ListItem>

                    </>)}

                    {/*presidente */}

                    {user && user.role === 'presidente' && <>
                        <ListItem >

                            <ListItemIcon>
                                <TbHome2 style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }
                            } to="/">Início</Link>
                        </ListItem>

                        <ListItem >

                            <ListItemIcon>
                                <TbMessage style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }
                            } to="/reunioes">Reuniões</Link>
                        </ListItem>


                        <ListItem >

                            <ListItemIcon>
                                <TbUsers style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }
                            } to="/produtores">Produtores</Link>
                        </ListItem>

                    </>}


                    {/* produtor */}

                    {user && (user.role === 'produtor' || user.role === 'produtor_associado') && <>
                        <ListItem >
                            <ListItemIcon>
                                <TbUsers style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',

                                }
                            } to="/">Início</Link>
                        </ListItem>

                        <ListItem >
                            <ListItemIcon>
                                <TbNews style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',

                                }
                            } to="/produtos">Produtos</Link>
                        </ListItem>

                        <ListItem >
                            <ListItemIcon>
                                <TbId style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',

                                }
                            } to="/credencial">Credencial</Link>
                        </ListItem>
                    </>}

                    {/* admin */}

                    {user && user.role === 'admin' && <>

                        <ListItem >
                            <ListItemIcon>
                                <TbHome style={{ color: "#FAF8F8" }} />
                            </ListItemIcon>
                            <Link style={
                                {
                                    color: 'inherit',
                                    textDecoration: 'none',

                                }
                            } to="/">Início</Link>
                        </ListItem>

                    </>}

                </List>

                {/* tesoureiro */}
                {user && user.role === 'tesoureiro' && <>
                    <ListItem >
                        <ListItemIcon>
                            <TbHome style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/">Início</Link>
                    </ListItem>

                    <ListItem >
                        <ListItemIcon>
                            <TbFile style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/balancos">Balanços</Link>
                    </ListItem>
                    <ListItem >

                        <ListItemIcon>
                            <TbMessage style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',
                            }
                        } to="/reunioes">Reuniões</Link>
                    </ListItem>



                </>}

                {/* conselho regulador */}
                {user && user.role === 'conselho' && <>
                    <ListItem >
                        <ListItemIcon>
                            <TbHome style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/">Início</Link>
                    </ListItem>

                    <ListItem >
                        <ListItemIcon>
                            <TbId style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/credenciamento">Credenciamento</Link>
                    </ListItem>

                    <ListItem >
                        <ListItemIcon>
                            <MdOutlineLiquor style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/produtos-conselho">Produtos</Link>
                    </ListItem>

                    <ListItem >
                        <ListItemIcon>
                            <TbMessage style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/reunioes">Reuniões</Link>
                    </ListItem>

                </>}

                {/* secretário */}
                {user && user.role === 'secretario' && <>
                    <ListItem >
                        <ListItemIcon>
                            <TbHome style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/">Início</Link>
                    </ListItem>

                    <ListItem >
                        <ListItemIcon>
                            <TbMessage style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/reunioes">Reuniões</Link>
                    </ListItem>

                    <ListItem >
                        <ListItemIcon>
                            <TbFiles style={{ color: "#FAF8F8" }} />
                        </ListItemIcon>
                        <Link style={
                            {
                                color: 'inherit',
                                textDecoration: 'none',

                            }
                        } to="/relatorios">Relatórios</Link>
                    </ListItem>


                </>}


                <List>

                    {user && (
                        ((user.role !== 'admin' && user.role !== 'produtor' && user.role !== 'produtor_associado') || user.oldRole)
                            ?
                            <ListItem sx={{ justifyContent: 'center' }}>
                                <ButtonChangeRole />
                            </ListItem>
                            : null
                    )}


                    {!user ? (
                        <>
                            <ListItem style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className='button-red' onClick={() => navigate('/entrar')}>Área Produtor</button>
                            </ListItem>
                        </>
                    ) : (

                        <ListItem sx={{ justifyContent: 'center' }}>
                            <button className='button-white ' style={{
                                width: '85%',
                            }} onClick={onLogout}>
                                Sair
                            </button>
                        </ListItem>
                    )}


                </List>
            </Drawer>
        </Box >
    )
}



export default NavMenu