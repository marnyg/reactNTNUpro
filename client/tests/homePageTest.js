import * as React from 'react';
import { Component } from 'react-simplified';
import { shallow, mount } from 'enzyme';
import { Article } from '../src/services';
import { Home } from '../src/components/HomePage';

describe('home page tests', () => {
  const wrapper = shallow(<Home match={{ params: 'nytt' }} />);

  it('Init state', () => {
    let instance: ?Home = Home.instance();
    expect(typeof instance).toEqual('object');
    expect(instance.page).toBe(0);
  });

  it('test change page logic', () => {
    let instance: ?Home = Home.instance();
    expect(typeof instance).toEqual('object');

    wrapper.find('button#nxt').simulate('click');
    expect(instance.page).toBe(1);

    wrapper.find('button#prv').simulate('click');
    expect(instance.page).toBe(0);
    wrapper.find('button#prv').simulate('click');
    expect(instance.page).toBe(0);
  });
});
