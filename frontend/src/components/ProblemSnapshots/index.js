import React, { useEffect, useState } from 'react';
import {
  Button, Modal,
  Container,
} from 'semantic-ui-react';

import parse from 'html-react-parser';
import './style.css';

function ProblemSnapshots({ modalData, handleStatusCallback }) {
  const [data, setData] = useState({ content: '' });

  function parseData(jsonObject) {
    setData({
      content: jsonObject.content,
    });
  }

  useEffect(() => {
    fetch(`/question_snapshots/contents/${modalData.id}.json`).then(
      (res) => { res.json().then((data) => { parseData(data); }); },
    );
  }, []);

  return (
    <Modal
      closeIcon
      onClose={() => handleStatusCallback(false)}
      onOpen={() => handleStatusCallback(true)}
      open={modalData.visible}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Content>
        <Container textAlign="left">
          {parse(data.content)}
        </Container>
      </Modal.Content>
    </Modal>
  );
}

export default ProblemSnapshots;
