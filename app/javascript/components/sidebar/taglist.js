import React, { Component } from 'react';
import Tagitem from './tagitem';
// import { List } from '@material-ui/core';


class Taglist extends Component {
    


    getStyles = () => ({
        root: {
        //   textAlign: 'center',
        //   width: 'auto',
          padding: 20
        }
      });

    render() {
        const classes = this.getStyles()
        return (
            <div id='tag-chips' style={classes.root}>
                {this.props.tags.map(tag => {
                        return (<Tagitem 
                            key={tag.id} tags={tag} 
                            getTagTask={this.props.getTagTask}
                            deleteTag={this.props.deleteTag} />);
                    }
                )}
            </div>
        );

    }
}


export default Taglist;