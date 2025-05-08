import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { fetchTables } from '../../redux/tablesRedux';
import { getTableById } from "../../redux/tablesRedux";


const Table = () => {
  const { id } = useParams();
  const tables = useSelector(state => state.tables);
  const table = useSelector(state => getTableById(state, id));

  const dispatch = useDispatch();

  const [status, setStatus] = useState(table?.status || '');
  const [peopleAmount, setPeopleAmount] = useState(table?.peopleAmount || 0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table?.maxPeopleAmount || 0);
  const [bill, setBill] = useState(table?.bill || 0);

  useEffect(() => {
    if (status === 'Free' || status === 'Cleaning' || status === 'Reserved') {
      setPeopleAmount(0);
      setBill(0);
    }
  }, [status]);

  if(!table) {
    return <p>Table not found</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(peopleAmount > maxPeopleAmount) {
      alert('People amount cannot be greater than max people amount.');
      return;
    }

    if (peopleAmount < 0 || maxPeopleAmount < 1) {
      alert('Values must be positive and valid.');
      return;
    }
  
    const updatedTable = {
      id: table.id,
      status,
      peopleAmount,
      maxPeopleAmount,
      bill
    };
  
    fetch(`http://localhost:3131/tables/${table.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTable)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Table updated:', data);
        dispatch(fetchTables());
      })
      .catch(error => {
        console.error('Error updating table:', error);
      });
  };

  return (
    <div>
      <h2 className="mb-4">Table {table.id}</h2>
      <form onSubmit={handleSubmit}>
        <Row className="align-items-center mb-2">
          <Col xs={1}>
            <label className="col-form-label"><strong>Status:</strong></label>
          </Col>
          <Col>
            <select className="form-select form-select-sm w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Busy">Busy</option>
              <option value="Free">Free</option>
              <option value="Reserved">Reserved</option>
              <option value="Cleaning">Cleaning</option>
            </select>
          </Col>
        </Row>

        <Row className="align-items-center mb-2">
          <Col xs={1}>
            <label className="col-form-label"><strong>People:</strong></label>
          </Col>
          <Col>
            <div className="d-flex align-items-center gap-2">
              <input
                type="number"
                className="form-control form-control-sm"
                value={peopleAmount}
                onChange={(e) => setPeopleAmount(Number(e.target.value))}
                style={{ width: '40px' }}
              />
              <span>/</span>
              <input
                type="number"
                className="form-control form-control-sm"
                value={maxPeopleAmount}
                onChange={(e) => setMaxPeopleAmount(Number(e.target.value))}
                style={{ width: '40px' }}
              />
            </div>
          </Col>
        </Row>

        {status === 'Busy' && (
          <Row className="align-items-center mb-2">
            <Col xs={1}>
              <label className="col-form-label"><strong>Bill:</strong></label>
            </Col>
            <Col>
              <div className="d-flex align-items-center gap-2">
                <span className="form-control form-control-sm border-0 bg-transparent px-2" style={{ pointerEvents: 'none', width: '35px' }}>$</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  style={{ width: '60px' }}
                />
              </div>
            </Col>
          </Row>
        )}

        <button type="submit" className="btn btn-primary mt-2">Update</button>
      </form>

    </div>
  );
};


export default Table;