import React from "react";
import topimg from "../../Assest/dash.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function AdminDashboard() {
  return (
    <div>
      <img src={topimg} alt="img" className="topimg"></img>
      <div className="text-center m-4">Popular Episode</div>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
            </Card>
          </div>
          <div className="col-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
            </Card>
          </div>
          <div className="col-4">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
            </Card>
          </div>
        </div>
        <div>
          <p className="text-center">Recent Updates</p>
          <div className="row">
            <div className="col-5">
              <div className="row">
                <div className="col">1</div>
                <div className="col">5</div>
              </div>
            </div>
            <div className="col-7">
            <div className="row">
                <div className="col">1</div>
                <div className="col">5</div>
              </div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

// <div className="row">
//         <div className="col-4">
//           <Card style={{ width: "18rem" }}>
//             <Card.Img variant="top" src="holder.js/100px180" />
//             <Card.Body>
//               <Card.Title>Card Title</Card.Title>
//               <Card.Text>
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </Card.Text>
//               <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-4">
//           <Card style={{ width: "18rem" }}>
//             <Card.Img variant="top" src="holder.js/100px180" />
//             <Card.Body>
//               <Card.Title>Card Title</Card.Title>
//               <Card.Text>
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </Card.Text>
//               <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-4">
//           <Card style={{ width: "18rem" }}>
//             <Card.Img variant="top" src="holder.js/100px180" />
//             <Card.Body>
//               <Card.Title>Card Title</Card.Title>
//               <Card.Text>
//                 Some quick example text to build on the card title and make up
//                 the bulk of the card's content.
//               </Card.Text>
//               <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
