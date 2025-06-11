import { Link } from 'react-router-dom'
import classes from './Answere.module.css'
function Answere() {
  return (
    <div className={classes.answereContainer}>
      <div>
      <Link to="#" className={classes.askbtn}> Question</Link>
      </div>
      <div className={classes.questiondetails}>
          <h4 className={classes.title}>why Zoom have office?</h4>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, minima at. Laudantium ab suscipit, provident rerum distinctio et asperiores labore, ducimus minus dolores voluptatum porro odio voluptatem qui eius deleniti.</p>
      </div>
      <section>
        <h3>Answere from the Community</h3>
        <hr />
        <div>
          <h4>User1 : They don't like camera</h4>
          <h4>User2 : They wana save money</h4>
          <h4>User3 : They wana save money</h4>
          <textarea placeholder='Your answere here...' ></textarea>
        </div>
      </section>
      
      <div>
      <Link to="/home" className={classes.askbtn}>Post Your Answere </Link>
      </div>
    </div>
  )
}

export default Answere
