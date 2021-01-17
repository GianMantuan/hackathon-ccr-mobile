import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
} from 'native-base';

import {getAlunoEmpresas} from '../../service/api';

export default function ListaEmpresasPage() {
  const navigation = useNavigation();

  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    async function empresas() {
      // const empresas = await getAlunoEmpresas('60046ad952a60541ac6df2b2');
      // setEmpresas(empresas);
    }
    empresas();
  }, [navigation]);

  return (
    <>
      <Container>
        <Text style={{textAlign: 'center', color: '#121212', fontSize: 28}}>
          Lista de Empresas Interessadas
        </Text>
        <Content>
          <List>
            {empresas.length > 0 ? (
              empresas.map((empresa, key) => {
                return (
                  <ListItem thumbnail key={key}>
                    <Left>
                      <Thumbnail
                        style={{borderColor: 'gray', borderWidth: 1}}
                        source={{
                          uri:
                            'https://cdn.onlinewebfonts.com/svg/img_242128.png',
                        }}
                      />
                    </Left>
                    <Body>
                      <Text style={{color: '#121212', fontSize: 16}}>
                        {empresa.nome}
                      </Text>
                      <Text style={{color: 'gray', fontSize: 13}}>
                        {empresa.email}
                      </Text>
                      <Text style={{color: 'gray', fontSize: 13}}>
                        {empresa.telefone}
                      </Text>
                    </Body>
                  </ListItem>
                );
              })
            ) : (
              <>
                <Text
                  style={{textAlign: 'center', color: 'gray', fontSize: 14}}>
                  Nenhum empresa interessada.
                </Text>
              </>
            )}
          </List>
        </Content>
      </Container>
    </>
  );
}
