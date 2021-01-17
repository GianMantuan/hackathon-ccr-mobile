import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Item,
  Label,
  Left,
  Body,
  Right,
  Thumbnail,
  Button,
  Icon,
  Form,
} from 'native-base';

import ModalView from '../../components/Modal';
import {getAlunos, updateAluno} from '../../service/api';

import Curso from '../../config/Enum/enum.json';

export default function ListAlunosPage() {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [alunoDados, setAlunosDados] = useState();
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function alunos() {
      const alunos = await getAlunos();
      setAlunos(alunos);
    }
    alunos();
  }, [navigation]);

  function getCurso(cursoId) {
    const {description} = Curso.find((c) => c.id === cursoId);
    return description;
  }

  return (
    <>
      <Container>
        <Text style={{textAlign: 'center', color: '#121212', fontSize: 28}}>
          Lista de Alunos
        </Text>
        <Content>
          <List>
            {alunos.length > 0
              ? alunos.map((aluno, key) => {
                  return (
                    <ListItem thumbnail key={key}>
                      <Left>
                        <Thumbnail
                          style={{borderColor: 'gray', borderWidth: 1}}
                          source={{
                            uri:
                              'https://thumbs.dreamstime.com/b/black-white-person-icon-devices-web-applications-profiles-person-icon-devices-web-applications-114304165.jpg',
                          }}
                        />
                      </Left>
                      <Body>
                        <Text style={{color: '#121212', fontSize: 16}}>
                          {aluno.nome}
                        </Text>
                      </Body>
                      <Right>
                        <Button
                          style={{margin: -5}}
                          iconRight
                          transparent
                          onPress={() => {
                            setAlunosDados(aluno);
                            setVisible(true);
                          }}>
                          <Icon name="add" />
                        </Button>
                      </Right>
                    </ListItem>
                  );
                })
              : null}
          </List>
        </Content>
      </Container>

      {/* MODAL INFO ALUNO */}

      <ModalView visible={visible} setVisible={setVisible} item={alunoDados}>
        {alunoDados ? (
          <>
            <Text style={{textAlign: 'center', color: '#121212', fontSize: 24}}>
              {alunoDados.nome}
            </Text>
            <>
              <View style={styles.Section}>
                <Text style={styles.Label}>Idade</Text>
                <Text style={styles.Item}>{alunoDados.idade}</Text>
              </View>
              <View style={styles.Section}>
                <Text style={styles.Label}>E-mail</Text>
                <Text style={styles.Item}>{alunoDados.email}</Text>
              </View>
              <View style={styles.Section}>
                <Text style={styles.Label}>Telefone</Text>
                <Text style={styles.Item}>{alunoDados.telefone}</Text>
              </View>
              <View style={styles.Section}>
                <Text style={styles.Label}>Pretensão</Text>
                <Text style={styles.Item}>{alunoDados.pretensao}</Text>
              </View>
              <View style={styles.Section}>
                <Text style={styles.Label}>Cursando</Text>
                <Text style={styles.Item}>{getCurso(alunoDados.curso)}</Text>
              </View>
              <View style={styles.Section}>
                <Text style={styles.Label}>Localização</Text>
                <Text style={styles.Item}>
                  {alunoDados.cidade}, {alunoDados.bairro} - {alunoDados.estado}
                </Text>
              </View>
            </>
            <Button
              info
              block
              style={{marginTop: 20, marginHorizontal: 15}}
              onPress={() => {
                alunoDados.empresa.push({_id: '60046c1452a60541ac6df2b4'});

                updateAluno(alunoDados._id, alunoDados);
                setVisible(false);
              }}>
              <Text>Estou interessado</Text>
            </Button>
          </>
        ) : null}
      </ModalView>
    </>
  );
}

const styles = StyleSheet.create({
  Label: {
    color: 'gray',
    fontSize: 18,
  },
  Item: {
    fontSize: 16,
  },
  Section: {
    marginVertical: 5,
  },
});
