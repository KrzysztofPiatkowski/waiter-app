import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables } from '../../redux/tablesRedux';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const tables = useSelector(state => state.tables);

  return (
    <div>
      <h2 className="mb-4">All tables</h2>

      {tables.map(table => (
        <Card key={table.id} className="mb-3 shadow-sm">
          <Card.Body>
            <Row>
              <Col>
                <div className="d-flex align-items-center gap-3">
                  <Card.Title className="mb-0">Table {table.id}</Card.Title>
                  <Card.Text className="mb-0">
                    <strong>Status:</strong> {table.status}
                  </Card.Text>
                </div>
              </Col>
              <Col className="d-flex align-items-center justify-content-end">
                <Button as={Link} to={`/table/${table.id}`} variant="primary">
                  Show more
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;
