import React, { Component } from 'react';
import PropTypes from 'prop-types'



class Taskitem extends Component {
    getStyle =  () =>  {
        return {
            background: '#11111', 
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.tasks.completed ? 'line-through' : 'none',
            padding: '20px'
        }
    }
    
    btnStyle = () => {
        return {
            background: '#ff0000'
        }

    }

    render() {
        const {id, title} = this.props.tasks
        return (
                <div style={this.getStyle()}>
                    <p>
                        <input type='checkbox' onChange={this.props.markComplete.bind(this, id)} />  {' '}{title}
                    </p>
                
                    <button style={this.btnStyle()}>x</button>
                </div>

        );
    }

}

// Assert proptype
Taskitem.propTypes = {
    task: PropTypes.object.isRequired
}

// const btnStyle = {
//     background: '#ff0000'
// }

export default Taskitem;