import React from 'react';
import {Icon} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import LoginPage from '../pages/Login/LoginPage';

// ALUNO PAGES
import CurriculoPage from '../pages/Aluno/CurriculoPage';
import ListaEmpresasPage from '../pages/Aluno/ListaEmpresasPage';
import ListaPostagemBlogPage from '../pages/Aluno/ListaPostagemBlogPage';

// EMPRESA PAGES
import PerfilEmpresaPage from '../pages/Empresa/PerfilEmpresaPage';
import ListaAlunosPage from '../pages/Empresa/ListaAlunosPage';

// BLOG PAGES
import BlogPage from '../pages/Blog/BlogPage';

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
      <Tab.Screen name="Empresas interessadas" component={ListaEmpresasPage} />
      <Tab.Screen name="Blog" component={ListaPostagemBlogPage} />
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
      <Tab.Screen name="Lista de Alunos" component={ListaAlunosPage} />
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
