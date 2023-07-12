import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditableLabel from "react-inline-editing";
import carImg from "../ImageCard/353067.jpg";

const CutomCard = () => {
    const [editing, setEditing] = React.useState(false);
    const [valueInput, setValueInput] = React.useState("");
    const changecontent = (e) => {
        setEditing(true);
        setValueInput(document.getElementById("typo").innerHTML);
    };
    const changevalue = (e) => {
        document.getElementById("typo").innerHTML = e.target.value;
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" alt="green iguana" height="140" image={carImg} />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    // onClick={changecontent}
                    id="typo"
                >
                    <EditableLabel text={"Lizard"}></EditableLabel>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <EditableLabel
                        labelClassName="myLabelClass"
                        inputClassName="myInputClass"
                        inputWidth="200px"
                        inputHeight="100px"
                        text={`Lizards are a widespread group of squamate reptiles,with over 6,000 species, ranging across all continents except Antarctica`}
                    />
                </Typography>
                {/* <EditableLabel
                text={"Lizards"}
                labelClassName="myLabelClass"
                inputClassName="myInputClass"
                inputWidth="200px"
                inputHeight="25px"
                inputMaxLength="50"
                // labelFontWeight="bold"
                // inputFontWeight="bold"
                // onFocus={this._handleFocus}
                // onFocusOut={this._handleFocusOut}
              /> */}
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
            {editing ? (
                <input
                    type="text"
                    defaultValue={valueInput}
                    onChange={changevalue}
                ></input>
            ) : (
                ""
            )}
        </Card>
    );
};

export default CutomCard;
