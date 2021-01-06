import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

import {
  Container,
  Header,
  Image,
} from 'semantic-ui-react';

function Home({ className }) {
  return (
    <div className={className}>

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>NCTU CPE/GPE Analysis</Header>
      <p>不好好寫扣和練 GPE 在這邊寫奇怪的東西啊= =</p>
      <p>
        總之是個小專案 統計一下近來學校舉辦的程式檢定考題型和相關出題頻率
      </p>
      <p>
        資料來源皆來自於 gpe3.acm-icpc.tw
      </p>
      <p>
        然後保佑我 GPE 能過..
      </p>            
      <Image src='/logo192.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
      <Image src='/images/wireframe/paragraph.png' style={{ marginTop: '2em' }} />
    </Container>
    </div>
  );
}

export default styled(Home)`
`;
