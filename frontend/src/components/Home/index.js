import React from 'react';
import styled from 'styled-components';

import {
  Container,
  Header,
  Button,
  Divider,
  Grid,
  Icon,
  Segment,
  Image
} from 'semantic-ui-react';

import { Link } from 'react-router-dom'


function Home({ className }) {

  function onScrollDown() {
    window.scroll({ top: 600, behavior: 'smooth' });
  }


  return (
    <div className={className}>
      <Segment
        inverted
        textAlign='center'
        className="home-background"
        vertical
      >
        <Container text>
          <Header
            as='h1'
            inverted
            icon
            className="h1-content"
            textAlign='center'
          >
            <Icon name='ambulance' />
            <Header.Content>
              GPE Helper
            </Header.Content>
            <Header.Subheader>
              拯救你我的程式檢定考試
            </Header.Subheader>
          </Header>
          <Button primary size='huge' onClick={onScrollDown} style={{ marginTop: '20px', marginBottom: '15px' }}>
            Get Started
          <Icon name='right arrow' />
          </Button>
        </Container>
      </Segment>
      <Segment style={{ padding: '5em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                <Image src='/afraid.gif' style={{ width: '100px' }} />
                作者的廢話
            </Header>
              <div style={{ fontSize: '1.33em' }}>
                <p>不好好寫扣和練 GPE 在這邊寫奇怪的東西啊= =</p>
                <p>
                  總之是個小專案，統計一下近來學校舉辦的程式檢定考題型和相關出題頻率
              </p>
                <p>
                  資料來源皆來自於學校的 gpe3.acm-icpc.tw，題目分類來自於 zero judge，然後保佑我 GPE 能過.. (耶 過惹🧐)
              </p>
                <p>
                  如果覺得這專案很有趣或有小小幫助到你，歡迎給我星星⭐支持
              </p>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Container text style={{ marginTop: '5em' }}>
        <Segment style={{ padding: '3em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <Icon name='rocket' />題目一覽
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              整理 2019 年～今之歷史題目，方便練習重點題目<br />
              除了各種排序功能，也有我的最愛功能方便你練習😉<br />
              考古題練起來～
            </p>
            <Button as={Link} size='large' to='/problems'>
              Read More
            </Button>
            <Divider
              as='h4'
              className='header'
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>
              <Icon name='flag checkered' />考試一覽
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              列出 2017 ~ 今每次學校舉辦 GPE 檢定考試之題目<br />
              提供相關 onsite 次數，AC 率排序等功能
            </p>
            <Button as={Link} size='large' to='/exams'>
              Read More
            </Button>
          </Container>
        </Segment>
      </Container>
    </div>
  );
}

export default styled(Home)`
  @media only screen and (min-width: 0px) {
    .home-background {
      min-height: 350px;
      padding: 1em 0em;
      font-weight: 'normal';
    }

    .ui.header.h1-content {
      font-size: 2em;
      margin-top: 3em;
      margin-bottom: 0;    
    }  
  }

  @media only screen and (min-width: 1024px) {
    .home-background {
      min-height: 600px;
      padding: 1em 0em;
    }
    .ui.header.h1-content {
      font-size: 4em;
      margin-top: 2em;    
    }   
  }
`;
