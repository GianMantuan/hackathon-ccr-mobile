import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
} from 'native-base';
import {Picker} from '@react-native-picker/picker';

import estados from '../../config/IBGE/estados.json';
import municipios from '../../config/IBGE/municipios.json';

import {saveEmpresa} from '../../service/api';

export default function PerfilEmpresaPAge() {
  const [estado, setEstado] = useState([]);
  const [cidades, setCidade] = useState([]);

  const [empresa, setEmpresa] = useState({
    nome: '',
    CNPJ: '',
    email: '',
    telefone: '',
    estado: '',
    cidade: '',
    bairro: '',
  });

  useEffect(() => {
    setEmpresa({...empresa, estado: estado.nome});
  }, [estado]);

  useEffect(() => {
    setEmpresa({...empresa, cidade: cidades.nome});
  }, [cidades]);

  return (
    <Container>
      <Text style={{textAlign: 'center', color: '#121212', fontSize: 28}}>
        Meu Perfil de Empresa
      </Text>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Nome</Label>
            <Input
              value={empresa.nome}
              onChangeText={(val) => setEmpresa({...empresa, nome: val})}
            />
          </Item>
          <Item floatingLabel>
            <Label>CNPJ</Label>
            <Input
              value={empresa.CNPJ}
              onChangeText={(val) => setEmpresa({...empresa, CNPJ: val})}
            />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input
              value={empresa.email}
              onChangeText={(val) => setEmpresa({...empresa, email: val})}
            />
          </Item>
          <Item floatingLabel>
            <Label>Telefone</Label>
            <Input
              value={empresa.telefone}
              onChangeText={(val) => setEmpresa({...empresa, telefone: val})}
            />
          </Item>
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
              value={empresa.bairro}
              onChangeText={(val) => setEmpresa({...empresa, bairro: val})}
            />
          </Item>
        </Form>
        <Button
          block
          style={{marginTop: 30, marginHorizontal: 15}}
          onPress={() => saveEmpresa(empresa)}>
          <Text>Salvar</Text>
        </Button>
      </Content>
    </Container>
  );
}
