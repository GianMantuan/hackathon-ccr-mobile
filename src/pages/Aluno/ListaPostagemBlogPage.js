import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Card, CardItem, Text, Body} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import {getPostagens} from '../../service/api';

export default function ListaPostagemBlogPage() {
  const navigation = useNavigation();

  const [postagem, setPostagem] = useState([]);

  useEffect(() => {
    async function blog() {
      const postagens = await getPostagens();
      console.log(postagens);
      setPostagem(postagens);
    }
    blog();
  }, [navigation]);

  return (
    <Container>
      <Text style={{textAlign: 'center', color: '#121212', fontSize: 28}}>
        Blog Emprega.ai
      </Text>
      <Content style={{marginHorizontal: 10, marginVertical: 5}}>
        {postagem.length > 0
          ? postagem.map((post, key) => {
              return (
                <Card key={key}>
                  <CardItem header>
                    <Text style={styles.Title}>{post.titulo}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={styles.Text}>{post.texto}</Text>
                    </Body>
                  </CardItem>
                  <CardItem footer>
                    <Text>Autor: {post.autor}</Text>
                  </CardItem>
                </Card>
              );
            })
          : null}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  Title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Text: {
    textAlign: 'justify',
  },
});
