import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



function LoadingPage({text}){
    return(
        <>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <p style={{
                fontSize: "20px",
                textAlign: "center",
                position: "absolute",
                top: "58%",
                left: "50%",
                transform: "translate(-50%,-50%)"
            }}>{text}</p>
        </>
    )
}
export default LoadingPage;