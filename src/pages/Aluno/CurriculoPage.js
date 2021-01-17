import React, {useState, useEffect} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Title,
  Left,
  Body,
  Right,
} from 'native-base';

import ModalView from '../../components/Modal';

import estados from '../../config/IBGE/estados.json';
import municipios from '../../config/IBGE/municipios.json';

import {saveAluno} from '../../service/api';

const {height} = Dimensions.get('screen');

export default function CurriculoPage() {
  const [loading, setLoading] = useState(false);
  const [expVisible, setExpVisible] = useState(false);
  const [crtVisible, setCrtVisible] = useState(false);
  const [estado, setEstado] = useState([]);
  const [cidades, setCidade] = useState([]);
  const [curso, setCurso] = useState([]);
  const [experiencia, setExperiencia] = useState({});
  const [certificado, setCertificado] = useState({});

  const [curriculo, setCurriculo] = useState({
    nome: '',
    idade: '',
    email: '',
    telefone: '',
    estado: '',
    cidade: '',
    bairro: '',
    experiencias: [],
    certificados: [],
    curso: '',
  });

  useEffect(() => {
    setCurriculo({...curriculo, estado: estado.nome});
  }, [estado]);

  useEffect(() => {
    setCurriculo({...curriculo, cidade: cidades.nome});
  }, [cidades]);

  useEffect(() => {
    setCurriculo({...curriculo, curso: curso});
  }, [curso]);

  return (
    <ScrollView contentContainerStyle={{minHeight: height + 50}}>
      {/* FORMULARIO PERFIL DO ALUNO */}

      <Container>
        <Text style={{textAlign: 'center', color: '#121212', fontSize: 28}}>
          Meu Perfil de Aluno
        </Text>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input
                value={curriculo.nome}
                onChangeText={(val) => setCurriculo({...curriculo, nome: val})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Idade</Label>
              <Input
                value={curriculo.idade}
                onChangeText={(val) => setCurriculo({...curriculo, idade: val})}
              />
            </Item>
            <Item floatingLabel>
              <Label>E-mail</Label>
              <Input
                value={curriculo.email}
                onChangeText={(val) => setCurriculo({...curriculo, email: val})}
              />
            </Item>
            <Item floatingLabel>
              <Label>Telefone</Label>
              <Input
                value={curriculo.telefone}
                onChangeText={(val) =>
                  setCurriculo({...curriculo, telefone: val})
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Pretensão</Label>
              <Input
                value={curriculo.pretensao}
                onChangeText={(val) =>
                  setCurriculo({...curriculo, pretensao: val})
                }
              />
            </Item>
            <Picker
              style={{marginLeft: 10, marginTop: 15}}
              selectedValue={curso}
              onValueChange={(val) => setCurso(val)}>
              <Picker.Item label="Curso" value="" />
              <Picker.Item label="Ensino Fundamental" value="0" />
              <Picker.Item label="Ensino Médio" value="1" />
              <Picker.Item label="Curso Técnico" value="2" />
              <Picker.Item label="Ensino Superior" value="3" />
            </Picker>
            <Picker
              style={{marginLeft: 10, marginTop: 15}}
              selectedValue={estado}
              onValueChange={(val) => setEstado(val)}>
              <Picker.Item label="Estado" value="" />
              {estados.map((estado, key) => {
                return (
                  <Picker.Item
                    label={estado.nome}
                    value={estado}
                    key={`${estado.uf}-${key}`}
                  />
                );
              })}
            </Picker>
            <Picker
              style={{marginLeft: 10, marginTop: 15, marginBottom: -15}}
              selectedValue={cidades}
              onValueChange={(val) => setCidade(val)}>
              <Picker.Item label="Cidade" value="" />
              {municipios
                .filter((municipio) => municipio.codigo_uf === estado.codigo_uf)
                .map((cidade, key) => {
                  return (
                    <Picker.Item
                      label={cidade.nome}
                      value={cidade}
                      key={`${cidade.codigo_ibge}-${key}`}
                    />
                  );
                })}
            </Picker>
            <Item floatingLabel>
              <Label>Bairro</Label>
              <Input
                value={curriculo.bairro}
                onChangeText={(val) =>
                  setCurriculo({...curriculo, bairro: val})
                }
              />
            </Item>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Label>Experiências</Label>
              <Button iconLeft transparent onPress={() => setExpVisible(true)}>
                <Icon name="add" />
              </Button>
            </View>
            <List>
              {curriculo.experiencias.length > 0 ? (
                curriculo.experiencias.map((experiencia, key) => (
                  <ListItem icon key={key}>
                    <Left>
                      <Icon active name="pencil" />
                    </Left>
                    <Body>
                      <Text>{experiencia.cargo}</Text>
                    </Body>
                    <Right>
                      <Text>Editar</Text>
                    </Right>
                  </ListItem>
                ))
              ) : (
                <Text
                  style={{textAlign: 'center', color: 'rgba(0, 0, 0, 0.3)'}}>
                  Nenhuma experiência cadastrada
                </Text>
              )}
            </List>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 10,
              }}>
              <Label>Certificados</Label>
              <Button iconLeft transparent onPress={() => setCrtVisible(true)}>
                <Icon name="add" />
              </Button>
            </View>
            <List>
              {curriculo.certificados.length > 0 ? (
                curriculo.certificados.map((certificado, key) => (
                  <ListItem icon key={key}>
                    <Left>
                      <Icon active name="pencil" />
                    </Left>
                    <Body>
                      <Text>{certificado.nome}</Text>
                    </Body>
                    <Right>
                      <Text>Editar</Text>
                    </Right>
                  </ListItem>
                ))
              ) : (
                <Text
                  style={{textAlign: 'center', color: 'rgba(0, 0, 0, 0.3)'}}>
                  Nenhum certificado cadastrado
                </Text>
              )}
            </List>
          </Form>
          <Button
            info
            block
            style={{marginTop: 30, marginHorizontal: 15}}
            onPress={() => saveAluno(curriculo)}>
            <Text>Salvar</Text>
          </Button>
        </Content>
      </Container>

      {/* MODAL DE EXPERIENCIAS */}

      <ModalView
        visible={expVisible}
        setVisible={setExpVisible}
        item={experiencia}>
        <>
          <Title style={{color: '#121212'}}>Nova experiência</Title>
          <Form>
            <Item floatingLabel>
              <Label>Cargo</Label>
              <Input
                value={experiencia.cargo}
                onChangeText={(val) =>
                  setExperiencia({...experiencia, cargo: val})
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Empresa</Label>
              <Input
                value={experiencia.empresa}
                onChangeText={(val) =>
                  setExperiencia({...experiencia, empresa: val})
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Descricao</Label>
              <Input
                value={experiencia.descricao}
                onChangeText={(val) =>
                  setExperiencia({...experiencia, descricao: val})
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Localidade</Label>
              <Input
                value={experiencia.localidade}
                onChangeText={(val) =>
                  setExperiencia({...experiencia, localidade: val})
                }
              />
            </Item>
          </Form>
          <Button
            info
            block
            style={{marginTop: 20, marginHorizontal: 15}}
            onPress={() => {
              const arrayExp = curriculo.experiencias;
              arrayExp.push(experiencia);

              setCurriculo({
                ...curriculo,
                experiencias: arrayExp,
              });
              setExperiencia({});
              setExpVisible(false);
            }}>
            <Text>Salvar Experiência</Text>
          </Button>
        </>
      </ModalView>

      {/* MODAL DE CERTIFICADOS */}

      <ModalView
        visible={crtVisible}
        setVisible={setCrtVisible}
        item={certificado}>
        <>
          <Title style={{color: '#121212'}}>Novo certificado</Title>
          <Form>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input
                value={certificado.nome}
                onChangeText={(val) =>
                  setCertificado({...certificado, nome: val})
                }
              />
            </Item>
            <Item floatingLabel>
              <Label>Organização Emissora</Label>
              <Input
                value={certificado.organizacaoEmissora}
                onChangeText={(val) =>
                  setCertificado({...certificado, organizacaoEmissora: val})
                }
              />
            </Item>
          </Form>
          <Button
            info
            block
            style={{marginTop: 20, marginHorizontal: 15}}
            onPress={() => {
              const arrayExp = curriculo.certificados;
              arrayExp.push(certificado);

              setCurriculo({
                ...curriculo,
                certificados: arrayExp,
              });
              setCertificado({});
              setCrtVisible(false);
            }}>
            <Text>Salvar Certificado</Text>
          </Button>
        </>
        {/* nome, organizacaoEmissora, dataEmissao, dataExpirar, url (CERTIFICADO) */}
      </ModalView>
    </ScrollView>
  );
}
