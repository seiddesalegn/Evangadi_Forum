import classes from './Footer.module.css'
import logo from './footerlogo.png' 
import { Link } from 'react-router-dom'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <footer>
        <div className={classes.footer}>
        <div className={classes.footerContainer}>
            <img src={logo} alt="" />
        <div>
            <p>
                <Link to='https://www.facebook.com/evangaditech'><FacebookOutlinedIcon /></Link>
            <Link to='https://www.instagram.com/evangaditech'><InstagramIcon /></Link>
            <Link to='https://www.youtube.com/@evangadiTech'><YouTubeIcon />  </Link>
            </p>
        </div> 
        </div>
        <div>
            <h3>useful Links</h3>
            <div>
                <p><Link to="/howItworks">How it works</Link></p>
                <p><Link to="#">Terms of service</Link></p>
                <p><Link to="#">Privacy policy</Link></p>
            </div>
        </div>
        <div>
            <h3>Contact Info</h3>
            <div>
                <p><Link to="#">Evangadi Networks</Link></p>
                <p><Link to="#">support@evangadi.com</Link></p>
                <p><Link to="#">+1-202-386-2702</Link></p>
            </div>
        </div>
        </div>
    </footer>
  )
}

export default Footer
