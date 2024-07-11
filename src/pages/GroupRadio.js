import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";


export default function IconsRadio({name, ids, selectedValue, onChange}) {
  const defaultSelectedValue = ids.length > 0 ? ids[0] : null;
  return (
    <RadioGroup
      aria-label="platform"
      value={selectedValue}
      defaultValue = {defaultSelectedValue}
      
      onChange={(event) => onChange(event.target.value)}
      overlay
      name="platform"
      sx={{
        flexDirection: "row",
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: "3px solid",
            borderColor: "primary.500",
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: "contents",
          "& > svg": {
            zIndex: 2,
            position: "absolute",
            top: "-8px",
            right: "-8px",
            bgcolor: "background.surface",
            borderRadius: "50%",
          },
        },
      }}
    >
      {ids.map((value) => (
        <Sheet
          key={value}
          variant="outlined"
          sx={{
            borderRadius: "md",
            boxShadow: "sm",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.5,
            p: 1,
            minWidth: 100,
          }}
        >
          <Radio
            id={value}
            value={value}
            checkedIcon={<CheckCircleRoundedIcon />}
          />
          <Avatar variant="soft" size="sm" />
          <FormLabel htmlFor={value}>{name + ' ' + value}</FormLabel>
        </Sheet>
      ))}
    </RadioGroup>
  );
}
