import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles)
function Home() {
    return ( <div className={cx("home")}>

    </div> );
}

export default Home;