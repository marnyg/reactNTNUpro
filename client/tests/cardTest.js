// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { shallow, mount } from 'enzyme';
import { Article } from '../src/services';
import { Card, CardLine } from '../src/components/card';

describe('Alert tests', () => {
  const bogusArticle = new Article('a', 'b', 'c', 2, 'd');
  const articles = [bogusArticle, bogusArticle, bogusArticle];
  const wrapper = shallow(<CardLine cards={articles} />);
  const cardwrapper = shallow(
    <Card headline={bogusArticle.headline} imageLink={bogusArticle.imageLink} textBody={bogusArticle.textBody} id={1} />
  );

  it('init', () => {
    let instance: ?Card = Card.instance();
    expect(typeof instance).toEqual('object');
  });

  it('test rendering card line', () => {
    const card = wrapper.find('Card');
    expect(card).toHaveLength(3);
  });

  it('test card rendering', () => {
    let a1 = cardwrapper.find('NavLink');
    expect(a1.props().to).toEqual('/article/1');
    let a = cardwrapper.find('h5');
    expect(a.text()).toEqual('a');
    let b = cardwrapper.find('img');
    expect(b.props().src).toEqual('c');
    let c = cardwrapper.find('p');
    expect(c.text()).toEqual('b...');
  });
});
