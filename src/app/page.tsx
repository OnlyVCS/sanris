"use client";
import { LineGraph } from '@/components/Line';

import { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { ref, onValue, orderByChild, startAt, query } from 'firebase/database';
import Image from 'next/image';

export default function Home() {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [icon, setIcon] = useState("");
  const [rain, setRain] = useState("");
  const [description, setDescription] = useState("");

  // useState<any[]>([])

  // const api_url = 'https://api.openweathermap.org/data/3.0/onecall?lat=-23.5017&lon=-47.4581&units=metric&exclude=hourly,daily,minutely&appid=e3cfb29f929a920bc6cee653ad6c3142';
  const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=Sorocaba,br&APPID=e0c3e263c491040d9df1a529a4a1837a&units=metric&lang=pt_br';
  fetch(api_url)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setTemp(result.main.temp);
      setHumidity(result.main.humidity);
      setIcon(result.weather[0].icon);
      if (result.rain) setRain(result.rain);
      setDescription(result.weather[0].description);
    });

  const [data, setData] = useState<any[]>([]);
  // useState<any[]>([])
  
  const [lastThreeData, setLastThreeData] = useState<any[]>([]);
  let threeDaysAverage = 0;

  const [lastSevenData, setLastSevenData] = useState<any[]>([]);
  let sevenDaysAverage = 0;

  const [lastThirtyData, setLastThirtyData] = useState<any[]>([]);
  let thirtyDaysAverage = 0;

  console.log(icon);

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(db, 'UsersData/EcAN4TxRwufYDe9K6Pk6tqAbQ6G3/readings');

      const threeDaysDataRef = query(dataRef, orderByChild('timestamp'), startAt(Math.floor(new Date().getTime() / 1000) - (60 * 60 * 24 * 3)));
      onValue(threeDaysDataRef, (snapshot) => {
        const dataVal = snapshot.val();
          const dataArray = dataVal ? Object.keys(dataVal).map(key => dataVal[key]) : [];
          setLastThreeData(dataArray);
      });

      const sevenDaysDataRef = query(dataRef, orderByChild('timestamp'), startAt(Math.floor(new Date().getTime() / 1000) - (60 * 60 * 24 * 7)));
      onValue(sevenDaysDataRef, (snapshot) => {
        const dataVal = snapshot.val();
          const dataArray = dataVal ? Object.keys(dataVal).map(key => dataVal[key]) : [];
          setLastSevenData(dataArray);
      });

      const thirtyDaysDataRef = query(dataRef, orderByChild('timestamp'), startAt(Math.floor(new Date().getTime() / 1000) - (60 * 60 * 24 * 30)));
      onValue(thirtyDaysDataRef, (snapshot) => {
        const dataVal = snapshot.val();
          const dataArray = dataVal ? Object.keys(dataVal).map(key => dataVal[key]) : [];
          setLastThirtyData(dataArray);
      });

      onValue(dataRef, (snapshot) => {
        const dataVal = snapshot.val();
          const dataArray = dataVal ? Object.keys(dataVal).map(key => dataVal[key]) : [];
          setData(dataArray);
      });
    };

    fetchData();

    // Lembre-se de fazer a limpeza do listener ao desmontar o componente
    return () => {
      // Limpeza do listener, se necessário
    };
  }, []); // O segundo argumento vazio indica que o useEffect só será executado uma vez, equivalente ao componentDidMount

  for(let i=0; i<lastThreeData.length; i++){
    threeDaysAverage += lastThreeData[i].distance;
  }
  threeDaysAverage = threeDaysAverage/lastThreeData.length;
  
  for(let i=0; i<lastSevenData.length; i++){
    sevenDaysAverage += lastSevenData[i].distance;
  }
  sevenDaysAverage = sevenDaysAverage/lastSevenData.length;

  for(let i=0; i<lastThirtyData.length; i++){
    thirtyDaysAverage += lastThirtyData[i].distance;
  }
  thirtyDaysAverage = thirtyDaysAverage/lastThirtyData.length;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-6">
        {/* <h1 className="text-6xl font-bold text-center mb-8 select-none">SANRiS</h1> */}
        <Image className='mb-5' alt="Logo" src="/left_logo.svg" width={200} height={66.55414723226938} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2 bg-gray-100 p-6 rounded-lg shadow-md">
            <LineGraph labels={
              data.map(obj => {
                return new Date((obj.timestamp)*1000).toLocaleDateString('pt-br');
              })} data={
              data.map(obj => {
                return obj.distance;
              })} />
          </div>
          <div className="p-4 rounded-lg shadow-md bg-[#1a6d77] text-[#fff]">
            <h2 className="text-2xl font-bold mb-4 text-center">Clima Agora</h2>
            <div className="flex justify-center items-center mb-4">
              {/* <p className='text-center'>ÍCONE</p> */}
              <img className='bg-[#e4e4e4] rounded-lg mb-6' alt="Weather Logo" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} width={70} height={70} />
              {/* <img alt="Weather Logo" src={`https://openweathermap.org/img/w/09d.png`} width={70} height={70} /> */}
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg mb-2">Temperatura: {temp ? temp : <>Carregando...</>}ºC</p>
              <p className="text-lg mb-2">Umidade: {humidity ? humidity : <>Carregando...</>}</p>
              <p className="text-lg mb-2">Previsão de chuva pro dia: {rain ? rain : 0}mm</p>
              <p className="text-lg capitalize mb-2">Descrição: {description ? description : <>Carregando...</>}.</p>
              <p className="text-medium">{new Date().toLocaleDateString('pt-br')}</p>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-[#1a6d77] text-[#fff]">
            <h2 className="text-2xl font-bold text-center">Quadro de Medições</h2>
            <p className='opacity-90 select-none text-sm mt-1'>Média das últimas medidas feitas pelo sensor:</p>
            <div className="bg-[#e4e4e4] p-2 rounded-md text-[#000] mb-2 mt-4">
              <span className='mt-3 text-lg'>3 dias: {threeDaysAverage.toFixed(2)}mm</span>
            </div>
            <div className="bg-[#e4e4e4] p-2 rounded-md text-[#000] mb-2 mt-4">
              <span className='mt-3 text-lg'>7 dias: {sevenDaysAverage.toFixed(2)}mm</span>
            </div>
            <div className="bg-[#e4e4e4] p-2 rounded-md text-[#000] mb-2 mt-4">
              <span className='mt-3 text-lg'>30 dias: {thirtyDaysAverage.toFixed(2)}mm</span>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow-md bg-[#1a6d77] text-[#fff]">
          <h2 className="text-2xl font-bold text-center">Índice de inundação</h2>
          <p className='opacity-90 select-none text-sm mt-1'>Quantidade aproximada de chuva</p>
          <div className="bg-[#e4e4e4] p-2 rounded-md text-[#000] mb-2 mt-4">
            <span className='mt-3 text-lg'>20/01/24: 150mm</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
