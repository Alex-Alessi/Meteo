export default function Navbar() {
  return (
    <div className="myNavbar" style={{ color: "black" }}>
    <div style={{display: "flex",
      flexWrap: "wrap",
      alignContent: "center",
      gap:"15px",
      height: "-webkit-fill-available",
      marginInline: "10px"
      }}>
      <img src="./Logo.png" style={{height:"100%"}}/>
      <p>Home</p>
      <p>FAQ</p>
      </div>
    </div>
  );
}
