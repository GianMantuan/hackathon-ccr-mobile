import React from 'react';
import {Icon} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import CurriculoPage from '../pages/Aluno/CurriculoPage';
import PerfilEmpresaPage from '../pages/Empresa/PerfilEmpresaPage';
import LoginPage from '../pages/Login/LognPage';

function Aluno() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Currículo') {
            return <Icon name="person" size={size} color={color} />;
          } else if (route.name === 'Empresas interessadas') {
            return <Icon name="business" size={size} color={color} />;
          } else if (route.name === 'Blog') {
            return <Icon name="newspaper" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Currículo" component={CurriculoPage} />
      <Tab.Screen name="Empresas interessadas" component={CurriculoPage} />
      <Tab.Screen name="Blog" component={CurriculoPage} />
    </Tab.Navigator>
  );
}

function Empresa() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Perfil') {
            return <Icon name="business" size={size} color={color} />;
          } else if (route.name === 'Lista de Alunos') {
            return <Icon name="list" size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Perfil" component={PerfilEmpresaPage} />
      <Tab.Screen name="Lista de Alunos" component={PerfilEmpresaPage} />
    </Tab.Navigator>
  );
}

export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Aluno" component={Aluno} />
        <Stack.Screen name="Empresa" component={Empresa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
