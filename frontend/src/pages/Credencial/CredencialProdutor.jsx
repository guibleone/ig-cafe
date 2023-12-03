import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Container, Grid, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { colors } from '../colors'
import { BsArrowDownShort, BsArrowRightShort, BsChevronDown, BsChevronRight } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import Formulario from './Etapas/Formulario'
import { toast } from 'react-toastify'
import { styleError, styleSuccess } from '../toastStyles'
import Documentos from './Etapas/Documentos'
import Analise from './Etapas/Analise'
import { associate, cancelCredencial, reset, resetAprove } from '../../features/auth/authSlice'
import Mensalidade from './Mensalidade'
import { getDocuments } from '../../features/documents/documentsSlice'

export default function Credencial() {
    // responsividade
    const matches = useMediaQuery('(min-width:600px)');

    const dispatch = useDispatch()

    const { payments } = useSelector((state) => state.payments)

    // abir e fechar passos 
    const [expanded, setExpanded] = useState(matches ? 'panel1' : '');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }

    // inicializar redux
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth)
    const { documents } = useSelector((state) => state.documents)



    // mostar toast de sucesso ou erro
    useEffect(() => {

        if (isSuccess) {
            toast.success(message, styleSuccess)
        }

        if (isError) {
            toast.error(message, styleError)
        }

        dispatch(reset())

    }, [isSuccess, isError, message])

    const handleAssociate = () => {
        const data = {
            id: user._id,
            token: user.token
        }

        dispatch(associate(data))

    }

    const handleCancel = () => {
        const data = {
            id: user._id,
            token: user.token
        }

        dispatch(cancelCredencial(data))

    }

    useEffect(() => {

        if (user) {
            dispatch(getDocuments(user.token))
        }

    }, [user])

    useEffect(() => {
        window.scrollTo(0, 0)
    }
        , [])


    return (
        <Box sx={{
            backgroundColor: colors.main_white,
            minHeight: '100vh',
            marginTop: '-16px'
        }}>
            <Container maxWidth='xl'>
                <Grid container spacing={2} pb={'72px'}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '72px 0',
                            gap: '10px'
                        }}>
                            <h3 className='semi-bold black'>
                                Credencial
                            </h3>
                            
                            {(user.role === 'produtor_associado' || user.oldRole) ? (<>
                                <h1 className='bold black'>
                                    Produtor Associado
                                </h1>

                                {(user.status === 'aprovado' || user.oldRole) && (
                                    <Mensalidade />
                                )}

                            </>) : (
                                <>
                                    <h1 className='bold black'>
                                        Produtor Não Associado
                                    </h1>
                                    <button onClick={handleAssociate} className='button-red'>
                                        Associar-se
                                    </button>
                                </>)}

                            {(user?.status === 'reprovado' || user?.analise?.analise_laboratorial?.status === 'reprovado' || user?.analise?.vistoria?.status === 'reprovado'
                                || user?.analise?.analise_pedido?.status === 'reprovado') && (
                                    <>
                                        <button onClick={() => dispatch(resetAprove({ id: user._id, token: user.token }))} className='button-red'>
                                            Tentar Novamente
                                        </button>
                                        <Alert severity="error">
                                            Você foi reprovado no pedido de credencial. Por favor, tente novamente.
                                        </Alert>
                                    </>
                                )}

                        </Box>
                    </Grid>


                    {/* credencial produtor */}
                    {user && (user.role === 'produtor' && !user.oldRole) && (<>
                        <Grid item xs={12} md={12}>

                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                                backgroundColor: colors.main_white,
                            }} >
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        {expanded === 'panel1' ? <BsChevronDown size={20} /> : <BsChevronRight size={20} />}
                                        <h4 className='semi-bold black'>
                                            Para que serve a credencial ?
                                        </h4>
                                    </Box>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Grid container rowSpacing={2} columnSpacing={6}>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                Sobre a Credencial de Produtor Associado
                                                </h3>
                                                <h5 className='regular black'>
                                                A Credencial certifica a filiação de um indivíduo à associação de produtores. Ela confere uma série de benefícios e reconhecimentos especiais.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                Benefícios de Ser um Produtor Associado
                                                </h3>
                                                <h5 className='regular black'>
                                                Explore como a associação oferece uma plataforma para estabelecer contatos valiosos, facilitando colaborações entre produtores.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                Como Tornar-se um Produtor Associado
                                                </h3>
                                                <h5 className='regular black'>
                                                Entenda os critérios necessários para se tornar um produtor associado e garantir benefícios, incluindo requisitos de produção, éticos e outros.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: `1.898px solid ${colors.main_red} ` }}>
                                                <h3 className='semi-bold'>
                                                Se Torne Agora Mesmo um Credenciado
                                                </h3>
                                                <h5 className='regular'>
                                                Não perca tempo! Clique agora no botão "Associar-se" e garanta sua credencial para fazer parte de uma comunidade que valoriza o seu sucesso.
                                                </h5>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Box sx={{ display: 'flex', gap: '10px', flexDirection: matches ? 'row' : 'column' }}>
                                                <h5 className='semi-bold black'>
                                                    Dúvidas ?
                                                </h5>
                                                <h5 className='regular black'>
                                                    Mais informações <a href='/https://acecapcafe.com.br/artigos-3/' target='_blank' rel="noreferrer" className='red'>aqui</a> ou vá até a <a href='https://www.google.com/maps/dir//Rua.José-Bonifácio,%20222-%20Centro,%20Serra%20Negra%20-%20SP,%2013930-000' target='_blank' rel="noreferrer" className='red'>nossa sede presencial</a>
                                                </h5>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                    </>)}

                    {/*cancelar credencilal*/}
                    {user && (user.role === 'produtor_associado' && user.status === 'aprovado' && payments && payments.subscription === 'active') && (<>
                        <Grid item xs={12} md={12}>

                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                                backgroundColor: colors.main_white,
                            }} >
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        {expanded === 'panel1' ? <BsChevronDown size={20} /> : <BsChevronRight size={20} />}
                                        <h4 className='semi-bold black'>
                                            Como cancelar a minha credencial ?
                                        </h4>
                                    </Box>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Grid container rowSpacing={2} columnSpacing={6}>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                    Primeira Etapa
                                                </h3>
                                                <h5 className='regular black'>
                                                    Na página da credencial acesse o portal do produtor e cancele a sua renovação automática.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                    Segunda Etapa
                                                </h3>
                                                <h5 className='regular black'>
                                                    Você terá ainda 30 dias para acessar o portal do produtor. Podendo reativar a mensalidade.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                    Terceira Etapa
                                                </h3>
                                                <h5 className='regular black'>
                                                    Após cancelar sua assinatura no portal do produtor. Aguarde 30 dias para cancelar sua credencial.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: `1.898px solid ${colors.main_red} ` }}>
                                                <h3 className='semi-bold'>
                                                    Cancelar Credencial
                                                </h3>
                                                <h5 className='regular'>

                                                </h5>
                                                <Button onClick={handleCancel} color='success' variant='outlined' disabled={payments.subscription === 'active' ? true : false} className='Button-red'>
                                                    Cancelar
                                                </Button>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Box sx={{ display: 'flex', gap: '10px', flexDirection: matches ? 'row' : 'column' }}>
                                                <h5 className='semi-bold black'>
                                                    Dúvidas ?
                                                </h5>
                                                <h5 className='regular black'>
                                                    Mais informações <a href='/https://acecapcafe.com.br/artigos-3/' target='_blank' rel="noreferrer" className='red'>aqui</a> ou vá até a <a href='https://www.google.com/maps/dir//Rua.José-Bonifácio,%20222-%20Centro,%20Serra%20Negra%20-%20SP,%2013930-000' target='_blank' rel="noreferrer" className='red'>nossa sede presencial</a>
                                                </h5>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                    </>)}



                    {/* aprovar credencial */}

                    {user && (user.role === 'produtor_associado' && payments && payments.subscription !== 'active') && (<>
                        <Grid item xs={12} md={12}>

                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{
                                backgroundColor: colors.main_white,
                            }} >
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        {expanded === 'panel1' ? <BsChevronDown size={20} /> : <BsChevronRight size={20} />}
                                        <h4 className='semi-bold black'>
                                            Como aprovar a minha credencial ?
                                        </h4>
                                    </Box>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Grid container rowSpacing={2} columnSpacing={6}>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                    Primeira Etapa
                                                </h3>
                                                <h5 className='regular black'>
                                                Preencha o formulário de requerimento. Certifique-se de fornecer todas as informações necessárias de forma clara e completa.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                    Segunda Etapa
                                                </h3>
                                                <h5 className='regular black'>
                                                Nesta etapa, nossos especialistas revisarão os documentos fornecidos para garantir que atendam aos requisitos mínimos e sejam aprovados.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: '1.898px solid #000 ' }}>
                                                <h3 className='semi-bold black'>
                                                    Terceira Etapa
                                                </h3>
                                                <h5 className='regular black'>
                                                Será realizado anlálises do processo do pedido, vistoria e análise laboratorial. Após cada análise, você receberá um laudo com o resultado.
                                                </h5>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '22px', borderRadius: '5.694px', border: `1.898px solid ${colors.main_red} ` }}>
                                                <h3 className='semi-bold'>
                                                    Acesso Liberado
                                                </h3>
                                                <h5 className='regular'>
                                                Após a conclusão bem-sucedida das etapas anteriores, sua solicitação será aprovada, e a credencial de produtor associado será emitida para a assinatura.
                                                </h5>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Box sx={{ display: 'flex', gap: '10px', flexDirection: matches ? 'row' : 'column' }}>
                                                <h5 className='semi-bold black'>
                                                    Dúvidas ?
                                                </h5>
                                                <h5 className='regular black'>
                                                    Mais informações <a href='/https://acecapcafe.com.br/artigos-3/' target='_blank' rel="noreferrer" className='red'>aqui</a> ou vá até a <a href='https://www.google.com/maps/dir//Rua.José-Bonifácio,%20222-%20Centro,%20Serra%20Negra%20-%20SP,%2013930-000' target='_blank' rel="noreferrer" className='red'>nossa sede presencial</a>
                                                </h5>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>



                        <Grid item xs={12} md={12}>
                            {matches ? (
                                <Box sx={{ display: 'flex', gap: '48px', padding: '72px 0', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: '10px',
                                    }}>
                                        <Box sx={{}}>
                                            <h5 className='semi-bold black'>
                                                Fomulário  <BsArrowRightShort size={20} style={{ verticalAlign: 'bottom' }} />
                                            </h5>
                                        </Box>

                                        <Box sx={{
                                            opacity: (user && !user.formulario_requerimento) ? '0.5' : '1',
                                        }}>
                                            <h5 className='semi-bold black' sx={{}}>
                                                Documentos <BsArrowRightShort size={20} style={{ verticalAlign: 'bottom' }} />
                                            </h5>
                                        </Box>


                                        <Box sx={{
                                            opacity: (user && !documents[0]) ? '0.5' : '1',
                                        }}>
                                            <h5 className='semi-bold black'>
                                                Análise  <BsArrowRightShort size={20} style={{ verticalAlign: 'bottom' }} />
                                            </h5>

                                        </Box>

                                        <Box sx={{
                                            opacity: (user && !user?.analise?.analise_laboratorial?.path) ? '0.5' : '1',
                                        }}>

                                            <h5 className='semi-bold black'>
                                                Acesso
                                            </h5>
                                        </Box>

                                    </Box>

                                    <Box sx={{ display: 'flex', gap: '48px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        {user && !user.formulario_requerimento && (
                                            <Formulario />
                                        )}

                                        {user && user.formulario_requerimento && !documents[0] && (
                                            <Documentos />
                                        )}

                                        {user && user.formulario_requerimento && documents[0]?.path && (
                                            <Analise />
                                        )}

                                    </Box>

                                </Box>)

                                :
                                (
                                    <Box sx={{ display: 'flex', gap: '48px', padding: ' 0 0 72px 0', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}>
                                            {user && user.formulario_requerimento && (
                                                <>
                                                    <h3 className='semi-bold black'>
                                                        Fomulário
                                                    </h3>

                                                    <Alert severity="success">
                                                        Formulário enviado com sucesso.
                                                    </Alert>

                                                    <BsArrowDownShort size={20} />
                                                </>
                                            )}


                                            {user && !user.formulario_requerimento && (

                                                <>
                                                    <Formulario />
                                                    <BsArrowDownShort size={20} />
                                                    <h3 className='semi-bold black'>
                                                        Documentos
                                                    </h3>
                                                    <BsArrowDownShort size={20} />
                                                    <h3 className='semi-bold black'>
                                                        Análise
                                                    </h3>
                                                    <BsArrowDownShort size={20} />
                                                </>
                                            )}


                                            {user && user.formulario_requerimento && documents[0] && (
                                                <>
                                                    <h3 className='semi-bold black'>
                                                        Documentos
                                                    </h3>


                                                    <Alert severity="success">
                                                        Formulário enviado com sucesso.
                                                    </Alert>


                                                    <BsArrowDownShort size={20} />

                                                </>
                                            )}

                                            {user && user.formulario_requerimento && !documents[0] && (

                                                <>
                                                    <Documentos />

                                                    <BsArrowDownShort size={20} />

                                                    <h3 className='semi-bold black'>
                                                        Análise
                                                    </h3>
                                                    
                                                    <BsArrowDownShort size={20} />
                                                </>
                                            )}

                                            {user && user?.analise_laboratorial?.status === 'aprovado' && (<>
                                                <h3 className='semi-bold black'>
                                                    Análise
                                                </h3>

                                                <Alert severity="success">
                                                    Análise concluída com sucesso.
                                                </Alert>

                                                <BsArrowDownShort size={20} />
                                            </>
                                            )}

                                            {user && user.formulario_requerimento && documents[0]?.path && (
                                                <>
                                                    <Analise />

                                                    <BsArrowDownShort size={20} />
                                                </>
                                            )}


                                            <h3 className='semi-bold black'>
                                                Acesso
                                            </h3>

                                        </Box>


                                    </Box>
                                )}

                        </Grid>
                    </>)}



                </Grid>




            </Container>



        </Box>
    )
}
