import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {ADD_CAMPERS, BY_TOTAL, BY_LAST_30_DAYS, CHANGE_FILTER} from './Actions';
import './css/App.css';

let Header = ({dispatch}) => (
    <header>
        <h1 onClick={() => dispatch({type:"REMOVE_CAMPERS"})} ><i>Camper Leaderboard</i></h1>
    </header>
);
Header = connect()(Header);

const Footer = () => (
    <footer>
        <h4>Coded by <a 
            className="link"
            href="https://github.com/ValentinTapiaTorti" 
            target="_blank"
            >Valentin TT</a>.</h4>
    </footer>
);

let Link = ({active, filter, dispatch, children}) => (
    active
        ? <span>{children}</span>
        : <a
            href=""
            onClick={(e) => {
            e.preventDefault();
            dispatch({
                type: CHANGE_FILTER,
                filter})
            }}
            className="link"
        >{children}</a>
    
)
Link.propTypes = {
    filter: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

Link = connect((state, ownProps) => ({
    active: state.campersSort === ownProps.filter
}))(Link);

const TableHeader = () => (
    <thead>
        <tr>
            <th>Pos.</th>
            <th>User Name</th>
            <th>
                <Link filter={BY_TOTAL}>All time</Link>
            </th>
            <th>
                <Link filter={BY_LAST_30_DAYS}>Points in last 30 days</Link>
            </th>
        </tr>
    </thead>
);

const TableCamper = ({index, username, img, alltime, recent}) => (
    <tr className="camper">
        <td>{index}</td>
        <td> 
            <div className="camper-username">
                <img className="camper-img" 
                    src={img} 
                    alt={username + "'s image"}/>
                <a  className="username-link link"
                    href={"https://freecodecamp.com/" + username} 
                    target="_blank"
                    >{username}</a>
            </div>
        </td>
        <td>{alltime}</td>
        <td>{recent}</td>
    </tr>
);
TableCamper.propTypes = {
    index: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired, 
    img: PropTypes.string.isRequired, 
    alltime: PropTypes.number.isRequired, 
    recent: PropTypes.number.isRequired,
}

const TableContent = ({campers}) => {
    console.log("TableContent", campers);
    return (
        <tbody>
            {campers.map((camper, index) => (<TableCamper key={camper.username} index={index + 1} {...camper}/>))}
        </tbody>
    )
};
TableContent.propTypes = {
    campers: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            alltime: PropTypes.number.isRequired,
            recent: PropTypes.number.isRequired,
            lastUpdate: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired
}

const sortCampers = (campers, filter) => (
    campers.sort((a, b) => filter === BY_LAST_30_DAYS
        ? b.recent - a.recent
        : b.alltime - a.alltime)
)


const tableContentMapStateToProps = (state) => {
    return {
        campers: sortCampers([...state.campers], state.campersSort)
    }
}

const TableContentContainer = connect(tableContentMapStateToProps)(TableContent);

const Table = () => (
    <section className="leader-board">
        <table>
            <TableHeader />
            <TableContentContainer />
        </table>
    </section>
);

const App = () => (
    <div className="App">
        <Header />
        <Table />
        <Footer />
    </div>
);

export default App;
