import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Box, CssBaseline, CircularProgress} from '@mui/material';
import Secretary from "./Acesses/Secretario/Secretary"
import Tesoureiro from "./Acesses/Tesoureiro/Tesoureiro"
import President from "./Acesses/Presidente/President"
import Admin from "./Acesses/Admin/Admin"
import { getSubscription } from "../../features/payments/paymentsSlice"
import Conselho from "./Acesses/Conselho/Conselho";
import './Style.css'
import { Link, useNavigate } from "react-router-dom";
import { colors } from '../colors'
import { getDocuments } from "../../features/documents/documentsSlice";
import Produtor from "./Acesses/Produtor/Produtor";


function Dashboard() {


  const { user } = useSelector((state) => state.auth)
  const { isLoading: isLoadingPayments } = useSelector((state) => state.payments)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const img = new Image();
    img.src = require('../../imgs/seloFoto.png');
  }, []);


  useEffect(() => {

    if (user) {

      const userData = {
        cpf: user.dados_pessoais.cpf,
        token: user.token
      }

      dispatch(getSubscription(userData))
      dispatch(getDocuments(user.token))
    }

    if(!user){
      navigate('/documentos')
    }


  }, [user, dispatch])

  if (isLoadingPayments) {

    return <Box sx={
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.main_white,
        minHeight: '100vh',
        marginTop:'-16px'
      }
    }>
      <CircularProgress sx={
        {
          marginBottom: '100px',
        }
      } size={100} />
    </Box>
  }



  return (
    <Box>
      <CssBaseline />

      {(!user) ? (
        <>
        </>


      ) : (

        <>

          {(user.role === "produtor" || user.role === 'produtor_associado') && (
            <Produtor />
          )}

          {(user.role === "admin") && (
            <Admin />
          )}

          {(user.role === 'secretario') && (
            <Secretary />
          )}

          {(user.role === 'tesoureiro') && (
            <Tesoureiro />
          )}

          {(user.role === 'presidente') && (
            <President />
          )}

          {(user.role === 'conselho') && (
            <Conselho />
          )}

        </>
      )
      }

    </Box>

  )
}

export default Dashboard