import { useNavigate, Link } from "react-router-dom"
import { logout, reset } from '../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { resetResume } from "../../features/resume/resumeSlice"
import { resetDocuments } from "../../features/documents/documentsSlice"
import { reset as resetAdmin } from "../../features/admin/adminSlice"
import { reset as resetProducts } from "../../features/products/productsSlice"
import { reset as resetSpreadsheet } from "../../features/spreadSheet/spreadSheetSlice"
import { Box, Typography, CssBaseline, Avatar } from '@mui/material'
import { useMediaQuery } from "@mui/material"
import NavMenu from "./NavMenu"
import ButtonChangeRole from "../ChangeRole/ButtonChangeRole"
import { CiSearch } from "react-icons/ci";
import './StylesNavbar.css'
import { AiOutlineUser } from "react-icons/ai"
import { resetPayments } from '../../features/payments/paymentsSlice'
import { MdOutlineLiquor } from "react-icons/md"
import { BiUserPlus } from "react-icons/bi"
import { TbMap2 } from "react-icons/tb"

function Navbar() {

  const { user } = useSelector(state => state.auth)
  const { payments } = useSelector(state => state.payments)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = () => {
    dispatch(resetResume())
    dispatch(reset())
    dispatch(resetDocuments())
    dispatch(resetAdmin())
    dispatch(resetProducts())
    dispatch(resetSpreadsheet())
    dispatch(resetPayments())
    dispatch(logout())
    navigate('/')
  }

  const matches = useMediaQuery('(max-width:1400px)')

  if (matches) {

    return (

      <Box sx={
        {
          display: 'flex',
          justifyContent: 'space-around',
          padding: '10px',
        }

      }>

        <NavMenu />

      </Box>
    )

  }


  return (
    <Box sx ={{
    }}>
      <CssBaseline />

      {/*produtor não associado (user) */}

      {user && (user.role === 'produtor' || user.role === 'produtor_associado') && (
        <>
          <Box sx={{
            backgroundColor: '#C1051F',
            padding: '10px 0',
            width: '100%',
            textAlign: 'center',
            position: 'sticky'
          }}>
            <h4 className="medium" style={{ color: '#FAF8F8', fontWeight: 500 }}>
              Você está logado como <span style={{ color: '#FAF8F8', fontWeight: 600 }}>{user.role === 'produtor' ? 'produtor' : 'produtor associado'} {user.status === 'analise' && '(análise)'}
                {user.status === 'aprovado' && payments && !payments.portal && '(requer assinatura)'}
              </span>
            </h4>
          </Box>

          <Box>
            <div className="navbar">

              <Link className="logo" to='/'>
               <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
              </Link>

              <div className="links-centrais">

                <Link className="links" to="/"><h4 className="medium">Início</h4></Link>
                <Link className="links" to="/produtos"><h4 className="medium">Produtos</h4></Link>
                <Link className="links" to="/credencial"><h4 className="medium">Credencial</h4></Link>

                {user && user.oldRole
                  ?
                  <ButtonChangeRole />

                  : null
                }

              </div>

              <div className="actions">

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}>

                  <Avatar src={(user && user.dados_pessoais.profilePhoto) ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"></Avatar>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}>

                    <Link to={'/meu-perfil'}  >
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#ffffff',
                      }}>{user.dados_pessoais.name.split(' ')[0]}</Typography>
                    </Link>


                    <Box sx={
                      { display: 'flex', alignItems: 'center', gap: '5px' }
                    }>

                      <button className='button-black no-border' onClick={onLogout}>
                        sair
                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M9 0.984375L5.64018 3.78422C5.26934 4.09326 4.73066 4.09326 4.35982 3.78422L1 0.984376" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>

                  </Box>

                </Box>

              </div>

            </div>
          </Box>
        </>
      )}


      {/* gerente administrativo */}

      {user && (user.role === 'admin') && (
        <>
          <Box
            sx={{
              backgroundColor: '#C1051F',
              padding: '10px 0',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h4 className="medium" style={{ color: '#FAF8F8', fontWeight: 500 }}>
              Você está logado como <span style={{ color: '#FAF8F8', fontWeight: 600 }}>{user.role === 'admin' ? 'gerente administrativo' : user.role}</span>
            </h4>
          </Box>

          <Box>
            <div className="navbar">

             
          <Link className="logo" to='/'>
              <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
          </Link>

              <div className="links-centrais">

                <Link className="links" to="/"><h4 className="medium">Início</h4></Link>
               
              </div>

              <div className="actions">

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}>

                  <Avatar src={(user && user.dados_pessoais.profilePhoto) ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"></Avatar>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}>
                    <Link to={'/meu-perfil'} >
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                      }}>{user.dados_pessoais.name.split(' ')[0]}</Typography>
                    </Link>

                    <Box sx={
                      { display: 'flex', alignItems: 'center', gap: '5px' }
                    }>

                      <button className='button-black no-border' onClick={onLogout}>
                        sair

                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M9 0.984375L5.64018 3.78422C5.26934 4.09326 4.73066 4.09326 4.35982 3.78422L1 0.984376" stroke="#FAF8F8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>

                  </Box>

                </Box>

              </div>

            </div>
          </Box>
        </>
      )}

      {/* secretario */}

      {user && (user.role === 'secretario') && (
        <>
          <Box sx={{
            backgroundColor: '#C1051F',
            padding: '10px 0',
            width: '100%',
            textAlign: 'center',
          }}>
            <h4 className="medium" style={{ color: '#FAF8F8', fontWeight: 500 }}>
              Você está logado como <span style={{ color: '#FAF8F8', fontWeight: 600 }}>{user.role === 'secretario' ? 'secretário' : user.role}</span>
            </h4>
          </Box>

          <Box>
            <div className="navbar">

             
          <Link className="logo" to='/'>
              <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
          </Link>

              <div className="links-centrais">

                <Link className="links" to="/"><h4 className="medium">Início</h4></Link>
                <Link className="links" to="/reunioes"><h4 className="medium">Reuniões</h4></Link>
                <Link className="links" to="/relatorios"><h4 className="medium">Relatórios</h4></Link>
                {user && (
                  ((user.role !== 'admin' && user.role !== 'produtor' && user.role !== 'produtor_associado') || user.oldRole)
                    ?
                    <ButtonChangeRole />

                    : null
                )}

              </div>

              <div className="actions">

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}>

                  <Avatar src={(user && user.dados_pessoais.profilePhoto) ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"></Avatar>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}>
                    <Link to={'/meu-perfil'} >
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                      }}>{user.dados_pessoais.name.split(' ')[0]}</Typography>
                    </Link>

                    <Box sx={
                      { display: 'flex', alignItems: 'center', gap: '5px' }
                    }>

                      <button className='button-black no-border' onClick={onLogout}>
                        sair

                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M9 0.984375L5.64018 3.78422C5.26934 4.09326 4.73066 4.09326 4.35982 3.78422L1 0.984376" stroke="#C1051F" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>

                  </Box>

                </Box>

              </div>

            </div>
          </Box>
        </>
      )}


      {/*presidente */}
      {user && (user.role === 'presidente') && (
        <>
          <Box sx={{
            backgroundColor: '#C1051F',
            padding: '10px 0',
            width: '100%',
            textAlign: 'center',
          }}>
            <h4 className="medium" style={{ color: '#FAF8F8', fontWeight: 500 }}>
              Você está logado como <span style={{ color: '#FAF8F8', fontWeight: 600 }}>{user.role === 'presidente' ? 'presidente' : user.role}</span>
            </h4>
          </Box>

          <Box>
            <div className="navbar">

             
          <Link className="logo" to='/'>
              <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
          </Link>

              <div className="links-centrais">

                <Link className="links" to="/"><h4 className="medium">Início</h4></Link>
                <Link className="links" to="/reunioes"><h4 className="medium">Reuniões</h4></Link>
                <Link className="links" to="/produtores"><h4 className="medium">Produtores</h4></Link>

                {user && (
                  ((user.role !== 'admin' && (user.role !== 'user')) || user.oldRole)
                    ?
                    <ButtonChangeRole />

                    : null
                )}

              </div>




              <div className="actions">

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}>

                  <Avatar src={(user && user.dados_pessoais.profilePhoto) ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"></Avatar>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}>
                    <Link to={'/meu-perfil'} >
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                      }}>{user.dados_pessoais.name.split(' ')[0]}</Typography>
                    </Link>

                    <Box sx={
                      { display: 'flex', alignItems: 'center', gap: '5px' }
                    }>

                      <button className='button-black no-border' onClick={onLogout}>
                        sair

                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M9 0.984375L5.64018 3.78422C5.26934 4.09326 4.73066 4.09326 4.35982 3.78422L1 0.984376" stroke="#C1051F" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>

                  </Box>

                </Box>

              </div>

            </div>
          </Box>
        </>
      )}

      {/*tesoureiro */}

      {user && (user.role === 'tesoureiro') && (
        <>
          <Box sx={{
            backgroundColor: '#C1051F',
            padding: '10px 0',
            width: '100%',
            textAlign: 'center',
          }}>
            <h4 className="medium" style={{ color: '#FAF8F8', fontWeight: 500 }}>
              Você está logado como <span style={{ color: '#FAF8F8', fontWeight: 600 }}>{user.role === 'tesoureiro' ? 'tesoureiro' : user.role}</span>
            </h4>
          </Box>

          <Box>
            <div className="navbar">

             
          <Link className="logo" to='/'>
              <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
          </Link>

              <div className="links-centrais">

                <Link className="links" to="/"><h4 className="medium">Início</h4></Link>
                <Link className="links" to="/balancos"><h4 className="medium">Balanços</h4></Link>
                <Link className="links" to="/reunioes"><h4 className="medium">Reuniões</h4></Link>
                {user && (
                  ((user.role !== 'admin' && (user.role !== 'user')) || user.oldRole)
                    ?
                    <ButtonChangeRole />

                    : null
                )}

              </div>

              <div className="actions">

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}>

                  <Avatar src={(user && user.dados_pessoais.profilePhoto) ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"></Avatar>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}>
                    <Link to={'/meu-perfil'} >
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                      }}>{user.dados_pessoais.name.split(' ')[0]}</Typography>
                    </Link>

                    <Box sx={
                      { display: 'flex', alignItems: 'center', gap: '5px' }
                    }>

                      <button className='button-black no-border' onClick={onLogout}>
                        sair

                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M9 0.984375L5.64018 3.78422C5.26934 4.09326 4.73066 4.09326 4.35982 3.78422L1 0.984376" stroke="#C1051F" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>

                  </Box>

                </Box>

              </div>

            </div>
          </Box>
        </>
      )}


      {/*conselho regulador */}

      {user && (user.role === 'conselho') && (
        <>
          <Box sx={{
            backgroundColor: '#C1051F',
            padding: '10px 0',
            width: '100%',
            textAlign: 'center',
          }}>
            <h4 className="medium" style={{ color: '#FAF8F8', fontWeight: 500 }}>
              Você está logado como <span style={{ color: '#FAF8F8', fontWeight: 600 }}>{user.role === 'conselho' ? 'conselho regulador' : user.role}</span>
            </h4>
          </Box>

          <Box>
            <div className="navbar">

             
          <Link className="logo" to='/'>
              <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
          </Link>

              <div className="links-centrais">

                <Link className="links" to="/"><h4 className="medium">Início</h4></Link>
                <Link className="links" to="/credenciamento"><h4 className="medium">Credenciamento</h4></Link>
                <Link className="links" to="/produtos-conselho"><h4 className="medium">Produtos</h4></Link>
                <Link className="links" to="/reunioes"><h4 className="medium">Reuniões</h4></Link>

                {user && (
                  ((user.role !== 'admin' && (user.role !== 'user')) || user.oldRole)
                    ?
                    <ButtonChangeRole />

                    : null
                )}

              </div>

              <div className="actions">

                <Box sx={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                }}>

                  <Avatar src={(user && user.dados_pessoais.profilePhoto) ? user.dados_pessoais.profilePhoto : 'https://placehold.co/600x400'} alt="Foto de Perfil"></Avatar>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}>
                    <Link to={'/meu-perfil'} >
                      <Typography sx={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#fff',
                      }}>{user.dados_pessoais.name.split(' ')[0]}</Typography>
                    </Link>

                    <Box sx={
                      { display: 'flex', alignItems: 'center', gap: '5px' }
                    }>

                      <button className='button-black no-border' onClick={onLogout}>
                        sair

                      </button>

                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 10 5" fill="none">
                        <path d="M9 0.984375L5.64018 3.78422C5.26934 4.09326 4.73066 4.09326 4.35982 3.78422L1 0.984376" stroke="#C1051F" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Box>

                  </Box>

                </Box>

              </div>

            </div>
          </Box>

        </>
      )}


      {(!user) && (
        <div className="navbar">

          <Link className="logo" to='/rastreabilidade'>
              <img src={require('../../imgs/logo_cafe.png')} alt="logo" style={{width: '100px'}}/>
          </Link>

          <div className="links-centrais">

            <Link className="links" to="/rastreabilidade"><h4 className="medium">Rastreabilidade</h4></Link>

          
       
            <Link className="links" to="/documentos"><h4 className="medium">Documentos</h4></Link>

          </div>


          <div className="actions">

            {/** 
            <div className="pesquisar">
              <CiSearch size={30} style={{ color: '#140C9F', marginTop: '6px' }} />
              <input type="text" placeholder="Pesquisar" />
            </div>
            */}


            <button className="button-red" style={{ width: '230px' }} onClick={() => navigate('/entrar')}>Área Produtor</button>

          </div>

        </div>

      )

      }


    </Box >
  )
}

export default Navbar