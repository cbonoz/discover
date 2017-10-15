/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import StackGrid, { transitions, easings } from 'react-stack-grid';

const itemModifier = [
  'gray'
];


export default class BlockStack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: 480,
      columnWidth: 300,
      gutter: 5,
      easing: easings.quartOut,
      transition: 'fadeDown',
    };
  }

  getTransactionImage(index) {
    if (index != 0 && index % 10 == 0) {
      return "http://www.iconsdb.com/icons/preview/red/x-mark-3-xxl.png";
    }
    return "http://www.iconsdb.com/icons/preview/green/ok-xxl.png";
  }

  removeItem(txHash) {
    console.log('clicked: ' + txHash);
  }

  render() {
    const {
      items,
      duration,
      columnWidth,
      gutter,
      easing,
      transition: transitionSelect,
    } = this.state;

    const transition = transitions[transitionSelect];
    const self = this;

    // const blockHtml = self.props.blockHtml;
    console.log('blocks: ', self.props.blocks);

    const blockHtml = self.props.blocks.map((item, index) =>
        (<div
          key={item['tx']}
          className={`item item--${item.modifier}`}
          style={{ height: item.height }}
          onClick={() => self.removeItem(item['tx'])}
        ><span className='transaction'>Transaction</span>
        <div className='blueBG'><strong>Transaction Hash:</strong> <span className='word-break'>{item['receipt']['transactionHash']}</span></div>
        <div className='blueBG'><strong>Hashed API call:</strong> <span className='word-break'>{item['logs'][0]['args']['api']}</span></div>
        <div className='blueBG'><strong>Hashed Response:</strong> <span className='word-break'>{item['logs'][0]['args']['data']}</span></div>
        <div className='blueBG'><strong>Time Recorded:<br/></strong> <span className='word-break'>{item['logs'][0]['args']['timestamp']['myDate']}</span></div>
        <div className='greenCheckMark'><img src={self.getTransactionImage(item['position'])}/></div></div>)
    );

    return (
      <div>
        <StackGrid
          duration={duration}
          columnWidth={columnWidth}
          gutterWidth={gutter}
          gutterHeight={gutter}
          easing={easing}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
        >
        {blockHtml}
          {}
        </StackGrid>
      </div>
    );
  }
}