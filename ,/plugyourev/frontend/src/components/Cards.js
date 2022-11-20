import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Get to know more about EV's </h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='Has greater efficiency and less carbon emmission'
              label='Benifits'
              path='/'
            />
            <CardItem
              src='images/img-2.jpg'
              text='Charge whenever needed using fast charging stations'
              label='Charging'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Availability of super charging stations all over the country  '
              label='Availability'
              path='/'
            />
            <CardItem
              src='images/img-4.jpg'
              text='Use this webapp to find the nearest EV Charging Stations '
              label='Find'
              path='/'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Check out the latest news and updates on Electric Vehicles'
              label='News'
              path='/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
