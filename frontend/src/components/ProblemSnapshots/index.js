// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Container,
  Divider,
  Header,
} from 'semantic-ui-react';
import {
  useParams,
} from 'react-router-dom';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import './style.css';
import 'react-image-gallery/styles/css/image-gallery.css';

function ProblemSnapshots() {
  const { id } = useParams();
  const [data, setData] = useState({ content: '', image_list: [] });

  function parseData(jsonObject) {
    const imageListParsed = [];
    jsonObject.image_list.forEach((element) => {
      imageListParsed.push(
        {
          original: `/question_snapshots/assets/${element}`,
          thumbnail: `/question_snapshots/assets/${element}`,
        },
      );
    });
    setData({
      content: jsonObject.content,
      image_list: imageListParsed,
    });
  }
  useEffect(() => {
    fetch(`/question_snapshots/contents/${id}.json`).then(
      (res) => { res.json().then((data) => { parseData(data); }); },
    );
  }, []);
  return (
    <>
      <Background>
        <Container textAlign="center">
          {parse(data.content)}
          <Divider inverted section />
          <Header as="h2" className="text" style={{ fontSize: '24px' }}>Image assets</Header>

          <ImageGallery items={data.image_list} />

        </Container>
      </Background>
    </>
  );
}
const Background = styled.div`
  margin-top: 200px;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .text {
    font-weight: 700;
    font-size: 80px;
  }
  .back {
    line-height: 50px;
    color: black;
  }
`;

export default styled(ProblemSnapshots)`
.problem-name {
  font-size: 1.1rem;
  font-weight: 500;
}
.category {
  display: inline;
}
`;
