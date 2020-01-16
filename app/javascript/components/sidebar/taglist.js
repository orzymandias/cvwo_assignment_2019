import React, { Component, Fragment } from 'react';
import Tagitem from './tagitem';
import { Chip } from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';



class Taglist extends Component {
    


    getStyles = () => ({
        root: {
          padding: 20
        }, 
        allTask: {
            padding: 10,
            textAlign: 'center' 
        }

      });

    render() {
        const classes = this.getStyles()
        return (
            <Fragment>
                <div id='All Tasks' style={classes.allTask}>
                    <Chip
                        color="primary"
                        label='All Tasks'
                        className={classes.chip}
                        icon={<BallotIcon />}
                        onClick={this.props.getTasks}
                    />

                </div>
                <div id='tag-chips' style={classes.root}>
                    {this.props.tags.map(tag => {
                        return (<Tagitem 
                            key={tag.id} tags={tag} 
                            getTagTask={this.props.getTagTask}
                            deleteTag={this.props.deleteTag} />);
                    })}
                </div>
                
            </Fragment>

        );

    }
}


export default Taglist;