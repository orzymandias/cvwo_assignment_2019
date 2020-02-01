import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function TagItem(props) {
  const classes = useStyles();
  const { id, attributes } = props.tags;

  return (
    <Chip
      onClick={props.getTagTask.bind(this, id)}
      label={attributes.name}
      onDelete={props.deleteTag.bind(this, id)}
      className={classes.chip}
    />
  );
}
