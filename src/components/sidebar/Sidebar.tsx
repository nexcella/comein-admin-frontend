import React from "react";
import styled from "astroturf";
import {useVersion} from "../../providers/VersionProvider";
import {Button} from "../ui-kit/Button";
import {Link} from "react-router-dom";

const SidebarContainer = styled.aside`
  width: 290px;
  min-height: calc(100vh - 100px); 
  float: left;
  margin-top: -50px;
  background: white;
  border-radius: 0 48px 0 0;
  position:relative;
  padding-bottom: 30px;
  color: #c2c2c2
`

const VersionContainer = styled.div`
  font-size: 14px;
  color: #c2c2c2;
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
`


export function Sidebar() {
  const version = useVersion();

  return <SidebarContainer>
    <Link to='/create-client'>
      <Button text='Создать клиента'/>
    </Link>
    <br/><br/>
    Календарь <br/>
    <Link to='/clients'>
    <span style={{color: 'black'}}>Клиенты</span><br/>
    </Link>
    События<br/>
    Оплаты
    <br/>
    <br/>
    <br/>
    <br/>
    <ul>
      <li>Программа</li>
      <li>Инфо</li>
      <li>Спикеры</li>
      <li>Участники</li>
      <li>Карта</li>
      <li>Партнёры</li>
    </ul>
    <VersionContainer>
      Версия: {version}
    </VersionContainer>
  </SidebarContainer>
}
