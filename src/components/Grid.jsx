import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Grid({cities} ){
    return(<Container>
      <Row>
        {cities.map((c, index)=>(<Col key={index} xs={12} sm={6} md={4} className="mb-3">{c}</Col>))}
      </Row>
    </Container>);
}