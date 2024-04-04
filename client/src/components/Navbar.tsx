import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            justifyItems: "center",
            color: "white",
            padding: "0px 10px",
          }}
        >
          <h3 style={{ color: "black" }}>ConVerT</h3>
          <div style={{ display: "flex", gap: "20px", padding: "16px 0px" }}>
            <Link style={{ color: "white" }} to="/">
              Add Record
            </Link>
            <Link style={{ color: "white" }} to="/tabel">
              Record
            </Link>
          </div>
        </div>
      </AppBar>
    </Box>
  );
};

export default Navbar;
