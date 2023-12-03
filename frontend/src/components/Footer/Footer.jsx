import { AiFillFacebook as Facebook, AiFillInstagram as Instagram } from 'react-icons/ai'
import { Box, Grid, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiTwitterXFill } from 'react-icons/ri'
import { colors } from '../../pages/colors';

function Footer() {

  const matches = useMediaQuery('(max-width:600px)');

  return (

    <Box
      component="footer"
      sx={{
        backgroundColor: ' #C1051F',
        color: '#FAF8F8',
        p: 6,
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
            <img src={require('../../imgs/logo_cafe_branco.png')} alt="logo" width="130px" />
            <Box>
              <Link to="https://www.facebook.com/" style={{ color: colors.main_white }}>
                <Facebook />
              </Link>
              <Link
                to="https://www.instagram.com/"
                style={{ color: colors.main_white }}
                sx={{ pl: 1, pr: 1 }}
              >
                <Instagram />
              </Link>
              <Link to="https://www.twitter.com/" style={{ color: colors.main_white }}>
                <RiTwitterXFill />
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} sx={{ display: 'flex', flexDirection: matches ? 'column' : 'row', gap: '20px' }}  >
          <Grid item xs={12} sm={2}>

            <h3 className='white medium' style={{ paddingBottom: '10px' }}>
              Páginas
            </h3>
            {/** 
            <div>
              <Link to="/rastreabilidade" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'>Rastreabilidade</h5>
              </Link>
            </div>
            */}

            <div>
              <Link to="/documentos" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'>Documentos</h5>
              </Link>
            </div>

          </Grid>
          <Grid item xs={12} sm={2}>

            <h3 className='white medium' style={{ paddingBottom: '10px' }}>
              Sobre Nós
            </h3>

            <div>
              <Link to="https://acecapcafe.com.br/artigos-2/" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'> Indicação Geográfica </h5>
              </Link>
            </div>

            <div>
              <Link to="https://acecapcafe.com.br/membros/" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'>  Nossos Produtores </h5>
              </Link>
            </div>

            <div>
              <Link to="https://acecapcafe.com.br/home-2/" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'> Associção </h5>
              </Link>
            </div>

          </Grid>
          <Grid item xs={12} sm={2}>
            <h3 className='white medium' style={{ paddingBottom: '10px' }}>
              Associa-se
            </h3>
            <div>
              <Link to="/https://acecapcafe.com.br/artigos-3/" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'> Informações </h5>
              </Link>
            </div>

            <div>
              <Link to="/registrar" variant="body2" color="inherit" style={{ textDecoration: 'none' }}>
                <h5 className='white regular'> Cadastre-se </h5>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <h3 className='white medium' style={{ paddingBottom: '10px' }}>
              Entre em contato
            </h3>


            <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <h5 className='white regular'>
                <a target="_blank" rel='noreferrer' href={`https://api.whatsapp.com/send?phone=551938924242`} style={{ color: colors.main_white, textDecoration: 'none' }}>
                  (19) 3892-4242
                </a>
              </h5>

              <h5 className='white regular'>
                <a target="_blank" rel='noreferrer' href={'mailto:appcap@gmail.com'} style={{ color: colors.main_white, textDecoration: 'none' }}>
                  contato@acecapcafe.com.br
                </a>
              </h5>

              <h5 className='white regular'>
                <a target="_blank" rel='noreferrer' href='https://www.google.com/maps/dir//Rua.José-Bonifácio,%20222-%20Centro,%20Serra%20Negra%20-%20SP,%2013930-000' style={{ color: colors.main_white, textDecoration: 'none' }}>
                  Rua José Bonifácio, 222, Centro – Serra Negra, SP <br />13930-000
                </a>
              </h5>

            </Box>
          </Grid>
        </Grid>
      </Grid>


      <Box mt={5}>
        <h5 className='white regular' style={{ textAlign: 'center' }}>
          {"Todos os direitos reservados ©  Acecap  "}
          {new Date().getFullYear()}
        </h5>
      </Box>


    </Box>

  )
}

export default Footer