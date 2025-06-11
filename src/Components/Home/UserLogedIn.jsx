import { Link } from 'react-router-dom'
import classes from './Home.module.css'
function UserLogedIn() {
  return (
    <div className={classes.homeContainer}>
      <div className={classes.welcome}>
      <Link to="/questions" className={classes.askbtn}>Ask Question</Link>
      <p>welcome: User</p>
      </div>
      <section>
        <h3>Question from the Community</h3>
        <hr />
        <Link to="/answeres">
        <div className={classes.askpara}>
          <p>why Zoom have office?</p>
          <button> &#62; </button>
        </div>
        </Link>
        <Link to="/answeres">
        <div className={classes.askpara}>
          <p>why Zoom have office?</p>
          <button> &#62; </button>
        </div>
        </Link>
        <Link to="/answeres">
        <div className={classes.askpara}>
          <p>why Zoom have office?</p>
          <button> &#62; </button>
        </div>
        </Link>
        <Link to="/answeres">
        <div className={classes.askpara}>
          <p>why Zoom have office?</p>
          <button> &#62; </button>
        </div>
        </Link>
        <Link to="/answeres">
        <div className={classes.askpara}>
          <p>why Zoom have office?</p>
          <button> &#62; </button>
        </div>
        </Link>
      </section>
    </div>
  )
}

export default UserLogedIn
