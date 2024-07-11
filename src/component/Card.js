import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function MediaCard({ title, discription, isGreen, isRed, isYellow, isBlue, customColor}) {
  let cardColor = customColor || (isGreen ? "#1FFC04" : (isRed ? "#FF0000" : (isBlue ? "#6C85F7" : (isYellow ? "#FFFF00" : "#F9FAF8"))));

  

  if (customColor) {
    cardColor = customColor;
  }



  return (
    <Card sx={{ width: 110, height:70, boxShadow: 10, backgroundColor: cardColor }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant="h7" component="div" sx={{ fontSize: 12 }}>
          {title}
        </Typography>

        <Typography gutterBottom variant="h7"  component="div" sx={{textAlign:'center' , fontSize: 12, fontWeight: 'bold' }}>
          {discription}
        </Typography>
      </CardContent>
    </Card>
  );
}